import { Award, Target, Users } from "lucide-react";

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
        <div className="flex items-center gap-4">
            <div className="bg-cyan-400/10 text-cyan-400 p-2 rounded-lg">{icon}</div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="mt-4 text-zinc-400">{children}</p>
    </div>
);

export default function AboutUsPage() {
    return (
        <div className="bg-vision-black min-h-screen text-white">
            <header className="py-16 bg-black border-b border-zinc-800">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">About <span className="text-cyan-400">VISIONDRIVE</span></h1>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                        Redefining the journey with a fleet curated for performance, luxury, and style.
                    </p>
                </div>
            </header>
            <main className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-invert prose-lg max-w-none text-zinc-300">
                        <p className="lead">
                            Founded on the principle that driving should be more than just transportation, VISIONDRIVE was born from a passion for automotive excellence and a desire to share that passion with the world. We believe that every journey is an opportunity for an unforgettable experience.
                        </p>
                        <p>
                            Our mission is to provide not just a car, but the perfect vehicle for your moment. Whether it&apos;s a weekend getaway, a special occasion, or the simple desire to experience world-class engineering, our meticulously maintained fleet is at your disposal. We combine cutting-edge technology with personalized, 24/7 concierge service to ensure your rental experience is as seamless and exhilarating as the drive itself.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard title="Our Mission" icon={<Target />}>
                            To provide an unparalleled selection of premium vehicles and a seamless, tech-forward rental experience that exceeds every expectation.
                        </FeatureCard>
                        <FeatureCard title="Our Fleet" icon={<Award />}>
                           Each vehicle is hand-picked for its performance, design, and heritage, ensuring a drive that is nothing short of extraordinary.
                        </FeatureCard>
                         <FeatureCard title="Our Team" icon={<Users />}>
                           A dedicated group of automotive enthusiasts and service professionals committed to making your journey perfect.
                        </FeatureCard>
                    </div>
                </div>
            </main>
        </div>
    );
}