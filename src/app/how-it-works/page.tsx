// src/app/how-it-works/page.tsx

const steps = [
  { num: "01", title: "Browse & Select", description: "Explore our curated fleet of luxury cars and performance bikes. Find the perfect vehicle for your adventure." },
  { num: "02", title: "Book & Confirm", description: "Choose your dates, provide your details, and securely book online. You'll receive an instant confirmation." },
  { num: "03", title: "Enjoy The Ride", description: "Pick up your vehicle or have it delivered. The keys are yours. Experience the drive of a lifetime." },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-black text-white py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">How It Works</h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">Renting your dream car is just three simple steps away.</p>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.num} className="relative text-center md:text-left">
              <p className="absolute -top-8 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 text-7xl font-bold text-cyan-400/20">{step.num}</p>
              <h3 className="relative text-2xl font-bold mt-8">{step.title}</h3>
              <p className="relative mt-4 text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}