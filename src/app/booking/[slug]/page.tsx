"use client";

import { useState, useEffect, useMemo } from 'react';
import { getCarById } from '@/lib/carsData';
import { notFound, useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, MapPin, Calendar, User, Mail, CreditCard, Loader2 } from 'lucide-react';
import { format, add, differenceInCalendarDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { LocationPicker } from '@/components/LocationPicker';
import { DatePicker } from '@/components/DatePicker';

const PriceRow = ({ label, value, isTotal = false }: { label: string, value: string, isTotal?: boolean }) => (
    <div className={`flex justify-between items-center ${isTotal ? 'text-white font-bold text-lg border-t border-zinc-700 pt-4 mt-4' : 'text-zinc-300'}`}>
        <p>{label}</p>
        <p>{value}</p>
    </div>
);

export default function BookingPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;
    const car = getCarById(slug);

    const [isProcessing, setIsProcessing] = useState(false);
    const [isLocationPickerOpen, setLocationPickerOpen] = useState(false);
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  
    const [location, setLocation] = useState('Kolkata');
    const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: new Date(), to: add(new Date(), { days: 4 }) });

    useEffect(() => { if (!car) notFound(); }, [car]);

    const priceDetails = useMemo(() => {
        if (!car || !dateRange?.from || !dateRange?.to) return { days: 0, basePrice: 0, taxes: 0, totalPrice: 0, totalAmountInPaise: 0 };
        const days = differenceInCalendarDays(dateRange.to, dateRange.from) || 1;
        const basePrice = days * car.pricePerDay;
        const taxes = basePrice * 0.18;
        const totalPrice = Math.round(basePrice + taxes);
        return { days, basePrice, taxes, totalPrice, totalAmountInPaise: totalPrice * 100 };
    }, [car, dateRange]);

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const res = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    carId: car?.id,
                    startDate: dateRange?.from,
                    endDate: dateRange?.to
                })
            });

            if (!res.ok) throw new Error('Failed to create order');
            
            const order = await res.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'VISIONDRIVE',
                description: `Booking for ${car?.name}`,
                order_id: order.id,
        handler: async function (response: Record<string, unknown>) {
            const verifyRes = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(response),
            });
            if (verifyRes.ok) {
                router.push('/booking/success');
            } else {
                alert('Payment verification failed. Please contact support.');
            }
        },
                prefill: {
                    name: "Test User",
                    email: "test.user@example.com",
                    contact: "9999999999",
                },
                theme: { color: '#06b6d4' }
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error(error);
            alert('An error occurred during payment processing.');
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    if (!car) return <div className="bg-vision-black min-h-screen"></div>;

    return (
        <div className="bg-vision-black min-h-screen text-white font-sans">
            <LocationPicker isOpen={isLocationPickerOpen} onClose={() => setLocationPickerOpen(false)} onSelect={(city) => { setLocation(city); setLocationPickerOpen(false); }}/>
            <DatePicker isOpen={isDatePickerOpen} onClose={() => setDatePickerOpen(false)} onApply={(range) => { setDateRange(range); }}/>
            
            <main className="container mx-auto px-6 py-12 md:py-16">
                <div className="mb-8">
                    <button onClick={() => router.back()} className="group flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        Back to Car Details
                    </button>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mt-4">Confirm Your Booking</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col sm:flex-row gap-6">
                            <div className="relative w-full sm:w-1/3 h-40 sm:h-auto rounded-lg overflow-hidden">
                                <Image src={car.images.side} alt={car.name} fill className="object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-semibold text-cyan-400">{car.brand}</p>
                                <h2 className="text-2xl font-bold text-white">{car.name}</h2>
                                <p className="text-sm text-zinc-400 mt-1">{car.bodyType}</p>
                            </div>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4">Trip Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <button onClick={() => setLocationPickerOpen(true)} className="p-4 bg-zinc-800/50 rounded-lg text-left hover:bg-zinc-800 transition-colors">
                                    <div className="flex items-center gap-2 text-sm text-zinc-400"><MapPin size={16}/> Location</div>
                                    <p className="font-semibold text-white mt-1 text-lg">{location}</p>
                                </button>
                                <button onClick={() => setDatePickerOpen(true)} className="p-4 bg-zinc-800/50 rounded-lg text-left hover:bg-zinc-800 transition-colors">
                                    <div className="flex items-center gap-2 text-sm text-zinc-400"><Calendar size={16}/> Pickup & Return</div>
                                    <p className="font-semibold text-white mt-1">
                                        {dateRange?.from ? format(dateRange.from, 'dd MMM') : ''}
                                        {dateRange?.to ? ` - ${format(dateRange.to, 'dd MMM, yyyy')}` : ''}
                                    </p>
                                </button>
                            </div>
                        </div>
                         <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4">Your Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" /><input type="text" placeholder="Full Name" required className="input-auth pl-10" /></div>
                                <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" /><input type="email" placeholder="Email Address" required className="input-auth pl-10" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-24">
                            <h3 className="text-xl font-bold mb-4">Price Summary</h3>
                            <div className="space-y-3">
                                {dateRange?.from && dateRange?.to ? (
                                    <>
                                        <PriceRow label={`₹${car.pricePerDay.toLocaleString()} x ${priceDetails.days} days`} value={`₹${priceDetails.basePrice.toLocaleString()}`} />
                                        <PriceRow label="Taxes & Fees (18%)" value={`₹${priceDetails.taxes.toLocaleString()}`} />
                                        <PriceRow label="Total Amount" value={`₹${priceDetails.totalPrice.toLocaleString()}`} isTotal={true} />
                                    </>
                                ) : ( <p className="text-center text-zinc-400 py-8">Select dates to see price.</p> )}
                            </div>
                             <div className="mt-8">
                                <button onClick={handlePayment} disabled={!dateRange?.from || !dateRange?.to || isProcessing} className="w-full flex items-center justify-center gap-3 px-10 py-4 bg-cyan-400 text-black text-lg font-bold rounded-lg hover:bg-cyan-500 transition-all hover:shadow-cyan-glow hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isProcessing ? <Loader2 className="animate-spin" /> : <CreditCard size={20} />}
                                    {isProcessing ? 'Processing...' : 'Confirm &amp; Pay'}
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
