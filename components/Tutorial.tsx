
import React, { useState, useCallback, useEffect } from 'react';
import { TUTORIAL_STEPS } from '../constants';
import Keyboard from './Keyboard';

const Tutorial: React.FC = () => {
  const [step, setStep] = useState(0);
  const [copyText] = useState('이 글을 복사해요!');
  const [pasteText, setPasteText] = useState('');
  const [emailInput, setEmailInput] = useState('');

  const currentStepData = TUTORIAL_STEPS[step];

  const handleNext = useCallback(() => {
    if (step < TUTORIAL_STEPS.length - 1) {
      setStep(step + 1);
    }
  }, [step]);

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // Step 3: Spacebar practice
        if (step === 3 && e.code === 'Space') {
            e.preventDefault();
            handleNext();
        }
        // Step 4: Enter practice
        if (step === 4 && e.key === 'Enter') {
            e.preventDefault();
            handleNext();
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}, [step, handleNext]);


  const renderInteractiveContent = () => {
    // Step 1: Mouse click practice
    if (step === 1) { 
      return <button onClick={handleNext} className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-transform transform hover:scale-105">이 버튼을 클릭! (다음)</button>
    }
    // Step 7: Email practice
    if (step === 7) { 
      const targetEmail = 'id@gne.go.kr';
      return (
        <div className="mt-4 flex flex-col items-center justify-center gap-4">
            <p className="font-bold text-xl mb-2">아래 이메일 주소를 똑같이 입력해보세요.</p>
            <p className="p-2 bg-gray-200 rounded-md font-mono text-lg">{targetEmail}</p>
            <input 
                type="text" 
                value={emailInput}
                onChange={(e) => {
                    setEmailInput(e.target.value);
                    if (e.target.value === targetEmail) {
                        setTimeout(() => handleNext(), 300);
                    }
                }}
                placeholder="여기에 입력" 
                className="p-2 border-2 border-blue-400 rounded-lg w-full max-w-sm text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
            />
        </div>
      )
    }
    // Step 8: Copy/Paste practice
    if (step === 8) { 
      return (
        <div className="mt-4 flex items-center justify-center gap-4">
          <input type="text" readOnly value={copyText} className="p-2 border-2 border-gray-300 rounded-lg w-1/2 text-center bg-gray-100" />
          <span className="text-2xl font-bold">→</span>
          <input 
            type="text" 
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            onPaste={() => setTimeout(() => handleNext(), 100)}
            placeholder="여기에 붙여넣어요" 
            className="p-2 border-2 border-blue-400 rounded-lg w-1/2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
           />
        </div>
      )
    }
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="w-full">
        <h2 className="text-4xl font-bold text-center text-green-600 mb-6">{currentStepData.title}</h2>
        <div className="text-lg text-center leading-relaxed p-6 bg-amber-100 rounded-xl min-h-[520px] flex flex-col items-center justify-start pt-10">
            {currentStepData.content}
            {step === 3 && <div className="mt-4 w-full max-w-3xl"><Keyboard activeKey="Space" /></div>}
            {step === 4 && <div className="mt-4 w-full max-w-3xl"><Keyboard activeKey="Enter" /></div>}
        </div>
        {currentStepData.interactive && <div className="mt-6 text-center">{renderInteractiveContent()}</div>}
      </div>

      <div className="flex justify-between w-full mt-8">
        <button
          onClick={handlePrev}
          disabled={step === 0}
          className="px-6 py-2 bg-gray-300 text-gray-700 font-bold rounded-full disabled:opacity-50 hover:bg-gray-400 transition-colors"
        >
          이전
        </button>
        {(!currentStepData.interactive || step >= TUTORIAL_STEPS.length - 1 || ![1, 3, 4, 7, 8].includes(step) ) && (
            <button
            onClick={handleNext}
            disabled={step === TUTORIAL_STEPS.length - 1}
            className="px-6 py-2 bg-green-500 text-white font-bold rounded-full disabled:opacity-50 hover:bg-green-600 transition-colors"
            >
            다음
            </button>
        )}
      </div>
    </div>
  );
};

export default Tutorial;