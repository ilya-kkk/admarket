import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';

interface FormData {
  name: string;
  category: string;
  description: string;
  subscribers: string;
  avgViews: string;
  engagement: string;
  growth: string;
  price: string;
  discount: string;
  validUntil: string;
  requirements: string;
  termsAgreed: boolean;
  specialOffer: boolean;
}

function SellAdsPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    description: '',
    subscribers: '',
    avgViews: '',
    engagement: '',
    growth: '',
    price: '',
    discount: '',
    validUntil: '',
    requirements: '',
    termsAgreed: false,
    specialOffer: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Отправка данных на сервер
    console.log('Отправка данных:', formData);
  };
  
  return (
    <div className="sell-ads-screen">
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label>Изображение канала</label>
            <div className="image-uploader">
              <div className="image-preview">
                <FaImage />
              </div>
              <button type="button" className="upload-button">Загрузить изображение</button>
              <input type="file" className="file-input" />
            </div>
          </div>
          
          <div className="form-section">
            <label htmlFor="name">Название канала</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="например, ТехноИнсайдер"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-section">
            <label htmlFor="category">Категория</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Выберите категорию</option>
              <option value="tech">Технологии</option>
              <option value="crypto">Крипто</option>
              <option value="news">Новости</option>
              <option value="entertainment">Развлечения</option>
              <option value="business">Бизнес</option>
              <option value="education">Образование</option>
              <option value="lifestyle">Лайфстайл</option>
              <option value="other">Другое</option>
            </select>
          </div>
          
          <div className="form-section">
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Опишите ваш канал и его контент..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-section">
            <h3>Статистика канала</h3>
            <div className="stats-grid">
              <div>
                <label htmlFor="subscribers">Подписчики</label>
                <input
                  type="number"
                  id="subscribers"
                  name="subscribers"
                  placeholder="например, 50000"
                  value={formData.subscribers}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="avgViews">Ср. просмотры</label>
                <input
                  type="number"
                  id="avgViews"
                  name="avgViews"
                  placeholder="например, 25000"
                  value={formData.avgViews}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="engagement">Вовлеченность (%)</label>
                <input
                  type="number"
                  id="engagement"
                  name="engagement"
                  placeholder="например, 5.2"
                  step="0.1"
                  value={formData.engagement}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="growth">Месячный рост (%)</label>
                <input
                  type="number"
                  id="growth"
                  name="growth"
                  placeholder="например, 3.5"
                  step="0.1"
                  value={formData.growth}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <label htmlFor="price">Цена рекламы (₽)</label>
            <div className="price-input">
              <span className="currency-symbol">₽</span>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="например, 10000"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <p className="input-hint">Это цена, которую рекламодатели будут платить за один пост в вашем канале.</p>
          </div>
          
          <div className="form-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="specialOffer"
                checked={formData.specialOffer}
                onChange={handleChange}
              />
              <span>Создать специальное предложение</span>
            </label>
            
            {formData.specialOffer && (
              <div className="special-offer-form">
                <div className="offer-grid">
                  <div>
                    <label htmlFor="discount">Скидка (%)</label>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      placeholder="например, 20"
                      value={formData.discount}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="validUntil">Действует до</label>
                    <input
                      type="date"
                      id="validUntil"
                      name="validUntil"
                      value={formData.validUntil}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="form-section">
            <label htmlFor="requirements">Требования к рекламе</label>
            <textarea
              id="requirements"
              name="requirements"
              rows={3}
              placeholder="Укажите требования к рекламе (тип контента, формат и т.д.)"
              value={formData.requirements}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-section verification-section">
            <h3>Верификация канала</h3>
            <p>Для подтверждения владения каналом мы отправим код верификации, который вам нужно будет опубликовать в вашем канале.</p>
            <button type="button" className="verification-button">
              Запросить код верификации
            </button>
          </div>
          
          <div className="form-section">
            <label className="checkbox-label terms-label">
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
                required
              />
              <span>
                Я согласен с <a href="#">Условиями использования</a> и <a href="#">Политикой конфиденциальности</a>
              </span>
            </label>
          </div>
        </form>
      </div>
      
      <div className="bottom-action-bar">
        <button type="submit" className="action-button" onClick={handleSubmit}>
          Разместить мой канал
        </button>
      </div>
    </div>
  );
}

export default SellAdsPage; 