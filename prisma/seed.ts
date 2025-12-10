import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create categories
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { id: 'web-dev' },
            update: {},
            create: { id: 'web-dev', name: 'Web Development', color: '#3B82F6' },
        }),
        prisma.category.upsert({
            where: { id: 'design' },
            update: {},
            create: { id: 'design', name: 'Design', color: '#EC4899' },
        }),
        prisma.category.upsert({
            where: { id: 'frontend' },
            update: {},
            create: { id: 'frontend', name: 'Frontend Frameworks', color: '#10B981' },
        }),
        prisma.category.upsert({
            where: { id: 'cloud' },
            update: {},
            create: { id: 'cloud', name: 'Cloud & DevOps', color: '#F59E0B' },
        }),
        prisma.category.upsert({
            where: { id: 'leadership' },
            update: {},
            create: { id: 'leadership', name: 'Leadership', color: '#8B5CF6' },
        }),
    ])

    console.log(`✅ Created ${categories.length} categories`)

    // Create skills
    const skillNames = ['React', 'JavaScript', 'TypeScript', 'Frontend', 'UI/UX', 'Design', 'Figma', 'Node.js', 'MongoDB', 'Next.js', 'AWS', 'Cloud', 'DevOps', 'HTML', 'CSS', 'Responsive', 'Leadership', 'Management', 'Full Stack']

    const skills = await Promise.all(
        skillNames.map(name =>
            prisma.skill.upsert({
                where: { name },
                update: {},
                create: { name, color: '#6B7280' },
            })
        )
    )

    console.log(`✅ Created ${skills.length} skills`)

    // Create sample certificates
    const certificatesData = [
        {
            title: 'Advanced React Development',
            issuer: 'Coursera',
            description: 'Comprehensive course covering React Hooks, Context API, Performance Optimization.',
            imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
            link: 'https://coursera.org/verify/example',
            issuedDate: new Date('2024-01-15'),
            featured: true,
            categoryId: 'web-dev',
            skills: ['React', 'JavaScript', 'Frontend'],
        },
        {
            title: 'UI/UX Design Fundamentals',
            issuer: 'Google',
            description: 'Learn the foundations of user experience and interface design.',
            imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
            link: 'https://google.com/verify/example',
            issuedDate: new Date('2024-02-20'),
            featured: true,
            categoryId: 'design',
            skills: ['UI/UX', 'Design', 'Figma'],
        },
        {
            title: 'Full Stack Web Development',
            issuer: 'Meta',
            description: 'Complete bootcamp covering frontend and backend development.',
            imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
            link: 'https://meta.com/verify/example',
            issuedDate: new Date('2023-11-10'),
            featured: true,
            categoryId: 'web-dev',
            skills: ['Full Stack', 'Node.js', 'MongoDB'],
        },
        {
            title: 'Next.js 14 Masterclass',
            issuer: 'Vercel',
            description: 'Master Next.js 14 App Router, Server Components, and optimization.',
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
            issuedDate: new Date('2024-03-05'),
            featured: false,
            categoryId: 'frontend',
            skills: ['Next.js', 'React', 'TypeScript'],
        },
        {
            title: 'AWS Cloud Practitioner',
            issuer: 'Amazon Web Services',
            description: 'Foundational certification covering AWS cloud concepts.',
            imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
            link: 'https://aws.amazon.com/verify/example',
            issuedDate: new Date('2023-09-28'),
            featured: false,
            categoryId: 'cloud',
            skills: ['AWS', 'Cloud', 'DevOps'],
        },
    ]

    for (const certData of certificatesData) {
        const { skills: skillNames, ...data } = certData
        await prisma.certificate.create({
            data: {
                ...data,
                skills: {
                    connect: skillNames.map(name => ({ name })),
                },
            },
        })
    }

    console.log(`✅ Created ${certificatesData.length} certificates`)
    console.log('🎉 Seeding complete!')
}

main()
    .catch((e) => {
        console.error('Error seeding:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
