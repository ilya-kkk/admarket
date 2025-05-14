import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUsers, FaEye, FaChartLine, FaMoneyBillWave, FaCheck, FaBackward } from 'react-icons/fa';

interface Channel {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
    color: string;
  };
  description: string;
  coverImage: string;
  profileImage: string;
  subscribers: string;
  price: number;
  metrics: Array<{
    id: string;
    icon: string;
    label: string;
    value: string;
    color: string;
  }>;
  demographics: {
    ageGroups: { label: string; value: string };
    gender: { label: string; value: string };
    locations: { label: string; value: string };
  };
  requirements: string[];
}

function ChannelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [channel, setChannel] = useState<Channel | null>(null);
  
  useEffect(() => {
    // Загрузка данных канала
    fetchChannelDetails();
  }, [id]);
  
  const fetchChannelDetails = () => {
    // Имитация загрузки данных
    const mockChannel: Channel = {
      id: 'channel1',
      name: 'ТехноИнсайдер',
      category: { id: 'tech', name: 'Технологии', color: '#3B82F6' },
      description: 'ТехноИнсайдер — ваш ежедневный источник последних новостей, обзоров и аналитики в мире технологий.',
      coverImage: 'https://source.unsplash.com/random/800x600/?tech',
      profileImage: 'https://source.unsplash.com/random/200x200/?tech',
      subscribers: '125K',
      price: 8500,
      metrics: [
        { id: 'views', icon: 'eye', label: 'Ср. просмотры', value: '45 000', color: 'blue' },
        { id: 'engagement', icon: 'thumbs-up', label: 'Вовлеченность', value: '8.7%', color: 'green' },
        { id: 'cpm', icon: 'money', label: 'CPM', value: '₽189', color: 'purple' },
        { id: 'growth', icon: 'chart-line', label: 'Рост', value: '+12.4%', color: 'orange' }
      ],
      demographics: {
        ageGroups: { label: 'Возрастная группа', value: '25-34 (62%)' },
        gender: { label: 'Пол', value: 'Мужчины (71%)' },
        locations: { label: 'Основные локации', value: 'Россия (42%), Украина (18%), Казахстан (12%)' }
      },
      requirements: [
        'Контент должен быть связан с технологиями и релевантен нашей аудитории',
        'Максимум 2 ссылки на пост',
        'Мы проверяем весь контент перед публикацией',
        'Время обработки 24-48 часов'
      ]
    };
    
    setChannel(mockChannel);
  };
  
  if (!channel) return <div className="loading">Загрузка...</div>;
  
  return (
    <div className="channel-detail-screen">
      <div className="channel-header">
        <img src={channel.coverImage} alt={channel.name} className="cover-image" />
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaBackward />
        </button>
        <div className="channel-info-overlay">
          <div className="profile-image">
            <img src={channel.profileImage} alt={channel.name} />
          </div>
          <div>
            <h1>{channel.name}</h1>
            <div className="channel-meta">
              <span className="category-badge" style={{backgroundColor: channel.category.color}}>
                {channel.category.name}
              </span>
              <div className="subscribers">
                <FaUsers />
                <span>{channel.subscribers} подписчиков</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="content">
        <div className="price-section">
          <div className="price-tag">
            <span className="price blur-price">₽{channel.price}</span>
            <span className="price-label">за пост</span>
          </div>
          <button className="buy-button">Купить</button>
        </div>
        
        <div className="about-section">
          <h2>О канале</h2>
          <p>{channel.description}</p>
        </div>
        
        <div className="metrics-section">
          <h2>Показатели эффективности</h2>
          <div className="metrics-grid blur-content">
            {channel.metrics.map(metric => (
              <div key={metric.id} className={`metric-card ${metric.color}`}>
                <div className="metric-header">
                  <span>{metric.label}</span>
                  {metric.icon === 'eye' && <FaEye />}
                  {metric.icon === 'chart-line' && <FaChartLine />}
                  {metric.icon === 'money' && <FaMoneyBillWave />}
                </div>
                <div className="metric-value">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="demographics-section">
          <h2>Демография аудитории</h2>
          <div className="demographics-grid blur-content">
            <div className="demographic-card">
              <span className="demographic-label">{channel.demographics.ageGroups.label}</span>
              <div className="demographic-value">{channel.demographics.ageGroups.value}</div>
            </div>
            <div className="demographic-card">
              <span className="demographic-label">{channel.demographics.gender.label}</span>
              <div className="demographic-value">{channel.demographics.gender.value}</div>
            </div>
            <div className="demographic-card full-width">
              <span className="demographic-label">{channel.demographics.locations.label}</span>
              <div className="demographic-value">{channel.demographics.locations.value}</div>
            </div>
          </div>
        </div>
        
        <div className="requirements-section">
          <h2>Требования к рекламе</h2>
          <ul className="requirements-list">
            {channel.requirements.map((req, index) => (
              <li key={index}>
                <FaCheck />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bottom-action-bar">
        <button className="action-button">Купить рекламное размещение</button>
      </div>
    </div>
  );
}

export default ChannelDetailPage; 