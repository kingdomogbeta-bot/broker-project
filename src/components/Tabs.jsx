import React from 'react';

export default function Tabs({ tabs, defaultTab = 0, onChange }) {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  return (
    <div>
      <div className="flex gap-4 border-b border-slate-700 overflow-x-auto">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => handleTabChange(idx)}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap border-b-2 ${
              activeTab === idx
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-400 hover:text-slate-300 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}
