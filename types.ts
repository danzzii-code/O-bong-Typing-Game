import React from 'react';

export interface PracticeMode {
  id: 'position' | 'word' | 'sentence';
  label: string;
  // Fix: Changed JSX.Element to React.ReactElement to resolve namespace issue.
  icon: React.ReactElement;
  description: string;
}

export interface UserInfo {
  grade: string;
  classNum: string;
  name: string;
}

export interface ScoreEntry {
  userInfo: UserInfo;
  wpm: number;
  accuracy: number;
  timestamp: number;
}
