'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'HealthTech Platform',
    category: 'Healthcare',
    description: 'HIPAA-compliant telemedicine platform with real-time video consultations',
    image: '/placeholder-project-1.jpg',
    tags: ['React', 'Node.js', 'WebRTC', 'AWS']
  },
  {
    id: 2,
    title: 'FinTech Dashboard',
    category: 'Finance',
    description: 'Real-time financial analytics dashboard with AI-powered insights',
    image: '/placeholder-project-2.jpg',
    tags: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL']
  },
  {
    id: 3,
    title: 'EdTech Learning Platform',
    category: 'Education',
    description: 'Interactive e-learning platform with adaptive learning algorithms',
    image: '/placeholder-project-3.jpg',
    tags: ['Vue.js', 'Django', 'Redis', 'MongoDB']
  },
  {
    id: 4,
    title: 'Logistics Management System',
    category: 'Transportation',
    description: 'End-to-end supply chain management with real-time tracking',
    image: '/placeholder-project-4.jpg',
    tags: ['React Native', 'Express', 'Socket.io', 'MySQL']
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
            Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transforming ideas into revenue-generating solutions
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="relative p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
                {/* Category Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full border border-cyan-500/30">
                    {project.category}
                  </span>
                </div>

                {/* Project Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl mb-4 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🚀</div>
                </div>

                {/* Project Info */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                    <ExternalLink className="w-5 h-5" />
                    <span>View Project</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300">
                    <Github className="w-5 h-5" />
                    <span>Source</span>
                  </button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
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
