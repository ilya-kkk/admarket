import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaSort, FaStar, FaEye, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';

interface Channel {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
    color: string;
  };
  image: string;
  price: number;
  views: number;
  engagement: number;
  cpm: number;
  growth: number;
  isVerified: boolean;
  isPremium: boolean;
}

function BuyAdsPremiumPage() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    fetchChannels();
  }, []);
  
  const fetchChannels = () => {
    // Имитация загрузки данных
    const mockChannels: Channel[] = [
      {
        id: 'channel1',
        name: 'ТехноИнсайдер',
        category: { id: 'tech', name: 'Технологии', color: '#3B82F6' },
        image: 'https://source.unsplash.com/random/400x300/?tech',
        price: 8500,
        views: 45000,
        engagement: 8.7,
        cpm: 189,
        growth: 12.4,
        isVerified: true,
        isPremium: true
      },
      {
        id: 'channel2',
        name: 'КриптоНовости',
        category: { id: 'crypto', name: 'Криптовалюты', color: '#10B981' },
        image: 'https://source.unsplash.com/random/400x300/?crypto',
        price: 12000,
        views: 65000,
        engagement: 7.2,
        cpm: 185,
        growth: 15.8,
        isVerified: true,
        isPremium: true
      },
      {
        id: 'channel3',
        name: 'БизнесАналитика',
        category: { id: 'business', name: 'Бизнес', color: '#F59E0B' },
        image: 'https://source.unsplash.com/random/400x300/?business',
        price: 15000,
        views: 85000,
        engagement: 9.1,
        cpm: 176,
        growth: 10.2,
        isVerified: true,
        isPremium: true
      }
    ];
    
    setChannels(mockChannels);
  };
  
  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    const sortedChannels = [...channels];
    
    switch (sortType) {
      case 'price-asc':
        sortedChannels.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedChannels.sort((a, b) => b.price - a.price);
        break;
      case 'views':
        sortedChannels.sort((a, b) => b.views - a.views);
        break;
      case 'engagement':
        sortedChannels.sort((a, b) => b.engagement - a.engagement);
        break;
      case 'cpm':
        sortedChannels.sort((a, b) => a.cpm - b.cpm);
        break;
      default:
        // Сброс к исходному порядку
        fetchChannels();
        return;
    }
    
    setChannels(sortedChannels);
  };
  
  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || channel.category.id === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="buy-ads-premium-screen">
      <div className="search-bar">
        <div className="search-input">
          <FaSearch />
          <input
            type="text"
            placeholder="Поиск каналов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          className="filter-button"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter />
          Фильтры
        </button>
      </div>
      
      {showFilters && (
        <div className="filters-panel">
          <div className="sort-options">
            <button 
              className={sortBy === 'default' ? 'active' : ''}
              onClick={() => handleSort('default')}
            >
              <FaSort />
              По умолчанию
            </button>
            <button 
              className={sortBy === 'price-asc' ? 'active' : ''}
              onClick={() => handleSort('price-asc')}
            >
              <FaMoneyBillWave />
              Цена (по возрастанию)
            </button>
            <button 
              className={sortBy === 'price-desc' ? 'active' : ''}
              onClick={() => handleSort('price-desc')}
            >
              <FaMoneyBillWave />
              Цена (по убыванию)
            </button>
            <button 
              className={sortBy === 'views' ? 'active' : ''}
              onClick={() => handleSort('views')}
            >
              <FaEye />
              Просмотры
            </button>
            <button 
              className={sortBy === 'engagement' ? 'active' : ''}
              onClick={() => handleSort('engagement')}
            >
              <FaChartLine />
              Вовлеченность
            </button>
            <button 
              className={sortBy === 'cpm' ? 'active' : ''}
              onClick={() => handleSort('cpm')}
            >
              <FaMoneyBillWave />
              CPM
            </button>
          </div>
          
          <div className="category-filters">
            <button 
              className={activeCategory === 'all' ? 'active' : ''}
              onClick={() => setActiveCategory('all')}
            >
              Все
            </button>
            <button 
              className={activeCategory === 'tech' ? 'active' : ''}
              onClick={() => setActiveCategory('tech')}
            >
              Технологии
            </button>
            <button 
              className={activeCategory === 'crypto' ? 'active' : ''}
              onClick={() => setActiveCategory('crypto')}
            >
              Криптовалюты
            </button>
            <button 
              className={activeCategory === 'business' ? 'active' : ''}
              onClick={() => setActiveCategory('business')}
            >
              Бизнес
            </button>
          </div>
        </div>
      )}
      
      <div className="channels-grid">
        {filteredChannels.map(channel => (
          <div 
            key={channel.id} 
            className="channel-card premium"
            onClick={() => navigate(`/channel/${channel.id}/premium`)}
          >
            <div className="channel-image">
              <img src={channel.image} alt={channel.name} />
              {channel.isVerified && (
                <div className="verified-badge">
                  <FaStar />
                </div>
              )}
            </div>
            
            <div className="channel-info">
              <h3>{channel.name}</h3>
              <span 
                className="category-badge"
                style={{backgroundColor: channel.category.color}}
              >
                {channel.category.name}
              </span>
              
              <div className="channel-metrics">
                <div className="metric">
                  <FaEye />
                  <span>{channel.views.toLocaleString()} просмотров</span>
                </div>
                <div className="metric">
                  <FaChartLine />
                  <span>{channel.engagement}% вовлеченность</span>
                </div>
                <div className="metric">
                  <FaMoneyBillWave />
                  <span>CPM: ₽{channel.cpm}</span>
                </div>
              </div>
              
              <div className="channel-price">
                <span className="price">₽{channel.price}</span>
                <span className="price-label">за пост</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyAdsPremiumPage; 