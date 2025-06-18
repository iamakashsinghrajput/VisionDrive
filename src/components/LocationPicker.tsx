"use client";

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import Image from 'next/image';

// --- FIX #1: Import the SVG files as objects with a 'src' property. ---
import bangaloreIconSrc from '@/assets/icons/Bangalore.svg';
import chennaiIconSrc from '@/assets/icons/Chennai.svg';
import delhiIconSrc from '@/assets/icons/Delhi.svg';
import goaIconSrc from '@/assets/icons/Goa.svg';
import hyderabadIconSrc from '@/assets/icons/Hyderabad.svg';
import jaipurIconSrc from '@/assets/icons/Jaipur.svg';
import mumbaiIconSrc from '@/assets/icons/Mumbai.svg';
import kolkataIconSrc from '@/assets/icons/Kolkata.svg';
import puneIconSrc from '@/assets/icons/Pune.svg';
import vizagIconSrc from '@/assets/icons/Vizag.svg';

const topCities = [
    { name: 'Bengaluru', iconSrc: bangaloreIconSrc.src },
    { name: 'Chennai', iconSrc: chennaiIconSrc.src },
    { name: 'Delhi NCR', iconSrc: delhiIconSrc.src },
    { name: 'Goa', iconSrc: goaIconSrc.src },
    { name: 'Hyderabad', iconSrc: hyderabadIconSrc.src },
    { name: 'Jaipur', iconSrc: jaipurIconSrc.src },
    { name: 'Kolkata', iconSrc: kolkataIconSrc.src },
    { name: 'Mumbai', iconSrc: mumbaiIconSrc.src },
    { name: 'Pune', iconSrc: puneIconSrc.src },
    { name: 'Vizag', iconSrc: vizagIconSrc.src },
];
const otherCities = ["Ahmedabad", "Chandigarh", "Coimbatore", "Indore", "Kochi", "Udaipur", "Mangalore", "Nagpur", "Mysore", "Vijayawada"];
// const allCityNames = [...topCities.map(c => c.name), ...otherCities].sort();

const CityButton = ({ city, onSelect }: { city: { name: string, iconSrc: string }, onSelect: (city: string) => void }) => (
  <button onClick={() => onSelect(city.name)} className="flex flex-col items-center gap-2 p-2 rounded-lg text-center group hover:bg-zinc-800 transition-colors">
    <div className="w-20 h-20 flex items-center justify-center bg-zinc-300 rounded-lg text-zinc-400 border border-zinc-700 group-hover:border-cyan-400/50 transition-colors">
        <Image src={city.iconSrc} alt={city.name} width={40} height={40} />
    </div>
    <p className="font-semibold text-white text-sm">{city.name}</p>
  </button>
);

export const LocationPicker = ({ isOpen, onClose, onSelect }: { isOpen: boolean, onClose: () => void, onSelect: (city: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopCities = useMemo(() => {
    if (!searchTerm) return topCities;
    return topCities.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const filteredOtherCities = useMemo(() => {
    if (!searchTerm) return otherCities;
    return otherCities.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-700 p-6 text-left align-middle shadow-2xl shadow-black/50 transition-all">
                <div className="flex justify-between items-center">
                  <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-white">Choose City</Dialog.Title>
                  <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-400"><X className='text-white' size={20} /></button>
                </div>
                <div className="mt-4 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                    <input type="text" placeholder="Search for city" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 pl-12 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                </div>
                 <div className="mt-6">
                    <h4 className="font-semibold text-gray-400 text-sm mb-4 tracking-wider">TOP CITIES</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {filteredTopCities.map(city => <CityButton key={city.name} city={city} onSelect={onSelect} />)}
                    </div>
                </div>
                 <div className="mt-8">
                    <h4 className="font-semibold text-gray-400 text-sm mb-4 tracking-wider">OTHER CITIES</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3 max-h-40 overflow-y-auto">
                        {filteredOtherCities.map(city => <button key={city} onClick={() => onSelect(city)} className="text-left text-zinc-300 hover:text-cyan-400 py-1 transition-colors">{city}</button>)}
                    </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}