
import React, { useState, useEffect } from 'react';
import { KEYBOARD_LAYOUT, SHIFT_KEYBOARD_LAYOUT, FINGER_MAP } from '../constants';

interface KeyboardProps {
  activeKey: string;
}

const Keyboard: React.FC<KeyboardProps> = ({ activeKey }) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftPressed(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const layout = isShiftPressed ? SHIFT_KEYBOARD_LAYOUT : KEYBOARD_LAYOUT;

  const getKeyStyle = (key: string) => {
    const keyLower = key.toLowerCase();
    const activeKeyLower = activeKey.toLowerCase();
    let baseStyle = 'h-14 rounded-md flex items-center justify-center font-sans text-lg font-semibold border-b-4 transition-all duration-75';
    let fingerColor = 'bg-gray-300 border-gray-400 text-gray-800';
    let fingerInfo = FINGER_MAP[key];

    if(isShiftPressed) {
        // Find corresponding key in base layout to get finger info for shifted characters
        for(let r=0; r<SHIFT_KEYBOARD_LAYOUT.length; r++) {
            const cIndex = SHIFT_KEYBOARD_LAYOUT[r].indexOf(key);
            if(cIndex !== -1) {
                const baseKey = KEYBOARD_LAYOUT[r][cIndex];
                fingerInfo = FINGER_MAP[baseKey];
                break;
            }
        }
    }

    if (fingerInfo) {
      fingerColor = `${fingerInfo.color} border-gray-400 text-gray-900`;
    }

    if (key === activeKey || (isShiftPressed && (key === 'Shift' || key.toUpperCase() === activeKey))) {
      return `${baseStyle} ${fingerColor} transform scale-110 -translate-y-1 shadow-lg`;
    }
    
    // Handle special keys
    const specialKeys: { [key: string]: string } = {
        'Backspace': 'w-28', 'Tab': 'w-20', 'CapsLock': 'w-24', 'Enter': 'w-28', 'Shift': 'w-36', 'Space': 'flex-1'
    };

    if (specialKeys[key]) {
        return `${baseStyle} ${specialKeys[key]} bg-gray-400 border-gray-500 text-white`;
    }

    return `${baseStyle} w-14 ${fingerColor}`;
  };

  return (
    <div className="space-y-1.5 p-3 bg-gray-200 rounded-xl shadow-inner w-full">
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center space-x-1.5">
          {row.map((key) => (
            <div key={key} className={getKeyStyle(key)}>
              {key === 'Space' ? '' : key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
