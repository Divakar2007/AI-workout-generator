
import React from 'react';

const DumbbellIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M21.73,11.27l-2-2a1,1,0,0,0-1.42,0l-1,1-2.16-2.16a2.46,2.46,0,0,0-3.49-3.49L9.5,6.78,8.47,5.75a1,1,0,0,0-1.42,0l-2,2a1,1,0,0,0,0,1.42L6.1,10.2l-2.83,2.83a1,1,0,0,0,0,1.41l2,2a1,1,0,0,0,1.42,0l1-1,2.16,2.16a2.46,2.46,0,0,0,3.49,3.49l2.16-2.16,1.03,1.03a1,1,0,0,0,1.42,0l2-2a1,1,0,0,0,0-1.42L17.9,13.8l2.83-2.83A1,1,0,0,0,21.73,11.27ZM13,15.22l-2.16-2.16,2.83-2.83L15.83,12.4ZM12,5.5a1.46,1.46,0,0,1,2.06,0l2.16,2.16-2.12,2.12-2.16-2.16A1.45,1.45,0,0,1,12,5.5Zm-2.59,9.05L7.25,16.71,5.12,14.59l2.16-2.16Zm9.05-4.5L16.3,8.08,18.47,5.91l2.12,2.12Z"></path>
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center gap-4 text-center">
      <DumbbellIcon className="w-10 h-10 sm:w-12 sm:h-12 text-teal-400" />
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
          AI Workout Generator
        </span>
      </h1>
    </header>
  );
};

export default Header;
