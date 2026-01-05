import React, { useState } from 'react';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const plans = [
    {
      id: 1,
      name: 'Starter',
      price: '$0',
      period: 'Forever Free',
      description: 'Perfect for beginners',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Up to $5,000 demo balance',
        'Basic trading tools',
        '5 watchlists',
        'Market data updates',
        'Email support',
      ],
      popular: false,
    },
    {
      id: 2,
      name: 'Pro',
      price: '$29',
      period: 'Per Month',
      description: 'For serious traders',
      icon: <Crown className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Up to $50,000 demo balance',
        'Advanced trading tools',
        'Unlimited watchlists',
        'Real-time alerts',
        'Technical analysis',
        'Priority email support',
        'Live chat support',
      ],
      popular: true,
    },
    {
      id: 3,
      name: 'Elite',
      price: '$99',
      period: 'Per Month',
      description: 'For professional traders',
      icon: <Rocket className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      features: [
        'Up to $500,000 demo balance',
        'Premium trading tools',
        'Unlimited everything',
        'Real-time signals',
        'AI-powered predictions',
        'One-on-one coaching',
        '24/7 dedicated support',
        'Custom strategies',
        'Advanced analytics',
      ],
      popular: false,
    },
  ];

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    setShowUpgradeModal(true);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your Trading Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start free and upgrade anytime. All plans include access to our powerful trading platform.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular ? 'ring-2 ring-purple-500 md:scale-105' : ''
              }`}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-10`}
              ></div>

              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-bl-lg font-semibold text-sm">
                  Most Popular
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col">
                {/* Plan Icon */}
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center text-white mb-6`}>
                  {plan.icon}
                </div>

                {/* Plan Name & Price */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 text-sm">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 flex-grow mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-200 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleUpgrade(plan)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg hover:shadow-purple-500/50`
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {plan.price === '$0' ? 'Start Free' : 'Upgrade Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div
          data-aos="fade-up"
          className="mt-20 pt-20 border-t border-gray-700"
        >
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: 'Can I upgrade or downgrade anytime?',
                a: 'Yes! Change your plan anytime. If you upgrade, you\'ll only pay the difference. If you downgrade, the unused portion will be credited.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.',
              },
              {
                q: 'Is there a money-back guarantee?',
                a: 'Yes! 30-day money-back guarantee on paid plans. No questions asked.',
              },
              {
                q: 'Do you offer discounts for annual billing?',
                a: 'Yes! Save 20% when you pay annually instead of monthly.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 50}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <h4 className="text-lg font-semibold text-white mb-3">
                  {faq.q}
                </h4>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700 animate-bounce-in">
            <h3 className="text-2xl font-bold text-white mb-4">
              Upgrade to {selectedPlan.name}
            </h3>
            <p className="text-gray-300 mb-6">
              {selectedPlan.price === '$0'
                ? 'Sign up now to start trading with demo balance.'
                : `Upgrade to ${selectedPlan.name} plan and get a ${selectedPlan.price} balance boost!`}
            </p>
            <div className="space-y-4">
              <button
                onClick={() => {
                  // Handle upgrade payment
                  alert(`Processing upgrade to ${selectedPlan.name} plan...`);
                  setShowUpgradeModal(false);
                }}
                className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${selectedPlan.color} hover:shadow-lg transition-all`}
              >
                {selectedPlan.price === '$0' ? 'Sign Up Free' : 'Proceed to Payment'}
              </button>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="w-full py-3 rounded-lg font-semibold text-gray-300 bg-gray-800 hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Plans;
