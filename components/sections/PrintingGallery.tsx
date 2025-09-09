'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Layers, Clock, Cpu, Package, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PrintItem {
  id: string;
  title: string;
  category: 'medical' | 'tools' | 'art' | 'community';
  material: string;
  printTime: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  purpose: string;
  imageUrl: string;
  specs: {
    layers: number;
    nozzleTemp: string;
    bedTemp: string;
    infill: string;
  };
}

const prints: PrintItem[] = [
  {
    id: 'victory-trophy',
    title: 'Victory Trophy',
    category: 'art',
    material: 'PLA+',
    printTime: '6h 30m',
    complexity: 'beginner',
    description: 'Custom victory trophy with intricate design and finishing details',
    purpose: 'Awards and recognition for achievements',
    imageUrl: '/images/3d-printing/Victory.jpg',
    specs: {
      layers: 320,
      nozzleTemp: '220°C',
      bedTemp: '65°C',
      infill: '40%'
    }
  },
  {
    id: 'victory-glow',
    title: 'Victory Trophy (Glow Edition)',
    category: 'art',
    material: 'Glow-in-Dark PLA',
    printTime: '6h 45m',
    complexity: 'beginner',
    description: 'Special edition victory trophy with glow-in-the-dark filament',
    purpose: 'Premium awards with unique visual effects',
    imageUrl: '/images/3d-printing/victory_glow.jpg',
    specs: {
      layers: 325,
      nozzleTemp: '215°C',
      bedTemp: '60°C',
      infill: '45%'
    }
  },
  {
    id: 'chiefs-icon',
    title: 'Kansas City Chiefs Icon',
    category: 'art',
    material: 'Multi-Color PLA',
    printTime: '4h 20m',
    complexity: 'intermediate',
    description: 'Sports team logo with detailed multi-color printing',
    purpose: 'Fan merchandise and sports memorabilia',
    imageUrl: '/images/3d-printing/ChiefsIcon.jpg',
    specs: {
      layers: 245,
      nozzleTemp: '210°C',
      bedTemp: '60°C',
      infill: '35%'
    }
  },
  {
    id: 'doraemon-lamp',
    title: 'Doraemon Lamp',
    category: 'tools',
    material: 'Translucent PLA',
    printTime: '5h 15m',
    complexity: 'advanced',
    description: 'Functional lamp with beloved character design and LED integration',
    purpose: 'Decorative lighting and character collectible',
    imageUrl: '/images/3d-printing/DoraemonLamp.jpg',
    specs: {
      layers: 285,
      nozzleTemp: '210°C',
      bedTemp: '60°C',
      infill: '25%'
    }
  },
  {
    id: 'harry-potter-platform',
    title: 'Harry Potter Platform 9¾',
    category: 'art',
    material: 'PLA+',
    printTime: '8h 45m',
    complexity: 'advanced',
    description: 'Detailed recreation of the famous Platform 9¾ scene',
    purpose: 'Fantasy collectible and display piece',
    imageUrl: '/images/3d-printing/HarryPotter9&3:4.jpg',
    specs: {
      layers: 420,
      nozzleTemp: '220°C',
      bedTemp: '65°C',
      infill: '50%'
    }
  },
  {
    id: 'labubu',
    title: 'Labubu Character',
    category: 'art',
    material: 'PLA',
    printTime: '3h 40m',
    complexity: 'intermediate',
    description: 'Popular designer toy character with smooth finish',
    purpose: 'Character collectible and desktop decoration',
    imageUrl: '/images/3d-printing/Labubu.jpg',
    specs: {
      layers: 195,
      nozzleTemp: '210°C',
      bedTemp: '60°C',
      infill: '30%'
    }
  },
  {
    id: 'hand-model',
    title: 'Anatomical Hand Model',
    category: 'art',
    material: 'PETG',
    printTime: '4h 30m',
    complexity: 'advanced',
    description: 'Detailed hand anatomy model for educational purposes',
    purpose: 'Medical education and reference',
    imageUrl: '/images/3d-printing/hand.jpg',
    specs: {
      layers: 280,
      nozzleTemp: '245°C',
      bedTemp: '80°C',
      infill: '60%'
    }
  },
  {
    id: 'remote-holder',
    title: 'Remote Control Holder',
    category: 'tools',
    material: 'PLA',
    printTime: '2h 15m',
    complexity: 'beginner',
    description: 'Organized storage solution for multiple remote controls',
    purpose: 'Home organization and accessibility',
    imageUrl: '/images/3d-printing/RemoteHolder.jpg',
    specs: {
      layers: 120,
      nozzleTemp: '210°C',
      bedTemp: '60°C',
      infill: '35%'
    }
  },
  {
    id: 'm-case',
    title: 'M Case Storage',
    category: 'tools',
    material: 'PETG',
    printTime: '3h 50m',
    complexity: 'intermediate',
    description: 'Custom protective case with secure closure mechanism',
    purpose: 'Equipment protection and transport',
    imageUrl: '/images/3d-printing/M_case.jpg',
    specs: {
      layers: 215,
      nozzleTemp: '245°C',
      bedTemp: '80°C',
      infill: '45%'
    }
  },
  {
    id: 'kfc-bag',
    title: 'KFC Miniature Bag (Chopsticks Holder)',
    category: 'tools',
    material: 'PLA',
    printTime: '2h 30m',
    complexity: 'intermediate',
    description: 'Miniature replica of iconic fast food packaging',
    purpose: 'Novelty item and brand tribute',
    imageUrl: '/images/3d-printing/KFC_Bag.jpg',
    specs: {
      layers: 145,
      nozzleTemp: '210°C',
      bedTemp: '60°C',
      infill: '30%'
    }
  },
  {
    id: 'storage-box',
    title: 'Modular Storage Box',
    category: 'tools',
    material: 'PLA',
    printTime: '4h 15m',
    complexity: 'beginner',
    description: 'Stackable storage solution with secure lid design',
    purpose: 'Workshop organization and parts storage',
    imageUrl: '/images/3d-printing/box.jpg',
    specs: {
      layers: 235,
      nozzleTemp: '210°C',
      bedTemp: '60°C',
      infill: '40%'
    }
  }
];

