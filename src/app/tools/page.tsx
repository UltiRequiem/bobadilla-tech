import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { Calendar, ArrowRight } from "lucide-react";
import { generateMetadata as generateSEOMetadata, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
	title: "Free Online Developer Tools",
	description:
		"Free online tools for developers, researchers, and content creators. Privacy-focused utilities including Reddit post date extractor, code formatters, and more. No sign-up required.",
	keywords: [
		"free developer tools",
		"online tools",
		"reddit post date",
		"developer utilities",
		"free software tools",
		"web tools",
		"no sign-up tools",
		"privacy-focused tools",
	],
	canonical: `${BASE_URL}/tools`,
	ogImage: `${BASE_URL}/og-tools.png`,
});

const tools = [
	{
		id: "reddit-post-date",
		name: "Reddit Post Date Extractor",
		description:
			"Extract the exact creation date and time from any Reddit post. Perfect for research, verification, and accurate citations.",
		icon: Calendar,
		slug: "reddit-post-date",
		category: "Social Media",
		tags: ["Reddit", "Date", "Research", "Verification"],
	},
];

const categories = Array.from(new Set(tools.map((tool) => tool.category)));

export default function ToolsPage() {
	return (
		<div className="relative min-h-screen bg-slate-950">
			<Navbar />

			<main className="relative z-10 pt-32 pb-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Breadcrumb */}
					<div className="mb-8">
						<div className="flex items-center space-x-2 text-sm text-gray-400">
							<Link href="/" className="hover:text-white transition-colors">
								Home
							</Link>
							<span>/</span>
							<span className="text-white">Tools</span>
						</div>
					</div>

					{/* Header */}
					<div className="mb-16 text-center">
						<h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
							Free{" "}
							<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
								Tools
							</span>
						</h1>
						<p className="text-xl text-gray-400 max-w-3xl mx-auto">
							Powerful online tools built for developers, researchers, and
							content creators. All tools are free to use and privacy-focused.
						</p>
					</div>

					{/* Tools by Category */}
					{categories.map((category) => (
						<div key={category} className="mb-16">
							<h2 className="text-3xl font-bold text-white mb-8">{category}</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{tools
									.filter((tool) => tool.category === category)
									.map((tool) => {
										const Icon = tool.icon;
										return (
											<Link
												key={tool.id}
												href={`/tools/${tool.slug}`}
												className="group p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
											>
												{/* Icon */}
												<div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4">
													<Icon className="w-6 h-6 text-cyan-400" />
												</div>

												{/* Title */}
												<h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
													{tool.name}
												</h3>

												{/* Description */}
												<p className="text-gray-400 text-sm mb-4 line-clamp-2">
													{tool.description}
												</p>

												{/* Tags */}
												<div className="flex flex-wrap gap-2 mb-4">
													{tool.tags.map((tag) => (
														<span
															key={tag}
															className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded"
														>
															{tag}
														</span>
													))}
												</div>

												{/* Arrow */}
												<div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
													<span className="text-sm font-medium">Use Tool</span>
													<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
												</div>
											</Link>
										);
									})}
							</div>
						</div>
					))}

					{/* More Tools Coming Soon */}
					<div className="mt-16 text-center">
						<div className="inline-block p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
							<h3 className="text-2xl font-bold text-white mb-2">
								More Tools Coming Soon
							</h3>
							<p className="text-gray-400 mb-4">
								We&apos;re constantly building new tools to help developers and
								content creators.
							</p>
							<Link
								href="/#contact"
								className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
							>
								<span className="text-sm font-medium">Suggest a Tool</span>
								<ArrowRight className="w-4 h-4 ml-2" />
							</Link>
						</div>
					</div>

					{/* Why Use Our Tools */}
					<div className="mt-16 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
						<h2 className="text-2xl font-bold text-white mb-6">
							Why Use Our Tools?
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div>
								<h3 className="text-lg font-semibold text-white mb-2">
									100% Free
								</h3>
								<p className="text-gray-400 text-sm">
									All our tools are completely free to use. No hidden fees, no
									subscriptions.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-white mb-2">
									Privacy-Focused
								</h3>
								<p className="text-gray-400 text-sm">
									We don&apos;t store your data. Everything happens in your
									browser.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-white mb-2">
									No Sign-Up Required
								</h3>
								<p className="text-gray-400 text-sm">
									Start using any tool immediately. No account creation needed.
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
