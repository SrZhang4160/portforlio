'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Sparkles, Code, Heart, Users } from 'lucide-react';
import Link from 'next/link';

const roles = [
  'Senior Software Engineer',
  'Healthcare Technology Innovator',
  'Community Leader & Founder',
  'Robotics Engineer',
  'Full-Stack Developer'
];

const floatingIcons = [
  { icon: '⚕️', delay: 0, x: -200, y: -100 },
  { icon: '🤖', delay: 1, x: 200, y: -150 },
  { icon: '💊', delay: 2, x: -150, y: 100 },
  { icon: '🧬', delay: 3, x: 150, y: 150 },
  { icon: '🔬', delay: 4, x: -100, y: -200 },
  { icon: '🏥', delay: 5, x: 100, y: 200 }
];

export function HeroSectionV2() {
  const [currentRole, setCurrentRole] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mousePosition.x, springConfig);
  const y = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setMousePosition({
        x: (event.clientX - centerX) * 0.02,
        y: (event.clientY - centerY) * 0.02
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 4 }}
        />

        {/* Floating medical icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl"
            style={{ 
              left: '50%', 
              top: '50%',
              transform: `translate(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px))`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
          >
            <span className="opacity-20">{item.icon}</span>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Name Introduction */}
          <motion.h1 
            className="text-6xl lg:text-8xl font-bold mb-6"
            style={{ y: y1 }}
          >
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Sharon Zhang
            </span>
          </motion.h1>

          {/* Role Rotation */}
          <div className="h-12 lg:h-16 mb-8 relative overflow-hidden">
            {roles.map((role, index) => (
              <motion.p
                key={role}
                className="absolute w-full text-2xl lg:text-4xl font-semibold"
                initial={{ y: 50, opacity: 0 }}
                animate={{
                  y: currentRole === index ? 0 : -50,
                  opacity: currentRole === index ? 1 : 0
                }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {role}
                </span>
              </motion.p>
            ))}
          </div>

          {/* Mission Statement */}
          <motion.p
            className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Passionate about revolutionizing healthcare through technology. 
            Building life-saving automation systems at Carina Medical while 
            empowering communities through She Got Buckets.
          </motion.p>

          {/* Key Stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { icon: Heart, value: '80%', label: 'Workload Reduction' },
              { icon: Code, value: '3+', label: 'Hospitals Beta-Testing' },
              { icon: Users, value: '200+', label: 'Community Members' }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconComponent className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="#journey"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              Explore My Journey
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-gray-200"
            >
              Let&apos;s Build Together
            </Link>
          </motion.div>
        </motion.div>

      </div>
      
      {/* Scroll Indicator - Moved outside of main content container */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-sm uppercase tracking-wider">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Parallax overlay elements */}
      <motion.div
        className="absolute top-10 right-10 text-gray-300 opacity-20 text-9xl font-bold pointer-events-none select-none"
        style={{ y: y2 }}
      >
        AI
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-10 text-gray-300 opacity-20 text-9xl font-bold pointer-events-none select-none"
        style={{ y: y1 }}
      >
        Health
      </motion.div>
    </motion.section>
  );
}