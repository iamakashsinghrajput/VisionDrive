// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { Gauge, Zap, Users, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import { carsData } from "@/lib/carsData";
// import type { Car } from "@/lib/carsData";

// const featuredCarSlugs = [
//   'kia-syros',
//   'mahindra-thar',
//   'tata-curvv-ev',
//   'mahindra-scorpio-n',
// ];

// const featuredCars = carsData.filter(car => featuredCarSlugs.includes(car.id));

// type CarView = 'side' | 'front' | 'back';

// const FleetShowcase = () => {
//   const [selectedCar, setSelectedCar] = useState<Car | null>(featuredCars[0] || null);
//   const [currentView, setCurrentView] = useState<CarView>('side');

//   const handleSelectCar = (car: Car) => {
//     setSelectedCar(car);
//     setCurrentView('side');
//   };

//   const carImageViews: CarView[] = ['side', 'front', 'back'];
  
//   if (!selectedCar) {
//     return null;
//   }

//   return (
//     <section className="bg-black text-white py-16 sm:py-24">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
//             Our <span className="text-cyan-400">Featured Fleet</span>
//           </h2>
//           <p className="mt-4 max-w-2xl mx-auto text-gray-400">
//             A glimpse into the world-class vehicles waiting for you.
//           </p>
//         </div>

//         <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
            
//             <div className="relative">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={selectedCar.id + currentView}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   transition={{ duration: 0.3, ease: 'easeOut' }}
//                   className="aspect-video"
//                 >
//                   <Image
//                     src={selectedCar.images[currentView]}
//                     alt={`${selectedCar.name} ${currentView} view`}
//                     fill
//                     priority
//                     className="object-contain"
//                   />
//                 </motion.div>
//               </AnimatePresence>
              
//               <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-2 bg-zinc-800 p-1.5 rounded-lg border border-zinc-700">
//                 {carImageViews.map((view) => (
//                   <button
//                     key={view}
//                     onClick={() => setCurrentView(view)}
//                     className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
//                       currentView === view ? 'bg-cyan-400 text-zinc-900' : 'bg-transparent text-white hover:bg-zinc-700'
//                     }`}
//                   >
//                     {view.charAt(0).toUpperCase() + view.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex flex-col justify-center">
//               <div>
//                 <p className="text-cyan-400 font-semibold">{selectedCar.brand}</p>
//                 <h3 className="text-3xl lg:text-4xl font-bold tracking-tight">{selectedCar.name}</h3>
//               </div>
              
//               <div className="mt-6 grid grid-cols-3 gap-4 text-center border-y border-zinc-800 py-4">
//                 <div>
//                   <Gauge className="h-6 w-6 text-zinc-500 mx-auto mb-1"/>
//                   <p className="text-lg font-semibold">{selectedCar.specs.horsepower} HP</p>
//                   <p className="text-xs text-gray-400">Horsepower</p>
//                 </div>
//                 <div>
//                   <Zap className="h-6 w-6 text-zinc-500 mx-auto mb-1"/>
//                   <p className="text-lg font-semibold truncate">{selectedCar.specs.engine}</p>
//                   <p className="text-xs text-gray-400">Engine</p>
//                 </div>
//                 <div>
//                   <Users className="h-6 w-6 text-zinc-500 mx-auto mb-1"/>
//                   <p className="text-lg font-semibold">{selectedCar.specs.drive}</p>
//                   <p className="text-xs text-gray-400">Drivetrain</p>
//                 </div>
//               </div>

//               <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//                   <div>
//                       <p className="text-sm text-gray-400">Starts from</p>
//                       <p className="text-2xl font-bold text-cyan-400">₹{selectedCar.pricePerDay.toLocaleString()}<span className="text-base font-normal text-gray-300">/day</span></p>
//                   </div>
//                   <Link href={`/cars/${selectedCar.id}`} className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-md bg-cyan-400 px-6 py-3 text-base font-semibold text-zinc-900 transition-all duration-300 hover:shadow-cyan-glow hover:scale-105">
//                       View Details
//                       <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
//                   </Link>
//               </div>
//             </div>
//           </div>
          
//           <div className="border-t border-zinc-800 p-4">
//             <div className="relative flex gap-4 overflow-x-auto pb-2">
//                 {featuredCars.map((car) => (
//                     <button
//                         key={car.id}
//                         onClick={() => handleSelectCar(car)}
//                         className="relative flex-shrink-0 w-28 h-20 flex flex-col items-center justify-center rounded-lg p-2 transition-colors duration-300 hover:bg-zinc-800"
//                     >
//                         <div className="relative w-full h-10">
//                              <Image src={car.images.side} alt={car.name} fill className="object-contain" />
//                         </div>
//                         <p className={`mt-1 text-xs font-semibold transition-colors ${selectedCar.id === car.id ? 'text-cyan-400' : 'text-gray-400'}`}>{car.name}</p>
                        
