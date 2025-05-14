import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaRubleSign, FaFire } from 'react-icons/fa';

function PremiumBanner() {
  return (
    <div className="premium-banner">
      <div>
        <h3>Премиум доступ</h3>
        <p>Разблокируйте все функции</p>
      </div>
      <button>Купить подписку</button>
    </div>
  );
}

function WelcomeCard() {
  return (
    <div className="welcome-card">
      <h2>Добро пожаловать в ТелеРекламу</h2>
      <p>Покупайте и продавайте рекламу в Telegram-каналах.</p>
      <div className="stats">
        <div className="stat-item">
          <FaUsers />
          <span>1.2K+ Каналов</span>
        </div>
        <div className="stat-item">
          <FaRubleSign />
          <span>$50K+ Оборот</span>
        </div>
      </div>
    </div>
  );
}

function HotDealsSection() {
  const hotDeals = [
    {
      id: 'deal1',
      name: 'ТехноНовости',
      image: 'https://source.unsplash.com/random/150x150/?tech',
      originalPrice: 5000,
      discountedPrice: 3500,
      discount: '30%',
      views: '45K'
    },
    {
      id: 'deal2',
      name: 'КриптоМир',
      image: 'https://source.unsplash.com/random/150x150/?crypto',
      originalPrice: 7500,
      discountedPrice: 6000,
      discount: '20%',
      views: '78K'
    },
    {
      id: 'deal3',
      name: 'НовостиДня',
      image: 'https://source.unsplash.com/random/150x150/?news',
      originalPrice: 6000,
      discountedPrice: 4500,
      discount: '25%',
      views: '62K'
    }
  ];

  return (
    <div className="hot-deals-section">
      <div className="section-header">
        <h3><FaFire /> Горящие предложения</h3>
        <Link to="/buy-ads">Все</Link>
      </div>
      <div className="deals-carousel">
        {hotDeals.map(deal => (
          <div key={deal.id} className="deal-card">
            <div className="deal-image">
              <img src={deal.image} alt={deal.name} />
              <div className="discount-badge">{deal.discount}</div>
            </div>
            <div className="deal-info">
              <h4>{deal.name}</h4>
              <div className="deal-price">
                <div>
                  <span className="original-price">₽{deal.originalPrice}</span>
                  <span className="discounted-price">₽{deal.discountedPrice}</span>
                </div>
                <div className="views-badge">{deal.views}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="home-screen">
      <div className="content">
        <PremiumBanner />
        <WelcomeCard />
        <HotDealsSection />
        
        <div className="main-options">
          <Link to="/buy-ads" className="option-card buy-card">
            <div>
              <h3>Купить рекламу</h3>
              <p>Найдите идеальный канал для вашей рекламы</p>
            </div>
            <div className="icon-container">
              <FaRubleSign />
            </div>
          </Link>
          
          <Link to="/sell-ads" className="option-card sell-card">
            <div>
              <h3>Продать рекламу</h3>
              <p>Монетизируйте свою аудиторию</p>
            </div>
            <div className="icon-container">
              <FaUsers />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 