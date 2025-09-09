'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Briefcase, GraduationCap, Heart, Users, Plane, Home, Trophy, Mountain, Music, Camera, Stethoscope, Trees, Building, Theater, Palmtree, Waves } from 'lucide-react';

interface Location {
  id: string;
  city: string;
  state: string;
  coordinates: { x: number; y: number }; // Percentage position on map
  visits: Visit[];
  category: 'home' | 'work' | 'education' | 'conference' | 'travel';
  current?: boolean;
}

interface Visit {
  year: string;
  purpose: string;
  duration: string;
  highlights: string[];
  icon: React.ElementType;
  color: string;
  googleMapsUrl?: string;
}

// Sample locations across USA
const locations: Location[] = [
  {
    id: 'baltimore',
    city: 'Baltimore',
    state: 'MD',
    coordinates: { x: 77, y: 43 },
    current: true,
    category: 'work',
    visits: [
      {
        year: '2021-2023',
        purpose: 'JOHNS HOPKINS MEDICAL ROBOTICS',
        duration: '2 years',
        highlights: ['Medical Robotics Research', 'She Got Buckets Community', 'Healthcare Innovation'],
        icon: Stethoscope,
        color: 'bg-blue-500',
        googleMapsUrl: 'https://maps.app.goo.gl/d1d7LQLfLo2iJUPA9'
      }
    ]
  },
  {
    id: 'reston',
    city: 'Reston',
    state: 'VA',
    coordinates: { x: 76, y: 40 },
    category: 'home',
    visits: [
      {
        year: '2022-Present',
        purpose: 'CARINA AI - HEALTHCARE SENIOR SOFTWARE ENGINEER',
        duration: 'Ongoing',
        highlights: ['AI Product Development', 'Startup Experience', 'Healthcare Technology'],
        icon: Briefcase,
        color: 'bg-purple-500'
      },
      {
        year: 'Present',
        purpose: 'HOME BASE',
        duration: 'Ongoing',
        highlights: ['Family Time', 'Local Community', 'Friends & Connections', 'Home Life'],
        icon: Home,
        color: 'bg-blue-500',
        googleMapsUrl: 'https://maps.app.goo.gl/fYj2Bhb8vCnNAyHe9'
      }
    ]
  },
  {
    id: 'orlando',
    city: 'Orlando',
    state: 'FL',
    coordinates: { x: 73, y: 72 },
    category: 'conference',
    visits: [
      {
        year: '2023',
        purpose: 'GRACE HOPPER CELEBRATION',
        duration: '4 days',
        highlights: ['Women in Tech Conference', 'Professional Networking', 'Inspiring Keynotes', 'AI in Healthcare'],
        icon: GraduationCap,
        color: 'bg-green-500'
      },
      {
        year: '2025',
        purpose: 'AMERICAN ACADEMY OF OPHTHALMOLOGY',
        duration: '4 days',
        highlights: ['Ophthalmology Research', 'Medical Networking', 'Glaucoma Studies', 'AI in Eye Care'],
        icon: Stethoscope,
        color: 'bg-red-500'
      }
    ]
  },
  {
    id: 'washington-dc',
    city: 'Washington DC',
    state: 'DC',
    coordinates: { x: 77, y: 40 },
    category: 'conference',
    visits: [
      {
        year: '2025',
        purpose: 'AMERICAN ASSOCIATION OF PHYSICISTS IN MEDICINE',
        duration: '4 days',
        highlights: ['Image Segmentation', 'Medical Physics', 'Brachytherapy Automation', 'Medical Imaging'],
        icon: GraduationCap,
        color: 'bg-green-500'
      }
    ]
  },
  {
    id: 'pittsburgh',
    city: 'Pittsburgh',
    state: 'PA',
    coordinates: { x: 75, y: 35 },
    category: 'conference',
    visits: [
      {
        year: '2018',
        purpose: 'AICHE ANNUAL CONFERENCE',
        duration: '4 days',
        highlights: ['Chemical Engineering', 'Robotics', 'Chem-E-Car'],
        icon: Briefcase,
        color: 'bg-cyan-500'
      }
    ]
  },
  {
    id: 'new-york',
    city: 'New York',
    state: 'NY',
    coordinates: { x: 80, y: 32 },
    category: 'travel',
    visits: [
      {
        year: '2023',
        purpose: 'NYC ASIANS BASKETBALL TOURNAMENT',
        duration: '1 week',
        highlights: ['Basketball Tournament', 'NYC Experience', 'Community Building', 'Athletic Competition'],
        icon: Trophy,
        color: 'bg-orange-500',
        googleMapsUrl: 'https://maps.google.com/maps?q=New+York+City+NY'
      }
    ]
  },
  {
    id: 'raleigh',
    city: 'Raleigh',
    state: 'NC',
    coordinates: { x: 78, y: 50 },
    category: 'travel',
    visits: [
      {
        year: '2024',
        purpose: 'TRIANGLE BASKETBALL LEAGUE',
        duration: '1 week',
        highlights: ['Basketball Competition', 'NC State University', 'Regional Tournament', 'Athletic Networking'],
        icon: Trophy,
        color: 'bg-orange-500'
      }
    ]
  },
  {
    id: 'virginia-beach',
    city: 'Virginia Beach',
    state: 'VA',
    coordinates: { x: 79, y: 42 },
    category: 'travel',
    visits: [
      {
        year: '2025',
        purpose: 'VIRGINIA BEACH SURFING',
        duration: '3 days',
        highlights: ['Surfing', 'Virginia Beach', 'Labor Day'],
        icon: Waves,
        color: 'bg-blue-400',
        googleMapsUrl: 'https://maps.app.goo.gl/LWazZczfzTDhsU4s5'
      }
    ]
  },
  {
    id: 'new-orleans',
    city: 'New Orleans',
    state: 'LA',
    coordinates: { x: 60, y: 70 },
    category: 'travel',
    visits: [
      {
        year: '2025',
        purpose: 'MARDI GRAS CELEBRATION',
        duration: '5 days',
        highlights: ['Mardi Gras', 'New Orleans', 'Super Bowl Stadium'],
        icon: Music,
        color: 'bg-purple-500',

      }
    ]
  },
  {
    id: 'chicago',
    city: 'Chicago',
    state: 'IL',
    coordinates: { x: 62, y: 32 },
    category: 'travel',
    visits: [
      {
        year: '2025',
        purpose: 'NBA GAME & SUPER BOWL WEEKEND',
        duration: '4 days',
        highlights: ['NBA Experience', 'Super Bowl Weekend', 'Chicago Bulls Game', 'Sports Entertainment'],
        icon: Trophy,
        color: 'bg-red-500',
        googleMapsUrl: 'https://maps.app.goo.gl/DjEb5o7B2GZJjJNu6'
      }
    ]
  },
  {
    id: 'las-vegas',
    city: 'Las Vegas',
    state: 'NV',
    coordinates: { x: 25, y: 48 },
    category: 'travel',
    visits: [
      {
        year: '2025',
        purpose: 'VEGAS ENTERTAINMENT EXPERIENCE',
        duration: '4 days',
        highlights: ['The Sphere Experience', 'Magic Shows', 'Vegas Entertainment', 'City Exploration'],
        icon: Theater,
        color: 'bg-yellow-500',
        googleMapsUrl: 'https://maps.app.goo.gl/eSPV4kLbzZCjNKueA'
      }
    ]
  },
  {
    id: 'portland',
    city: 'Portland',
    state: 'OR',
    coordinates: { x: 12, y: 22 },
    category: 'travel',
    visits: [
      {
        year: '2024',
        purpose: 'PACIFIC NORTHWEST ADVENTURE',
        duration: '4 days',
        highlights: ['Redwood National Park', 'Smith Rock State Park', 'Lassen Volcanic National Park'],
        icon: Trees,
        color: 'bg-green-600',
        googleMapsUrl: 'https://maps.app.goo.gl/TW7jxgL2AHev7rob6'
      }
    ]
  },
  {
    id: 'boston',
    city: 'Boston',
    state: 'MA',
    coordinates: { x: 83, y: 28 },
    category: 'travel',
    visits: [
      {
        year: '2024',
        purpose: 'BOSTON ACADEMIC & SPORTS EXPERIENCE',
        duration: '4 days',
        highlights: ['MIT Campus Tour', 'Harvard University', 'Boston Celtics Game', 'New England Lobster'],
        icon: Building,
        color: 'bg-blue-600',
        googleMapsUrl: 'https://maps.google.com/maps?q=MIT+Cambridge+MA'
      }
    ]
  },
  {
    id: 'denver',
    city: 'Denver',
    state: 'CO',
    coordinates: { x: 42, y: 42 },
    category: 'travel',
    visits: [
      {
        year: '2023',
        purpose: 'ROCKY MOUNTAIN EXPEDITION',
        duration: '3 days',
        highlights: ['Hiking', 'Rocky Mountains', 'Climbing across the waterfall near the Snow'],
        icon: GraduationCap,
        color: 'bg-indigo-500'
      }
    ]
  },
  {
    id: 'phoenix',
    city: 'Phoenix',
    state: 'AZ',
    coordinates: { x: 28, y: 56 },
    category: 'travel',
    visits: [
      {
        year: '2022',
        purpose: 'GRAND CANYON ADVENTURE',
        duration: '5 days',
        highlights: ['Grand Canyon National Park', 'Arizona Desert', 'Canyon Hiking', 'Natural Wonders'],
        icon: Mountain,
        color: 'bg-orange-600',
        googleMapsUrl: 'https://maps.google.com/maps?q=Grand+Canyon+National+Park+AZ'
      }
    ]
  },
  {
    id: 'kansas-city',
    city: 'Kansas City',
    state: 'MO',
    coordinates: { x: 50, y: 42 },
    category: 'travel',
    visits: [
      {
        year: '2023',
        purpose: 'KANSAS CITY CHIEFS EXPERIENCE',
        duration: '5 days',
        highlights: ['Chiefs Kingdom', 'Arrowhead Stadium', 'NFL Experience', 'Kansas City Culture'],
        icon: Trophy,
        color: 'bg-red-600'
      }
    ]
  },
  {
    id: 'salt-lake-city',
    city: 'Salt Lake City',
    state: 'UT',
    coordinates: { x: 34, y: 38 },
    category: 'travel',
    visits: [
      {
        year: '2022',
        purpose: 'YELLOWSTONE & GRAND TETON ROAD TRIP',
        duration: '5 days',
        highlights: ['Yellowstone', 'Grand Teton', 'road trip'],
        icon: GraduationCap,
        color: 'bg-indigo-500'
      }
    ]
  },
  {
    id: 'cleveland',
    city: 'Cleveland',
    state: 'OH',
    coordinates: { x: 70, y: 32 },
    category: 'travel',
    visits: [
      {
        year: '2022',
        purpose: 'CLEVELAND CAVALIERS EXPERIENCE',
        duration: '5 days',
        highlights: ['Cleveland Cavaliers', 'Cleveland', 'Rocket Mortgage FieldHouse'],
        icon: Trophy,
        color: 'bg-red-700',
        googleMapsUrl: 'https://maps.app.goo.gl/TW7jxgL2AHev7rob6'
      }
    ]
  },
  {
    id: 'miami',
    city: 'Miami',
    state: 'FL',
    coordinates: { x: 75, y: 85 },
    category: 'travel',
    visits: [
      {
        year: '2022',
        purpose: 'MIAMI BEACH & EVERGLADES',
        duration: '5 days',
        highlights: ['Miami Beach', 'Everglades National Park', 'Key West', 'Art Deco District'],
        icon: Palmtree,
        color: 'bg-cyan-500',
      }
    ]
  },
  {
    id: 'philadelphia',
    city: 'Philadelphia',
    state: 'PA',
    coordinates: { x: 78, y: 38 },
    category: 'travel',
    visits: [
      {
        year: '2022',
        purpose: 'PHILADELPHIA SPORTS & CULTURE',
        duration: '5 days',
        highlights: ['Philadelphia 76ers', 'Philadelphia Museum of Art', 'Wells Fargo Center', 'Liberty Bell'],
        icon: Building,
        color: 'bg-blue-700',
      }
    ]
  },
  {
    id: 'san-francisco',
    city: 'San Francisco',
    state: 'CA',
    coordinates: { x: 8, y: 45 },
    category: 'travel',
    visits: [
      {
        year: '2019',
        purpose: 'UC BERKELEY SUMMER PROGRAM',
        duration: '3 months',
        highlights: ['UC Berkeley', 'Golden state Warriors', 'summer academy'],
        icon: GraduationCap,
        color: 'bg-indigo-500',
        googleMapsUrl: 'https://maps.app.goo.gl/cRyoMYMjtQYq1Ntb7'
      }
    ]
  },
  {
    id: 'atlanta',
    city: 'Atlanta',
    state: 'GA',
    coordinates: { x: 72, y: 58 },
    category: 'travel',
    visits: [
      {
        year: '2019',
        purpose: 'ATLANTA HAWKS EXPERIENCE',
        duration: '1 week',
        highlights: ['Atlanta Hawks Games', 'State Farm Arena', 'Southern Hospitality', 'NBA Basketball Culture'],
        icon: Trophy,
        color: 'bg-red-600',
        googleMapsUrl: 'https://maps.app.goo.gl/1a6i8VzkyVbWZc959'
      }
    ]
  },
  {
    id: 'honolulu',
    city: 'Honolulu',
    state: 'HI',
    coordinates: { x: 15, y: 75 },
    category: 'travel',
    visits: [
      {
        year: '2024',
        purpose: 'HAWAII VACATION',
        duration: '1 week',
        highlights: ['Beaches', 'Volcanoes', 'Snorkeling', 'Island Culture'],
        icon: Palmtree,
        color: 'bg-cyan-400',
        googleMapsUrl: 'https://maps.app.goo.gl/sHVCYN5QGY7pRrEn9',
      }
    ]
  }
];

