import { NextRequest, NextResponse } from 'next/server';

const CONTACT_EMAIL = "subrojitroy@polynovearecords.in";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

interface ContactFormData {
  name: string;
  email: string;
  who: string;
  interest: string;
  message: string;
}

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

    // If Resend is configured, use it
    if (RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'noreply@polynovearecords.in',
          to: CONTACT_EMAIL,
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
          reply_to: body.email,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Resend API error:', error);
        return NextResponse.json(
          { error: 'Failed to send email' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    }

    // Fallback: Log the submission if Resend is not configured
    console.log('Contact form submission received:', {
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
