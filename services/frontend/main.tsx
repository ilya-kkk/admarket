import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { LucideHome, LucideShoppingCart, LucideUser, LucideDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <Header />
      <HomePage />
      <BottomNavigation sections={sections} />
    </div>
  );
}

function Header() {
  return (
    <header className="text-2xl font-bold mb-4 text-center">ТелеРеклама</header>
  );
}

function HomePage() {
  return (
    <div className="space-y-4">
      <PremiumBanner />
      <WelcomeCard />
      <MainNavigationCards />
    </div>
  );
}

function PremiumBanner() {
  return (
    <Card className="bg-gradient-to-r from-indigo-500 to-indigo-700 p-4 rounded-2xl">
      <div className="text-lg font-semibold">Премиум доступ</div>
      <div className="text-sm text-gray-200">Разблокируйте все функции</div>
      <Button className="mt-2 bg-purple-600">Купить подписку</Button>
    </Card>
  );
}

function WelcomeCard() {
  return (
    <Card className="p-4 bg-gray-800 rounded-2xl">
      <h2 className="text-lg font-semibold">Добро пожаловать в ТелеРекламу</h2>
      <p className="text-sm text-gray-300">Покупайте и продавайте рекламу в Telegram-каналах.</p>
      <div className="flex justify-between mt-4 text-sm text-gray-400">
        <div>
          <strong>1.2K+</strong> Каналов
        </div>
        <div>
          <strong>$50K+</strong> Оборот
        </div>
      </div>
    </Card>
  );
}

function MainNavigationCards() {
  const cards = [
    {
      id: "buy_ads",
      title: "Купить рекламу",
      description: "Найдите идеальный канал для вашей рекламы",
      bg: "bg-gradient-to-r from-blue-800 to-indigo-800"
    },
    {
      id: "sell_ads",
      title: "Продать рекламу",
      description: "Монетизируйте свою аудиторию",
      bg: "bg-gradient-to-r from-purple-800 to-pink-700"
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {cards.map(card => (
        <Card key={card.id} className={`${card.bg} p-4 rounded-2xl`}>
          <div className="text-lg font-semibold">{card.title}</div>
          <div className="text-sm text-gray-200">{card.description}</div>
        </Card>
      ))}
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
