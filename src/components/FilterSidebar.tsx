"use client";

import Slider from 'rc-slider';

type FilterProps = {
  filters: {
    brands: string[];
    driveTypes: string[];
    fuelTypes: string[];
  };
  priceFilter: [number, number];
  setPriceFilter: (value: [number, number]) => void;
  toggleFilter: (category: keyof FilterProps['filters'], value: string) => void;
  allBrands: string[];
  allDriveTypes: string[];
  allFuelTypes: string[];
  priceMinMax: [number, number];
  clearFilters: () => void;
  activeFilterCount: number;
};

const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="py-4 border-t border-zinc-800">
    <h3 className="font-semibold text-white mb-3 px-1">{title}</h3>
    <div className="space-y-1">{children}</div>
  </div>
);

const FilterItem = ({ label, isSelected, onClick }: { label: string, isSelected: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-all duration-200 border-l-2 ${
      isSelected
        ? 'bg-zinc-800 border-cyan-400 text-white font-semibold'
        : 'border-transparent text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
    }`}
  >
    {label}
  </button>
);

export const FilterSidebar = ({
  filters, priceFilter, setPriceFilter, toggleFilter, allBrands, allDriveTypes, allFuelTypes, priceMinMax, clearFilters, activeFilterCount
}: FilterProps) => {

  return (
    <div className="p-4 bg-zinc-900 rounded-xl">
      <div className="flex justify-between items-center mb-2 px-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-cyan-400 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <button onClick={clearFilters} className="text-xs font-semibold text-cyan-400 hover:underline">Clear All</button>
      </div>

      <FilterSection title="Brand">
        {allBrands.map(brand => (
          <FilterItem key={brand} label={brand} isSelected={filters.brands.includes(brand)} onClick={() => toggleFilter('brands', brand)} />
        ))}
      </FilterSection>

      <FilterSection title="Drivetrain">
        {allDriveTypes.map(drive => (
          <FilterItem key={drive} label={drive} isSelected={filters.driveTypes.includes(drive)} onClick={() => toggleFilter('driveTypes', drive)} />
        ))}
      </FilterSection>

      <FilterSection title="Fuel Type">
        {allFuelTypes.map(fuel => (
          <FilterItem key={fuel} label={fuel} isSelected={filters.fuelTypes.includes(fuel)} onClick={() => toggleFilter('fuelTypes', fuel)} />
        ))}
      </FilterSection>

      <div className="py-4 border-t border-zinc-800">
          <h3 className="font-semibold text-white mb-4 px-1">Price Range</h3>
          <div className="px-2">
            <Slider
              range min={priceMinMax[0]} max={priceMinMax[1]} value={priceFilter}
              onChange={(value) => setPriceFilter(value as [number, number])}
              step={500} allowCross={false}
              trackStyle={{ backgroundColor: '#22d3ee', height: 4 }}
              handleStyle={{ borderColor: '#22d3ee', backgroundColor: '#0A0A0A', height: 18, width: 18, opacity: 1, borderWidth: 2 }}
              railStyle={{ backgroundColor: '#3f3f46', height: 4 }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>₹{priceFilter[0].toLocaleString()}</span>
              <span>₹{priceFilter[1].toLocaleString()}</span>
            </div>
          </div>
      </div>
    </div>
  );
};