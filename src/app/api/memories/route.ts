import { NextResponse } from 'next/server';
import prisma from '@/index';
import { Memory } from '@/generated/prisma';

export const dynamic = 'force-dynamic'; // Forces dynamic rendering on Vercel
export const revalidate = 0; // Disables revalidation/caching

export async function GET() {
  try {
    // Fetch approved memories
    const memories: Memory[] = await prisma.memory.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
    });

    console.log('Fetched memories on Vercel:', memories.map(m => ({
      id: m.id,
      approved: m.approved,
      createdAt: m.createdAt,
      imageUrl: m.imageUrl,
    })));

    return NextResponse.json(
      {
        memories,
        tableDropped: false,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Vercel-Cache': 'no-cache',
        },
      }
    );
  } catch (error: any) {
    console.error('[MEMORIES_ERROR]', error);

    if (error.code === 'P2021') {
      return NextResponse.json(
        {
          memories: [],
          tableDropped: true,
        },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Vercel-Cache': 'no-cache',
          },
        }
      );
    }

    return NextResponse.json(
      { error: 'Database error', details: error.message },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Vercel-Cache': 'no-cache',
        },
      }
    );
  }
}