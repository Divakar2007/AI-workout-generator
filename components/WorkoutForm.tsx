
import React from 'react';
import type { FormData } from '../types';
import { WORKOUT_TYPES, MUSCLE_GROUPS, FITNESS_LEVELS } from '../constants';

interface WorkoutFormProps {
  formData: FormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onEquipmentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  equipmentOptions: string[];
}

const FormLabel: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block mb-2 text-sm font-medium text-gray-300">{children}</label>
);

const SelectInput: React.FC<{ name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[] }> = ({ name, value, onChange, options }) => (
    <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 transition-colors"
    >
        {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
);

const Checkbox: React.FC<{ value: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; isBodyweightOnly: boolean; }> = ({ value, checked, onChange, isBodyweightOnly }) => (
    <label className="flex items-center space-x-3 cursor-pointer">
        <input 
            type="checkbox" 
            value={value} 
            checked={checked} 
            onChange={onChange}
            className="peer sr-only"
        />
        <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all ${checked ? 'bg-teal-500 border-teal-500' : 'bg-gray-700 border-gray-600 peer-hover:border-teal-600'}`}>
            {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
        </div>
        <span className={`text-sm font-medium transition-colors ${checked ? 'text-teal-300' : 'text-gray-300'}`}>{value}</span>
    </label>
);

const WorkoutForm: React.FC<WorkoutFormProps> = ({ formData, onFormChange, onEquipmentChange, onSubmit, equipmentOptions }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <FormLabel htmlFor="workoutType">Workout Type</FormLabel>
                    <SelectInput name="workoutType" value={formData.workoutType} onChange={onFormChange} options={WORKOUT_TYPES} />
                </div>
                <div>
                    <FormLabel htmlFor="muscleGroup">Muscle Group</FormLabel>
                    <SelectInput name="muscleGroup" value={formData.muscleGroup} onChange={onFormChange} options={MUSCLE_GROUPS} />
                </div>
                <div>
                    <FormLabel htmlFor="fitnessLevel">Fitness Level</FormLabel>
                    <SelectInput name="fitnessLevel" value={formData.fitnessLevel} onChange={onFormChange} options={FITNESS_LEVELS} />
                </div>
            </div>

            <div>
                <FormLabel htmlFor="duration">Duration: <span className="text-teal-400 font-bold">{formData.duration} minutes</span></FormLabel>
                <input
                    id="duration"
                    name="duration"
                    type="range"
                    min="15"
                    max="90"
                    step="5"
                    value={formData.duration}
                    onChange={onFormChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:shadow-lg [&::-webkit-slider-thumb]:hover:shadow-teal-500/50"
                />
            </div>

            <div>
                <FormLabel htmlFor="equipment">Equipment Available</FormLabel>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                    {equipmentOptions.map(option => (
                        <Checkbox
                            key={option}
                            value={option}
                            checked={formData.equipment.includes(option)}
                            onChange={onEquipmentChange}
                            isBodyweightOnly={option === 'Bodyweight Only'}
                        />
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-800 font-bold rounded-lg text-lg px-5 py-3 text-center transition-all duration-300 transform hover:scale-105"
            >
                Generate Workout
            </button>
        </form>
    );
};

export default WorkoutForm;
