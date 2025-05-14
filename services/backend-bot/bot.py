import os
import logging
import asyncio
from dotenv import load_dotenv
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from telegram.error import BadRequest, Conflict, NetworkError

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Загрузка переменных окружения
load_dotenv()
TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
WEBAPP_URL = os.getenv('WEBAPP_URL', 'http://localhost:3000')

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start"""
    try:
        # Приветственное сообщение
        await update.message.reply_text(
            "👋 Привет! Я бот для работы с веб-приложением.\n\n"
            "Доступные команды:\n"
            "/start - Показать это сообщение\n"
            "/help - Показать справку\n"
            "/webapp - Открыть веб-приложение"
        )
    except Exception as e:
        logger.error(f"Ошибка при отправке приветственного сообщения: {e}")
        await update.message.reply_text("Произошла ошибка при запуске бота. Попробуйте позже.")

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /help"""
    help_text = (
        "📚 Справка по использованию бота:\n\n"
        "1. Используйте /start для начала работы\n"
        "2. Используйте /webapp для открытия веб-приложения\n"
        "3. После открытия веб-приложения вы можете взаимодействовать с ним\n"
        "4. Все данные, отправленные из веб-приложения, будут обработаны ботом"
    )
    await update.message.reply_text(help_text)

async def webapp_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /webapp"""
    try:
        keyboard = [
            [InlineKeyboardButton(
                "Открыть веб-приложение",
                web_app=WebAppInfo(url=WEBAPP_URL)
            )]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            "Нажмите на кнопку ниже, чтобы открыть веб-приложение:",
            reply_markup=reply_markup
        )
    except BadRequest as e:
        logger.error(f"Ошибка при создании веб-приложения: {e}")
        await update.message.reply_text(
            "⚠️ Ошибка: Не удалось открыть веб-приложение.\n"
            "Пожалуйста, убедитесь, что веб-приложение доступно и использует HTTPS."
        )
    except Exception as e:
        logger.error(f"Неожиданная ошибка: {e}")
        await update.message.reply_text("Произошла непредвиденная ошибка. Попробуйте позже.")

async def handle_webapp_data(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик данных от веб-приложения"""
    try:
        data = update.effective_message.web_app_data.data
        await update.message.reply_text(
            f"✅ Данные успешно получены!\n\n"
            f"Содержимое: {data}"
        )
    except Exception as e:
        logger.error(f"Ошибка при обработке данных веб-приложения: {e}")
        await update.message.reply_text(
            "❌ Произошла ошибка при обработке данных.\n"
            "Пожалуйста, попробуйте еще раз."
        )

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик ошибок"""
    logger.error(f"Произошла ошибка: {context.error}")
    if isinstance(context.error, Conflict):
        logger.warning("Обнаружен конфликт с другим экземпляром бота. Перезапуск...")
        await asyncio.sleep(5)  # Ждем 5 секунд перед перезапуском
        await context.application.stop()
        await context.application.start()
    elif isinstance(context.error, NetworkError):
        logger.warning("Проблема с сетью. Повторная попытка через 5 секунд...")
        await asyncio.sleep(5)

def main() -> None:
    """Запуск бота"""
    if not TOKEN:
        logger.error("Не указан токен бота в переменных окружения!")
        return

    try:
        # Создание приложения
        application = Application.builder().token(TOKEN).build()

        # Регистрация обработчиков
        application.add_handler(CommandHandler("start", start))
        application.add_handler(CommandHandler("help", help_command))
        application.add_handler(CommandHandler("webapp", webapp_command))
        application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_webapp_data))
        
        # Регистрация обработчика ошибок
        application.add_error_handler(error_handler)

        # Запуск бота
        logger.info("Бот запускается...")
        application.run_polling(
            allowed_updates=Update.ALL_TYPES,
            drop_pending_updates=True  # Игнорируем накопившиеся обновления
        )
    except Exception as e:
        logger.error(f"Критическая ошибка при запуске бота: {e}")

if __name__ == '__main__':
    main() 