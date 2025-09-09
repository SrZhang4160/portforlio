'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  GraduationCap, 
  Calendar, 
  ExternalLink, 
  Star, 
  X
} from 'lucide-react';
import { 
  courseraCertificates, 
  categoryColors, 
  categoryLabels,
  CourseraCertificate 
} from '../../lib/certificates-data';

export function LearningDashboard() {
  const [selectedCert, setSelectedCert] = useState<CourseraCertificate | null>(null);

  const featuredCertificates = courseraCertificates.filter(cert => cert.featured);

  return (
    <div className="space-y-8">

      {/* Featured Certificates */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          Featured Certificates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredCertificates.map(cert => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedCert(cert)}
              className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 shadow-md hover:shadow-lg cursor-pointer border"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  {cert.imageUrl ? (
                    <Image 
                      src={cert.imageUrl} 
                      alt={cert.title}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <GraduationCap className="w-8 h-8 text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1 line-clamp-2">{cert.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{cert.institution}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs text-white rounded-full ${categoryColors[cert.category]}`}>
                      {categoryLabels[cert.category]}
                    </span>
                    {cert.grade && (
                      <span className="text-xs text-amber-600 font-medium">Grade: {cert.grade}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Completed {new Date(cert.completedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


      {/* Certificate Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedCert.title}</h2>
                    <p className="text-gray-600 mb-2">{selectedCert.institution}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Completed {new Date(selectedCert.completedDate).toLocaleDateString()}
                      </span>
                      <span>Duration: {selectedCert.duration}</span>
                      {selectedCert.grade && <span>Grade: {selectedCert.grade}</span>}
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`px-3 py-1 text-sm text-white rounded-full ${categoryColors[selectedCert.category]}`}>
                    {categoryLabels[selectedCert.category]}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedCert.description}</p>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Skills Acquired</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {selectedCert.certificateUrl && (
                    <a
                      href={selectedCert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Certificate
                    </a>
                  )}
                  {selectedCert.credentialId && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                      <span className="text-sm text-gray-600">
                        Credential ID: {selectedCert.credentialId}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}