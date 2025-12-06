"use client";

import { motion } from "framer-motion";
import { Check, Zap, Star, Crown, Calendar, Calculator } from "lucide-react";
import Link from "next/link";
import { CAL_LINKS } from "~/lib/constants";

const pricingPlans = [
	{
		id: "starter",
		name: "Starter Landing Page",
		price: "$350",
		icon: <Zap className="w-6 h-6" />,
		description: "Perfect for startups and small businesses",
		features: [
			"Single landing page",
			"Responsive design",
			"Basic SEO optimization",
			"Contact form integration",
			"2 rounds of revisions",
			"7-10 day delivery",
			"Mobile optimized",
		],
		popular: false,
	},
	{
		id: "multi-page",
		name: "Multi-Page Website",
		price: "$850",
		icon: <Star className="w-6 h-6" />,
		description: "1-5 pages for growing businesses",
		features: [
			"Up to 5 custom pages",
			"Advanced responsive design",
			"SEO optimization",
			"CMS integration (optional)",
			"Contact & lead forms",
			"3 rounds of revisions",
			"14-21 day delivery",
			"Analytics integration",
			"Social media integration",
		],
		popular: true,
	},
	{
		id: "premium",
		name: "Premium Web Experience",
		price: "$1,500+",
		icon: <Crown className="w-6 h-6" />,
		description: "Custom solutions for enterprises",
		features: [
			"Unlimited pages",
			"Custom design & animations",
			"Advanced SEO & performance",
			"Full CMS integration",
			"E-commerce capabilities",
			"API integrations",
			"Unlimited revisions",
			"Priority support",
			"Ongoing maintenance (optional)",
			"Custom features & functionality",
		],
		popular: false,
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
		},
	},
};

export default function Pricing() {
	return (
		<section id="pricing" className="relative py-24 overflow-hidden">
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
						Simple,{" "}
						<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
							Transparent Pricing
						</span>
					</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
						Static website packages designed for speed and quality
					</p>
					<Link
						href="/pricing"
						className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
					>
						<Calculator className="w-5 h-5" />
						Try Our Pricing Calculator
					</Link>
				</motion.div>

				{/* Pricing Cards */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-3 gap-8"
				>
					{pricingPlans.map((plan) => (
						<motion.div
							key={plan.id}
							variants={itemVariants}
							whileHover={{ scale: 1.02 }}
							className={`relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 flex flex-col ${
								plan.popular
									? "bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/50"
									: "bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-white/10 hover:border-white/20"
							}`}
						>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
										Most Popular
									</span>
								</div>
							)}

							{/* Icon */}
							<div
								className={`inline-flex p-3 rounded-xl mb-4 ${
									plan.popular
										? "bg-cyan-500/20 text-cyan-400"
										: "bg-white/5 text-gray-400"
								}`}
							>
								{plan.icon}
							</div>

							{/* Plan Name */}
							<h3 className="text-2xl font-bold text-white mb-2">
								{plan.name}
							</h3>

							{/* Description */}
							<p className="text-gray-400 mb-6">{plan.description}</p>

							{/* Price */}
							<div className="mb-8">
								<span className="text-5xl font-bold text-white">
									{plan.price}
								</span>
							</div>

							{/* Features */}
							<ul className="space-y-4 mb-8 flex-grow">
								{plan.features.map((feature, index) => (
									<li key={index} className="flex items-start space-x-3">
										<Check
											className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
												plan.popular ? "text-cyan-400" : "text-gray-400"
											}`}
										/>
										<span className="text-gray-300">{feature}</span>
									</li>
								))}
							</ul>

							{/* CTA Button */}
							<a
								href="#contact"
								className={`block w-full py-3 rounded-full font-semibold text-center transition-all duration-300 mt-auto ${
									plan.popular
										? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
										: "bg-white/5 text-white hover:bg-white/10 border border-white/10"
								}`}
							>
								Get Started
							</a>
						</motion.div>
					))}
				</motion.div>

				{/* Custom Projects Note */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className="mt-16 text-center"
				>
					<div className="inline-block p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
						<p className="text-lg text-gray-300 mb-2">
							<span className="font-semibold text-white">
								Need a custom MVP or full-stack application?
							</span>
						</p>
						<p className="text-gray-400 mb-4">
							We offer hourly consultancy and fractional CTO services. Book a
							call to discuss your project.
						</p>
						<a
							href={CAL_LINKS.eliaz}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
						>
							<Calendar className="w-5 h-5" />
							Book a Call with an Experienced Fractional CTO
						</a>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
