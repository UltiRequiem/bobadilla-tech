"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import {
	Calendar,
	Clock,
	Globe,
	Copy,
	CheckCircle2,
	AlertCircle,
	Loader2,
} from "lucide-react";
import { fetchRedditPostDate, type RedditPostDate } from "./utils";

export default function RedditPostDateExtractor() {
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState<RedditPostDate | null>(null);
	const [copied, setCopied] = useState<"utc" | "local" | null>(null);

	const extractPostDate = async () => {
		setLoading(true);
		setError("");
		setResult(null);

		try {
			const postDate = await fetchRedditPostDate(url);
			setResult(postDate);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "An error occurred while extracting the date."
			);
		} finally {
			setLoading(false);
		}
	};

	const copyToClipboard = (text: string, type: "utc" | "local") => {
		navigator.clipboard.writeText(text);
		setCopied(type);
		setTimeout(() => setCopied(null), 2000);
	};

	return (
		<div className="relative min-h-screen bg-slate-950">
			<Navbar />

			<main className="relative z-10 pt-32 pb-24">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Breadcrumb */}
					<div className="mb-8">
						<div className="flex items-center space-x-2 text-sm text-gray-400">
							<Link href="/" className="hover:text-white transition-colors">
								Home
							</Link>
							<span>/</span>
							<Link
								href="/tools"
								className="hover:text-white transition-colors"
							>
								Tools
							</Link>
							<span>/</span>
							<span className="text-white">Reddit Post Date Extractor</span>
						</div>
					</div>

					{/* Header */}
					<div className="mb-12 text-center">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-6">
							<Calendar className="w-8 h-8 text-cyan-400" />
						</div>
						<h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
							Reddit Post Date Extractor
						</h1>
						<p className="text-xl text-gray-400 max-w-2xl mx-auto">
							Get the exact creation date and time of any Reddit post
						</p>
					</div>

					{/* Tool Interface */}
					<div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
						<div className="space-y-6">
							{/* URL Input */}
							<div>
								<label
									htmlFor="reddit-url"
									className="block text-sm font-medium text-gray-300 mb-2"
								>
									Reddit Post URL
								</label>
								<input
									type="text"
									id="reddit-url"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									placeholder="https://www.reddit.com/r/help/comments/115a9aq/how_to_see_exact_date_when_you_made_a_post/"
									className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors duration-300"
									disabled={loading}
								/>
							</div>

							{/* Extract Button */}
							<button
								onClick={extractPostDate}
								disabled={!url || loading}
								className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
							>
								{loading ? (
									<>
										<Loader2 className="w-5 h-5 animate-spin" />
										<span>Extracting...</span>
									</>
								) : (
									<>
										<Clock className="w-5 h-5" />
										<span>Get Post Date</span>
									</>
								)}
							</button>

							{/* Error Message */}
							{error && (
								<div className="flex items-start space-x-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
									<AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
									<p className="text-red-400 text-sm">{error}</p>
								</div>
							)}

							{/* Results */}
							{result && (
								<div className="space-y-4 pt-4">
									<h3 className="text-lg font-semibold text-white">
										Post Date Found!
									</h3>

									{/* UTC Date */}
									<div className="p-4 bg-white/5 rounded-lg">
										<div className="flex items-center justify-between mb-2">
											<div className="flex items-center space-x-2">
												<Globe className="w-4 h-4 text-cyan-400" />
												<span className="text-sm font-medium text-gray-400">
													UTC Time
												</span>
											</div>
											<button
												onClick={() => copyToClipboard(result.utcDate, "utc")}
												className="p-1.5 hover:bg-white/5 rounded transition-colors duration-200"
											>
												{copied === "utc" ? (
													<CheckCircle2 className="w-4 h-4 text-green-400" />
												) : (
													<Copy className="w-4 h-4 text-gray-400" />
												)}
											</button>
										</div>
										<p className="text-white font-mono">{result.utcDate}</p>
									</div>

									{/* Local Date */}
									<div className="p-4 bg-white/5 rounded-lg">
										<div className="flex items-center justify-between mb-2">
											<div className="flex items-center space-x-2">
												<Clock className="w-4 h-4 text-cyan-400" />
												<span className="text-sm font-medium text-gray-400">
													Your Local Time
												</span>
											</div>
											<button
												onClick={() =>
													copyToClipboard(result.localDate, "local")
												}
												className="p-1.5 hover:bg-white/5 rounded transition-colors duration-200"
											>
												{copied === "local" ? (
													<CheckCircle2 className="w-4 h-4 text-green-400" />
												) : (
													<Copy className="w-4 h-4 text-gray-400" />
												)}
											</button>
										</div>
										<p className="text-white font-mono">{result.localDate}</p>
									</div>

									{/* Additional Info */}
									<div className="pt-2 text-sm text-gray-400">
										<p>
											Post ID:{" "}
											<span className="text-white font-mono">
												{result.postId}
											</span>
										</p>
										<p>
											Unix Timestamp:{" "}
											<span className="text-white font-mono">
												{result.timestamp}
											</span>
										</p>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Information Sections */}
					<div className="space-y-8">
						{/* How It Works */}
						<div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
							<h2 className="text-2xl font-bold text-white mb-4">
								How Does It Work?
							</h2>
							<p className="text-gray-300 leading-relaxed">
								Reddit embeds each post&apos;s exact creation date in its
								publicly accessible API. This tool fetches the post data and
								extracts the creation timestamp, then provides it to you in both
								UTC and your local timezone, giving a universal and localized
								perspective on the exact moment the post was made.
							</p>
						</div>

						{/* Use Cases */}
						<div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
							<h2 className="text-2xl font-bold text-white mb-6">
								Why Use This Tool?
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h3 className="text-lg font-semibold text-white mb-2">
										Research & Investigations
									</h3>
									<p className="text-gray-300 text-sm">
										Journalists and researchers can confirm when a post first
										appeared, ensuring accurate timelines.
									</p>
								</div>
								<div>
									<h3 className="text-lg font-semibold text-white mb-2">
										Verification
									</h3>
									<p className="text-gray-300 text-sm">
										Fact-checkers and moderators can validate claims by
										confirming the post&apos;s original publish date.
									</p>
								</div>
								<div>
									<h3 className="text-lg font-semibold text-white mb-2">
										Record-Keeping
									</h3>
									<p className="text-gray-300 text-sm">
										Archivists and digital historians can keep precise records
										of internet discussions.
									</p>
								</div>
								<div>
									<h3 className="text-lg font-semibold text-white mb-2">
										Accurate Citations
									</h3>
									<p className="text-gray-300 text-sm">
										Writers and students can reference Reddit posts with correct
										date and time stamps.
									</p>
								</div>
							</div>
						</div>

						{/* Instructions */}
						<div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
							<h2 className="text-2xl font-bold text-white mb-4">
								Instructions
							</h2>
							<ol className="space-y-3 text-gray-300">
								<li className="flex items-start space-x-3">
									<span className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-sm font-semibold">
										1
									</span>
									<span>
										Copy the URL from your browser&apos;s address bar (or use
										the &apos;Share&apos; menu if on mobile).
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-sm font-semibold">
										2
									</span>
									<span>Paste the URL into the input field above.</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-sm font-semibold">
										3
									</span>
									<span>
										Click &quot;Get Post Date&quot; to extract the exact
										creation time.
									</span>
								</li>
							</ol>
						</div>

						{/* Privacy Note */}
						<div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
							<p className="text-gray-300 text-sm">
								<span className="font-semibold text-white">Privacy Note:</span>{" "}
								We do not store or share your URLs. They&apos;re used solely to
								retrieve the creation date for you. All processing happens in
								your browser.
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
