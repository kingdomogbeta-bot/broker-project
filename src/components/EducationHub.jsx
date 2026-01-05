import React from 'react';
import { BookOpen, Video, Zap, Users } from 'lucide-react';

const EducationHub = () => {
  const resources = [
    { icon: <BookOpen className="w-8 h-8" />, title: 'Beginner Guide', desc: 'Complete introduction to trading basics', badge: '5 min read' },
    { icon: <Video className="w-8 h-8" />, title: 'Video Tutorials', desc: 'Step-by-step platform walkthrough', badge: 'Free Access' },
    { icon: <Zap className="w-8 h-8" />, title: 'Technical Analysis', desc: 'Learn chart patterns and indicators', badge: 'Pro Required' },
    { icon: <Users className="w-8 h-8" />, title: 'Live Webinars', desc: 'Weekly trading strategy sessions', badge: 'Weekly' },
  ];

  const courses = [
    { title: 'Forex Trading 101', level: 'Beginner', duration: '4 hours', students: '12.3K' },
    { title: 'Crypto Market Mastery', level: 'Intermediate', duration: '6 hours', students: '8.5K' },
    { title: 'Advanced Strategies', level: 'Expert', duration: '8 hours', students: '2.1K' },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trading Academy
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn from industry experts and master the art of trading with our comprehensive educational resources.
          </p>
        </div>

        {/* Quick Access Resources */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resources.map((resource, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-cyan-400 group-hover:scale-110 transition-transform">
                  {resource.icon}
                </div>
                <span className="text-xs font-semibold bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">
                  {resource.badge}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{resource.title}</h3>
              <p className="text-gray-300 text-sm">{resource.desc}</p>
            </div>
          ))}
        </div>

        {/* Featured Courses */}
        <div className="mb-16" data-aos="fade-up">
          <h3 className="text-3xl font-bold text-white mb-8">Featured Courses</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <div
                key={idx}
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400 transition-all"
              >
                {/* Gradient Header */}
                <div className={`h-32 bg-gradient-to-br ${
                  idx === 0 ? 'from-blue-600 to-cyan-500' :
                  idx === 1 ? 'from-purple-600 to-pink-500' :
                  'from-yellow-600 to-orange-500'
                } group-hover:shadow-lg transition-all`} />

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-white font-bold text-lg mb-3">{course.title}</h4>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Level</span>
                      <span className={`font-semibold ${
                        course.level === 'Beginner' ? 'text-green-400' :
                        course.level === 'Intermediate' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-cyan-300">{course.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Students</span>
                      <span className="text-cyan-300">{course.students}</span>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all group-hover:scale-105">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Webinars */}
        <div data-aos="fade-up">
          <h3 className="text-3xl font-bold text-white mb-8">Upcoming Webinars</h3>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="space-y-4">
              {[
                { topic: 'Market Analysis & Technical Patterns', date: 'Dec 23, 2:00 PM', speaker: 'John Smith', spots: 45 },
                { topic: 'Crypto Trading Secrets', date: 'Dec 24, 4:00 PM', speaker: 'Sarah Jones', spots: 78 },
                { topic: 'Risk Management Strategies', date: 'Dec 25, 3:00 PM', speaker: 'Mike Davis', spots: 23 },
              ].map((webinar, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all"
                >
                  <div className="flex-1">
                    <h4 className="text-white font-bold mb-1">{webinar.topic}</h4>
                    <p className="text-gray-400 text-sm">
                      {webinar.date} • Hosted by {webinar.speaker}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-400 font-semibold">{webinar.spots} Spots Left</p>
                    <button className="mt-2 px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-all text-sm font-semibold">
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationHub;
