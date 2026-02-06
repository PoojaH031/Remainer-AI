
import React from 'react';
import { UserInputs } from '../types';

interface InputSectionProps {
  inputs: UserInputs;
  setInputs: (inputs: UserInputs) => void;
  onSubmit: () => void;
  loading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ inputs, setInputs, onSubmit, loading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const fields = [
    { name: 'wakeUpTime', label: 'Wake-up Time', placeholder: 'e.g., 6:30 AM' },
    { name: 'workStudyHours', label: 'Work/Study Hours', placeholder: 'e.g., 9:00 AM - 5:00 PM' },
    { name: 'mealTimes', label: 'Meal Times', placeholder: 'e.g., Breakfast 7:30, Lunch 1:00, Dinner 7:00' },
    { name: 'exerciseTime', label: 'Exercise Time', placeholder: 'e.g., 6:00 PM' },
    { name: 'relaxTime', label: 'Break/Relax Time', placeholder: 'e.g., 8:00 PM' },
    { name: 'sleepTime', label: 'Sleep Time', placeholder: 'e.g., 10:30 PM' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Design Your Ideal Day</h2>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              value={(inputs as any)[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>
        ))}
      </div>
      <button
        onClick={onSubmit}
        disabled={loading}
        className={`mt-8 w-full py-3 px-6 rounded-xl font-bold text-white shadow-lg transition-all
          ${loading 
            ? 'bg-slate-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : 'Generate My Routine'}
      </button>
    </div>
  );
};
