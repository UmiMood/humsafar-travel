# Travel Package Booking Website - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Airbnb's card-based layouts, Booking.com's filter systems, and Pakistani tourism sites with regional color palettes featuring teals, greens, and earth tones reflecting the natural beauty of northern Pakistan destinations.

## Typography System
- **Primary Font**: Inter or DM Sans (Google Fonts)
- **Display/Headings**: Bold weight (700), sizes ranging from text-4xl (hero) to text-xl (section headers)
- **Body Text**: Regular weight (400), text-base to text-lg for readability
- **Labels/Meta**: Medium weight (500), text-sm for filters, badges, and metadata
- **Accent Font**: Optional serif for package titles to add elegance (Playfair Display or Merriweather)

## Layout & Spacing System
**Core Spacing Units**: Tailwind classes p-4, p-6, p-8, p-12, p-16, p-20
- Consistent section padding: py-12 mobile, py-20 desktop
- Card spacing: p-6 for content, gap-6 for grids
- Form fields: p-3 to p-4 for comfortable touch targets
- Page margins: max-w-7xl centered containers with px-4 to px-8

## Component Library

### Homepage Components

**Hero Section** (60vh on mobile, 70vh on desktop):
- Full-width background image showing Pakistani mountain landscapes (Hunza Valley, Fairy Meadows, or Skardu peaks)
- Overlay with gradient (from transparent to dark) for text readability
- Centered headline: "Discover Pakistan's Hidden Gems" or similar (text-5xl, bold)
- Subheadline describing the experience (text-xl, light weight)
- No CTA button in hero - filters are the primary interaction

**Filter Bar** (Sticky on scroll):
- Horizontal layout on desktop (4 filter dropdowns side-by-side), stacked on mobile
- Filter categories: Destination (dropdown), Travel Dates (date picker), Number of Travelers (counter), Budget Range (slider)
- Each filter: rounded-lg, bg-white, border, shadow-md on hover
- Apply Filters button: prominent, teal/green accent, rounded-full, px-8 py-3

**Package Grid**:
- 3-column grid on desktop (grid-cols-3), 2-col on tablet, 1-col on mobile
- Gap between cards: gap-6
- Each package card structure below

### Package Card Design
- Elevated card: bg-white, rounded-xl, shadow-lg, hover:shadow-2xl transition
- Image: aspect-[4/3], object-cover, rounded-t-xl showing destination highlights
- Content padding: p-6
- Badge strip: Vendor name + Theme tags (inline-flex gap-2, rounded-full badges)
- Title: text-2xl font-bold, 2 lines max with ellipsis
- Duration & Best Time: text-sm, flex items with icons
- Short description: 3-4 lines highlighting key attractions
- Price display: text-3xl font-bold with "Starting from" label
- "Add to Cart" button: full-width, rounded-lg, py-3, teal/green background

### Page 2: Booking Details

**Selected Package Summary** (top section):
- Side-by-side layout: Image gallery (60% width) + Package details card (40%)
- Package details: Name, duration, itinerary overview (collapsible accordion for each day)
- Price breakdown: Base price × travelers, clear total

**Traveler Information Form**:
- Clean form layout with section headers
- For each traveler: Name, Age, CNIC/Passport, Contact
- Two-column grid on desktop for form fields
- Field styling: border-2, rounded-lg, p-3, focus:border-teal-500
- Large "Proceed to Payment" button at bottom

### Page 3: Payment Instructions

**Order Summary Card** (left column, 40% width):
- Package name, travelers, dates
- Price breakdown with total in large text-4xl
- Green checkmark icon with "Booking Confirmed" badge

**Payment Instructions Panel** (right column, 60% width):
- Step-by-step numbered list with large numbers in circles
- WhatsApp number: Large, copyable text with click-to-copy button
- Bank details if needed (account number, title)
- Screenshot upload instructions with visual example/placeholder
- "Share on WhatsApp" button (green, WhatsApp icon, opens WhatsApp with pre-filled message)

## Navigation
- **Header**: Sticky, bg-white with shadow on scroll
- Logo/Brand on left, navigation links center (Home, Packages, About, Contact), cart icon with badge on right
- Mobile: Hamburger menu

## Images Strategy
- **Hero Image**: Essential - Full-width mountain landscape (Nanga Parbat or Hunza Valley)
- **Package Cards**: Each card requires a destination-specific image (Skardu lakes, Fairy Meadows, Kumrat waterfalls, Sharan Forest, Shogran meadows)
- **Page 2**: Gallery of 3-4 images showing itinerary highlights
- All images should have subtle overlay darkening for text contrast where needed
- Buttons on images: backdrop-blur-sm bg-white/20 for glass effect

## Interactive Elements
- Filter dropdowns: Smooth dropdown animations, checkboxes for multi-select
- Date picker: Calendar widget with range selection
- Traveler counter: +/- buttons with number display
- Cards: Subtle lift on hover (translate-y-[-4px])
- Add to Cart: Loading spinner during "add" action
- Form validation: Inline error messages in red, success states in green

## Accessibility
- All form inputs have visible labels
- Focus states: 2px ring in teal/green accent
- Touch targets minimum 44×44px
- Alt text for all destination images
- ARIA labels for icon-only buttons

## Visual Hierarchy
- Hero > Filters > Package Grid
- Within cards: Image > Title > Details > Price > CTA
- High contrast between primary CTAs and secondary actions
- Generous whitespace between sections (mb-16 to mb-24)

## Mobile Considerations
- Filters collapse into expandable drawer/modal on mobile
- Package grid: Single column, full-width cards
- Touch-friendly spacing and button sizes
- Sticky "Proceed" buttons on booking pages

This design creates a trustworthy, visually appealing travel booking experience that highlights Pakistan's natural beauty while maintaining clean, conversion-focused UX patterns.