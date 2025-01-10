import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { rateLimit } from '@utils/rate-limit';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
  maxRequests: 5,
});

const transporter = nodemailer.createTransport({
  host: import.meta.env.SMTP_HOST,
  port: parseInt(import.meta.env.SMTP_PORT),
  secure: true,
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASS,
  },
});

const validateFormData = (data: any): data is ContactFormData => {
  if (!data || typeof data !== 'object') return false;
  
  const { name, email, message } = data;
  if (!name || !email || !message) return false;
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  return true;
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  console.log(`[Contact Form] New request from ${clientAddress}`);
  
  try {
    // Rate limiting check
    try {
      await limiter.check(5, clientAddress);
    } catch {
      console.log(`[Contact Form] Rate limit exceeded for ${clientAddress}`);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Too many requests. Please try again later.',
        }),
        { status: 429 }
      );
    }

    const data = await request.json();

    // Validate form data
    if (!validateFormData(data)) {
      console.log(`[Contact Form] Invalid form data from ${clientAddress}`);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid form data',
        }),
        { status: 400 }
      );
    }

    // Send email
    await transporter.sendMail({
      from: import.meta.env.SMTP_FROM,
      to: import.meta.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Message:
${data.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Message:</strong></p>
<p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log(`[Contact Form] Successfully sent email for ${clientAddress}`);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message sent successfully',
      }),
      { status: 200 }
    );
    
  } catch (error) {
    console.error('[Contact Form] Error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error',
      }),
      { status: 500 }
    );
  }
};