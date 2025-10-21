import React, { useState } from 'react';
import type { UserInfo, ScoreEntry } from '../types';
import { TrophyIcon, RefreshIcon } from './Icons';

interface UserInfoFormProps {
  onStart: (userInfo: UserInfo) => void;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ onStart }) => {
  const [grade, setGrade] = useState('');
  const [classNum, setClassNum] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (grade && classNum && name) {
      onStart({ grade, classNum, name });
    } else {
      alert('학년, 반, 이름을 모두 입력해주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full pt-4">
      <h2 className="text-3xl font-bold text-green-600 mb-4">도전! 오봉초 타자왕</h2>
      <p className="text-md text-gray-600 mb-6">1분 동안 당신의 타자 실력을 보여주세요!</p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="학년"
          className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          value={classNum}
          onChange={(e) => setClassNum(e.target.value)}
          placeholder="반"
          className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="w-full p-4 bg-green-500 text-white font-bold text-xl rounded-full hover:bg-green-600 transition-transform transform hover:scale-105"
        >
          도전 시작
        </button>
      </form>
    </div>
  );
};

interface GameLobbyProps {
  onStart: (userInfo: UserInfo) => void;
  hallOfFameKey: string;
  title: string;
}

export const GameLobby: React.FC<GameLobbyProps> = ({ onStart, hallOfFameKey, title }) => {
  const [view, setView] = useState<'form' | 'records'>('form');

  const hallOfFameData = JSON.parse(localStorage.getItem(hallOfFameKey) || '[]') as ScoreEntry[];

  return (
    <div className="flex flex-col items-center justify-start h-full">
        <div className="flex border-b-2 border-gray-200 w-full max-w-sm justify-center">
            <button 
                onClick={() => setView('form')}
                className={`px-8 py-3 text-xl font-bold transition-colors ${view === 'form' ? 'text-green-600 border-b-4 border-green-500' : 'text-gray-500 hover:text-green-500'}`}
            >
                도전하기
            </button>
            <button 
                onClick={() => setView('records')}
                className={`px-8 py-3 text-xl font-bold transition-colors ${view === 'records' ? 'text-green-600 border-b-4 border-green-500' : 'text-gray-500 hover:text-green-500'}`}
            >
                기록보기
            </button>
        </div>

        <div className="w-full flex-grow pt-8">
            {view === 'form' ? (
                <UserInfoForm onStart={onStart} />
            ) : (
                <div className="h-full">
                    {hallOfFameData.length > 0 ? (
                         <HallOfFameDisplay scores={hallOfFameData} currentScore={null} onRestart={() => {}} title={title} isLobbyView={true} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 pt-16">
                            <TrophyIcon className="w-16 h-16 mb-4"/>
                            <p className="text-xl">아직 기록이 없습니다.</p>
                            <p>첫 번째 도전자가 되어보세요!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
  );
}

interface TimerDisplayProps {
  timeLeft: number;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft }) => (
  <div className="absolute top-4 right-4 bg-red-500 text-white text-2xl font-bold w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
    {timeLeft}
  </div>
);

interface ResultDisplayProps {
  score: { wpm: number; accuracy: number };
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ score }) => (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
    <div className="bg-white rounded-2xl p-12 text-center shadow-2xl animate-pulse">
      <h3 className="text-3xl font-bold text-gray-700 mb-4">도전 완료!</h3>
      <p className="text-5xl font-bold text-green-600">{score.wpm}타/분</p>
    </div>
  </div>
);

interface HallOfFameDisplayProps {
  scores: ScoreEntry[];
  currentScore: ScoreEntry | null;
  onRestart: () => void;
  title: string;
  isLobbyView?: boolean;
}

export const HallOfFameDisplay: React.FC<HallOfFameDisplayProps> = ({ scores, currentScore, onRestart, title, isLobbyView = false }) => {
  const sortedScores = [...scores].sort((a, b) => {
    // 1. 점수(타수)가 높을수록 순위가 높다.
    if (b.wpm !== a.wpm) {
      return b.wpm - a.wpm;
    }
    // 2. 점수가 같으면 정확도가 높을수록 순위가 높다.
    if (b.accuracy !== a.accuracy) {
      return b.accuracy - a.accuracy;
    }
    // 3. 점수와 정확도가 모두 같으면 먼저 기록한 사람이 순위가 높다.
    return a.timestamp - b.timestamp;
  });

  return (
    <div className={`flex flex-col items-center h-full p-4 ${isLobbyView ? 'justify-start' : 'justify-center'}`}>
      <div className="flex items-center gap-3 mb-4">
        <TrophyIcon className="w-10 h-10 text-yellow-400" />
        <h2 className="text-4xl font-bold text-green-600">{title} 명예의 전당</h2>
      </div>
      <div className="w-full max-w-2xl bg-amber-50 rounded-2xl shadow-inner p-6 overflow-y-auto" style={{ height: isLobbyView ? 'calc(100vh - 300px)' : '24rem' }}>
        <ul className="space-y-2">
          {sortedScores.map((score, index) => {
            const isCurrentUser = currentScore && score.timestamp === currentScore.timestamp;
            return (
              <li
                key={score.timestamp}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isCurrentUser ? 'bg-green-200 ring-2 ring-green-500' : 'bg-white'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-xl font-bold w-10 text-center">{index + 1}</span>
                  <div className="ml-4">
                    <p className="font-bold text-lg text-gray-800">{score.userInfo.name}</p>
                    <p className="text-sm text-gray-500">{score.userInfo.grade}학년 {score.userInfo.classNum}반</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-green-600">{score.wpm}점</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {!isLobbyView && (
        <button
            onClick={onRestart}
            className="mt-6 px-8 py-3 bg-green-500 text-white font-bold text-xl rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 flex items-center gap-2"
        >
            <RefreshIcon />
            다시 도전하기
        </button>
      )}
    </div>
  );
};