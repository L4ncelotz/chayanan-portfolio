"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import { profile } from "@/data/profile"

// Helper function to extract username from URL
function extractUsername(url: string): string {
    // Remove trailing slash and get last segment
    const cleanUrl = url.replace(/\/+$/, "")
    return cleanUrl.split('/').pop() || "username"
}

export default function AboutSection() {
    const [stats, setStats] = useState({ certificates: 0, categories: 0 })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [certsRes, catsRes] = await Promise.all([
                    fetch('/api/certificates'),
                    fetch('/api/categories'),
                ])
                const certs = await certsRes.json()
                const cats = await catsRes.json()
                setStats({
                    certificates: Array.isArray(certs) ? certs.length : 0,
                    categories: Array.isArray(cats) ? cats.length : 0,
                })
            } catch (error) {
                console.error('Failed to fetch stats:', error)
            }
        }
        fetchStats()
    }, [])

    return (
        <section className="py-24 relative overflow-hidden" id="contact">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0c0a12] to-[#050505]" />

            {/* Decorative elements */}
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px]" />
            <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] bg-pink-600/5 rounded-full blur-[80px]" />

            {/* Top border glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-white">Get in </span>
                        <span className="text-gradient">Touch</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto">
                        Interested in my work? Let&apos;s connect and discuss opportunities
                    </p>
                </div>

                {/* Contact card */}
                <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08]">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Left - Info */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Let&apos;s work together
                            </h3>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                I&apos;m always open to discussing new projects, creative ideas,
                                or opportunities to be part of your team.
                            </p>

                            <div className="space-y-4">
                                <InfoItem
                                    icon={<Mail className="w-5 h-5" />}
                                    label="Email"
                                    value={profile.email}
                                />
                                <InfoItem
                                    icon={<MapPin className="w-5 h-5" />}
                                    label="Location"
                                    value={profile.location}
                                />
                            </div>
                        </div>

                        {/* Right - Social */}
                        <div>
                            <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-6">
                                Connect with me
                            </h4>
                            <div className="space-y-3">
                                <SocialLink
                                    href={profile.socials.github}
                                    icon={<Github className="w-5 h-5" />}
                                    label="GitHub"
                                    username={extractUsername(profile.socials.github)}
                                />
                                <SocialLink
                                    href={profile.socials.linkedin}
                                    icon={<Linkedin className="w-5 h-5" />}
                                    label="LinkedIn"
                                    username={extractUsername(profile.socials.linkedin)}
                                />
                            </div>

                            {/* Stats */}
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <StatItem value={stats.certificates.toString()} label="Certificates" />
                                    <StatItem value={stats.categories.toString()} label="Categories" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 text-center text-gray-600 text-sm">
                    <p>© 2024 {profile.name}. Built with Next.js & Tailwind CSS</p>
                </div>
            </div>
        </section>
    )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-white/5 text-gray-400">
                {icon}
            </div>
            <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
                <div className="text-white font-medium">{value}</div>
            </div>
        </div>
    )
}

function SocialLink({ href, icon, label, username }: { href: string; icon: React.ReactNode; label: string; username: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] transition-all group"
        >
            <div className="text-gray-400 group-hover:text-white transition-colors">
                {icon}
            </div>
            <div className="flex-1">
                <div className="text-white font-medium">{label}</div>
                <div className="text-sm text-gray-500">@{username}</div>
            </div>
        </a>
    )
}

function StatItem({ value, label }: { value: string; label: string }) {
    return (
        <div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
        </div>
    )
}
