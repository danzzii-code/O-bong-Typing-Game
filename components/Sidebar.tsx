
import React from 'react';
import type { PracticeMode } from '../types';
import { PRACTICE_MODES } from '../constants';

interface SidebarProps {
  currentMode: PracticeMode;
  setCurrentMode: (mode: PracticeMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentMode, setCurrentMode }) => {
  return (
    <nav className="bg-white p-4 rounded-2xl shadow-lg h-full">
      <ul>
        {PRACTICE_MODES.map((mode) => (
          <li key={mode.id} className="mb-2">
            <button
              onClick={() => setCurrentMode(mode)}
              className={`w-full text-left p-4 rounded-lg flex items-center transition-all duration-200 ${
                currentMode.id === mode.id
                  ? 'bg-green-500 text-white shadow-md'
                  : 'hover:bg-green-100 hover:text-green-700'
              }`}
            >
              <span className="mr-3">{mode.icon}</span>
              <div>
                <span className="font-bold text-lg">{mode.label}</span>
                 <p className="text-sm">{mode.description}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
