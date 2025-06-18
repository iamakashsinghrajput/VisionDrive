"use client";

import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-vision-black min-h-screen text-white">
            <header className="py-16 bg-black border-b border-zinc-800">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Contact Us</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                        We&apos;re here to help. Reach out to us for any inquiries, support, or feedback.
                    </p>
                </div>
            </header>
            <main className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Get in Touch</h2>
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-cyan-400 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-white">Our Headquarters</h3>
                                <p className="text-zinc-400">123 Visionary Road, Suite 500, Tech City, 10101</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-cyan-400 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-white">Email Us</h3>
                                <p className="text-zinc-400">For support and general inquiries.</p>
                                <a href="mailto:support@visiondrive.com" className="text-cyan-400 hover:underline">support@visiondrive.com</a>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-cyan-400 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-white">Call Us</h3>
                                <p className="text-zinc-400">Available 24/7 for our members.</p>
                                <a href="tel:+1234567890" className="text-cyan-400 hover:underline">+1 (234) 567-890</a>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 bg-zinc-900 rounded-xl border border-zinc-800">
                         <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
                         <form className="space-y-4">
                            <div className="relative">
                                <input type="text" placeholder="Your Name" required className="input-auth" />
                            </div>
                             <div className="relative">
                                <input type="email" placeholder="Your Email" required className="input-auth" />
                            </div>
                             <div className="relative">
                                <textarea placeholder="Your Message" required className="input-auth min-h-32" rows={5}></textarea>
                            </div>
                            <button type="submit" className="w-full py-3 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-500 transition-colors">
                                Send Message
                            </button>
                         </form>
                    </div>
                </div>
            </main>
        </div>
    );
}