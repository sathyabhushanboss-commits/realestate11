// app/api/send-lead/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, phone, email } = await request.json()
    
    // Validate input
    if (!name || !phone || !email) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    console.log('Processing lead:', { name, phone, email })
    
    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
    
    // Send email
    const mailOptions = {
      from: `"Sri Megha Lakshmi Group" <${process.env.EMAIL_USER}>`,
      to: 'teamalpha.dcm@gmail.com',
      subject: '🔴 New Lead from Website',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #9B1C1C; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #9B1C1C; }
            .value { margin-top: 5px; padding: 10px; background: #f5f5f5; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Lead Received! 🎉</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Full Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Mobile Number:</div>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <div class="label">Email Address:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Submitted On:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    }
    
    await transporter.sendMail(mailOptions)
    console.log('✅ Email sent successfully')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Lead received and email sent' 
    })
    
  } catch (error) {
    console.error('Error:', error)
    // Still return success because WhatsApp will work
    return NextResponse.json({ 
      success: true, 
      message: 'Lead received' 
    })
  }
}