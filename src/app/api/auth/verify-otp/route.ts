import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();
    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    if (user.otp !== otp || user.otpExpires! < new Date()) {
      return NextResponse.json({ message: 'Invalid or expired OTP.' }, { status: 400 });
    }

    user.emailVerified = new Date();
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully. You can now log in.' }, { status: 200 });
  } catch (error) {
    console.error('OTP_VERIFICATION_ERROR', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}