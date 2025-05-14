import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BuyAdsPage from './pages/BuyAdsPage';
import BuyAdsPremiumPage from './pages/BuyAdsPremiumPage';
import ChannelDetailPage from './pages/ChannelDetailPage';
import ChannelDetailPremiumPage from './pages/ChannelDetailPremiumPage';
import ChannelOffersPage from './pages/ChannelOffersPage';
import SellAdsPage from './pages/SellAdsPage';
import './styles/TeleAds.css';

function App() {
  return (
    <Router>
      <div className="teleads-app">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/buy-ads" component={BuyAdsPage} />
          <Route path="/buy-ads-premium" component={BuyAdsPremiumPage} />
          <Route path="/channel/:id" component={ChannelDetailPage} />
          <Route path="/channel-premium/:id" component={ChannelDetailPremiumPage} />
          <Route path="/channel-offers/:id" component={ChannelOffersPage} />
          <Route path="/sell-ads" component={SellAdsPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App; 