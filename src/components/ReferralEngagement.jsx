import React from 'react';
import { Gift, Users, Zap } from 'lucide-react';

const ReferralEngagement = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Referral Program */}
        <div className="mb-20" data-aos="fade-up">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Earn with Our Referral Program
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Share Aurex Capital with friends and earn generous commissions on every successful referral. No limits on earning potential!
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: '💰', title: '20% Commission', desc: 'Earn 20% from each referred trader\'s first deposit' },
                  { icon: '🎁', title: 'Bonus Rewards', desc: 'Extra bonuses when you hit referral milestones' },
                  { icon: '💳', title: 'Instant Payouts', desc: 'Weekly payouts to your preferred payment method' },
                ].map((perk, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="text-3xl">{perk.icon}</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{perk.title}</h4>
                      <p className="text-gray-400 text-sm">{perk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105">
                Join Referral Program
              </button>
            </div>

            <div data-aos="fade-left" className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-white font-bold text-2xl mb-6">Your Referral Stats</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Total Referrals</p>
                  <p className="text-purple-400 font-bold text-3xl">148</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Total Earned</p>
                  <p className="text-pink-400 font-bold text-3xl">$12,450</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">This Month</p>
                  <p className="text-purple-400 font-bold text-3xl">$2,340</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Limited Time Offers */}
        <div className="mb-20" data-aos="fade-up">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            🔥 Limited Time Offers
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'New User Bonus',
                offer: '100% Deposit Match',
                desc: 'Get up to $10,000 bonus on your first deposit',
                validity: 'Valid until Dec 31',
                badge: 'LIMITED',
              },
              {
                title: 'Refer & Earn',
                offer: '50% Bonus',
                desc: 'Get 50% bonus on each successful referral signup',
                validity: 'Valid until Dec 25',
                badge: 'HOT',
              },
            ].map((offer, idx) => (
              <div
                key={idx}
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
                className="relative backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 to-red-500/10 border-2 border-yellow-500/50 rounded-2xl p-8 overflow-hidden"
              >
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  {offer.badge}
                </div>

                <h4 className="text-white font-bold text-2xl mb-2">{offer.title}</h4>
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent mb-3">
                  {offer.offer}
                </div>
                <p className="text-gray-300 mb-4">{offer.desc}</p>
                <p className="text-yellow-300 text-sm font-semibold mb-4">⏰ {offer.validity}</p>
                <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-lg font-bold hover:shadow-lg transition-all">
                  Claim Offer
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Features */}
        <div data-aos="fade-up">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            More Ways to Earn & Engage
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Gift className="w-8 h-8" />,
                title: 'Daily Rewards',
                desc: 'Log in daily and earn reward points that can be converted to trading credits',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Trading Contests',
                desc: 'Monthly trading competitions with prize pools up to $50,000',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'VIP Program',
                desc: 'Exclusive perks, higher payouts, and dedicated support for top traders',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-all"
              >
                <div className="text-cyan-400 mb-4 flex justify-center">{feature.icon}</div>
                <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralEngagement;
