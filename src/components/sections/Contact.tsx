"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Calendar } from "lucide-react";

export default function Contact() {
	return (
		<section id="contact" className="relative py-24 overflow-hidden">
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
						Let&apos;s Build{" "}
						<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
							Together
						</span>
					</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto">
						Book a free 15-minute call or request a proposal
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="space-y-6"
					>
						<div className="p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl">
							<h3 className="text-2xl font-bold text-white mb-6">
								Send us a message
							</h3>

							<form className="space-y-4">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-300 mb-2"
									>
										Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors duration-300"
										placeholder="Your name"
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-300 mb-2"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors duration-300"
										placeholder="your@email.com"
									/>
								</div>

								<div>
									<label
										htmlFor="project-type"
										className="block text-sm font-medium text-gray-300 mb-2"
									>
										Project Type
									</label>
									<select
										id="project-type"
										name="project-type"
										className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-colors duration-300"
									>
										<option value="">Select a project type</option>
										<option value="mvp">MVP Development</option>
										<option value="web">Web Development</option>
										<option value="mobile">Mobile App</option>
										<option value="ai">AI Integration</option>
										<option value="consulting">Consulting</option>
										<option value="other">Other</option>
									</select>
								</div>

								<div>
									<label
										htmlFor="message"
										className="block text-sm font-medium text-gray-300 mb-2"
									>
										Message
									</label>
									<textarea
										id="message"
										name="message"
										rows={4}
										className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors duration-300 resize-none"
										placeholder="Tell us about your project..."
									/>
								</div>

								<button
									type="submit"
									className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
								>
									Send Message
								</button>
							</form>
						</div>
					</motion.div>

					{/* Contact Info & CTA */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="space-y-6"
					>
						{/* Book a Call Card */}
						<div className="p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl">
							<Calendar className="w-12 h-12 text-cyan-400 mb-4" />
							<h3 className="text-2xl font-bold text-white mb-2">
								Book a Free Call
							</h3>
							<p className="text-gray-300 mb-4">
								Schedule a 15-minute consultation with our Chief Revenue
								Officer.
							</p>
							<p className="text-sm text-gray-400 mb-6">
								Available 10 AM - 3 PM • Quick response guaranteed
							</p>
							<div className="space-y-3">
								<a
									href="https://cal.com/ale-boba-work/15min"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
								>
									Schedule with Ale
								</a>
								<a
									href="https://cal.com/ultirequiem/15min"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center w-full px-4 py-2 bg-white/5 border border-white/10 text-gray-300 text-sm rounded-full hover:bg-white/10 transition-all duration-300"
								>
									Enterprise & Fractional CTO
								</a>
							</div>
						</div>

						{/* Contact Methods */}
						<div className="p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl space-y-6">
							<h3 className="text-2xl font-bold text-white mb-6">
								Get in Touch
							</h3>

							<a
								href="mailto:ale@bobadilla.work"
								className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors duration-300"
							>
								<Mail className="w-6 h-6 text-cyan-400" />
								<span>ale@bobadilla.work</span>
							</a>

							<a
								href="mailto:eliaz@bobadilla.work"
								className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors duration-300"
							>
								<Mail className="w-6 h-6 text-cyan-400" />
								<span>eliaz@bobadilla.work</span>
							</a>

							<div className="pt-4 border-t border-white/10">
								<p className="text-gray-400 mb-4">Follow us</p>
								<div className="flex space-x-4">
									<a
										href="https://www.linkedin.com/company/bobadillatech"
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-white/5 rounded-lg hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 transition-all duration-300"
									>
										<Linkedin className="w-6 h-6" />
									</a>
									<a
										href="https://github.com/bobadillatech"
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-white/5 rounded-lg hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 transition-all duration-300"
									>
										<Github className="w-6 h-6" />
									</a>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
