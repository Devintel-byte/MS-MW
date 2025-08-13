import { NextResponse } from 'next/server'
import prisma from '@/index'
import { client as redis } from '@/lib/cache'
import  * as z  from 'zod'

const schema = z.object({
  name: z.string().min(1),
  message: z.string().min(1),
  email: z.email().optional(),
  imageUrl: z.url(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received submission:', body);
    const validation = schema.safeParse(body)

    if (!validation.success) {
      console.error('Validation error:', validation.error.flatten());
      return NextResponse.json(
        { error: validation.error.flatten() },
        { status: 400 }
      )
    }

    // Explicitly create with all required fields
    console.log('Validated data:', validation.data);
    const memory = await prisma.memory.create({
      data: {
        name: validation.data.name,
        message: validation.data.message,
        email: validation.data.email,
        imageUrl: validation.data.imageUrl,
      },
    })

    await redis.del('approvedMemories')
    console.log('Redis cache cleared: approvedMemories');

    return NextResponse.json(memory, { status: 201 })
  } catch (error) {
    console.error('[SUBMISSION_ERROR]', error)
    return NextResponse.json(
      { error: 'Database error' },
      { status: 500 }
    )
  }
}