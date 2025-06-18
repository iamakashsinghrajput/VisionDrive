import slugify from "slugify";

export type Car = {
  id: string;
  brand: string;
  name: string;
  pricePerDay: number;
  images: {
    front: string;
    back: string;
    left: string;
    right: string;
    rear: string;
    side: string;
    interior: string;
  };
  specs: {
    horsepower: number;
    engine: string;
    drive: string;
    mileage: string;
    fuelType: string;
    transmission: string;
    seats: number;
  };
  bodyType: string;
  description: string;
  featuresList: string[];
};

type RawCarData = {
  id: number;
  model: string;
  brand: string;
  bodyType: string;
  transmission: string;
  seats: number;
  pricePerDay: number;
  horsepower: number;
  engine: string;
  drive: string;
  mileage: string;
  fuelType: string;
  description: string;
  featuresList: string[];
  mainImage: string;
  gallery: {
    front?: string;
    back?: string;
    left?: string;
    right?: string;
    interior?: string;
  };
};

const rawData: RawCarData[] = [
    { id: 1, mainImage: '/cars/image_063.png', gallery: { front: '/cars/image_065.png', left: '/cars/image_066.png', right: '/cars/image_064.png', back: '/cars/image_067.png', interior: '/cars/image_065.png' }, model: 'Urban Cruiser Taisor', brand: 'Toyota', bodyType: 'SUV Coupe', transmission: 'Automatic', seats: 5, pricePerDay: 4250, horsepower: 100, engine: "1.0L Turbo Petrol", drive: 'FWD', mileage: "20.01 kmpl", fuelType: 'Petrol', description: "Toyota's stylish SUV Coupe, offering a striking design and efficient engines.", featuresList: ["9-inch Touchscreen", "Wireless CarPlay", "Head-Up Display", "360 View Camera", "6 Airbags"] },
    { id: 2, mainImage: '/cars/image_062.png', gallery: { front: '/cars/image_059.png', left: '/cars/image_061.png', right: '/cars/image_060.png', back: '/cars/image_082.png', interior: '/cars/image_059.png' }, model: 'Thar', brand: 'Mahindra', bodyType: 'Off-Road SUV', transmission: 'Manual', seats: 4, pricePerDay: 5500, horsepower: 130, engine: "2.2L mHawk Diesel", drive: '4x4', mileage: "15.2 kmpl", fuelType: 'Diesel', description: "The iconic lifestyle off-roader with legendary go-anywhere capability.", featuresList: ["4x4 Capability", "Removable Roof Panels", "7-inch Touchscreen", "Adventure Stats", "Roll Cage"] },
    { id: 3, mainImage: '/cars/image_001.png', gallery: { front: '/cars/image_005.png', left: '/cars/image_003.png', right: '/cars/image_002.png', back: '/cars/image_004.png', interior: '/cars/image_005.png' }, model: 'Alto K10', brand: 'Maruti Suzuki', bodyType: 'Hatchback', transmission: 'Automatic', seats: 5, pricePerDay: 1500, horsepower: 66, engine: "1.0L K10C Petrol", drive: 'FWD', mileage: "24.90 kmpl", fuelType: 'Petrol', description: "India's favorite hatchback, offering exceptional fuel efficiency and easy maneuverability.", featuresList: ["7-inch SmartPlay", "Apple CarPlay", "Digital Speedometer", "Dual Front Airbags"] },
    { id: 4, mainImage: '/cars/image_013.png', gallery: { front: '/cars/image_010.png', left: '/cars/image_011.png', right: '/cars/image_014.png', back: '/cars/image_012.png', interior: '/cars/image_010.png' }, model: 'Brezza', brand: 'Maruti Suzuki', bodyType: 'SUV', transmission: 'Automatic', seats: 5, pricePerDay: 5950, horsepower: 102, engine: "1.5L K-Series Petrol", drive: 'FWD', mileage: "19.80 kmpl", fuelType: 'Petrol', description: "A stylish and feature-packed compact SUV with a bold look and hybrid engine.", featuresList: ["Electric Sunroof", "9-inch SmartPlay Pro+", "Wireless Charger", "Head-Up Display", "360 View Camera", "6 Airbags"] },
    { id: 5, mainImage: '/cars/image_018.png', gallery: { front: '/cars/image_015.png', left: '/cars/image_016.png', right: '/cars/image_019.png', back: '/cars/image_017.png', interior: '/cars/image_015.png' }, model: 'Curvv EV', brand: 'Tata', bodyType: 'SUV Coupe', transmission: 'Automatic', seats: 5, pricePerDay: 5200, horsepower: 200, engine: "Electric Motor", drive: 'AWD', mileage: "450-500 km", fuelType: 'Electric', description: "Tata's upcoming electric SUV Coupe, based on the striking Curvv concept.", featuresList: ["Large Floating Touchscreen", "Digital Cluster", "Panoramic Roof", "ADAS Features", "Regenerative Braking"] },
    { id: 6, mainImage: '/cars/image_007.png', gallery: { front: '/cars/image_008.png', left: '/cars/image_083.png', right: '/cars/image_009.png', back: '/cars/image_006.png', interior: '/cars/image_008.png' }, model: 'BE.06', brand: 'Mahindra', bodyType: 'SUV Coupe', transmission: 'Automatic', seats: 5, pricePerDay: 6000, horsepower: 280, engine: "Electric Motor", drive: 'AWD', mileage: "400-450 km", fuelType: 'Electric', description: "Part of Mahindra's 'Born Electric' vision, with advanced EV technology.", featuresList: ["Edge-to-Edge Screen", "Augmented Reality HUD", "OTA Updates", "Level 2+ ADAS", "V2L Capability"] },
    { id: 7, mainImage: '/cars/image_023.png', gallery: { front: '/cars/image_020.png', left: '/cars/image_021.png', right: '/cars/image_024.png', back: '/cars/image_022.png', interior: '/cars/image_020.png' }, model: 'Dzire', brand: 'Maruti Suzuki', bodyType: 'Sedan', transmission: 'Automatic', seats: 5, pricePerDay: 3250, horsepower: 89, engine: "1.2L DualJet Petrol", drive: 'FWD', mileage: "22.61 kmpl", fuelType: 'Petrol', description: "India's best-selling compact sedan, renowned for its efficiency and comfort.", featuresList: ["7-inch SmartPlay", "Cruise Control", "Auto Climate Control", "Rear AC Vents", "ESP with Hill Hold"] },
    { id: 8, mainImage: '/cars/image_038.png', gallery: { front: '/cars/image_035.png', left: '/cars/image_036.png', right: '/cars/image_039.png', back: '/cars/image_037.png', interior: '/cars/image_035.png' }, model: 'Nexon', brand: 'Tata', bodyType: 'SUV', transmission: 'Automatic', seats: 5, pricePerDay: 4800, horsepower: 118, engine: "1.2L Revotron Petrol", drive: 'FWD', mileage: "17.05 kmpl", fuelType: 'Petrol', description: "A popular and safe compact SUV with a 5-star safety rating.", featuresList: ["10.25-inch Touchscreen", "Ventilated Seats", "Electric Sunroof", "JBL Sound", "Wireless Charger"] },
    { id: 9, mainImage: '/cars/image_048.png', gallery: { front: '/cars/image_044.png', left: '/cars/image_046.png', right: '/cars/image_045.png', back: '/cars/image_047.png', interior: '/cars/image_044.png' }, model: 'Scorpio-N', brand: 'Mahindra', bodyType: 'SUV', transmission: 'Automatic', seats: 7, pricePerDay: 6800, horsepower: 172, engine: "2.2L mHawk Diesel", drive: '4x4', mileage: "14.2 kmpl", fuelType: 'Diesel', description: "A powerful SUV building on the Scorpio legacy with a commanding presence.", featuresList: ["8-inch Touchscreen", "AdrenoX Connect", "Sony Premium Sound", "4x4 Capability", "Dual Zone Climate"] },
    { id: 10, mainImage: '/cars/image_053.png', gallery: { front: '/cars/image_050.png', left: '/cars/image_051.png', right: '/cars/image_049.png', back: '/cars/image_052.png', interior: '/cars/image_050.png' }, model: 'Swift', brand: 'Maruti Suzuki', bodyType: 'Hatchback', transmission: 'Automatic', seats: 5, pricePerDay: 2950, horsepower: 89, engine: "1.2L DualJet Petrol", drive: 'FWD', mileage: "22.56 kmpl", fuelType: 'Petrol', description: "A sporty hatchback known for its peppy performance and agile handling.", featuresList: ["7-inch SmartPlay", "Cruise Control", "Auto Climate Control", "LED Projectors"] },
    { id: 11, mainImage: '/cars/image_058.png', gallery: { front: '/cars/image_056.png', left: '/cars/image_054.png', right: '/cars/image_055.png', back: '/cars/image_057.png', interior: '/cars/image_056.png' }, model: 'Syros', brand: 'Kia', bodyType: 'Compact SUV', transmission: 'Automatic', seats: 5, pricePerDay: 3500, horsepower: 82, engine: "1.2L Kappa Petrol", drive: 'FWD', mileage: "20 kmpl", fuelType: 'Petrol', description: "[SPECULATIVE] Kia's upcoming compact SUV with rugged styling.", featuresList: ["Touchscreen", "Multiple Airbags", "Sunroof (Possible)", "LED DRLs"] },
    { id: 12, mainImage: '/cars/image_075.png', gallery: { front: '/cars/image_072.png', left: '/cars/image_073.png', right: '/cars/image_076.png', back: '/cars/image_074.png', interior: '/cars/image_072.png' }, model: 'XUV 3XO', brand: 'Mahindra', bodyType: 'SUV', transmission: 'Automatic', seats: 5, pricePerDay: 4950, horsepower: 129, engine: "1.2L TGDi Petrol", drive: 'FWD', mileage: "18.2 kmpl", fuelType: 'Petrol', description: "A feature-loaded SUV with a segment-first panoramic sunroof.", featuresList: ["Panoramic Sunroof", "Dual 10.25-inch Screens", "Level 2 ADAS", "Harman Kardon Audio", "360 Camera"] },
    { id: 13, mainImage: '/cars/image_077.png', gallery: { front: '/cars/image_079.png', left: '/cars/image_080.png', right: '/cars/image_078.png', back: '/cars/image_081.png', interior: '/cars/image_079.png' }, model: 'XUV700', brand: 'Mahindra', bodyType: 'SUV', transmission: 'Automatic', seats: 7, pricePerDay: 7500, horsepower: 197, engine: "2.0L Turbo-Petrol", drive: 'FWD', mileage: "13 kmpl", fuelType: 'Petrol', description: "A technologically advanced mid-size SUV that has set benchmarks in its segment.", featuresList: ["Dual HD Superscreen", "ADAS", "Panoramic 'Skyroof'", "Sony 3D Sound", "Flush Door Handles"] },
    { id: 14, mainImage: '/cars/image_032.png', gallery: { front: '/cars/image_033.png', left: '/cars/image_030.png', right: '/cars/image_034.png', back: '/cars/image_031.png', interior: '/cars/image_033.png' }, model: 'Kushaq', brand: 'Skoda', bodyType: 'Compact SUV', transmission: 'Automatic', seats: 5, pricePerDay: 5500, horsepower: 114, engine: "1.0L TSI Petrol", drive: 'FWD', mileage: "17.88 kmpl", fuelType: 'Petrol', description: "A stylish and robust SUV known for its solid build and European driving dynamics.", featuresList: ["10-inch Touchscreen", "Ventilated Seats", "Electric Sunroof", "6 Airbags", "ESC (Standard)"] },
    { id: 15, mainImage: '/cars/image_028.png', gallery: { front: '/cars/image_025.png', left: '/cars/image_026.png', right: '/cars/image_029.png', back: '/cars/image_027.png', interior: '/cars/image_025.png' }, model: 'Fronx', brand: 'Maruti Suzuki', bodyType: 'SUV Coupe', transmission: 'Automatic', seats: 5, pricePerDay: 4000, horsepower: 99, engine: "1.0L Turbo Petrol", drive: 'FWD', mileage: "20.01 kmpl", fuelType: 'Petrol', description: "Maruti's sporty SUV Coupe, blending sharp design with the powerful Boosterjet engine.", featuresList: ["9-inch SmartPlay Pro+", "Head-Up Display", "360 View Camera", "6 Airbags", "Suzuki Connect"] },
    { id: 16, mainImage: '/cars/image_089.png', gallery: { front: '/cars/image_086.png', left: '/cars/image_087.png', right: '/cars/image_085.png', back: '/cars/image_088.png', interior: '/cars/image_086.png' }, model: 'Scorpio Classic', brand: 'Mahindra', bodyType: 'SUV', transmission: 'Manual', seats: 7, pricePerDay: 3500, horsepower: 130, engine: "2.2L mHawk Diesel", drive: 'RWD', mileage: "15 kmpl", fuelType: 'Diesel', description: "The iconic Scorpio, a rugged and reliable SUV with a commanding presence.", featuresList: ["9-inch Touchscreen", "Projector Headlamps", "Bluetooth & USB", "Dual Front Airbags"] },
    { id: 17, mainImage: '/cars/image_090.png', gallery: { front: '/cars/image_094.png', left: '/cars/image_092.png', right: '/cars/image_093.png', back: '/cars/image_091.png', interior: '/cars/image_094.png' }, model: 'Sonet', brand: 'Kia', bodyType: 'Compact SUV', transmission: 'Automatic', seats: 5, pricePerDay: 4100, horsepower: 118, engine: "1.0L Turbo GDi Petrol", drive: 'FWD', mileage: "18.3 kmpl", fuelType: 'Petrol', description: "Kia's feature-packed compact SUV with a bold design and premium interiors.", featuresList: ["10.25-inch Touchscreen", "Ventilated Seats", "Bose Premium Sound", "Electric Sunroof", "Kia Connect"] },
    { id: 18, mainImage: '/cars/image_095.png', gallery: { front: '/cars/image_099.png', left: '/cars/image_097.png', right: '/cars/image_098.png', back: '/cars/image_096.png', interior: '/cars/image_099.png' }, model: 'Venue', brand: 'Hyundai', bodyType: 'Compact SUV', transmission: 'Automatic', seats: 5, pricePerDay: 4050, horsepower: 118, engine: "1.0L Turbo GDi Petrol", drive: 'FWD', mileage: "18.1 kmpl", fuelType: 'Petrol', description: "Hyundai's popular compact SUV, offering a blend of modern styling and connected features.", featuresList: ["8-inch Touchscreen", "Electric Sunroof", "Air Purifier", "Wireless Charger", "Hyundai BlueLink"] },
    { id: 19, mainImage: '/cars/placeholder_creta.png', gallery: { front: '/cars/placeholder_creta.png' }, model: 'Creta', brand: 'Hyundai', bodyType: 'SUV', transmission: 'Automatic', seats: 5, pricePerDay: 6200, horsepower: 113, engine: "1.5L Petrol", drive: 'FWD', mileage: "17.7 kmpl", fuelType: 'Petrol', description: "The segment-defining SUV, known for its premium features and comfortable ride.", featuresList: ["Panoramic Sunroof", "10.25-inch Touchscreen", "Bose Sound System", "Ventilated Seats", "Level 2 ADAS"] },
    { id: 20, mainImage: '/cars/placeholder_punch.png', gallery: { front: '/cars/placeholder_punch.png' }, model: 'Punch', brand: 'Tata', bodyType: 'Compact SUV', transmission: 'Automatic', seats: 5, pricePerDay: 2500, horsepower: 87, engine: "1.2L Revotron Petrol", drive: 'FWD', mileage: "18.8 kmpl", fuelType: 'Petrol', description: "Tata's micro-SUV with a high stance and 5-star safety rating.", featuresList: ["7-inch Touchscreen", "90-Degree Opening Doors", "iRA Connected Tech", "Auto Climate Control"] },
    { id: 21, mainImage: '/cars/placeholder_vitara.png', gallery: { front: '/cars/placeholder_vitara.png' }, model: 'Grand Vitara', brand: 'Maruti Suzuki', bodyType: 'SUV', transmission: 'Automatic', seats: 5, pricePerDay: 6500, horsepower: 102, engine: "1.5L Hybrid", drive: 'AWD', mileage: "27.97 kmpl", fuelType: 'Hybrid', description: "Maruti's flagship SUV with a strong hybrid system for exceptional fuel economy.", featuresList: ["Panoramic Sunroof", "Strong Hybrid System", "Ventilated Seats", "360 View Camera", "AllGrip AWD"] },
    { id: 22, mainImage: '/cars/placeholder_verna.png', gallery: { front: '/cars/placeholder_verna.png' }, model: 'Verna', brand: 'Hyundai', bodyType: 'Sedan', transmission: 'Automatic', seats: 5, pricePerDay: 5800, horsepower: 158, engine: "1.5L Turbo GDi", drive: 'FWD', mileage: "20.6 kmpl", fuelType: 'Petrol', description: "A futuristic sedan with powerful performance and advanced ADAS features.", featuresList: ["Level 2 ADAS", "Dual 10.25-inch Screens", "Ventilated & Heated Seats", "Bose Sound System"] },
    { id: 23, mainImage: '/cars/placeholder_city.png', gallery: { front: '/cars/placeholder_city.png' }, model: 'City', brand: 'Honda', bodyType: 'Sedan', transmission: 'Automatic', seats: 5, pricePerDay: 5600, horsepower: 119, engine: "1.5L i-VTEC", drive: 'FWD', mileage: "18.4 kmpl", fuelType: 'Petrol', description: "The iconic sedan known for its premium feel, comfort, and reliability.", featuresList: ["Honda Sensing (ADAS)", "LaneWatch Camera", "Leatherette Upholstery", "8-inch Touchscreen"] },
    { id: 24, mainImage: '/cars/placeholder_innova.png', gallery: { front: '/cars/placeholder_innova.png' }, model: 'Innova Hycross', brand: 'Toyota', bodyType: 'MPV', transmission: 'Automatic', seats: 7, pricePerDay: 8000, horsepower: 184, engine: "2.0L Hybrid", drive: 'FWD', mileage: "23.24 kmpl", fuelType: 'Hybrid', description: "The ultimate family vehicle, redefined with hybrid power and luxurious comfort.", featuresList: ["Ottoman Seats (2nd Row)", "Panoramic Sunroof", "JBL Sound System", "Toyota Safety Sense"] },
];

const transformCarData = (carDetails: RawCarData[]): Car[] => {
  return carDetails.map(car => {
    const fallbackImage = car.mainImage;
    return {
      id: slugify(`${car.brand} ${car.model}`, { lower: true, strict: true }),
      brand: car.brand,
      name: car.model,
      pricePerDay: car.pricePerDay,
      images: {
        side: car.mainImage,
        front: car.gallery.front || fallbackImage,
        back: car.gallery.back || fallbackImage,
        rear: car.gallery.back || fallbackImage,
        left: car.gallery.left || fallbackImage,
        right: car.gallery.right || fallbackImage,
        interior: car.gallery.interior || fallbackImage,
      },
      specs: {
        horsepower: car.horsepower,
        engine: car.engine,
        drive: car.drive,
        mileage: car.mileage,
        fuelType: car.fuelType,
        transmission: car.transmission,
        seats: car.seats,
      },
      bodyType: car.bodyType,
      description: car.description,
      featuresList: car.featuresList,
    };
  });
};

export const carsData: Car[] = transformCarData(rawData);

export const getCarById = (id: string): Car | undefined => {
  return carsData.find(car => car.id === id);
};