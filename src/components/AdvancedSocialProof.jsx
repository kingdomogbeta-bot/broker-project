import React from 'react';
import { Star, TrendingUp, Award } from 'lucide-react';

const AdvancedSocialProof = () => {
  const testimonials = [
    { name: 'Alex Turner', role: 'Professional Trader', avatar: '👨‍💼', quote: 'Aurex Capital helped me scale my trading with reliable execution and great tools.', rating: 5, profit: '+$45K' },
    { name: 'Maria Garcia', role: 'Crypto Investor', avatar: '👩‍💼', quote: 'Best platform I\'ve used. Customer support is fantastic and fees are minimal.', rating: 5, profit: '+$67K' },
    { name: 'David Chen', role: 'Day Trader', avatar: '👨‍💻', quote: 'The AI signals are incredibly accurate. Worth every penny of the Pro plan.', rating: 5, profit: '+$89K' },
    { name: 'Emma Wilson', role: 'Beginner Trader', avatar: '👩‍🎓', quote: 'Started with zero knowledge and made $12K profit in 3 months. Amazing!', rating: 5, profit: '+$12K' },
  ];

  const stats = [
    { value: '500K+', label: 'Active Traders', icon: '👥' },
    { value: '$2.3B', label: 'Daily Trading Volume', icon: '📊' },
    { value: '98.5%', label: 'Customer Satisfaction', icon: '⭐' },
    { value: '24/7', label: 'Support Available', icon: '🛟' },
  ];

  const successStories = [
    { name: 'John Doe', achievement: 'Turned $5K into $150K in 12 months', icon: '🏆', badge: 'Top Trader' },
    { name: 'Sarah Miller', achievement: 'Consistently profitable for 2+ years', icon: '📈', badge: 'Expert' },
    { name: 'Mike Johnson', achievement: 'Trading full-time with $500K portfolio', icon: '💼', badge: 'Professional' },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Live Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8 text-center hover:border-blue-400 transition-all"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Thousands of Traders
            </h2>
            <p className="text-xl text-gray-300">Real results from real traders using Aurex Capital</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-400/50 transition-all group"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-200 text-lg mb-6 italic">"{testimonial.quote}"</p>

                {/* Profit Badge */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <h4 className="text-white font-bold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>

                {/* Profit Display */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                  <p className="text-gray-400 text-sm mb-1">Profit Made</p>
                  <p className="text-green-400 font-bold text-2xl">{testimonial.profit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div data-aos="fade-up">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            Success Stories
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, idx) => (
              <div
                key={idx}
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
                className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-8 text-center hover:border-yellow-400 transition-all"
              >
                <div className="text-6xl mb-4">{story.icon}</div>
                <div className="inline-block mb-4 px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-semibold">
                  {story.badge}
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{story.name}</h4>
                <p className="text-gray-300">{story.achievement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            { icon: '🔒', title: 'Verified Traders', desc: 'All testimonials from verified accounts' },
            { icon: '📊', title: 'Transparent Results', desc: 'Real profit data, no exaggerations' },
            { icon: '✅', title: 'Regulated & Safe', desc: 'Full compliance with financial laws' },
          ].map((indicator, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="text-center"
            >
              <div className="text-5xl mb-4">{indicator.icon}</div>
              <h4 className="text-white font-bold mb-2">{indicator.title}</h4>
              <p className="text-gray-400 text-sm">{indicator.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedSocialProof;
