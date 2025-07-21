
import React, { useEffect, useRef } from 'react';
import type { Exercise } from '../types';

interface ExerciseModalProps {
    exercise: Exercise;
    onClose: () => void;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({ exercise, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + " exercise tutorial")}`;

    // Handle Escape key press and click outside
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);
        
        // Focus on the modal when it opens
        modalRef.current?.focus();

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exercise-modal-title"
        >
            <div 
                ref={modalRef} 
                className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col border border-gray-700"
                tabIndex={-1} // Make div focusable
            >
                <div className="p-6 sm:p-8 border-b border-gray-700">
                    <div className="flex justify-between items-start">
                        <h2 id="exercise-modal-title" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500 pr-4">
                            {exercise.name}
                        </h2>
                        <button onClick={onClose} aria-label="Close" className="text-gray-400 hover:text-white transition-colors flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-6 sm:p-8 text-gray-300 space-y-4 overflow-y-auto">
                    <h3 className="text-lg font-semibold text-gray-200">How to Perform</h3>
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-400">{exercise.detailedDescription}</p>
                </div>

                <div className="p-6 sm:p-8 mt-auto border-t border-gray-700">
                     <a
                        href={youtubeSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors"
                     >
                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zM232.615 354.464V157.536l155.137 98.464-155.137 98.464z"></path></svg>
                        Watch on YouTube
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ExerciseModal;