const categories = [
  { id: 'all', label: 'All Prints', color: 'bg-gray-600' },
  { id: 'medical', label: 'Medical', color: 'bg-red-600' },
  { id: 'tools', label: 'Tools', color: 'bg-blue-600' },
  { id: 'art', label: 'Art', color: 'bg-purple-600' },
  { id: 'community', label: 'Community', color: 'bg-green-600' }
];

export function PrintingGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrint, setSelectedPrint] = useState<PrintItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredPrints = selectedCategory === 'all' 
    ? prints 
    : prints.filter(p => p.category === selectedCategory);

  return (
    <section className="py-24 bg-white" id="3d-printing">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              3D Printing Workshop
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technical creativity beyond code: Medical prototypes, productivity tools, and community awards
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.id
                  ? `${cat.color} text-white`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid - Similar to qzq.at books layout */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPrints.map((print, index) => (
              <motion.div
                key={print.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedPrint(print)}
                className="cursor-pointer group"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow">
                  <Image
                    src={print.imageUrl}
                    alt={print.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-sm mb-1">{print.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-200">
                        <Clock className="w-3 h-3" />
                        <span>{print.printTime}</span>
                        <span>•</span>
                        <span>{print.material}</span>
                      </div>
                    </div>
                  </div>
                  {/* Complexity badge */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                    print.complexity === 'advanced' ? 'bg-red-500 text-white' :
                    print.complexity === 'intermediate' ? 'bg-yellow-500 text-white' :
                    'bg-green-500 text-white'
                  }`}>
                    {print.complexity}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedPrint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedPrint(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedPrint.title}</h3>
                  <button
                    onClick={() => setSelectedPrint(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Image */}
                    <div>
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                        <Image
                          src={selectedPrint.imageUrl}
                          alt={selectedPrint.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex gap-2 mt-4">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                          >
                            <Image
                              src={selectedPrint.imageUrl}
                              alt={`${selectedPrint.title} view ${i}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h4>
                        <p className="text-gray-700">{selectedPrint.description}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Purpose</h4>
                        <p className="text-gray-700">{selectedPrint.purpose}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Print Specifications</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <Layers className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Layers</p>
                              <p className="font-semibold text-gray-900">{selectedPrint.specs.layers}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <Cpu className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Nozzle</p>
                              <p className="font-semibold text-gray-900">{selectedPrint.specs.nozzleTemp}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <Package className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Bed</p>
                              <p className="font-semibold text-gray-900">{selectedPrint.specs.bedTemp}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <Package className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Infill</p>
                              <p className="font-semibold text-gray-900">{selectedPrint.specs.infill}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-4 border-t">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Material</p>
                          <p className="font-semibold">{selectedPrint.material}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Print Time</p>
                          <p className="font-semibold">{selectedPrint.printTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Difficulty</p>
                          <p className="font-semibold capitalize">{selectedPrint.complexity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}