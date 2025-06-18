"use client";

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { X } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import Slider from 'rc-slider';
import { Calendar } from '@/components/ui/calendar';

const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${String(formattedHours).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${ampm}`;
};

export const DatePicker = ({ isOpen, onClose, onApply }: { isOpen: boolean, onClose: () => void, onApply: (range: DateRange | undefined, times: { start: string, end: string }) => void }) => {
  const [range, setRange] = useState<DateRange | undefined>();
  const [startTime, setStartTime] = useState(10 * 60);
  const [endTime, setEndTime] = useState(10 * 60);

  const handleApply = () => {
    onApply(range, { start: formatTime(startTime), end: formatTime(endTime) });
    onClose();
  };
  
  return (
     <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-700 p-8 text-left align-middle shadow-2xl shadow-black/50 transition-all">
                <div className="flex justify-between items-center">
                  <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-white">Select Dates & Times</Dialog.Title>
                  <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-800"><X className='text-white' size={20} /></button>
                </div>
                <div className="mt-6 flex justify-center">
                  <Calendar 
                    mode="range" 
                    selected={range} 
                    onSelect={setRange} 
                    numberOfMonths={2} 
                    fromDate={new Date()} 
                    disabled={{ before: new Date() }}
                  />
                </div>
                <div className="mt-6 border-t border-zinc-800 pt-6">
                    <h4 className="text-lg font-bold text-white mb-4">Select Pickup & Return Time</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-medium text-zinc-300">Pickup Time</p>
                                <p className="font-mono font-semibold text-white bg-zinc-800 px-3 py-1 rounded-md">{formatTime(startTime)}</p>
                            </div>
                            <Slider min={0} max={23*60+30} step={30} value={startTime} onChange={(v) => setStartTime(v as number)} 
                                onBeforeChange={() => document.body.classList.add('select-none')}
                                onChangeComplete={() => document.body.classList.remove('select-none')}
                                trackStyle={{ backgroundColor: '#22d3ee', height: 4 }} 
                                handleStyle={{ borderColor: '#22d3ee', backgroundColor: '#0A0A0A', height: 18, width: 18, borderWidth: 2, opacity: 1 }} 
                                railStyle={{ backgroundColor: '#3f3f46', height: 4 }}
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-medium text-zinc-300">Return Time</p>
                                <p className="font-mono font-semibold text-white bg-zinc-800 px-3 py-1 rounded-md">{formatTime(endTime)}</p>
                            </div>
                           <Slider min={0} max={23*60+30} step={30} value={endTime} onChange={(v) => setEndTime(v as number)} 
                                onBeforeChange={() => document.body.classList.add('select-none')}
                                onChangeComplete={() => document.body.classList.remove('select-none')}
                                trackStyle={{ backgroundColor: '#22d3ee', height: 4 }} 
                                handleStyle={{ borderColor: '#22d3ee', backgroundColor: '#0A0A0A', height: 18, width: 18, borderWidth: 2, opacity: 1 }} 
                                railStyle={{ backgroundColor: '#3f3f46', height: 4 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-end">
                    <button onClick={handleApply} disabled={!range || !range.from || !range.to} className="w-full sm:w-auto px-10 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Confirm Selection
                    </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}