//                         {selectedCar.id === car.id && (
//                             <motion.div
//                                 layoutId="fleet-showcase-selector"
//                                 className="absolute inset-0 border-2 border-cyan-400 rounded-lg"
//                                 transition={{ type: 'spring', stiffness: 300, damping: 25 }}
//                             />
//                         )}
//                     </button>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FleetShowcase;



"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Zap, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { carsData } from "@/lib/carsData";
import type { Car } from "@/lib/carsData";
import { useSession } from "next-auth/react"; // <-- 1. Import useSession

const featuredCarSlugs = [
  'kia-syros',
  'mahindra-thar',
  'tata-curvv-ev',
  'mahindra-scorpio-n',
];

const featuredCars = carsData.filter(car => featuredCarSlugs.includes(car.id));

type CarView = 'side' | 'front' | 'back';

const FleetShowcase = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(featuredCars[0] || null);
  const [currentView, setCurrentView] = useState<CarView>('side');
  
  const { status } = useSession(); // <-- 2. Use the hook to get auth status
  const isAuthenticated = status === 'authenticated';

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car);
    setCurrentView('side');
  };

  const carImageViews: CarView[] = ['side', 'front', 'back'];
  
  if (!selectedCar) {
    return null;
  }

  // 3. Create the dynamic link based on authentication status
  const viewDetailsLink = isAuthenticated
    ? `/cars/${selectedCar.id}`
    : `/signin?callbackUrl=/cars/${selectedCar.id}`;

  return (
    <section className="bg-black text-white py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Our <span className="text-cyan-400">Featured Fleet</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            A glimpse into the world-class vehicles waiting for you.
          </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
            
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCar.id + currentView}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="aspect-video"
                >
                  <Image
                    src={selectedCar.images[currentView]}
                    alt={`${selectedCar.name} ${currentView} view`}
                    fill
                    priority
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-2 bg-zinc-800 p-1.5 rounded-lg border border-zinc-700">
                {carImageViews.map((view) => (
                  <button
                    key={view}
                    onClick={() => setCurrentView(view)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      currentView === view ? 'bg-cyan-400 text-zinc-900' : 'bg-transparent text-white hover:bg-zinc-700'
                    }`}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div>
                <p className="text-cyan-400 font-semibold">{selectedCar.brand}</p>
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight">{selectedCar.name}</h3>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4 text-center border-y border-zinc-800 py-4">
                <div>
                  <Gauge className="h-6 w-6 text-zinc-500 mx-auto mb-1"/>
                  <p className="text-lg font-semibold">{selectedCar.specs.horsepower} HP</p>
                  <p className="text-xs text-gray-400">Horsepower</p>
                </div>
                <div>
                  <Zap className="h-6 w-6 text-zinc-500 mx-auto mb-1"/>
                  <p className="text-lg font-semibold truncate">{selectedCar.specs.engine}</p>
                  <p className="text-xs text-gray-400">Engine</p>
                </div>
                <div>
                  <Users className="h-6 w-6 text-zinc-500 mx-auto mb-1"/>
                  <p className="text-lg font-semibold">{selectedCar.specs.drive}</p>
                  <p className="text-xs text-gray-400">Drivetrain</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                      <p className="text-sm text-gray-400">Starts from</p>
                      <p className="text-2xl font-bold text-cyan-400">₹{selectedCar.pricePerDay.toLocaleString()}<span className="text-base font-normal text-gray-300">/day</span></p>
                  </div>
                  {/* --- THIS IS THE CHANGE --- */}
                  <Link href={viewDetailsLink} className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-md bg-cyan-400 px-6 py-3 text-base font-semibold text-zinc-900 transition-all duration-300 hover:shadow-cyan-glow hover:scale-105">
                      View Details
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-zinc-800 p-4">
            <div className="relative flex gap-4 overflow-x-auto pb-2">
                {featuredCars.map((car) => (
                    <button
                        key={car.id}
                        onClick={() => handleSelectCar(car)}
                        className="relative flex-shrink-0 w-28 h-20 flex flex-col items-center justify-center rounded-lg p-2 transition-colors duration-300 hover:bg-zinc-800"
                    >
                        <div className="relative w-full h-10">
                             <Image src={car.images.side} alt={car.name} fill className="object-contain" />
                        </div>
                        <p className={`mt-1 text-xs font-semibold transition-colors ${selectedCar.id === car.id ? 'text-cyan-400' : 'text-gray-400'}`}>{car.name}</p>
                        
                        {selectedCar.id === car.id && (
                            <motion.div
                                layoutId="fleet-showcase-selector"
                                className="absolute inset-0 border-2 border-cyan-400 rounded-lg"
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            />
                        )}
                    </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetShowcase;