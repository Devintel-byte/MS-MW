import nodemailer from 'nodemailer';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { EmailTemplate } from '@/email/EmailTemplate';

interface SendMemoryEmailParams {
  email: string;
  name: string;
  fPhotoUrl: string;
}

export async function sendMemoryEmail({ email, name, fPhotoUrl }: SendMemoryEmailParams) {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // Use SSL for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Fetch image for attachment
    const response = await axios.get(fPhotoUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data);

    // Load logo from public directory
    const logoPath = path.join(process.cwd(), 'public', 'icon_resized.png');
    const logoBuffer = fs.existsSync(logoPath) ? fs.readFileSync(logoPath) : null;

    // Generate HTML from EmailTemplate
    const htmlContent = EmailTemplate({ name, fPhotoUrl });

    // Prepare attachments
    const attachments = [
      {
        filename: 'framed-memory.png',
        content: imageBuffer,
        cid: 'framedPhoto', 
      },
    ];

    if (logoBuffer) {
      attachments.push({
        filename: 'icon_lg.png',
        content: logoBuffer,
        cid: 'logo', 
      });
    }

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your Memory Wall Framed Photo',
      html: htmlContent,
      attachments,
    });

    // console.log('Email sent:', info.messageId);
    return { success: true };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}