"use client";

import { useState, useEffect, useMemo } from 'react';
import { format, add } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { CarCard, CarCardSkeleton } from '@/components/CarCard';
import { FilterPillPopover, PriceFilterPopover } from '@/components/FilterPopover';
import { LocationPicker } from '@/components/LocationPicker';
import { DatePicker } from '@/components/DatePicker';
import { carsData } from '@/lib/carsData';
import { MapPin, Calendar, GitCommit, Fuel, DollarSign,Shield, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const CARS_PER_PAGE = 9;

const allBrands = [...new Set(carsData.map(car => car.brand))].sort();
const allDriveTypes = [...new Set(carsData.map(car => car.specs.drive))].sort();
const allFuelTypes = [...new Set(carsData.map(car => car.specs.fuelType))].sort();
const prices = carsData.map(car => car.pricePerDay);
const priceMinMax: [number, number] = [Math.min(...prices), Math.max(...prices)];

type Filters = {
  brands: string[];
  driveTypes: string[];
  fuelTypes: string[];
};

const initialFilters: Filters = { brands: [], driveTypes: [], fuelTypes: [] };

export default function CarsPage() {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [priceFilter, setPriceFilter] = useState<[number, number]>(priceMinMax);
  const [sortKey, setSortKey] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  const [isLocationPickerOpen, setLocationPickerOpen] = useState(false);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  
  const [location, setLocation] = useState('Kolkata');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: new Date(), to: add(new Date(), { days: 3 }) });
  const [times, setTimes] = useState({ start: '10:00 AM', end: '10:00 AM'});

  useEffect(() => { setLoading(false) }, []);

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [category]: prev[category].includes(value) ? prev[category].filter(item => item !== value) : [...prev[category], value] }));
  };
  
  const filteredAndSortedCars = useMemo(() => {
    const result = carsData.filter(car => 
      (filters.brands.length === 0 || filters.brands.includes(car.brand)) &&
      (filters.driveTypes.length === 0 || filters.driveTypes.includes(car.specs.drive)) &&
      (filters.fuelTypes.length === 0 || filters.fuelTypes.includes(car.specs.fuelType)) &&
      (car.pricePerDay >= priceFilter[0] && car.pricePerDay <= priceFilter[1])
    );
    switch (sortKey) {
      case 'price_asc': result.sort((a, b) => a.pricePerDay - b.pricePerDay); break;
      case 'price_desc': result.sort((a, b) => b.pricePerDay - a.pricePerDay); break;
      case 'hp_desc': result.sort((a, b) => b.specs.horsepower - a.specs.horsepower); break;
    }
    return result;
  }, [filters, priceFilter, sortKey]);

  useEffect(() => { setCurrentPage(1); }, [filters, priceFilter, sortKey]);
  
  const totalPages = Math.ceil(filteredAndSortedCars.length / CARS_PER_PAGE);
  const paginatedCars = filteredAndSortedCars.slice((currentPage - 1) * CARS_PER_PAGE, currentPage * CARS_PER_PAGE);
  
  const isPriceFiltered = priceFilter[0] > priceMinMax[0] || priceFilter[1] < priceMinMax[1];

  const NoResults = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <Search size={48} className="text-zinc-600 mb-4" />
        <h3 className="text-xl font-semibold text-white">No Vehicles Found</h3>
        <p className="text-zinc-400 mt-2">Try adjusting your filters to find what you&apos;re looking for.</p>
    </div>
  );
  
  return (
    <div className="bg-vision-black min-h-screen text-white">
        <LocationPicker isOpen={isLocationPickerOpen} onClose={() => setLocationPickerOpen(false)} onSelect={(city) => { setLocation(city); setLocationPickerOpen(false); }}/>
        <DatePicker isOpen={isDatePickerOpen} onClose={() => setDatePickerOpen(false)} onApply={(range, times) => { setDateRange(range); setTimes(times); }}/>

      <header className="py-16 bg-black border-b border-zinc-800">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Explore The <span className="text-cyan-400">Fleet</span></h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">Hand-picked for performance, luxury, and style. Your next drive starts here.</p>
        </div>
        <div className="container mx-auto px-6 mt-10 max-w-5xl">
            <div className="p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-700 rounded-xl grid grid-cols-1 md:grid-cols-4 items-center gap-px shadow-lg">
                <button onClick={() => setLocationPickerOpen(true)} className="p-3 text-left hover:bg-zinc-800 rounded-l-lg transition-colors">
                    <div className="flex items-center gap-2 text-xs text-zinc-400"><MapPin size={14}/> Location</div>
                    <p className="font-bold text-white mt-1 text-lg">{location}</p>
                </button>
                 <button onClick={() => setDatePickerOpen(true)} className="p-3 text-left hover:bg-zinc-800 transition-colors col-span-2">
                    <div className="grid grid-cols-2 gap-px">
                        <div>
                           <div className="flex items-center gap-2 text-xs text-zinc-400"><Calendar size={14}/> Pickup</div>
                           <p className="font-bold text-white mt-1">{dateRange?.from ? `${format(dateRange.from, 'dd MMM, yyyy')} • ${times.start}` : 'Select Date'}</p>
                        </div>
                         <div>
                           <div className="flex items-center gap-2 text-xs text-zinc-400"><Calendar size={14}/> Return</div>
                           <p className="font-bold text-white mt-1">{dateRange?.to ? `${format(dateRange.to, 'dd MMM, yyyy')} • ${times.end}` : 'Select Date'}</p>
                        </div>
                    </div>
                </button>
                <button className="h-full bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-500 transition-colors text-lg">Search</button>
            </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <div className="sticky top-0 z-20 py-4 bg-vision-black">
            <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <h2 className="text-xl font-bold">
                    <span className="text-cyan-400">{filteredAndSortedCars.length}</span> vehicles available
                </h2>
                <div className="flex items-center gap-4">
                    <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400">
                        <option value="featured">Sort: Featured</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="hp_desc">Horsepower: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="hidden md:flex justify-center items-center py-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full">
                <div className="flex items-center justify-center space-x-6">
                <FilterPillPopover label="Brand" icon={<Shield size={16}/>} activeCount={filters.brands.length} options={allBrands} selected={filters.brands} onToggle={(brand) => toggleFilter('brands', brand)} onApply={() => {}} />
                <FilterPillPopover label="Drivetrain" icon={<GitCommit size={16}/>} activeCount={filters.driveTypes.length} options={allDriveTypes} selected={filters.driveTypes} onToggle={(drive) => toggleFilter('driveTypes', drive)} onApply={() => {}} />
                <PriceFilterPopover label="Price" icon={<DollarSign size={16}/>} active={isPriceFiltered} priceRange={priceFilter} setPriceRange={setPriceFilter} minMax={priceMinMax} onApply={() => {}} activeCount={0} />
                <FilterPillPopover label="Fuel Type" icon={<Fuel size={16}/>} activeCount={filters.fuelTypes.length} options={allFuelTypes} selected={filters.fuelTypes} onToggle={(fuel) => toggleFilter('fuelTypes', fuel)} onApply={() => {}}/>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[500px] mt-8">
          {loading ? Array.from({ length: CARS_PER_PAGE }).map((_, i) => <CarCardSkeleton key={i} />) : paginatedCars.length > 0 ? paginatedCars.map((car) => <CarCard key={car.id} car={car} />) : <NoResults />}
        </div>
        {!loading && totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-10 h-10 flex items-center justify-center bg-zinc-800 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"><ChevronLeft size={20} /></button>
                <span className="text-sm font-semibold text-zinc-400 w-24 text-center">Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-10 h-10 flex items-center justify-center bg-zinc-800 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"><ChevronRight size={20} /></button>
            </div>
        )}
      </main>
    </div>
  );
}