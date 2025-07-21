
import React, { useState, useCallback } from 'react';
import type { WorkoutPlan, FormData } from './types';
import { generateWorkout } from './services/geminiService';
import Header from './components/Header';
import WorkoutForm from './components/WorkoutForm';
import WorkoutDisplay from './components/WorkoutDisplay';
import Spinner from './components/Spinner';
import { EQUIPMENT_OPTIONS } from './constants';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    workoutType: 'Strength',
    muscleGroup: 'Full Body',
    fitnessLevel: 'Beginner',
    duration: 30,
    equipment: ['Bodyweight Only'],
  });
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value, 10) : value,
    }));
  }, []);

  const handleEquipmentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentEquipment = prev.equipment;
      let newEquipment: string[];

      if (value === 'Bodyweight Only') {
        newEquipment = ['Bodyweight Only'];
      } else {
        const otherEquipment = currentEquipment.filter(item => item !== 'Bodyweight Only');
        if (checked) {
          newEquipment = [...otherEquipment, value];
        } else {
          newEquipment = otherEquipment.filter(item => item !== value);
          if (newEquipment.length === 0) {
            newEquipment = ['Bodyweight Only'];
          }
        }
      }
      return { ...prev, equipment: newEquipment };
    });
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setWorkoutPlan(null);

    try {
      const plan = await generateWorkout(formData);
      setWorkoutPlan(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const handleStartOver = useCallback(() => {
    setWorkoutPlan(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="mt-8 bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl shadow-black/30 border border-gray-700">
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg mb-6 text-center">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <Spinner />
              <p className="mt-4 text-lg text-teal-400">Generating your workout...</p>
            </div>
          ) : workoutPlan ? (
            <WorkoutDisplay plan={workoutPlan} onStartOver={handleStartOver} />
          ) : (
            <WorkoutForm
              formData={formData}
              onFormChange={handleFormChange}
              onEquipmentChange={handleEquipmentChange}
              onSubmit={handleSubmit}
              equipmentOptions={EQUIPMENT_OPTIONS}
            />
          )}
        </main>
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by Gemini. Workouts are AI-generated and should be performed with caution.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
