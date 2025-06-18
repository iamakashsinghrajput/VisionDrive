const faqs = [
    { q: "What do I need to rent a car?", a: "You need a valid driver's license, a major credit card in your name, and proof of insurance. Drivers must be 25 years or older for most of our exotic vehicles." },
    { q: "Is there a mileage limit?", a: "Our standard rental includes 100 miles per day. Additional mileage can be purchased at a discounted rate. Please contact us for long-term rental packages." },
    { q: "Can I have a car delivered to my location?", a: "Yes! We offer delivery and pickup services to airports, hotels, and private residences within our service area. Fees may apply." },
    { q: "What is your cancellation policy?", a: "You can cancel free of charge up to 48 hours before your rental start time. Cancellations within 48 hours are subject to a fee. Please see our Terms of Service for full details." },
];

export default function FAQPage() {
    return (
        <div className="bg-black text-white py-24 sm:py-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
                    <p className="mt-4 text-gray-400">Have questions? We have answers. If you can&apos;t find what you&apos;re looking for, please contact us.</p>
                </div>
                <div className="mt-16 space-y-12">
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <h3 className="text-xl font-semibold text-cyan-400">{faq.q}</h3>
                            <p className="mt-2 text-gray-300">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}