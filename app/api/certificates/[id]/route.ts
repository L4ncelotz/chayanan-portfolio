import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// GET single certificate
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const certificate = await prisma.certificate.findUnique({
            where: { id: params.id },
            include: {
                category: true,
                skills: true,
            },
        })

        if (!certificate) {
            return NextResponse.json(
                { error: 'Certificate not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(certificate)
    } catch (error) {
        console.error('Error fetching certificate:', error)
        return NextResponse.json(
            { error: 'Failed to fetch certificate' },
            { status: 500 }
        )
    }
}

// PUT update certificate
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const { title, issuer, description, imageUrl, link, issuedDate, featured, categoryId, skills } = body

        // Update skills connections
        const skillConnections = skills?.map((skillName: string) => ({
            where: { name: skillName },
            create: { name: skillName },
        })) || []

        const certificate = await prisma.certificate.update({
            where: { id: params.id },
            data: {
                title,
                issuer,
                description,
                imageUrl,
                link,
                issuedDate: issuedDate ? new Date(issuedDate) : undefined,
                featured,
                categoryId,
                skills: {
                    set: [],
                    connectOrCreate: skillConnections,
                },
            },
            include: {
                category: true,
                skills: true,
            },
        })

        return NextResponse.json(certificate)
    } catch (error) {
        console.error('Error updating certificate:', error)
        return NextResponse.json(
            { error: 'Failed to update certificate' },
            { status: 500 }
        )
    }
}

// DELETE certificate
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.certificate.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: 'Certificate deleted successfully' })
    } catch (error) {
        console.error('Error deleting certificate:', error)
        return NextResponse.json(
            { error: 'Failed to delete certificate' },
            { status: 500 }
        )
    }
}
