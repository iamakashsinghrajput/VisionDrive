// src/app/api/payment/create-order/route.ts
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getCarById } from '@/lib/carsData';
import { differenceInCalendarDays } from 'date-fns';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    const { carId, startDate, endDate } = await request.json();

    if (!carId || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required booking details' }, { status: 400 });
    }

    const car = getCarById(carId);
    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    const days = differenceInCalendarDays(new Date(endDate), new Date(startDate)) || 1;
    const basePrice = days * car.pricePerDay;
    const taxes = basePrice * 0.18; // 18% tax
    const totalAmount = Math.round(basePrice + taxes);

    // Amount must be in the smallest currency unit (e.g., paise for INR)
    const amountInPaise = totalAmount * 100;

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_visiondrive_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order, { status: 200 });

  } catch (error) {
    console.error('RAZORPAY_CREATE_ORDER_ERROR', error);
    return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
  }
}