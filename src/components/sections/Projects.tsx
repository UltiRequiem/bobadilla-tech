'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const showcases = [
  {
    id: 1,
    title: 'Healthcare',
    slug: 'healthcare',
    description: 'Extensive experience building HIPAA-compliant telemedicine platforms, patient management systems, and health data analytics solutions',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
    alt: 'Medical professional in white coat using smartphone for telemedicine consultation',
    tags: ['Telemedicine', 'Patient Portals', 'Health Analytics', 'Compliance']
  },
  {
    id: 2,
    title: 'Finance',
    slug: 'finance',
    description: 'Proven expertise in secure payment processing, trading platforms, and AI-powered financial analytics systems',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop',
    alt: 'Small plant growing from coins representing financial growth and investment',
    tags: ['Payment Systems', 'Trading Platforms', 'Risk Analysis', 'Banking APIs']
  },
  {
    id: 3,
    title: 'Education',
    slug: 'education',
    description: 'Deep experience creating interactive learning platforms, student management systems, and adaptive learning solutions',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
    alt: 'Red apple on stacked books with ABC learning blocks representing education',
    tags: ['E-Learning', 'LMS', 'Student Portals', 'Virtual Classrooms']
  },
  {
    id: 4,
    title: 'Transportation & Logistics',
    slug: 'transportation-logistics',
    description: 'Specialized knowledge in real-time tracking systems, warehouse management, and supply chain optimization platforms',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop',
    alt: 'Modern warehouse interior with organized shelving and yellow packages ready for distribution',
    tags: ['Fleet Management', 'Inventory', 'Route Optimization', 'Tracking']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Industries We Have <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Experience With</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Proven expertise delivering specialized solutions across diverse sectors
          </p>
        </motion.div>

        {/* Industry Showcases Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {showcases.map((project) => (
            <Link
              key={project.id}
              href={`/services/all/${project.slug}`}
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group relative cursor-pointer"
              >
                <div className="relative p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
                  {/* Category Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full border border-cyan-500/30">
                      {project.title}
                    </span>
                  </div>

                  {/* Project Image */}
                  <div className="w-full h-48 rounded-xl mb-4 overflow-hidden relative">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Project Info */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
