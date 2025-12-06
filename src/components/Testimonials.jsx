import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Professional Trader',
      image: '👩‍💼',
      rating: 5,
      text: 'BrokerHub has transformed my trading experience. The platform is intuitive, fast, and their support team is incredibly responsive!',
      verified: true,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Investment Analyst',
      image: '👨‍💼',
      rating: 5,
      text: 'Zero commissions combined with advanced charting tools makes this my go-to platform. Highly recommended for serious traders.',
      verified: true,
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Crypto Enthusiast',
      image: '👩‍🦰',
      rating: 5,
      text: 'The best part? Real-time market data and instant execution. Been trading with BrokerHub for 2 years now without issues.',
      verified: true,
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Forex Trader',
      image: '👨‍🔬',
      rating: 5,
      text: 'Superior liquidity and tight spreads. The mobile app is perfect for trading on the go. 10/10 experience.',
      verified: true,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What Our Traders Say
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join thousands of satisfied traders worldwide
          </p>

          {/* Overall Rating */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="text-4xl font-bold text-yellow-400">4.9</div>
            <div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-400 text-sm mt-2">Based on 12,500+ reviews</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-800 hover:bg-slate-700 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div>
                  <p className="text-white font-semibold text-sm">
                    {testimonial.image} {testimonial.name}
                  </p>
                  <p className="text-slate-400 text-xs">{testimonial.role}</p>
                </div>
                {testimonial.verified && (
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Review */}
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-cyan-500/30 rounded-lg p-8 text-center">
          <p className="text-slate-300 text-lg mb-4 italic">
            "BrokerHub isn't just a trading platform, it's a game-changer for retail traders. The combination of low fees, great tools, and exceptional support is unbeatable."
          </p>
          <p className="text-white font-semibold">
            — Featured on TradingView, Trustpilot, and Forbes
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
