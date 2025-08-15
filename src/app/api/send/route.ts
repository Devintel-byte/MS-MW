import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    

    const {data} = await resend.emails.send({
      from: 'MemoryWall <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'hello world, I am the dev in charge',
      html: '<p>Testing the memory wall emailing and it works!</p>',
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error('[EMAIL_ERROR]', error);
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}

// Abandoned this as it solely for testing the RESEND API