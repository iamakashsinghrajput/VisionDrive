export default function PrivacyPolicyPage() {
    return (
        <div className="bg-black min-h-screen text-white">
            <main className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
                    <p className="text-zinc-400 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <div className="prose prose-invert prose-lg max-w-none text-zinc-300 space-y-6">
                        <p>VISIONDRIVE (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) operates the visiondrive.com website (the &quot;Service&quot;). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
                        
                        <h2 className="text-white">Information Collection and Use</h2>
                        <p>We collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to, your name, email address, phone number, and payment information.</p>
                        
                        <h2 className="text-white">Use of Data</h2>
                        <p>VISIONDRIVE uses the collected data for various purposes: to provide and maintain the Service, to notify you about changes to our Service, to provide customer care and support, and to process your transactions.</p>
                        
                        <h2 className="text-white">Security of Data</h2>
                        <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}