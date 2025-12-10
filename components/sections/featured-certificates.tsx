"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
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

export default function FeaturedCertificates() {
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/certificates')
                const certs = await res.json()
                setCertificates(certs.filter((c: Certificate) => c.featured))
            } catch (error) {
                console.error('Failed to fetch:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

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
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#080808]" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
                </div>
            </section>
        )
    }

    if (certificates.length === 0) {
        return null
    }

    return (
        <>
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#080808]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[100px]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                            <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">Highlights</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="text-gradient-gold">Featured</span>
                            <span className="text-white"> Achievements</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {certificates.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.4 }}
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
                                    onClick={() => setSelectedCertificate(cert)}
                                />
                            </motion.div>
                        ))}
                    </div>
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
