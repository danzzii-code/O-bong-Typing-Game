import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SENTENCE_PRACTICE_SET } from '../constants';
import type { UserInfo, ScoreEntry } from '../types';
import { GameLobby, TimerDisplay, ResultDisplay, HallOfFameDisplay } from './GameUI';


type GameState = 'userInfo' | 'playing' | 'result' | 'hallOfFame';
const HALL_OF_FAME_KEY = 'hallOfFame-sentence';

const SentencePractice: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('userInfo');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [finalScore, setFinalScore] = useState<ScoreEntry | null>(null);
  const [hallOfFameData, setHallOfFameData] = useState<ScoreEntry[]>([]);

  const [sentences, setSentences] = useState<string[]>([]);
  const [currentSentence, setCurrentSentence] = useState<string>('');
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

  const loadNewSentences = useCallback(() => {
    const newSentences = shuffleArray(SENTENCE_PRACTICE_SET);
    setSentences(newSentences);
    setCurrentSentence(newSentences[0] || '연습 문장이 없습니다.');
    setTypedText('');
    setTotalTypedChars(0);
    setTotalCorrectChars(0);
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
        inputRef.current.focus();
    }
  }, [gameState, currentSentence]);
  
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
    loadNewSentences();
    setTimeLeft(60);
    setGameState('playing');
  };

  let currentTypedCorrect = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentSentence[i]) {
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
  
  const moveToNextSentence = useCallback(() => {
    const currentIndex = sentences.indexOf(currentSentence);
    let nextIndex = (currentIndex + 1);
    if (nextIndex >= sentences.length) {
        const newSentences = shuffleArray(sentences);
        setSentences(newSentences);
        setCurrentSentence(newSentences[0]);
    } else {
        setCurrentSentence(sentences[nextIndex]);
    }
    setTypedText('');
  }, [currentSentence, sentences]);

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTypedText = e.target.value;
    setTypedText(newTypedText);

    if (newTypedText.length >= currentSentence.length) {
      let correctCharsInSentence = 0;
      for(let i=0; i < currentSentence.length; i++) {
          if (newTypedText[i] === currentSentence[i]) {
              correctCharsInSentence++;
          }
      }
      setTotalCorrectChars(prev => prev + correctCharsInSentence);
      setTotalTypedChars(prev => prev + currentSentence.length);
      
      setTimeout(() => {
        moveToNextSentence();
      }, 150);
    }
  };

  const renderSentence = () => {
    return currentSentence.split('').map((char, index) => {
      let colorClass = 'text-gray-400';
      if (index < typedText.length) {
        colorClass = typedText[index] === char ? 'text-green-500' : 'text-red-500 bg-red-100';
      }
      if(index === typedText.length) {
        colorClass += ' bg-yellow-200 rounded';
      }
      if (char === ' ') {
        return <span key={index} className={`transition-colors text-xl p-0.5 ${colorClass}`}>ˇ</span>;
      }
      return <span key={index} className={`transition-colors text-3xl p-0.5 ${colorClass}`}>{char}</span>;
    });
  };

  if (gameState === 'userInfo') {
    return <GameLobby onStart={handleStartGame} hallOfFameKey={HALL_OF_FAME_KEY} title="문장 연습" />;
  }

  if (gameState === 'hallOfFame') {
    return <HallOfFameDisplay scores={hallOfFameData} currentScore={finalScore} onRestart={handleRestart} title="문장 연습"/>;
  }
  
  return (
    <div className="relative flex flex-col items-center justify-between h-full">
      {gameState === 'result' && finalScore && <ResultDisplay score={finalScore} />}
      <TimerDisplay timeLeft={timeLeft} />
      <div className="w-full">
        <h2 className="text-4xl font-bold text-green-600 mb-4">문장 연습</h2>
        
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
        
        <div className="p-6 bg-gray-100 rounded-lg mb-6 font-mono tracking-widest h-24 flex items-center flex-wrap">
          {renderSentence()}
        </div>

        <input 
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleInputChange}
          className="w-full p-4 text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="여기에 문장을 입력하세요..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          disabled={gameState !== 'playing'}
        />
      </div>
    </div>
  );
};

export default SentencePractice;