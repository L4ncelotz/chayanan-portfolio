"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Sparkles } from "lucide-react"
import CertificateCard from "@/components/ui/certificate-card"
import CertificateModal from "@/components/ui/certificate-modal"

type Category = {
    id: string
    name: string
    color: string
}

type Skill = {
    id: string
    name: string
    color: string
}

type Certificate = {
    id: string
    title: string
    issuer: string
    description?: string
    imageUrl: string
    link?: string
    issuedDate: string
    featured: boolean
    viewCount: number
    categoryId: string
    category: Category
    skills: Skill[]
}

export default function CertificatesGrid() {
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState<"latest" | "oldest" | "views">("latest")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [certsRes, catsRes] = await Promise.all([
                    fetch('/api/certificates'),
                    fetch('/api/categories'),
                ])
                const certs = await certsRes.json()
                const cats = await catsRes.json()
                setCertificates(certs)
                setCategories(cats)
            } catch (error) {
                console.error('Failed to fetch data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const filteredCertificates = useMemo(() => {
        let filtered = certificates.filter(cert => {
            const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = !selectedCategory || cert.categoryId === selectedCategory
            return matchesSearch && matchesCategory
        })

        filtered.sort((a, b) => {
            if (sortBy === "latest") return new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime()
            if (sortBy === "oldest") return new Date(a.issuedDate).getTime() - new Date(b.issuedDate).getTime()
            return b.viewCount - a.viewCount
        })

        return filtered
    }, [certificates, searchQuery, selectedCategory, sortBy])

    const getVariant = (index: number): "default" | "large" | "wide" => {
        if (index === 0) return "large"
        if (index === 3) return "wide"
        return "default"
    }

    // Transform for modal compatibility
    const transformForModal = (cert: Certificate) => ({
        id: cert.id,
        userId: "user1",
        categoryId: cert.categoryId,
        title: cert.title,
        issuer: cert.issuer,
        description: cert.description || "",
        imageUrl: cert.imageUrl,
        certificateUrl: cert.link,
        issuedDate: new Date(cert.issuedDate),
        isFeatured: cert.featured,
        displayOrder: 1,
        viewCount: cert.viewCount,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: cert.skills.map(s => ({ id: s.id, certificateId: cert.id, name: s.name, color: s.color })),
    })

    if (loading) {
        return (
            <section className="py-24 relative overflow-hidden" id="certificates">
                <div className="absolute inset-0 bg-gradient-to-b from-[#080810] via-[#0a0a15] to-[#050508]" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </section>
        )
    }

    return (
        <>
            <section className="py-24 relative overflow-hidden" id="certificates">
                <div className="absolute inset-0 bg-gradient-to-b from-[#080810] via-[#0a0a15] to-[#050508]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-6 h-6 text-blue-400" />
                            <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Collection</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="text-white">All </span>
                            <span className="text-gradient">Certificates</span>
                        </h2>
                        <p className="text-gray-500 text-lg max-w-xl">
                            Explore my journey through professional development and continuous learning
                        </p>
                    </motion.div>

                    <div className="mb-12">
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search certificates..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none transition-all"
                                />
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                className="px-4 py-4 rounded-xl bg-[#1a1a2e] border border-white/[0.08] text-gray-300 focus:border-blue-500/50 focus:outline-none cursor-pointer [&>option]:bg-[#1a1a2e] [&>option]:text-gray-300"
                            >
                                <option value="latest">Latest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="views">Most Viewed</option>
                            </select>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${selectedCategory === null
                                    ? "bg-white text-black"
                                    : "bg-white/[0.05] text-gray-400 border border-white/[0.08] hover:bg-white/[0.08]"
                                    }`}
                            >
                                All
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${selectedCategory === category.id
                                        ? "bg-white text-black"
                                        : "bg-white/[0.05] text-gray-400 border border-white/[0.08] hover:bg-white/[0.08]"
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredCertificates.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]"
                        >
                            {filteredCertificates.map((cert, index) => (
                                <motion.div
                                    key={cert.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.3 }}
                                    className={
                                        index === 0 ? "md:row-span-2" :
                                            index === 3 ? "md:col-span-2" : ""
                                    }
                                >
                                    <CertificateCard
                                        id={cert.id}
                                        title={cert.title}
                                        issuer={cert.issuer}
                                        imageUrl={cert.imageUrl}
                                        certificateUrl={cert.link}
                                        issuedDate={new Date(cert.issuedDate)}
                                        isFeatured={cert.featured}
                                        viewCount={cert.viewCount}
                                        tags={cert.skills.map(s => ({ name: s.name, color: s.color }))}
                                        variant={getVariant(index)}
                                        onClick={() => setSelectedCertificate(cert)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No certificates found</p>
                        </div>
                    )}
                </div>
            </section>

            {selectedCertificate && (
                <CertificateModal
                    isOpen={true}
                    onClose={() => setSelectedCertificate(null)}
                    certificate={transformForModal(selectedCertificate)}
                />
            )}
        </>
    )
}
