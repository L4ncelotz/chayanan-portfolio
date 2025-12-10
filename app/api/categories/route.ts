import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// GET all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { certificates: true },
                },
            },
            orderBy: {
                name: 'asc',
            },
        })
        return NextResponse.json(categories)
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        )
    }
}

// POST new category
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, color } = body

        const category = await prisma.category.create({
            data: {
                name,
                color: color || '#3B82F6',
            },
        })

        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        console.error('Error creating category:', error)
        return NextResponse.json(
            { error: 'Failed to create category' },
            { status: 500 }
        )
    }
}
