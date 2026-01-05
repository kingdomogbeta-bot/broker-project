import React from 'react';
import { Zap, Server, Activity } from 'lucide-react';

const PerformanceStats = () => {
  const [uptime, setUptime] = React.useState(99.97);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Blazing Fast Performance
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Industry-leading speed and reliability. Always available when you need us.
          </p>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: <Zap className="w-8 h-8" />, metric: '< 50ms', label: 'Average Latency', desc: 'Lightning-fast trade execution' },
            { icon: <Server className="w-8 h-8" />, metric: '99.97%', label: 'Uptime Guarantee', desc: 'Always available, always reliable' },
            { icon: <Activity className="w-8 h-8" />, metric: '1M+', label: 'Trades/Second', desc: 'Handles peak market volumes' },
          ].map((stat, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 text-center hover:border-green-400 transition-all"
            >
              <div className="text-green-400 mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-4xl font-bold text-green-400 mb-2">{stat.metric}</div>
              <h4 className="text-white font-bold text-lg mb-1">{stat.label}</h4>
              <p className="text-gray-400 text-sm">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Infrastructure */}
        <div className="mb-16" data-aos="fade-up">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Global Infrastructure
          </h3>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { region: 'North America', servers: '12', latency: '15ms' },
                { region: 'Europe', servers: '8', latency: '8ms' },
                { region: 'Asia', servers: '10', latency: '12ms' },
                { region: 'Australia', servers: '6', latency: '25ms' },
              ].map((location, idx) => (
                <div key={idx} className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-white font-bold mb-3">{location.region}</h4>
                  <p className="text-cyan-400 text-sm mb-1">{location.servers} Servers</p>
                  <p className="text-green-400 text-sm">{location.latency} Avg</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Enterprise-Grade Security',
                features: ['DDoS Protection', 'SSL/TLS Encryption', 'Multi-level Firewalls', 'Real-time Monitoring'],
              },
              {
                title: 'Redundancy & Backup',
                features: ['Automatic Failover', 'Real-time Replication', 'Disaster Recovery', '4-Hour RTO'],
              },
            ].map((section, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
              >
                <h4 className="text-white font-bold text-xl mb-6">{section.title}</h4>
                <ul className="space-y-3">
                  {section.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Uptime Status */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8" data-aos="zoom-in">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-white font-bold text-2xl mb-4">Current System Status</h3>
              <div className="space-y-3">
                {[
                  { service: 'Trading Platform', status: 'Operational' },
                  { service: 'API Services', status: 'Operational' },
                  { service: 'Mobile Apps', status: 'Operational' },
                  { service: 'Support Chat', status: 'Online' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-300">{item.service}</span>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 font-semibold">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-2">30-Day Uptime</p>
              <div className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                {uptime}%
              </div>
              <p className="text-gray-400 text-sm">
                Your funds are safe. We guarantee 99.97% uptime with SLA protection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceStats;
