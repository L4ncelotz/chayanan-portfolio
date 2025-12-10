import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// GET all certificates
export async function GET() {
    try {
        const certificates = await prisma.certificate.findMany({
            include: {
                category: true,
                skills: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
        return NextResponse.json(certificates)
    } catch (error) {
        console.error('Error fetching certificates:', error)
        return NextResponse.json(
            { error: 'Failed to fetch certificates' },
            { status: 500 }
        )
    }
}

// POST new certificate
export async function POST(request: Request) {
    try {
        const body = await request.json()

        const { title, issuer, description, imageUrl, link, issuedDate, featured, categoryId, skills } = body

        // Create or connect skills
        const skillConnections = skills?.map((skillName: string) => ({
            where: { name: skillName },
            create: { name: skillName },
        })) || []

        const certificate = await prisma.certificate.create({
            data: {
                title,
                issuer,
                description,
                imageUrl,
                link,
                issuedDate: new Date(issuedDate),
                featured: featured || false,
                categoryId,
                skills: {
                    connectOrCreate: skillConnections,
                },
            },
            include: {
                category: true,
                skills: true,
            },
        })

        return NextResponse.json(certificate, { status: 201 })
    } catch (error) {
        console.error('Error creating certificate:', error)
        return NextResponse.json(
            { error: 'Failed to create certificate' },
            { status: 500 }
        )
    }
}
