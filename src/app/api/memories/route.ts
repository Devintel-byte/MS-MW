import { NextResponse } from 'next/server';
import prisma from '@/index';
import { Memory } from '@/generated/prisma';

export const dynamic = 'force-dynamic'; // Forces dynamic rendering on Vercel
export const revalidate = 0; // Disables revalidation/caching (0 means no cache)

export async function GET() {
  try {
    // Fetch approved memories
    const memories: Memory[] = await prisma.memory.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
    });

    console.log('Returning memories:', memories.map(m => ({ id: m.id, approved: m.approved })));

    return NextResponse.json({
      memories,
      tableDropped: false,
    });
  } catch (error: any) {
    console.error('[MEMORIES_ERROR]', error);

    // Handle table not found or other errors
    if (error.code === 'P2021') {
      return NextResponse.json({
        memories: [],
        tableDropped: true,
      });
    }

    return NextResponse.json(
      { error: 'Database error', details: error.message },
      { status: 500 }
    );
  }
}