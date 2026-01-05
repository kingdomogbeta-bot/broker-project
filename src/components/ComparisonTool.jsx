import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const ComparisonTool = () => {
  const [selectedPlans, setSelectedPlans] = useState(['starter', 'pro']);

  const plans = ['starter', 'pro', 'elite'];
  const planNames = { starter: 'Starter', pro: 'Pro', elite: 'Elite' };
  const planPrices = { starter: '$0', pro: '$29', elite: '$99' };

  const features = [
    { category: 'Trading Features', items: [
      { name: 'Demo Balance', starter: '$5,000', pro: '$50,000', elite: '$500,000' },
      { name: 'Real-Time Charts', starter: '✓', pro: '✓', elite: '✓' },
      { name: 'Technical Indicators', starter: '5', pro: '50+', elite: '250+' },
      { name: 'Advanced Alerts', starter: '✗', pro: '✓', elite: '✓' },
      { name: 'AI Predictions', starter: '✗', pro: '✗', elite: '✓' },
      { name: 'Custom Strategies', starter: '✗', pro: '✓', elite: '✓' },
    ]},
    { category: 'Support & Education', items: [
      { name: 'Email Support', starter: '✓', pro: '✓', elite: '✓' },
      { name: 'Priority Support', starter: '✗', pro: '✓', elite: '✓' },
      { name: 'Live Chat 24/7', starter: '✗', pro: '✗', elite: '✓' },
      { name: 'Trading Academy', starter: '✓', pro: '✓', elite: '✓' },
      { name: 'Webinars', starter: '✓', pro: '✓', elite: '✓' },
      { name: '1-on-1 Coaching', starter: '✗', pro: '✗', elite: '✓' },
    ]},
    { category: 'Advanced Tools', items: [
      { name: 'Multi-Chart Analysis', starter: '✗', pro: '✓', elite: '✓' },
      { name: 'Risk Management Tools', starter: '✗', pro: '✓', elite: '✓' },
      { name: 'Portfolio Tracking', starter: '✓', pro: '✓', elite: '✓' },
      { name: 'API Access', starter: '✗', pro: '✗', elite: '✓' },
      { name: 'Signals & Alerts', starter: '✗', pro: '✓', elite: '✓' },
      { name: 'Custom Indicators', starter: '✗', pro: '✗', elite: '✓' },
    ]},
  ];

  const togglePlan = (plan) => {
    if (selectedPlans.includes(plan)) {
      if (selectedPlans.length > 1) {
        setSelectedPlans(selectedPlans.filter(p => p !== plan));
      }
    } else {
      if (selectedPlans.length < 3) {
        setSelectedPlans([...selectedPlans, plan]);
      }
    }
  };

  const renderFeature = (value, plan) => {
    if (!selectedPlans.includes(plan)) return null;
    
    if (value === '✓') {
      return <Check className="w-5 h-5 text-green-400" />;
    } else if (value === '✗') {
      return <X className="w-5 h-5 text-red-400" />;
    } else {
      return <span className="text-white font-semibold">{value}</span>;
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Compare All Plans
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose which plans to compare. Click any plan button to toggle its visibility.
          </p>
        </div>

        {/* Plan Selection */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {plans.map(plan => (
            <button
              key={plan}
              onClick={() => togglePlan(plan)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedPlans.includes(plan)
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {planNames[plan]}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8" data-aos="fade-up">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Feature</th>
                {selectedPlans.map(plan => (
                  <th key={plan} className="text-center py-4 px-6">
                    <div className="text-white font-bold text-lg mb-2">
                      {planNames[plan]}
                    </div>
                    <div className={`text-2xl font-bold ${
                      plan === 'elite' ? 'text-yellow-400' : 'text-cyan-400'
                    }`}>
                      {planPrices[plan]}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {plan === 'starter' ? 'Forever' : 'Per month'}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((section, sIdx) => (
                <React.Fragment key={sIdx}>
                  <tr>
                    <td colSpan={selectedPlans.length + 1} className="py-4 px-6 bg-gray-800/50">
                      <h4 className="text-lg font-bold text-cyan-400">{section.category}</h4>
                    </td>
                  </tr>
                  {section.items.map((item, iIdx) => (
                    <tr key={iIdx} className="border-t border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 text-gray-200">{item.name}</td>
                      {selectedPlans.map(plan => (
                        <td key={plan} className="text-center py-4 px-6">
                          {renderFeature(item[plan], plan)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="text-center mt-12" data-aos="fade-up">
          <p className="text-gray-300 mb-6">Ready to choose your plan?</p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTool;
