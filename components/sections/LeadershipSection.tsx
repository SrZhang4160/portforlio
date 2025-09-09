'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Trophy, Heart, Target, Calendar, MapPin, ArrowRight } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  participants: number;
  impact: string;
  imageUrl: string;
}

const achievements: Achievement[] = [
  {
    id: 'members',
    title: 'Community Members',
    value: '50+',
    icon: Users,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'events',
    title: 'Events Organized',
    value: '20+',
    icon: Calendar,
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'championships',
    title: 'Championships',
    value: '1',
    icon: Trophy,
    color: 'from-yellow-500 to-orange-500'
  }
];

const events: Event[] = [
  {
    id: 'women-basketball-league-2021',
    title: 'Championship',
    date: 'November 2021',
    location: 'DC',
    participants: 120,
    impact: 'First place in the first National Asian Women\'s Basketball league in DC.',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop'
  },
  {
    id: 'skills-clinic-2024',
    title: 'Reached the quarterfinals of the National League for three consecutive years',
    date: '2023-2025',
    location: 'DC',
    participants: 60,
    impact: 'Free training for different skill levels, Teamwork to win',
    imageUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&h=400&fit=crop'
  },
  /* {
    id: 'charity-tournament-2024',
    title: 'Hoops for Health Charity Tournament',
    date: 'March 2024',
    location: 'Baltimore Convention Center',
    participants: 200,
    impact: 'Raised $10K for local health clinics, health screenings provided',
    imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&h=400&fit=crop'
  }, */
  /* {
    id: 'womens-showcase-2023',
    title: "Women&apos;s Basketball Showcase",
    date: 'December 2023',
    location: 'Coppin State University',
    participants: 80,
    impact: 'Platform for female athletes, college scout attendance',
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=400&fit=crop'
  } */
];

const values = [
  {
    title: 'Community First',
    description: 'Building lasting connections through sport',
    icon: '🤝'
  },
  {
    title: 'Inclusive Excellence',
    description: 'Championship-level play for all skill levels',
    icon: '🌟'
  },
  {
    title: 'Health & Wellness',
    description: 'Promoting physical and mental well-being',
    icon: '💪'
  },
  {
    title: 'Youth Development',
    description: 'Investing in the next generation of leaders',
    icon: '🌱'
  }
];

export function LeadershipSection() {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gradient-to-br from-orange-50 via-white to-red-50" id="leadership">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏀</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                JHU Asian Women&apos;s Basketball Team
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading Johns Hopkins University&apos;s premier women&apos;s basketball community: Where competition meets compassion
          </p>
        </motion.div>

        {/* Mission Statement */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-12 text-white mb-16 shadow-2xl"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg md:text-xl leading-relaxed">
              Empowering women through basketball, building a supportive community that champions 
              athletic excellence, personal growth, and social impact. We believe in the transformative 
              power of sport to create leaders both on and off the court.
            </p>
          </div>
        </motion.div> */}

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{achievement.value}</div>
                <div className="text-sm text-gray-600">{achievement.title}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Our Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Impact Through Events</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredEvent(event.id)}
                onHoverEnd={() => setHoveredEvent(null)}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Event Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                    <div className="flex items-center gap-4 text-sm mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.participants} participants
                      </span>
                    </div>
                    
                    {/* Impact on hover */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: hoveredEvent === event.id ? 1 : 0,
                        height: hoveredEvent === event.id ? 'auto' : 0
                      }}
                      className="mt-3 pt-3 border-t border-white/30"
                    >
                      <p className="text-sm">{event.impact}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Join Our Community
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re a seasoned player or just starting out, there&apos;s a place for you in She Got Buckets. 
              Be part of something bigger than basketball.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://shegotbuckets.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Visit Our Website
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-orange-200"
              >
                Get Involved
                <Heart className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}