const categoryColors = {
  home: 'bg-blue-500',
  work: 'bg-purple-500',
  education: 'bg-green-500',
  conference: 'bg-orange-500',
  travel: 'bg-pink-500'
};

const categoryIcons = {
  home: Home,
  work: Briefcase,
  education: GraduationCap,
  conference: Users,
  travel: Plane
};

export function TimeSpaceUSA() {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredLocations = selectedCategory === 'all' 
    ? locations 
    : locations.filter(loc => loc.category === selectedCategory);

  // Calculate stats
  const totalCities = locations.length;
  const totalVisits = locations.reduce((sum, loc) => sum + loc.visits.length, 0);
  const totalStates = new Set(locations.map(loc => loc.state)).size;

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900" id="time-space">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Time & Space
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Exploring America through sports, nature, and professional growth!
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-12">
          {['all', 'home', 'work', 'conference', 'travel'].map(cat => {
            const Icon = categoryIcons[cat as keyof typeof categoryIcons];
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </motion.button>
            );
          })}
        </div>

        {/* USA Map Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative aspect-[16/10] bg-gray-800/30 rounded-3xl border border-gray-700 backdrop-blur-sm overflow-hidden">
            {/* US Map Background Image */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_US_Map_%28states_only%29.svg/2000px-Blank_US_Map_%28states_only%29.svg.png')`,
                backgroundSize: '90%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.35,
                filter: 'invert(1) brightness(1.2) contrast(1.4)'
              }}
            />
            
            {/* Grid overlay removed for clearer map visibility */}

            {/* Connection Lines Removed for Cleaner Visual */}

            {/* Location Markers */}
            {filteredLocations.map((location, index) => {
              const Icon = categoryIcons[location.category];
              const isHovered = hoveredLocation === location.id;
              
              return (
                <motion.div
                  key={location.id}
                  className="absolute"
                  style={{
                    left: `${location.coordinates.x}%`,
                    top: `${location.coordinates.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  onClick={() => setSelectedLocation(location)}
                >
                  {/* Pulse effect for current location */}
                  {location.current && (
                    <motion.div
                      className="absolute inset-0 bg-blue-500 rounded-full"
                      animate={{
                        scale: [1, 2.5, 2.5],
                        opacity: [0.5, 0.1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  )}
                  
                  {/* Marker */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`relative z-10 w-10 h-10 ${categoryColors[location.category]} rounded-full flex items-center justify-center cursor-pointer shadow-lg`}
                  >
                    {Icon && <Icon className="w-5 h-5 text-white" />}
                    {location.current && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    )}
                  </motion.div>

                  {/* Hover Card */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full mb-2 w-48 p-3 bg-gray-900 rounded-lg shadow-xl z-20 border border-gray-200"
                      style={{ left: '50%', transform: 'translateX(-50%)' }}
                    >
                      <h3 className="font-bold text-white text-sm">{location.city}, {location.state}</h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {location.visits.length} visit{location.visits.length > 1 ? 's' : ''}
                      </p>
                      <p className="text-xs text-gray-300 mt-1">
                        {location.visits[0].purpose}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {/* Map Labels */}
            <div className="absolute top-4 left-4 text-white">
              <h3 className="text-sm font-semibold opacity-50">United States</h3>
            </div>

            {/* Current Location Indicator */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-gray-900/80 px-3 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-white">Based in: Reston, VA</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
          {[
            { label: 'Cities Visited', value: totalCities, icon: MapPin },
            { label: 'Total Visits', value: totalVisits, icon: Calendar },
            { label: 'States Explored', value: totalStates, icon: Plane }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Location Detail Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedLocation.city}, {selectedLocation.state}
                </h2>
                
                {selectedLocation.visits.map((visit, i) => {
                  const Icon = visit.icon;
                  return (
                    <div key={i} className="mb-6 pb-6 border-b last:border-0">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 ${visit.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{visit.purpose}</h3>
                          <p className="text-sm text-gray-500">{visit.year} • {visit.duration}</p>
                        </div>
                      </div>
                      
                      <div className="ml-13">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Highlights:</h4>
                        <ul className="space-y-1 mb-3">
                          {visit.highlights.map((highlight, j) => (
                            <li key={j} className="text-sm text-gray-600">• {highlight}</li>
                          ))}
                        </ul>
                        {visit.googleMapsUrl && (
                          <a
                            href={visit.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600 transition-colors"
                          >
                            <MapPin className="w-3 h-3" />
                            View on Google Maps
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}