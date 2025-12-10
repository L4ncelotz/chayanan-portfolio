/**
 * Data utilities - แปลงข้อมูลจาก data files เป็น format ที่ใช้ใน components
 */

import { certificates, categories, type Certificate } from "@/data/certificates"

// Skill colors - auto-generated
const skillColors: Record<string, string> = {
    "React": "#61DAFB",
    "JavaScript": "#F7DF1E",
    "TypeScript": "#3178C6",
    "Frontend": "#3B82F6",
    "UI/UX": "#8B5CF6",
    "Design": "#EC4899",
    "Figma": "#F24E1E",
    "Node.js": "#339933",
    "MongoDB": "#47A248",
    "Next.js": "#000000",
    "AWS": "#FF9900",
    "Cloud": "#3B82F6",
    "DevOps": "#10B981",
    "HTML": "#E34F26",
    "CSS": "#1572B6",
    "Responsive": "#8B5CF6",
    "Leadership": "#F59E0B",
    "Management": "#8B5CF6",
    "Soft Skills": "#EC4899",
    "Full Stack": "#10B981",
}

function getSkillColor(skill: string): string {
    return skillColors[skill] || "#6B7280"
}

// แปลง certificates เป็น format ที่ components ใช้
export const mockCertificates = certificates.map((cert, index) => ({
    id: `cert-${index + 1}`,
    userId: "user1",
    categoryId: categories.find(c => c.id === cert.category)?.id || "web-dev",
    title: cert.title,
    issuer: cert.issuer,
    description: cert.description,
    imageUrl: cert.image,
    certificateUrl: cert.link || undefined,
    issuedDate: new Date(cert.date),
    expiryDate: undefined,
    isFeatured: cert.featured || false,
    displayOrder: index + 1,
    viewCount: (index + 1) * 50 + 100, // Deterministic view count based on index
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: cert.skills.map((skill, i) => ({
        id: `tag-${index}-${i}`,
        certificateId: `cert-${index + 1}`,
        name: skill,
        color: getSkillColor(skill),
    })),
}))

export const mockCategories = categories
