import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center">
        <LogoIcon />
        <h1 className="text-3xl font-bold text-green-600 ml-3">
          오봉초 타자왕은 누구?
        </h1>
      </div>
    </header>
  );
};

export default Header;