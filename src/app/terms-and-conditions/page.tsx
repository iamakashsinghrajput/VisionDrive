export default function TermsAndConditionsPage() {
    return (
        <div className="bg-black min-h-screen text-white">
            <main className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Terms and Conditions</h1>
                    <p className="text-zinc-400 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <div className="prose prose-invert prose-lg max-w-none text-zinc-300 space-y-6">
                        <h2 className="text-white">1. Agreement to Terms</h2>
                        <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.</p>
                        
                        <h2 className="text-white">2. Bookings and Payments</h2>
                        <p>All bookings are subject to vehicle availability. We reserve the right to refuse or cancel your booking at any time for certain reasons, including but not limited to: vehicle availability, errors in the description or price of the product, or other reasons. You must provide current, complete, and accurate purchase and account information for all bookings made at our service.</p>
                        
                        <h2 className="text-white">3. User Conduct</h2>
                        <p>You agree not to use the vehicle for any illegal purpose or in any way that violates these Terms. You are responsible for all activity that occurs under your account, and you agree to maintain the security of your account password.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}