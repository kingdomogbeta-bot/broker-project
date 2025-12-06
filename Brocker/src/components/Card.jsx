import React from 'react';

export default function Card({ title, icon, description, features, cta, onClick, highlighted = false }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg p-6 border transition-all cursor-pointer group ${
        highlighted
          ? 'bg-gradient-to-br from-blue-600 to-cyan-500 border-blue-400 shadow-lg shadow-blue-500/20'
          : 'bg-slate-800 border-slate-700 hover:border-slate-600'
      }`}
    >
      {icon && (
        <div className={`text-3xl mb-4 transition-transform group-hover:scale-110 ${highlighted ? 'text-white' : 'text-cyan-400'}`}>
          {icon}
        </div>
      )}

      {title && (
        <h3 className={`text-lg font-bold mb-2 ${highlighted ? 'text-white' : 'text-white'}`}>
          {title}
        </h3>
      )}

      {description && (
        <p className={`mb-4 text-sm ${highlighted ? 'text-blue-50' : 'text-slate-400'}`}>
          {description}
        </p>
      )}

      {features && (
        <ul className="space-y-2 mb-4">
          {features.map((feature, idx) => (
            <li key={idx} className={`flex items-center gap-2 text-sm ${highlighted ? 'text-blue-50' : 'text-slate-300'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${highlighted ? 'bg-white' : 'bg-cyan-400'}`} />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {cta && (
        <button
          className={`w-full py-2 rounded font-medium transition-all ${
            highlighted
              ? 'bg-white text-blue-600 hover:bg-blue-50'
              : 'bg-slate-700 text-white hover:bg-slate-600'
          }`}
        >
          {cta}
        </button>
      )}
    </div>
  );
}
