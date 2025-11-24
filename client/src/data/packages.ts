import skarduImage from '@assets/generated_images/skardu_shangrila_lake_tour.png';
import fairyMeadowsImage from '@assets/generated_images/fairy_meadows_nanga_parbat.png';
import kumratImage from '@assets/generated_images/kumrat_valley_waterfall_forest.png';
import sharanImage from '@assets/generated_images/sharan_forest_pine_trees.png';
import shogranImage from '@assets/generated_images/shogran_siri_paye_meadows.png';

export interface Package {
  id: string;
  name: string;
  destination: string;
  duration: number;
  vendor: string;
  theme: string[];
  bestTime: string;
  pricePerPerson: number;
  image: string;
  description: string;
  highlights: string[];
  itinerary: DayItinerary[];
  stayOptions: string[];
}

export interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
  accommodation?: string;
}

export const packages: Package[] = [
  {
    id: 'skardu-6day',
    name: 'Skardu - Shangrila, Khaplu & Shigar',
    destination: 'Skardu',
    duration: 6,
    vendor: 'Discover De North',
    theme: ['landscapes', 'lakes', 'history', 'adventure', 'comfort stay'],
    bestTime: 'April–October',
    pricePerPerson: 75000,
    image: skarduImage,
    description: 'Explore the stunning valleys of Skardu including Shangrila Lake, Khaplu Palace, and the mesmerizing Katpana Cold Desert.',
    highlights: [
      'Boating in Upper Kachura Lake',
      'Visit Shangrila Resort & Lake',
      'Explore Shigar Fort and Blind Lake',
      'Sunset at Katpana Cold Desert',
      'Khaplu Palace & Manthoka Waterfall'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Lahore → Chilas / Naran',
        activities: [
          'Early departure via Naran (summer) or Besham route (winter)',
          'Stop at Babusar Top if open',
          'Night stay in Chilas / Naran / Besham'
        ],
        accommodation: 'Mountain View Hotel, Chilas / Imperial Inn Naran'
      },
      {
        day: 2,
        title: 'Chilas → Skardu (Via Indus + Jaglot)',
        activities: [
          'Stop at Nanga Parbat Viewpoint',
          'Drive alongside Indus River + rock carvings',
          'Arrival in Skardu, evening by Kachura Lake'
        ],
        accommodation: 'Shangrila Resort / Hotel One Upper Kachura'
      },
      {
        day: 3,
        title: 'Lower Kachura + Upper Kachura + Soq Valley',
        activities: [
          'Boating in Upper Kachura',
          'Visit Shangrila Lake',
          'Optional short hike to Soq Valley'
        ]
      },
      {
        day: 4,
        title: 'Shigar Valley + Cold Desert',
        activities: [
          'Drive to Shigar Valley',
          'Visit Shigar Fort (Serena), Blind Lake',
          'Sunset at Katpana Cold Desert'
        ]
      },
      {
        day: 5,
        title: 'Khaplu + Manthoka Waterfall',
        activities: [
          'Day trip to Khaplu Palace, Mosque, riverbank',
          'Stop at Manthoka Waterfall for lunch'
        ]
      },
      {
        day: 6,
        title: 'Return to Lahore',
        activities: [
          'Long drive back (Chilas → Lahore)',
          'Optional return by flight (Skardu → Islamabad)'
        ]
      }
    ],
    stayOptions: [
      'Shangrila Resort',
      'Hotel One Upper Kachura',
      'Byarsa Heritage Shigar'
    ]
  },
  {
    id: 'fairy-meadows-5day',
    name: 'Fairy Meadows + Nanga Parbat Base Trek',
    destination: 'Fairy Meadows',
    duration: 5,
    vendor: 'My Effin Tours',
    theme: ['trekking', 'camping', 'backpacking', 'alpine meadows'],
    bestTime: 'May–October',
    pricePerPerson: 45000,
    image: fairyMeadowsImage,
    description: 'Trek through alpine meadows with breathtaking views of Nanga Parbat, the ninth highest mountain in the world.',
    highlights: [
      '3-4 hour trek to Fairy Meadows',
      'Camp with Nanga Parbat views',
      'Full-day trek to Nanga Parbat Base Camp',
      'Forest ridge viewpoints',
      'Optional horse rides'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Lahore → Chilas',
        activities: [
          'Travel via Naran / Babusar (summer) or Besham',
          'Overnight in Chilas'
        ],
        accommodation: 'Shangri-La, Panorama Hotel'
      },
      {
        day: 2,
        title: 'Chilas → Raikot → Fairy Meadows Trek',
        activities: [
          'Drive to Raikot Bridge',
          'Jeep to Tattu Village',
          '3–4 hour trek to Fairy Meadows',
          'Camp setup + sunset view of Nanga Parbat'
        ],
        accommodation: 'Fairy Meadows Cottages / Campsites'
      },
      {
        day: 3,
        title: 'Fairy Meadows Exploration',
        activities: [
          'Photography at meadows',
          'Explore forest ridge + viewpoints',
          'Optional horse ride'
        ]
      },
      {
        day: 4,
        title: 'Trek to Nanga Parbat Base Camp',
        activities: [
          'Full-day trek (6–9 hours round trip)',
          'Pass through Beyal Camp',
          'Return to Fairy Meadows by evening'
        ]
      },
      {
        day: 5,
        title: 'Trek back + Return',
        activities: [
          'Trek back to Tattu',
          'Jeep to Raikot',
          'Return to Chilas / Naran'
        ]
      }
    ],
    stayOptions: [
      'Fairy Meadows Cottages',
      'Raikot Sarai',
      'Campsites'
    ]
  },
  {
    id: 'kumrat-6day',
    name: 'Kumrat Valley + Jahaz Banda + Katora Lake',
    destination: 'Kumrat Valley',
    duration: 6,
    vendor: 'Go Green travels',
    theme: ['waterfalls', 'meadows', 'trekking', 'rivers', 'camping'],
    bestTime: 'May–October',
    pricePerPerson: 50000,
    image: kumratImage,
    description: 'Experience the pristine beauty of Kumrat Valley with its lush forests, cascading waterfalls, and the stunning Katora Lake.',
    highlights: [
      'Pine forests & river walks',
      'Dojanga Waterfall visit',
      'Trek to Jahaz Banda Meadows',
      'Full-day trek to Katora Lake',
      'Bonfire camping experience'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Lahore → Kumrat Valley',
        activities: [
          'Drive via Swat Motorway → Dir → Thal',
          'Jeep to Kumrat',
          'Campsite riverside night stay'
        ],
        accommodation: 'Kumrat Glamping Pods / Forest Camps'
      },
      {
        day: 2,
        title: 'Kumrat Forest + Dojanga / Waterfalls',
        activities: [
          'Explore pine forests + river walk',
          'Visit Dojanga Waterfall',
          'Bonfire night stay'
        ]
      },
      {
        day: 3,
        title: 'Thal → Upper Dir → Jahaz Banda Base',
        activities: [
          'Drive to sharing jeep point',
          'Jeep to Jahaz Banda trek start',
          'Trek ~3–4 hours to Meadows'
        ],
        accommodation: 'Jahaz Banda Huts + Camps'
      },
      {
        day: 4,
        title: 'Trek to Katora Lake',
        activities: [
          'Full-day trek (5–7 hours round)',
          'Return to Jahaz Banda'
        ]
      },
      {
        day: 5,
        title: 'Descend + Return to Thal',
        activities: [
          'Trek down',
          'Jeep back to Thal → Dir',
          'Stay in Dir / Swat'
        ]
      },
      {
        day: 6,
        title: 'Return to Lahore',
        activities: [
          'Travel back via Swat Expressway'
        ]
      }
    ],
    stayOptions: [
      'Kumrat Glamping Pods',
      'Green Valley Resort',
      'Jahaz Banda Huts'
    ]
  },
  {
    id: 'sharan-2day',
    name: 'Sharan Forest - Nature & Camping',
    destination: 'Sharan Forest',
    duration: 2,
    vendor: 'Travelution',
    theme: ['nature', 'camping', 'forest', 'waterfalls'],
    bestTime: 'April–October',
    pricePerPerson: 18000,
    image: sharanImage,
    description: 'A peaceful escape into Sharan Forest with camping under the stars, forest trails, and optional trek to Hans Sar Lake.',
    highlights: [
      'Sunrise forest walk',
      'Waterfall trail',
      'Bonfire camping experience',
      'Optional trek to Hans Sar Lake',
      'Quiet nature retreat'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Lahore → Paras → Sharan Forest',
        activities: [
          'Leave Lahore early via M2 → Hazara Expressway',
          'Breakfast in Abbottabad / Mansehra',
          'Reach Paras, switch to jeep',
          'Arrive at Sharan Forest, check-in (pods/camping)',
          'Evening forest walk / waterfall trail',
          'Bonfire + Dinner'
        ],
        accommodation: 'Sharan Forest Camping Pods / Glamping Pods'
      },
      {
        day: 2,
        title: 'Sharan → Trails → Lahore',
        activities: [
          'Sunrise forest walk',
          'Breakfast at campsite',
          'Optional trek to Hans Sar Lake',
          'Jeep down to Paras',
          'Drive back to Lahore'
        ]
      }
    ],
    stayOptions: [
      'Sharan Forest Camping Pods',
      'Glamping Pods',
      'Private Campsites'
    ]
  },
  {
    id: 'shogran-2day',
    name: 'Shogran & Siri Paye Meadows',
    destination: 'Shogran',
    duration: 2,
    vendor: 'Go Green travels',
    theme: ['meadows', 'scenic', 'family-friendly', 'chairlift'],
    bestTime: 'April–October',
    pricePerPerson: 15000,
    image: shogranImage,
    description: 'Scenic green meadows of Shogran and Siri Paye with panoramic mountain views, horse riding, and chairlift experience.',
    highlights: [
      'Explore Shogran meadows',
      'Chairlift ride (if running)',
      'Visit Siri Paye Meadows',
      'Siri Lake viewpoints',
      'Horse riding experience'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Lahore → Kiwai → Shogran',
        activities: [
          'Early departure via Abbottabad / Balakot',
          'Breakfast stop on the way',
          'Jeep from Kiwai to Shogran',
          'Check-in, relax with valley views',
          'Explore Shogran meadows / chairlift',
          'Bonfire + Dinner'
        ],
        accommodation: 'Pine Park Hotel Shogran / Arcadian Sprucewoods'
      },
      {
        day: 2,
        title: 'Siri Paye Meadows → Lahore',
        activities: [
          'Breakfast',
          'Jeep to Siri Paye Meadows',
          'Visit Siri Lake, viewpoints, horse riding',
          'Return to Shogran → Kiwai',
          'Drive back to Lahore'
        ]
      }
    ],
    stayOptions: [
      'Pine Park Hotel Shogran',
      'Arcadian Sprucewoods',
      'Forest Rest Houses'
    ]
  }
];

export const destinations = Array.from(new Set(packages.map(p => p.destination))).sort();

export const budgetRanges = [
  { label: 'Any budget', min: 0, max: Infinity },
  { label: 'Under ₨20,000', min: 0, max: 20000 },
  { label: '₨20,000 - ₨50,000', min: 20000, max: 50000 },
  { label: '₨50,000 - ₨80,000', min: 50000, max: 80000 },
  { label: 'Above ₨80,000', min: 80000, max: Infinity },
];
