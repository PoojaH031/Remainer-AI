
import React from 'react';
import { AIResponse, RoutineItem } from '../types';

interface RoutineDisplayProps {
  data: AIResponse;
  onReset: () => void;
}

const TypeIcon: React.FC<{ type: RoutineItem['type'] }> = ({ type }) => {
  switch (type) {
    case 'wake': return <span>🌅</span>;
    case 'work': return <span>💼</span>;
    case 'meal': return <span>🍴</span>;
    case 'exercise': return <span>💪</span>;
    case 'relax': return <span>🛋️</span>;
    case 'sleep': return <span>🌙</span>;
    default: return <span>✨</span>;
  }
};

const TypeColor: React.FC<{ type: RoutineItem['type'] }> = ({ type }) => {
  switch (type) {
    case 'wake': return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'work': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'meal': return 'bg-green-50 text-green-700 border-green-200';
    case 'exercise': return 'bg-red-50 text-red-700 border-red-200';
    case 'relax': return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'sleep': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    default: return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export const RoutineDisplay: React.FC<RoutineDisplayProps> = ({ data, onReset }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-100">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Today's Blueprint</h2>
        <p className="text-slate-500 mb-8 italic">"Consistency is the playground of excellence."</p>

        <div className="relative border-l-2 border-indigo-100 ml-4 space-y-8">
          {data.schedule.map((item, index) => (
            <div key={index} className="relative pl-8">
              {/* Dot */}
              <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-indigo-600 shadow-sm"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">{item.time}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full border self-start ${TypeColor({ type: item.type })}`}>
                  <TypeIcon type={item.type} /> {item.activity}
                </span>
              </div>
              
              <div className="mt-2 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors shadow-sm">
                <p className="text-slate-700 leading-relaxed">
                  {item.reminder}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl text-white text-center shadow-xl">
          <p className="text-sm opacity-80 uppercase tracking-widest font-semibold mb-2">Daily Motivation</p>
          <p className="text-xl font-medium leading-tight">
            "{data.motivation}"
          </p>
        </div>

        <button
          onClick={onReset}
          className="mt-8 w-full py-3 text-indigo-600 font-semibold hover:bg-indigo-50 rounded-xl transition-all border border-indigo-100"
        >
          Create a New Routine
        </button>
      </div>
    </div>
  );
};
