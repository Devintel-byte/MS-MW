import { NextResponse } from 'next/server';
import prisma from '@/index';
import { client as redis } from '@/lib/cache';
import * as z from 'zod';
import { sendMemoryEmail } from '@/lib/mailer';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  message: z.string().min(1, 'Message is required'),
  email: z.string().email('Invalid email format').optional(),
  imageUrl: z.string().url('Invalid URL format'),
  fPhotoUrl: z.string().url('Invalid URL format').optional(),
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

    console.log('Created memory:', JSON.stringify(memory, null, 2));
    await redis.del('approvedMemories');
    console.log('Redis cache cleared: approvedMemories');

    if (validation.data.email && memory.fPhotoUrl) {
      const emailResult = await sendMemoryEmail({
        email: validation.data.email,
        name: validation.data.name,
        fPhotoUrl: memory.fPhotoUrl,
      });
      if (!emailResult.success) {
        console.error('Failed to send email:', emailResult.error);
        // Continue with success response
      }
    }

    return NextResponse.json(memory, { status: 201 });
  } catch (error: any) {
    console.error('[SUBMISSION_ERROR]', error);
    return NextResponse.json(
      { error: 'Database error', details: error.message },
      { status: 500 }
    );
  }
}