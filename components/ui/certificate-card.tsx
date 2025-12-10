"use client"

import React, { useRef, useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ExternalLink, Eye, Calendar, Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface CertificateCardProps {
    id: string
    title: string
    issuer: string
    description?: string
    imageUrl: string
    certificateUrl?: string
    issuedDate: Date
    isFeatured?: boolean
    viewCount?: number
    tags: { name: string; color: string }[]
    onClick?: () => void
    className?: string
    variant?: "default" | "large" | "wide"
}

export default function CertificateCard({
    title,
    issuer,
    imageUrl,
    certificateUrl,
    issuedDate,
    isFeatured,
    viewCount,
    tags,
    onClick,
    className,
    variant = "default",
}: CertificateCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // 3D tilt effect
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        setIsHovered(false)
    }

    const formattedDate = new Date(issuedDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    })

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={cn(
                "group relative cursor-pointer",
                variant === "large" && "md:row-span-2",
                variant === "wide" && "md:col-span-2",
                className
            )}
        >
            {/* Gradient border effect */}
            <div className={cn(
                "absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
            )} />

            {/* Card content */}
            <div className={cn(
                "relative h-full rounded-2xl overflow-hidden",
                "bg-[#0c0c0c]",
                variant === "large" ? "min-h-[400px]" : "min-h-[280px]"
            )}>
                {/* Background image with overlay */}
                <div className="absolute inset-0">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className={cn(
                            "object-cover transition-all duration-700",
                            isHovered && "scale-110 brightness-75"
                        )}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={cn(
                        "absolute inset-0 transition-all duration-500",
                        isHovered
                            ? "bg-gradient-to-t from-black via-black/70 to-transparent"
                            : "bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                    )} />
                </div>

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                    <div className="flex gap-2">
                        {isFeatured && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30"
                            >
                                <Award className="w-3.5 h-3.5 text-amber-400" />
                                <span className="text-xs font-semibold text-amber-300">Featured</span>
                            </motion.div>
                        )}
                    </div>
                    {viewCount && viewCount > 100 && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                            <Eye className="w-3.5 h-3.5 text-gray-300" />
                            <span className="text-xs font-medium text-gray-300">{viewCount}</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    {/* Tags - Show on hover */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-wrap gap-2 mb-3"
                    >
                        {tags.slice(0, 3).map((tag, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 rounded-md text-[11px] font-medium text-white/80"
                                style={{ backgroundColor: `${tag.color}30` }}
                            >
                                {tag.name}
                            </span>
                        ))}
                    </motion.div>

                    {/* Issuer & Date */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <span className="font-medium">{issuer}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formattedDate}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className={cn(
                        "font-bold text-white leading-snug",
                        variant === "large" ? "text-2xl" : "text-lg",
                        "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300"
                    )}>
                        {title}
                    </h3>

                    {/* External link indicator */}
                    {certificateUrl && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-1.5 mt-3 text-sm text-blue-400"
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span className="font-medium">View Certificate</span>
                        </motion.div>
                    )}
                </div>

                {/* Shine effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: isHovered
                            ? "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)"
                            : "none",
                        transform: `translateX(${isHovered ? "100%" : "-100%"})`,
                        transition: "transform 0.6s ease",
                    }}
                />
            </div>
        </motion.div>
    )
}
