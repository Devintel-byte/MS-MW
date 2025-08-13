import { NextResponse } from 'next/server';
import prisma from '@/index';
import { client as redis } from '@/lib/cache';
import { Memory } from '@/generated/prisma';
import { createHash } from 'crypto';

export async function GET() {
  try {
    // Try cache first
    let memories: Memory[] | null = null;
    const cached = await redis.get('approvedMemories');

    if (cached) {
      memories = JSON.parse(cached);
    } else {
      memories = await prisma.memory.findMany({
        where: { approved: true },
        orderBy: { createdAt: 'desc' },
      });
      await redis.set('approvedMemories', JSON.stringify(memories), {
        EX: 3600, // 1 hour cache
      });
    }

    // Generate a hash of the memories to detect changes
    const hash = createHash('sha256')
      .update(JSON.stringify(memories))
      .digest('hex');

    return NextResponse.json({
      memories,
      hash,
      tableDropped: false,
    });
  } catch (error: any) {
    console.error('[MEMORIES_ERROR]', error);

    // Handle table not found (P2021) or other database errors
    if (error.code === 'P2021') {
      // Table doesn't exist
      return NextResponse.json(
        {
          memories: [],
          hash: '',
          tableDropped: true,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Database error', details: error.message },
      { status: 500 }
    );
  }
}