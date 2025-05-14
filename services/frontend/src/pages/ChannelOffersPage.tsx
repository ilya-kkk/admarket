import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBackward, FaEye, FaClock, FaTag } from 'react-icons/fa';

interface Offer {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  views: number;
  validUntil: string;
  image: string;
}

function ChannelOffersPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>([]);
  
  useEffect(() => {
    fetchOffers();
  }, [id]);
  
  const fetchOffers = () => {
    // Имитация загрузки данных
    const mockOffers: Offer[] = [
      {
        id: 'offer1',
        title: 'Специальное предложение для технологических стартапов',
        description: 'Разместите рекламу вашего технологического стартапа в нашем канале со скидкой 30%',
        originalPrice: 12000,
        discountedPrice: 8400,
        discount: 30,
        views: 2500,
        validUntil: '2023-05-31',
        image: 'https://source.unsplash.com/random/400x300/?startup'
      },
      {
        id: 'offer2',
        title: 'Пакет из 3 постов',
        description: 'Закажите размещение 3 постов и получите скидку 20% на весь пакет',
        originalPrice: 36000,
        discountedPrice: 28800,
        discount: 20,
        views: 1800,
        validUntil: '2023-06-15',
        image: 'https://source.unsplash.com/random/400x300/?package'
      },
      {
        id: 'offer3',
        title: 'Реклама для криптовалютных проектов',
        description: 'Специальные условия для рекламы криптовалютных проектов и ICO',
        originalPrice: 15000,
        discountedPrice: 12000,
        discount: 20,
        views: 3200,
        validUntil: '2023-06-30',
        image: 'https://source.unsplash.com/random/400x300/?crypto'
      }
    ];
    
    setOffers(mockOffers);
  };
  
  return (
    <div className="channel-offers-screen">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaBackward />
        </button>
        <h1>Специальные предложения</h1>
      </div>
      
      <div className="offers-grid">
        {offers.map(offer => (
          <div key={offer.id} className="offer-card">
            <div className="offer-image">
              <img src={offer.image} alt={offer.title} />
              <div className="discount-badge">
                -{offer.discount}%
              </div>
            </div>
            
            <div className="offer-content">
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              
              <div className="offer-metrics">
                <div className="metric">
                  <FaEye />
                  <span>{offer.views} просмотров</span>
                </div>
                <div className="metric">
                  <FaClock />
                  <span>Действует до {new Date(offer.validUntil).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="offer-pricing">
                <div className="price-info">
                  <span className="original-price">₽{offer.originalPrice}</span>
                  <span className="discounted-price">₽{offer.discountedPrice}</span>
                </div>
                <button className="buy-button">Купить</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChannelOffersPage; 