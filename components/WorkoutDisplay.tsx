
import React, { useState } from 'react';
import type { WorkoutPlan, Exercise } from '../types';
import ExerciseModal from './ExerciseModal';

declare const jsPDF: any;
declare const html2canvas: any;

interface WorkoutDisplayProps {
  plan: WorkoutPlan;
  onStartOver: () => void;
}

const WorkoutDisplay: React.FC<WorkoutDisplayProps> = ({ plan, onStartOver }) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleExport = () => {
    const input = document.getElementById('workout-plan-export');
    if (input) {
      // Use a higher scale for better PDF quality
      html2canvas(input, { backgroundColor: '#1f2937', scale: 2 }).then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF.default('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${plan.workoutName.replace(/\s+/g, '-')}-plan.pdf`);
      });
    }
  };

  return (
    <>
      <div className="animate-fade-in">
          <div id="workout-plan-export" className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500 mb-2">{plan.workoutName}</h2>
              <p className="text-center text-gray-400 mb-6">{plan.description}</p>

              <div className="space-y-4">
                  {plan.exercises.map((exercise, index) => (
                      <button 
                          key={index} 
                          onClick={() => setSelectedExercise(exercise)}
                          className="w-full text-left bg-gray-900/70 p-4 rounded-lg border border-gray-700 transition-all hover:border-teal-500 hover:shadow-lg hover:shadow-teal-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500"
                          aria-label={`View details for ${exercise.name}`}
                      >
                          <h3 className="text-lg font-semibold text-teal-400">{exercise.name}</h3>
                          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm text-gray-300">
                              <p><span className="font-medium text-gray-500">Sets:</span> {exercise.sets}</p>
                              <p><span className="font-medium text-gray-500">Reps:</span> {exercise.reps}</p>
                              <p><span className="font-medium text-gray-500">Rest:</span> {exercise.rest}</p>
                          </div>
                      </button>
                  ))}
              </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                  onClick={onStartOver}
                  className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center transition-colors"
              >
                  Start Over
              </button>
              <button
                  onClick={handleExport}
                  className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-800 font-medium rounded-lg text-base px-5 py-2.5 text-center transition-colors flex items-center justify-center gap-2"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Export as PDF
              </button>
          </div>
      </div>
      {selectedExercise && (
        <ExerciseModal 
          exercise={selectedExercise} 
          onClose={() => setSelectedExercise(null)} 
        />
      )}
    </>
  );
};

export default WorkoutDisplay;