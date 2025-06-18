// src/app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

// --- The New, Professional HTML Email Template ---
const createOtpEmailTemplate = (otp: string): string => {
  const brandColor = '#22d3ee'; // Your brand's cyan color
  const textColor = '#1f2937';
  const backgroundColor = '#f9fafb';
  const mainBackgroundColor = '#ffffff';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
            .container { width: 100%; max-width: 600px; margin: 0 auto; }
            .header { padding: 40px 0; text-align: center; }
            .logo { font-size: 28px; font-weight: bold; letter-spacing: 1px; color: #e5e7eb; }
            .logo-drive { color: ${brandColor}; }
            .content { background-color: ${mainBackgroundColor}; padding: 40px; border-radius: 8px; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; }
        </style>
    </head>
    <body style="background-color: ${backgroundColor};">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${backgroundColor};">
            <tr>
                <td align="center">
                    <table class="container" border="0" cellspacing="0" cellpadding="0">
                        <!-- Header / Logo -->
                        <tr>
                            <td class="header">
                                <div class="logo">
                                    <span>VISION</span><span class="logo-drive">DRIVE</span>
                                </div>
                            </td>
                        </tr>
                        <!-- Main Content -->
                        <tr>
                            <td>
                                <div class="content" style="color: ${textColor};">
                                    <h1 style="font-size: 24px; font-weight: bold; margin-top: 0;">Confirm Your Account</h1>
                                    <p style="font-size: 16px; line-height: 1.5; color: #4b5563;">
                                        Thank you for signing up with Vision Drive. Please use the following One-Time Password (OTP) to complete your registration.
                                    </p>
                                    
                                    <!-- OTP Box -->
                                    <div style="background-color: #f3f4f6; border-radius: 8px; text-align: center; padding: 20px; margin: 30px 0;">
                                        <p style="font-size: 14px; color: #6b7280; margin: 0 0 10px 0;">Your verification code is</p>
                                        <p style="font-size: 36px; font-weight: bold; color: ${textColor}; letter-spacing: 8px; margin: 0;">
                                            ${otp}
                                        </p>
                                    </div>
                                    
                                    <!-- Timing and Note -->
                                    <p style="font-size: 14px; line-height: 1.5; color: #4b5563;">
                                        This code is valid for <strong>10 minutes</strong>. If you did not request this, please disregard this email.
                                    </p>
                                </div>
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td class="footer">
                                <p>© ${new Date().getFullYear()} Vision Drive. All Rights Reserved.</p>
                                <p>123 Visionary Road, Suite 500, Tech City</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
};


export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
      console.error("Email server credentials are not configured in .env.local.");
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    await dbConnect();
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.emailVerified) {
      return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    if (existingUser) {
        existingUser.password = hashedPassword;
        existingUser.otp = otp;
        existingUser.otpExpires = otpExpires;
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        await existingUser.save();
    } else {
        await User.create({ firstName, lastName, name: `${firstName} ${lastName}`, email, password: hashedPassword, otp, otpExpires });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });
    
    const emailHtml = createOtpEmailTemplate(otp);

    const mailOptions = {
        from: `Vision Drive <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Your Vision Drive Verification Code',
        html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'User registration initiated. Please check your email for an OTP.' }, { status: 201 });
  } catch (error) {
    console.error('REGISTRATION_ERROR', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}