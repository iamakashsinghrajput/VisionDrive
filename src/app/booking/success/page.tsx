// src/app/booking/success/page.tsx
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function BookingSuccessPage() {
    return (
        <div className="bg-vision-black min-h-screen text-white flex items-center justify-center">
            <div className="text-center p-8 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl max-w-lg mx-auto">
                <CheckCircle className="mx-auto h-20 w-20 text-cyan-400 mb-6" />
                <h1 className="text-3xl font-extrabold text-white">Booking Confirmed!</h1>
                <p className="text-zinc-400 mt-4">
                    Thank you for choosing VISIONDRIVE. Your adventure awaits! A confirmation email with your booking details has been sent to your inbox.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link href="/cars" className="px-6 py-3 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition-colors">
                        Explore More Cars
                    </Link>
                     <Link href="/" className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-500 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}