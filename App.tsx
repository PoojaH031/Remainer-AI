
import React, { useState, useEffect } from 'react';
import { UserInputs, AIResponse } from './types';
import { generateRoutine } from './geminiService';
import { InputSection } from './components/InputSection';
import { RoutineDisplay } from './components/RoutineDisplay';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<UserInputs>({
    wakeUpTime: '',
    workStudyHours: '',
    mealTimes: '',
    exerciseTime: '',
    relaxTime: '',
    sleepTime: '',
  });

  const [routine, setRoutine] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('zen_routine_data');
    if (saved) {
      try {
        setRoutine(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved routine");
      }
    }
  }, []);

  const handleGenerate = async () => {
    // Basic validation
    if (!inputs.wakeUpTime || !inputs.sleepTime) {
      setError("Please at least provide wake-up and sleep times.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await generateRoutine(inputs);
      setRoutine(result);
      localStorage.setItem('zen_routine_data', JSON.stringify(result));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRoutine(null);
    localStorage.removeItem('zen_routine_data');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
            <span className="text-indigo-600">Zen</span>Routine AI
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Craft your day with intention and clarity.
          </p>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center shadow-sm animate-pulse">
            {error}
          </div>
        )}

        <main className="flex flex-col items-center">
          {!routine ? (
            <InputSection 
              inputs={inputs} 
              setInputs={setInputs} 
              onSubmit={handleGenerate} 
              loading={loading}
            />
          ) : (
            <RoutineDisplay data={routine} onReset={handleReset} />
          )}
        </main>

        <footer className="mt-16 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ZenRoutine AI. Powered by Gemini.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
