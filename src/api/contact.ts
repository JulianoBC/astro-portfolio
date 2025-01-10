import type { APIRoute } from 'astro';
import { validateForm, type FormData, sanitizeInput } from '../utils/validation';
import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  host: import.meta.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(import.meta.env.SMTP_PORT || '587'),
  secure: import.meta.env.SMTP_SECURE === 'true',
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASS
  }
});

export const post: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const rawData = await request.json();
    
    // Sanitize and prepare form data
    const formData: FormData = {
      name: sanitizeInput(rawData.name || ''),
      email: sanitizeInput(rawData.email || ''),
      message: sanitizeInput(rawData.message || '')
    };

    // Validate form data
    const validationResult = validateForm(formData);
    if (!validationResult.isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: validationResult.errors
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Prepare email content
    const mailOptions = {
      from: import.meta.env.SMTP_FROM || formData.email,
      to: import.meta.env.CONTACT_EMAIL,
      subject: `New Contact Form Message from ${formData.name}`,
      text: `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
      `,
      html: `
<h2>New Contact Form Message</h2>
<p><strong>Name:</strong> ${formData.name}</p>
<p><strong>Email:</strong> ${formData.email}</p>
<h3>Message:</h3>
<p>${formData.message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message sent successfully'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Return error response
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to process the request',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};