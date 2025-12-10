/**
 * ============================================
 * 📜 CERTIFICATES DATA
 * ============================================
 * 
 * วิธีเพิ่ม Certificate ใหม่:
 * 1. Copy template ด้านล่างแล้ววางเพิ่มใน array
 * 2. กรอกข้อมูลตาม field ที่กำหนด
 * 3. Save แล้ว page จะ refresh อัตโนมัติ
 * 
 * Template:
 * {
 *   title: "ชื่อ Certificate",
 *   issuer: "หน่วยงานที่ออก",
 *   description: "คำอธิบายสั้นๆ",
 *   image: "URL รูปภาพ",
 *   link: "URL ไปยัง certificate จริง (ถ้ามี)",
 *   date: "2024-01-15",
 *   featured: false,
 *   category: "web-dev",
 *   skills: ["React", "TypeScript"],
 * }
 */

export type Certificate = {
    title: string
    issuer: string
    description: string
    image: string
    link?: string
    date: string
    featured?: boolean
    category: string
    skills: string[]
}

// ============================================
// 🎨 CATEGORIES - หมวดหมู่ของ Certificates
// ============================================
export const categories = [
    { id: "web-dev", name: "Web Development", color: "#3B82F6" },
    { id: "design", name: "Design", color: "#EC4899" },
    { id: "frontend", name: "Frontend Frameworks", color: "#10B981" },
    { id: "cloud", name: "Cloud & DevOps", color: "#F59E0B" },
    { id: "leadership", name: "Leadership", color: "#8B5CF6" },
]

// ============================================
// 📜 YOUR CERTIFICATES - เพิ่ม Certificate ที่นี่
// ============================================
export const certificates: Certificate[] = [
    // ⭐ Featured Certificate #1
    {
        title: "Advanced React Development",
        issuer: "Coursera",
        description: "Comprehensive course covering React Hooks, Context API, Performance Optimization, and advanced patterns.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
        link: "https://coursera.org/verify/example",
        date: "2024-01-15",
        featured: true,
        category: "web-dev",
        skills: ["React", "JavaScript", "Frontend"],
    },

    // ⭐ Featured Certificate #2
    {
        title: "UI/UX Design Fundamentals",
        issuer: "Google",
        description: "Learn the foundations of user experience and interface design including wireframing and prototyping.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
        link: "https://google.com/verify/example",
        date: "2024-02-20",
        featured: true,
        category: "design",
        skills: ["UI/UX", "Design", "Figma"],
    },

    // ⭐ Featured Certificate #3
    {
        title: "Full Stack Web Development",
        issuer: "Meta",
        description: "Complete bootcamp covering frontend and backend development with React, Node.js, Express, and MongoDB.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
        link: "https://meta.com/verify/example",
        date: "2023-11-10",
        featured: true,
        category: "web-dev",
        skills: ["Full Stack", "Node.js", "MongoDB"],
    },

    // Certificate #4
    {
        title: "Next.js 14 Masterclass",
        issuer: "Vercel",
        description: "Master Next.js 14 App Router, Server Components, Server Actions, and advanced optimization techniques.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
        date: "2024-03-05",
        category: "frontend",
        skills: ["Next.js", "React", "TypeScript"],
    },

    // Certificate #5
    {
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        description: "Foundational certification covering AWS cloud concepts, services, security, and pricing.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
        link: "https://aws.amazon.com/verify/example",
        date: "2023-09-28",
        category: "cloud",
        skills: ["AWS", "Cloud", "DevOps"],
    },

    // Certificate #6
    {
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        description: "Learn to create responsive websites using HTML5, CSS3, Flexbox, and CSS Grid.",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
        link: "https://freecodecamp.org/verify/example",
        date: "2023-07-15",
        category: "design",
        skills: ["HTML", "CSS", "Responsive"],
    },

    // Certificate #7
    {
        title: "Leadership & Team Management",
        issuer: "LinkedIn Learning",
        description: "Develop essential leadership skills including team building and conflict resolution.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        date: "2024-01-30",
        category: "leadership",
        skills: ["Leadership", "Management", "Soft Skills"],
    },

    // Certificate #8
    {
        title: "TypeScript Deep Dive",
        issuer: "Udemy",
        description: "Advanced TypeScript course covering generics, decorators, and integration with React.",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
        link: "https://udemy.com/verify/example",
        date: "2023-12-05",
        category: "frontend",
        skills: ["TypeScript", "JavaScript"],
    },

    // ============================================
    // 👇 เพิ่ม Certificate ใหม่ด้านล่างนี้
    // ============================================

]
