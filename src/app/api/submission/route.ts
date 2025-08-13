import { NextResponse } from 'next/server';
import prisma from '@/index';
import { client as redis } from '@/lib/cache';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  message: z.string().min(1, 'Message is required'),
  email: z.email('Invalid email format').optional(),
  imageUrl: z.url('Invalid URL format'),
  fPhotoUrl: z.url('Invalid URL format').optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success) {
      console.error('Validation error:', JSON.stringify(validation.error.flatten(), null, 2));
      return NextResponse.json(
        { error: validation.error.flatten() },
        { status: 400 }
      );
    }

    const memory = await prisma.memory.create({
      data: {
        name: validation.data.name,
        message: validation.data.message,
        email: validation.data.email,
        imageUrl: validation.data.imageUrl,
        fPhotoUrl: validation.data.fPhotoUrl,
      },
    });

    await redis.del('approvedMemories');

    return NextResponse.json(memory, { status: 201 });
  } catch (error: any) {
    console.error('[SUBMISSION_ERROR]', error);
    return NextResponse.json(
      { error: 'Database error', details: error.message },
      { status: 500 }
    );
  }
}