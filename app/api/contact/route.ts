import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const CONTACT_EMAIL = "subrojitroy@polynovearecords.in";
const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

interface ContactFormData {
  name: string;
  email: string;
  who: string;
  interest: string;
  message: string;
}

// Create transporter for Gmail
const createTransporter = () => {
  if (!GMAIL_EMAIL || !GMAIL_APP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_EMAIL,
      pass: GMAIL_APP_PASSWORD,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.who || !body.interest || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If Gmail credentials are configured, send email
    const transporter = createTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: GMAIL_EMAIL,
          to: CONTACT_EMAIL,
          replyTo: body.email,
          subject: `New Contact: ${body.who} - ${body.interest}`,
          html: `
            <h2>New Contact Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
            <p><strong>Who:</strong> ${escapeHtml(body.who)}</p>
            <p><strong>Interest:</strong> ${escapeHtml(body.interest)}</p>
            <h3>Message:</h3>
            <p>${escapeHtml(body.message).replace(/\n/g, '<br>')}</p>
          `,
        });

        return NextResponse.json(
          { success: true, message: 'Email sent successfully' },
          { status: 200 }
        );
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        return NextResponse.json(
          { error: 'Failed to send email' },
          { status: 500 }
        );
      }
    }

    // Fallback: Log the submission if Gmail is not configured
    console.log('Contact form submission received (email not configured):', {
      timestamp: new Date().toISOString(),
      ...body,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Submission received. Email service not yet configured.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
