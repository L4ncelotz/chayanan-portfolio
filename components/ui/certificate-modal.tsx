"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Eye, Calendar, Share2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CertificateModalProps {
    isOpen: boolean
    onClose: () => void
    certificate: {
        id: string
        title: string
        issuer: string
        description?: string
        imageUrl: string
        certificateUrl?: string
        issuedDate: Date
        expiryDate?: Date
        viewCount: number
        tags: { name: string; color: string }[]
    }
}

export default function CertificateModal({
    isOpen,
    onClose,
    certificate,
}: CertificateModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) {
            window.addEventListener("keydown", handleEscape)
            return () => window.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose])

    const formattedDate = new Date(certificate.issuedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative w-full max-w-4xl bg-[#0a0a0a] rounded-2xl border border-gray-800 overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="grid md:grid-cols-2">
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] md:aspect-auto bg-gray-900">
                                        <Image
                                            src={certificate.imageUrl}
                                            alt={certificate.title}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                            {certificate.title}
                                        </h2>
                                        <p className="text-gray-400 mb-6">{certificate.issuer}</p>

                                        {/* Meta */}
                                        <div className="space-y-3 mb-8">
                                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                                <Calendar className="w-4 h-4" />
                                                <span>Issued: {formattedDate}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                                <Eye className="w-4 h-4" />
                                                <span>{certificate.viewCount} views</span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        {certificate.description && (
                                            <div className="mb-8">
                                                <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                                                    Description
                                                </h4>
                                                <p className="text-gray-300 leading-relaxed">
                                                    {certificate.description}
                                                </p>
                                            </div>
                                        )}

                                        {/* Tags */}
                                        {certificate.tags.length > 0 && (
                                            <div className="mb-8">
                                                <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                                                    Skills
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {certificate.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1.5 rounded-lg text-sm bg-gray-800 text-gray-300"
                                                        >
                                                            {tag.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            {certificate.certificateUrl && (
                                                <a
                                                    href={certificate.certificateUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                    Verify
                                                </a>
                                            )}
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(window.location.href)
                                                }}
                                                className="px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                                            >
                                                <Share2 className="w-4 h-4" />
                                                Share
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
