import { NextResponse } from 'next/server';
import prisma from '@/index';

export async function GET() {
  try {
    const memories = await prisma.memory.findMany({
      where: { approved: true },
    });

    return NextResponse.json({
      memories,
      tableDropped: memories.length === 0,
    });
  } catch (error: any) {
    console.error('[MEMORIES_ERROR]', error);
    return NextResponse.json(
      { error: 'Database error', details: error.message },
      { status: 500 }
    );
  }
}