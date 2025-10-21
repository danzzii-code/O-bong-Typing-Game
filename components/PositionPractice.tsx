import React, { useState, useEffect, useRef, useCallback } from 'react';
import { POSITION_PRACTICE_SETS } from '../constants';
import type { UserInfo, ScoreEntry } from '../types';
import { GameLobby, ResultDisplay, HallOfFameDisplay } from './GameUI';

interface FallingItem {
  id: number;
  text: string;
  x: number; // percentage from left
  y: number; // percentage from top
}

type GameState = 'userInfo' | 'playing' | 'result' | 'hallOfFame';
const HALL_OF_FAME_KEY = 'hallOfFame-position';
const ITEM_FALL_SPEED = 0.3;
const ITEM_SPAWN_RATE = 1200; // ms

const PositionPractice: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('userInfo');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [finalScore, setFinalScore] = useState<ScoreEntry | null>(null);
  const [hallOfFameData, setHallOfFameData] = useState<ScoreEntry[]>([]);
  
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(5);
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const [totalCorrectChars, setTotalCorrectChars] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const gameLoopRef = useRef<number>();
  const itemSpawnerRef = useRef<number>();
  const nextItemId = useRef(0);
  const wordList = useRef<string[]>([]);
  
  const shuffleArray = (array: string[]) => {
      const newArr = [...array];
      for (let i = newArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
  }

  const handleGameOver = useCallback(() => {
    setGameState(currentState => {
      if (currentState !== 'playing') return currentState;

      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (itemSpawnerRef.current) clearInterval(itemSpawnerRef.current);
      setFallingItems([]);

      const wpm = totalCorrectChars;
      const accuracy = totalTypedChars > 0 ? Math.round((totalCorrectChars / totalTypedChars) * 100) : 100;
      const finalScoreData: ScoreEntry = { userInfo: userInfo!, wpm, accuracy, timestamp: Date.now() };
      setFinalScore(finalScoreData);
      return 'result';
    });
  }, [userInfo, totalCorrectChars, totalTypedChars]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timeLeft <= 0 || lives <= 0) {
      handleGameOver();
      return;
    }
    
    const timerId = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [gameState, timeLeft, lives, handleGameOver]);

  const handleStartGame = (info: UserInfo) => {
    setUserInfo(info);
    setTimeLeft(60);
    setLives(5);
    setScore(0);
    setTotalCorrectChars(0);
    setTotalTypedChars(0);
    setInputValue('');
    setFallingItems([]);
    nextItemId.current = 0;
    const practiceChars = POSITION_PRACTICE_SETS['모든 글자'].split('');
    wordList.current = shuffleArray(practiceChars);
    setGameState('playing');
    setTimeout(() => inputRef.current?.focus(), 100);
  };
  
  const spawnItem = useCallback(() => {
    if (wordList.current.length === 0) {
        const practiceChars = POSITION_PRACTICE_SETS['모든 글자'].split('');
        wordList.current = shuffleArray(practiceChars);
    }
    const text = wordList.current.pop() || '';
    setFallingItems(prev => [
      ...prev,
      { id: nextItemId.current++, text, x: Math.random() * 90 + 5, y: -5 }
    ]);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      setFallingItems(prev => {
        const newItems = prev.map(item => ({ ...item, y: item.y + ITEM_FALL_SPEED }));
        const missedItems = newItems.filter(w => w.y > 105);

        if (missedItems.length > 0) {
          setLives(l => Math.max(0, l - missedItems.length));
        }
        
        return newItems.filter(w => w.y <= 105);
      });
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    itemSpawnerRef.current = window.setInterval(spawnItem, ITEM_SPAWN_RATE);
    spawnItem();

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (itemSpawnerRef.current) clearInterval(itemSpawnerRef.current);
    };
  }, [gameState, spawnItem]);
  
  useEffect(() => {
    if (gameState === 'result') {
      const timerId = setTimeout(() => {
        if (finalScore) {
            const scores = JSON.parse(localStorage.getItem(HALL_OF_FAME_KEY) || '[]') as ScoreEntry[];
            scores.push(finalScore);
            localStorage.setItem(HALL_OF_FAME_KEY, JSON.stringify(scores));
            setHallOfFameData(scores);
        }
        setGameState('hallOfFame');
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [gameState, finalScore]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value.trim();
    if (!typedValue) {
      return;
    }
    const typedChar = typedValue.slice(-1);

    const matchedItem = fallingItems.find(item => item.text === typedChar);
    
    setTotalTypedChars(prev => prev + 1);

    if (matchedItem) {
      setFallingItems(prev => prev.filter(item => item.id !== matchedItem.id));
      setTotalCorrectChars(prev => prev + 1);
      setScore(prev => prev + 1);
    }
    
    setInputValue('');
  };
  
  const handleRestart = () => {
    setGameState('userInfo');
    setUserInfo(null);
    setFinalScore(null);
  };

  if (gameState === 'userInfo') {
    return <GameLobby onStart={handleStartGame} hallOfFameKey={HALL_OF_FAME_KEY} title="자리 연습" />;
  }

  if (gameState === 'hallOfFame') {
    return <HallOfFameDisplay scores={hallOfFameData} currentScore={finalScore} onRestart={handleRestart} title="자리 연습"/>;
  }
  
  const liveAccuracy = totalTypedChars > 0 ? Math.round((totalCorrectChars / totalTypedChars) * 100) : 100;

  return (
    <div className="relative flex flex-col h-full bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
      {gameState === 'result' && finalScore && <ResultDisplay score={finalScore} />}
      
      <div className="relative flex justify-between items-center p-3 bg-gray-900 text-white z-10 text-lg">
        <div><span className="font-bold">점수: </span> {score}</div>
        <div className="text-xl"><span className="font-bold text-red-400">목숨: </span> {'❤️'.repeat(lives)} {'🤍'.repeat(5-lives)}</div>
        <div><span className="font-bold">정확도: </span> {liveAccuracy}%</div>
        <div className="bg-red-500 text-white font-bold w-16 h-16 flex items-center justify-center rounded-full text-2xl absolute top-4 right-4 shadow-lg">{timeLeft}</div>
      </div>

      <div className="relative flex-1 bg-sky-800 overflow-hidden" style={{ minHeight: '400px', backgroundImage: 'linear-gradient(to bottom, #075985, #38bdf8)' }}>
         {fallingItems.map(item => (
            <div 
              key={item.id} 
              className="absolute bg-white text-gray-800 font-bold px-4 py-2 rounded-lg shadow-md text-xl font-mono"
              style={{
                top: `${item.y}%`,
                left: `${item.x}%`,
                transform: 'translateX(-50%)'
              }}
            >
              {item.text}
            </div>
         ))}
      </div>

      <div className="p-4 bg-gray-700">
        <input 
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full p-4 text-3xl text-center border-2 border-gray-500 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="여기에 입력"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          disabled={gameState !== 'playing'}
        />
      </div>
    </div>
  );
};

export default PositionPractice;