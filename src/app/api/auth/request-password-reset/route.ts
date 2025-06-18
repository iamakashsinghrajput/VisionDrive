// src/app/api/auth/request-password-reset/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const createResetEmailTemplate = (resetLink: string) => {
    // Re-use your existing email styling
    return `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}" style="background-color: #22d3ee; color: black; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link is valid for 1 hour. If you did not request this, please ignore this email.</p>
    `;
};

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { email } = await request.json();
        
        const user = await User.findOne({ email });

        // IMPORTANT: Always send a success-like response to prevent email enumeration
        if (!user) {
            return NextResponse.json({ message: "If an account with that email exists, a password reset link has been sent." }, { status: 200 });
        }
        
        const resetToken = crypto.randomBytes(32).toString('hex');
        const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour

        user.passwordResetToken = passwordResetToken;
        user.passwordResetExpires = passwordResetExpires;
        await user.save();
        
        const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });
        const emailHtml = createResetEmailTemplate(resetLink);
        
        await transporter.sendMail({
            to: user.email,
            from: `Vision Drive <${process.env.EMAIL_FROM}>`,
            subject: 'Your Vision Drive Password Reset Link',
            html: emailHtml,
        });

        return NextResponse.json({ message: "If an account with that email exists, a password reset link has been sent." }, { status: 200 });

    } catch (error) {
        console.error('REQUEST_PASSWORD_RESET_ERROR', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}