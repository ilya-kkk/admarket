import pytest
from telegram import Update, Message, Chat, User
from telegram.ext import ContextTypes
from unittest.mock import AsyncMock, MagicMock
from bot import start, help_command, webapp_command, handle_webapp_data

@pytest.fixture
def update():
    """Фикстура для создания объекта Update"""
    update = MagicMock(spec=Update)
    update.message = MagicMock(spec=Message)
    update.message.chat = MagicMock(spec=Chat)
    update.message.chat.id = 123456
    update.message.from_user = MagicMock(spec=User)
    update.message.from_user.id = 123456
    return update

@pytest.fixture
def context():
    """Фикстура для создания объекта Context"""
    context = MagicMock(spec=ContextTypes.DEFAULT_TYPE)
    return context

@pytest.mark.asyncio
async def test_start_command(update, context):
    """Тест команды /start"""
    await start(update, context)
    update.message.reply_text.assert_called_once()

@pytest.mark.asyncio
async def test_help_command(update, context):
    """Тест команды /help"""
    await help_command(update, context)
    update.message.reply_text.assert_called_once()

@pytest.mark.asyncio
async def test_webapp_command(update, context):
    """Тест команды /webapp"""
    await webapp_command(update, context)
    update.message.reply_text.assert_called_once()

@pytest.mark.asyncio
async def test_handle_webapp_data(update, context):
    """Тест обработки данных от веб-приложения"""
    update.effective_message.web_app_data.data = '{"test": "data"}'
    await handle_webapp_data(update, context)
    update.message.reply_text.assert_called_once() 