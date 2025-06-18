"use client";

import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import Slider from 'rc-slider';

type BaseFilterProps = {
  label: string;
  icon: React.ReactNode;
  activeCount: number;
};

export const FilterPillPopover = ({ label, icon, activeCount, options, selected, onToggle, onApply }: BaseFilterProps & {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  onApply: () => void;
}) => (
  <Popover as="div" className="relative">
    {({ open, close }) => (
      <>
        <Popover.Button className={clsx("flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none transition-all duration-200 border", 
          open || activeCount > 0 
            ? 'bg-zinc-700 text-white border-zinc-600' 
            : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border-zinc-700'
        )}>
          {icon}
          <span>{label}</span>
          {activeCount > 0 && <span className="bg-cyan-400 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{activeCount}</span>}
          <ChevronDown className={clsx("h-4 w-4 text-zinc-400 transition-transform", open && 'rotate-180')} />
        </Popover.Button>
        <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
          <Popover.Panel className="absolute z-10 mt-3 w-80 max-w-sm transform -translate-x-1/2 left-1/2">
            <div className="overflow-hidden rounded-xl bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-black/50 border border-white/10">
              <div className="relative p-4">
                <div className="grid grid-cols-2 gap-2">
                  {options.map(option => {
                    const isSelected = selected.includes(option);
                    return (
                      <button key={option} onClick={() => onToggle(option)} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${ isSelected ? 'bg-cyan-400 text-black' : 'bg-zinc-800 text-gray-200 hover:bg-zinc-700' }`}>
                        {option}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-4 border-t border-zinc-700 pt-4">
                  <button onClick={() => { onApply(); close(); }} className="w-full px-4 py-2 bg-cyan-400 text-black text-sm font-semibold rounded-md hover:bg-cyan-500 transition-all hover:scale-105">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);

export const PriceFilterPopover = ({ label, icon, active, priceRange, setPriceRange, minMax, onApply }: BaseFilterProps & {
  active: boolean;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  minMax: [number, number];
  onApply: () => void;
}) => (
  <Popover as="div" className="relative">
    {({ open, close }) => (
      <>
        <Popover.Button className={clsx("flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none transition-all duration-200 border", 
          open || active 
            ? 'bg-zinc-700 text-white border-zinc-600' 
            : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border-zinc-700'
        )}>
          {icon}
          <span>{label}</span>
          {active && <span className="bg-cyan-400/80 w-2 h-2 rounded-full" />}
          <ChevronDown className={clsx("h-4 w-4 text-zinc-400 transition-transform", open && 'rotate-180')} />
        </Popover.Button>
        <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
          <Popover.Panel className="absolute z-10 mt-3 w-80 max-w-sm transform -translate-x-1/2 left-1/2">
            <div className="overflow-hidden rounded-xl bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-black/50 border border-white/10">
              <div className="relative p-6">
                  <h4 className="text-sm font-semibold text-white mb-4">Price per day</h4>
                  <Slider
                    // --- Existing Props ---
                    range min={minMax[0]} max={minMax[1]} value={priceRange}
                    onChange={(value) => setPriceRange(value as [number, number])} 
                    step={500} allowCross={false}
                    trackStyle={{ backgroundColor: '#22d3ee', height: 4 }}
                    handleStyle={{ borderColor: '#22d3ee', backgroundColor: '#0A0A0A', height: 18, width: 18, opacity: 1, borderWidth: 2 }}
                    railStyle={{ backgroundColor: '#3f3f46', height: 4 }}
                    
                    // --- ADDED THIS LOGIC ---
                    onBeforeChange={() => document.body.classList.add('select-none')}
                    onAfterChange={() => document.body.classList.remove('select-none')}
                  />
                  <div className="flex justify-between text-sm text-gray-300 mt-2 font-mono">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                 <div className="mt-6 border-t border-zinc-700 pt-4">
                  <button onClick={() => { onApply(); close(); }} className="w-full px-4 py-2 bg-cyan-400 text-black text-sm font-semibold rounded-md hover:bg-cyan-500 transition-all hover:scale-105">
                    Apply Price
                  </button>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);