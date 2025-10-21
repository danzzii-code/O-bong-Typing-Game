import React, { useState, useEffect, useCallback } from 'react';
import { POSITION_PRACTICE_SETS, FINGER_MAP, HANGUL_TO_ENGLISH_KEY_MAP } from '../constants';
import type { UserInfo, ScoreEntry } from '../types';
import { GameLobby, TimerDisplay, ResultDisplay, HallOfFameDisplay } from './GameUI';

type GameState = 'userInfo' | 'playing' | 'result' | 'hallOfFame';
const HALL_OF_FAME_KEY = 'hallOfFame-position';

const PositionPractice: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('userInfo');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [finalScore, setFinalScore] = useState<ScoreEntry | null>(null);
  const [hallOfFameData, setHallOfFameData] = useState<ScoreEntry[]>([]);

  const [currentSet, setCurrentSet] = useState<string>('모든 글자');
  const [practiceText, setPracticeText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [totalPresses, setTotalPresses] = useState(0);
  const [correctPresses, setCorrectPresses] = useState(0);
  
  const currentChar = practiceText[currentIndex] || '';
  const fingerInfo = FINGER_MAP[currentChar] || null;
  const accuracy = totalPresses > 0 ? Math.round((correctPresses / totalPresses) * 100) : 100;

  const resetPractice = useCallback(() => {
    const text = POSITION_PRACTICE_SETS[currentSet as keyof typeof POSITION_PRACTICE_SETS];
    if (!text) return;

    const shuffledText = Array(20).fill(text).join('').split('').filter(c => c !== ' ').sort(() => 0.5 - Math.random()).join('');
    setPracticeText(shuffledText);
    setCurrentIndex(0);
    setTotalPresses(0);
    setCorrectPresses(0);
  }, [currentSet]);

  useEffect(() => {
    resetPractice();
  }, [currentSet, resetPractice]);
  
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else if (gameState === 'playing' && timeLeft === 0) {
      handleGameEnd();
    }
  }, [gameState, timeLeft]);

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

  const handleStartGame = (info: UserInfo) => {
    setUserInfo(info);
    resetPractice();
    setTimeLeft(60);
    setGameState('playing');
  };

  const handleGameEnd = () => {
    const wpm = correctPresses;
    const score: ScoreEntry = { userInfo: userInfo!, wpm, accuracy, timestamp: Date.now() };
    setFinalScore(score);
    setGameState('result');
  };

  const handleRestart = () => {
    setGameState('userInfo');
    setUserInfo(null);
    setFinalScore(null);
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing' || !currentChar) return;
      e.preventDefault();
      
      setTotalPresses(prev => prev + 1);
      const targetEngKey = HANGUL_TO_ENGLISH_KEY_MAP[currentChar];
      
      if (targetEngKey && e.key.toLowerCase() === targetEngKey.toLowerCase()) {
        setCorrectPresses(prev => prev + 1);
        setCurrentIndex(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentChar]);
  
  if (gameState === 'userInfo') {
    return <GameLobby onStart={handleStartGame} hallOfFameKey={HALL_OF_FAME_KEY} title="자리 연습" />;
  }
  
  if (gameState === 'hallOfFame') {
    return <HallOfFameDisplay scores={hallOfFameData} currentScore={finalScore} onRestart={handleRestart} title="자리 연습" />;
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-full">
      {gameState === 'result' && finalScore && <ResultDisplay score={finalScore} />}
      <TimerDisplay timeLeft={timeLeft} />
      <h2 className="text-4xl font-bold text-green-600 mb-4">자리 연습</h2>
      
      <div className="w-full p-8 bg-amber-100 rounded-2xl text-center mb-6 shadow-inner min-h-[150px] flex items-center justify-center">
        <p className="text-8xl font-mono font-bold tracking-widest text-gray-700">{currentChar}</p>
      </div>

      {fingerInfo && (
        <div className={`p-4 rounded-lg mb-6 text-white text-2xl font-bold ${fingerInfo.color}`}>
          {fingerInfo.finger}
        </div>
      )}

      <div className="flex justify-around p-2 bg-gray-100 rounded-lg w-full max-w-sm">
          <div className="text-center px-4">
            <div className="text-md text-gray-600">진행도</div>
            <div className="text-2xl font-bold text-gray-700">{correctPresses}</div>
          </div>
          <div className="text-center px-4">
            <div className="text-md text-gray-600">정확도</div>
            <div className="text-2xl font-bold text-gray-700">{accuracy}%</div>
          </div>
        </div>
    </div>
  );
};

export default PositionPractice;