import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { LucideHome, LucideShoppingCart, LucideUser, LucideDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaSearch, FaUserCircle, FaFire, FaChartLine, FaUsers, FaRubleSign } from "react-icons/fa";

interface Section {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface BottomNavigationProps {
  sections: Section[];
}

interface Card {
  id: string;
  title: string;
  description: string;
  bg: string;
}

export default function TeleAdsApp() {
  const sections = [
    { id: "home", label: "Главная", icon: LucideHome },
    { id: "buy_ads", label: "Купить", icon: LucideShoppingCart },
    { id: "sell_ads", label: "Продать", icon: LucideDollarSign },
    { id: "profile", label: "Профиль", icon: LucideUser },
  ];

  return (
    <div className="min-h-screen bg-[#181f2a] flex justify-center items-start py-6">
      <div className="w-[350px] rounded-3xl bg-[#111827] p-5 shadow-xl">
        <Header />
        <SubHeader />
        <PremiumBanner />
        <WelcomeCard />
        <HotOffers />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between mb-1">
      <div className="text-2xl font-bold text-white">ТелеРеклама</div>
      <div className="flex gap-2 text-white text-xl">
        <FaSearch className="cursor-pointer" />
        <FaUserCircle className="cursor-pointer" />
      </div>
    </div>
  );
}

function SubHeader() {
  return (
    <div className="text-gray-300 text-sm mb-4">Маркетплейс рекламы в Telegram-каналах</div>
  );
}

function PremiumBanner() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-2xl p-4 flex items-center justify-between mb-4">
      <div>
        <div className="text-base font-semibold text-white">Премиум доступ</div>
        <div className="text-xs text-gray-200">Разблокируйте все функции</div>
      </div>
      <button className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-xl text-sm shadow">Купить подписку</button>
    </div>
  );
}

function WelcomeCard() {
  return (
    <div className="bg-[#232b3b] rounded-2xl p-4 mb-4">
      <div className="text-base font-semibold text-white mb-1">Добро пожаловать в ТелеРекламу</div>
      <div className="text-xs text-gray-300 mb-3">Покупайте и продавайте рекламу в Telegram-каналах.</div>
      <div className="flex gap-6 text-xs text-gray-400">
        <div className="flex items-center gap-1"><FaUsers /> 1.2K+ Каналов</div>
        <div className="flex items-center gap-1"><FaRubleSign /> $50K+ Оборот</div>
      </div>
    </div>
  );
}

function HotOffers() {
  const offers = [
    {
      id: 1,
      title: "ТехноНовости",
      price: 3500,
      oldPrice: 5000,
      discount: 30,
      subs: 45000,
      img: "https://via.placeholder.com/60x60?text=%D0%9A%D0%B0%D0%BD%D0%B0%D0%BB"
    },
    {
      id: 2,
      title: "КриптоМир",
      price: 6000,
      oldPrice: 7500,
      discount: 20,
      subs: 78000,
      img: "https://via.placeholder.com/60x60?text=%D0%9A%D0%B0%D0%BD%D0%B0%D0%BB"
    },
    // Можно добавить больше предложений
  ];

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1 text-orange-400 font-semibold text-base">
          <FaFire /> Горящие предложения
        </div>
        <a href="#" className="text-xs text-blue-400 hover:underline">Все предложения</a>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700">
        {offers.map(offer => (
          <div key={offer.id} className="bg-[#232b3b] rounded-2xl p-3 min-w-[140px] max-w-[140px] flex-shrink-0 relative">
            <img src={offer.img} alt="Канал" className="rounded w-12 h-12 mb-2 object-cover" />
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">-{offer.discount}%</div>
            <div className="text-sm font-semibold text-white mb-1">{offer.title}</div>
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
              <FaUsers /> {Math.round(offer.subs/1000)}K
            </div>
            <div className="flex items-end gap-1">
              <span className="text-lg font-bold text-white">₽{offer.price}</span>
              <span className="text-xs text-gray-400 line-through">₽{offer.oldPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BottomNavigation({ sections }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 flex justify-around py-3">
      {sections.map((section: Section) => (
        <div key={section.id} className="flex flex-col items-center text-sm text-gray-300">
          <section.icon size={20} />
          <span>{section.label}</span>
        </div>
      ))}
    </nav>
  );
}
