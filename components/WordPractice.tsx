import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WORD_PRACTICE_SET } from '../constants';
import type { UserInfo, ScoreEntry } from '../types';
import { GameLobby, TimerDisplay, ResultDisplay, HallOfFameDisplay } from './GameUI';

type GameState = 'userInfo' | 'playing' | 'result' | 'hallOfFame';
const HALL_OF_FAME_KEY = 'hallOfFame-word';

const WordPractice: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('userInfo');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [finalScore, setFinalScore] = useState<ScoreEntry | null>(null);
  const [hallOfFameData, setHallOfFameData] = useState<ScoreEntry[]>([]);
  
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [typedText, setTypedText] = useState<string>('');
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const [totalCorrectChars, setTotalCorrectChars] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const shuffleArray = (array: string[]) => {
      const newArr = [...array];
      for (let i = newArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
  }

  const loadNewWords = useCallback(() => {
    const newWords = shuffleArray(WORD_PRACTICE_SET);
    setWords(newWords);
    setCurrentWord(newWords[0] || '연습 단어가 없습니다.');
    setTypedText('');
    setTotalTypedChars(0);
    setTotalCorrectChars(0);
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, currentWord]);

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
    loadNewWords();
    setTimeLeft(60);
    setGameState('playing');
  };

  let currentTypedCorrect = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentWord[i]) {
      currentTypedCorrect++;
    }
  }
  const liveTotalCorrect = totalCorrectChars + currentTypedCorrect;
  const liveTotalTyped = totalTypedChars + typedText.length;
  const liveAccuracy = liveTotalTyped > 0 ? Math.round((liveTotalCorrect / liveTotalTyped) * 100) : 100;

  const handleGameEnd = () => {
    const wpm = liveTotalCorrect;
    const accuracy = liveAccuracy;
    const score: ScoreEntry = { userInfo: userInfo!, wpm, accuracy, timestamp: Date.now() };
    setFinalScore(score);
    setGameState('result');
  };

  const handleRestart = () => {
    setGameState('userInfo');
    setUserInfo(null);
    setFinalScore(null);
  };

  const moveToNextWord = useCallback(() => {
    const currentIndex = words.indexOf(currentWord);
    let nextIndex = (currentIndex + 1);
    if (nextIndex >= words.length) {
        const newWords = shuffleArray(words);
        setWords(newWords);
        setCurrentWord(newWords[0]);
    } else {
        setCurrentWord(words[nextIndex]);
    }
    setTypedText('');
  }, [currentWord, words]);

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTypedText = e.target.value;
    if (newTypedText.includes(' ')) return;
    setTypedText(newTypedText);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          if (!typedText) return;

          setTotalTypedChars(prev => prev + typedText.length);
          let correctInWord = 0;
          for(let i=0; i < typedText.length; i++) {
              if (typedText[i] === currentWord[i]) {
                  correctInWord++;
              }
          }
          setTotalCorrectChars(prev => prev + correctInWord);
          moveToNextWord();
      }
  }

  const renderWord = () => {
    return currentWord.split('').map((char, index) => {
      let colorClass = 'text-gray-500';
      if (index < typedText.length) {
        colorClass = typedText[index] === char ? 'text-green-600' : 'text-red-500 bg-red-100';
      }
      if(index === typedText.length) {
        colorClass += ' bg-yellow-200 rounded';
      }
      return <span key={index} className={`transition-colors text-8xl p-0.5 ${colorClass}`}>{char}</span>;
    });
  };

  if (gameState === 'userInfo') {
    return <GameLobby onStart={handleStartGame} hallOfFameKey={HALL_OF_FAME_KEY} title="단어 연습" />;
  }

  if (gameState === 'hallOfFame') {
    return <HallOfFameDisplay scores={hallOfFameData} currentScore={finalScore} onRestart={handleRestart} title="단어 연습"/>;
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-full">
      {gameState === 'result' && finalScore && <ResultDisplay score={finalScore} />}
      <TimerDisplay timeLeft={timeLeft} />
      <div className="w-full">
        <h2 className="text-4xl font-bold text-green-600 mb-4">단어 연습</h2>
        <div className="flex justify-around p-4 bg-amber-100 rounded-lg mb-6 shadow-inner">
          <div className="text-center">
            <div className="text-lg text-gray-600">현재 타수</div>
            <div className="text-4xl font-bold text-gray-700">{liveTotalCorrect}</div>
          </div>
          <div className="text-center">
            <div className="text-lg text-gray-600">정확도</div>
            <div className="text-4xl font-bold text-gray-700">
              {liveAccuracy}%
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gray-100 rounded-lg mb-6 font-mono tracking-widest h-48 flex items-center justify-center flex-wrap">
          {renderWord()}
        </div>

        <input 
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-4 text-4xl text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="단어를 입력하고 스페이스바"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          disabled={gameState !== 'playing'}
        />
      </div>
    </div>
  );
};

export default WordPractice;