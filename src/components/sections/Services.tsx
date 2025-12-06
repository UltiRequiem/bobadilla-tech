"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
	Code,
	Globe,
	Smartphone,
	Database,
	Palette,
	Boxes,
	Rocket,
	Layout,
} from "lucide-react";
import { allServices } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
	"web-dev": <Globe className="w-8 h-8" />,
	"cms-dev": <Boxes className="w-8 h-8" />,
	"mvp-dev": <Rocket className="w-8 h-8" />,
	"web-app-dev": <Layout className="w-8 h-8" />,
	"mobile-app-dev": <Smartphone className="w-8 h-8" />,
	"backend-dev": <Database className="w-8 h-8" />,
	"frontend-dev": <Palette className="w-8 h-8" />,
	"web-portal-dev": <Code className="w-8 h-8" />,
};

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

export default function Services() {
	return (
		<section className="relative py-24 overflow-hidden">
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
						Our{" "}
						<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
							Services
						</span>
					</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto">
						Full-stack development, AI integration, and enterprise solutions
					</p>
				</motion.div>

				{/* Services Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
				>
					{allServices.map((service) => (
						<motion.div
							key={service.id}
							variants={itemVariants}
							whileHover={{ scale: 1.05 }}
							className="group"
						>
							<Link href={`/services/${service.slug}`}>
								<div className="relative p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 h-full">
									{/* Icon */}
									<div className="mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
										{iconMap[service.id] || <Code className="w-8 h-8" />}
									</div>

									{/* Title */}
									<h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
										{service.title}
									</h3>

									{/* Description */}
									<p className="text-gray-400 text-sm line-clamp-3">
										{service.description}
									</p>

									{/* Hover Effect */}
									<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300 pointer-events-none" />
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>

				{/* View All Services Button */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3, duration: 0.6 }}
					className="text-center mt-12"
				>
					<Link
						href="/services"
						className="inline-flex items-center px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full font-medium hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
					>
						View All Services
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
