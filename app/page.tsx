'use client';

import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import { useStore } from './store';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const messages = useStore((state) => state.messages);

  const handleStartStory = () => {
    setShowWelcome(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        {showWelcome && messages.length === 0 ? (
          <WelcomeScreen onStart={handleStartStory} />
        ) : (
          <ChatInterface />
        )}
      </div>
    </div>
  );
}
