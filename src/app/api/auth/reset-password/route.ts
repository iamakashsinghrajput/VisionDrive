import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json({ message: 'Missing token or password.' }, { status: 400 });
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json({ message: 'Token is invalid or has expired.' }, { status: 400 });
        }

        user.password = await bcrypt.hash(password, 12);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        return NextResponse.json({ message: 'Password has been reset successfully.' }, { status: 200 });

    } catch (error) {
        console.error('RESET_PASSWORD_ERROR', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}