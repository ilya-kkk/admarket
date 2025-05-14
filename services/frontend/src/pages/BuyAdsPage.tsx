import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaSort, FaEye } from 'react-icons/fa';

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
  views: string;
}

function ChannelCard({ channel, blurPrice = false }: { channel: Channel; blurPrice?: boolean }) {
  return (
    <Link to={`/channel/${channel.id}`} className="channel-card">
      <div className="channel-image">
        <img src={channel.image} alt={channel.name} />
        <div className="category-badge" style={{backgroundColor: channel.category.color}}>
          {channel.category.name}
        </div>
      </div>
      <div className="channel-info">
        <h3>{channel.name}</h3>
        <div className="channel-meta">
          <span className={`price ${blurPrice ? 'blur-price' : ''}`}>₽{channel.price}</span>
          <div className="views">
            <FaEye />
            <span>{channel.views}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function BuyAdsPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  
  useEffect(() => {
    // Загрузка каналов с сервера
    fetchChannels();
  }, []);
  
  const fetchChannels = () => {
    // Имитация загрузки данных
    const mockChannels = [
      {
        id: 'channel1',
        name: 'ТехноИнсайдер',
        category: { id: 'tech', name: 'Технологии', color: '#3B82F6' },
        image: 'https://source.unsplash.com/random/200x200/?tech',
        price: 8500,
        views: '45K'
      },
      {
        id: 'channel2',
        name: 'КриптоМир',
        category: { id: 'crypto', name: 'Крипто', color: '#8B5CF6' },
        image: 'https://source.unsplash.com/random/200x200/?crypto',
        price: 12000,
        views: '78K'
      },
      {
        id: 'channel3',
        name: 'НовостиДня',
        category: { id: 'news', name: 'Новости', color: '#EF4444' },
        image: 'https://source.unsplash.com/random/200x200/?news',
        price: 6000,
        views: '62K'
      }
    ];
    
    setChannels(mockChannels);
  };
  
  return (
    <div className="buy-ads-screen">
      <div className="content">
        <div className="sort-options">
          <button 
            className={sortOption === 'default' ? 'active' : ''} 
            onClick={() => setSortOption('default')}
          >
            По умолчанию
          </button>
          <button 
            className={sortOption === 'price_asc' ? 'active' : ''} 
            onClick={() => setSortOption('price_asc')}
          >
            По цене ↑
          </button>
          <button 
            className={sortOption === 'price_desc' ? 'active' : ''} 
            onClick={() => setSortOption('price_desc')}
          >
            По цене ↓
          </button>
          <button 
            className={sortOption === 'reach' ? 'active' : ''} 
            onClick={() => setSortOption('reach')}
          >
            По охвату
          </button>
          <button 
            className={sortOption === 'cpm' ? 'active' : ''} 
            onClick={() => setSortOption('cpm')}
          >
            По CPM
          </button>
        </div>
        
        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Поиск каналов..." />
        </div>
        
        <div className="category-filter">
          <button 
            className={activeCategory === 'all' ? 'active' : ''} 
            onClick={() => setActiveCategory('all')}
          >
            Все каналы
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
            Крипто
          </button>
          <button 
            className={activeCategory === 'news' ? 'active' : ''} 
            onClick={() => setActiveCategory('news')}
          >
            Новости
          </button>
          <button 
            className={activeCategory === 'entertainment' ? 'active' : ''} 
            onClick={() => setActiveCategory('entertainment')}
          >
            Развлечения
          </button>
        </div>
        
        <div className="channels-section">
          <h3>Все каналы</h3>
          <div className="channels-grid">
            {channels.map(channel => (
              <ChannelCard 
                key={channel.id} 
                channel={channel} 
                blurPrice={true} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyAdsPage; 