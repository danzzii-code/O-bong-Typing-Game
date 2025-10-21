
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SentencePractice from './components/SentencePractice';
import PositionPractice from './components/PositionPractice';
import WordPractice from './components/WordPractice';
import type { PracticeMode } from './types';
import { PRACTICE_MODES } from './constants';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<PracticeMode>(PRACTICE_MODES[0]);

  const renderContent = useCallback(() => {
    switch (currentMode.id) {
      case 'position':
        return <PositionPractice />;
      case 'word':
        return <WordPractice />;
      case 'sentence':
        return <SentencePractice />;
      default:
        return <PositionPractice />;
    }
  }, [currentMode]);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50 text-gray-800">
      <Header />
      <div className="flex flex-1 container mx-auto p-4 lg:p-6 space-x-0 lg:space-x-6">
        <aside className="w-1/4 lg:w-1/5 hidden md:block">
          <Sidebar currentMode={currentMode} setCurrentMode={setCurrentMode} />
        </aside>
        <main className="flex-1 bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
