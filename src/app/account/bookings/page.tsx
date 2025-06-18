"use client";

import Image from 'next/image';
import { Calendar, Link, MapPin } from 'lucide-react';

const mockBookings = [
  { id: 1, carName: 'Mahindra Thar', carBrand: 'Mahindra', image: '/cars/image_062.png', startDate: '2025-06-18', endDate: '2025-06-22', location: 'Kolkata', status: 'Upcoming' },
  { id: 2, carName: 'Toyota Taisor', carBrand: 'Toyota', image: '/cars/image_063.png', startDate: '2025-05-10', endDate: '2025-05-15', location: 'Delhi NCR', status: 'Completed' },
  { id: 3, carName: 'Kia Syros', carBrand: 'Kia', image: '/cars/image_058.png', startDate: '2025-04-01', endDate: '2025-04-05', location: 'Goa', status: 'Completed' },
];

const BookingCard = ({ booking }: { booking: typeof mockBookings[0] }) => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden">
            <Image src={booking.image} alt={booking.carName} fill className="object-cover" />
        </div>
        <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold text-cyan-400 text-sm">{booking.carBrand}</p>
                    <h3 className="text-xl font-bold text-white">{booking.carName}</h3>
                </div>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    booking.status === 'Upcoming' ? 'bg-green-500/20 text-green-400' : 'bg-zinc-700 text-zinc-300'
                }`}>
                    {booking.status}
                </span>
            </div>
            <div className="mt-4 border-t border-zinc-700 pt-4 flex flex-col sm:flex-row gap-4 text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-zinc-500" />
                    <span>{booking.startDate} to {booking.endDate}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-zinc-500" />
                    <span>{booking.location}</span>
                </div>
            </div>
            <div className="mt-auto pt-4 flex justify-end">
                <button className="text-sm font-semibold text-cyan-400 hover:underline">
                    View Details
                </button>
            </div>
        </div>
    </div>
);


export default function MyBookingsPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">My Bookings</h2>
            {mockBookings.length > 0 ? (
                <div className="space-y-4">
                    {mockBookings.map(booking => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-zinc-900 rounded-xl border border-zinc-800">
                    <p className="text-zinc-400">You have no bookings yet.</p>
                    <Link href="/cars" className="mt-4 inline-block px-6 py-2 bg-cyan-400 text-black font-semibold rounded-md hover:bg-cyan-500 transition-colors">
                        Explore The Fleet
                    </Link>
                </div>
            )}
        </div>
    );
}