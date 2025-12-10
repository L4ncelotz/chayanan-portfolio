"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { profile } from "@/data/profile"

export default function Hero() {
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
                    certificates: certs.length,
                    categories: cats.length,
                })
            } catch (error) {
                console.error('Failed to fetch stats:', error)
            }
        }
        fetchStats()
    }, [])

    return (
        <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#050505] py-20">
            <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 mb-6"
                >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm text-gray-400 font-medium">{profile.status}</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5"
                >
                    <span className="text-white">Chayanan&apos;s </span>
                    <span className="text-gradient">Certificate</span>
                    <br />
                    <span className="text-white">Portfolio</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    {profile.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-center justify-center gap-8 md:gap-12 mb-10"
                >
                    <Stat value={stats.certificates.toString()} label="Certificates" />
                    <div className="h-10 w-px bg-gray-800" />
                    <Stat value={stats.categories.toString()} label="Categories" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center justify-center gap-4 mb-10"
                >
                    <a
                        href="#certificates"
                        className="px-6 md:px-8 py-3 md:py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm md:text-base"
                    >
                        Explore Certificates
                    </a>
                    <a
                        href="#contact"
                        className="px-6 md:px-8 py-3 md:py-4 bg-gray-900 border border-gray-800 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-sm md:text-base"
                    >
                        Contact Me
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center justify-center gap-4"
                >
                    <a
                        href={profile.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a
                        href={profile.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href={`mailto:${profile.email}`}
                        className="p-2.5 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
        </section>
    )
}

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">{label}</div>
        </div>
    )
}
