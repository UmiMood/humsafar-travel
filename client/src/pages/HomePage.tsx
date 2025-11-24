import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { Calendar, Users, MapPin, DollarSign, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { packages, destinations, budgetRanges } from '@/data/packages';
import { useCart } from '@/context/CartContext';
import { format } from 'date-fns';
import heroImage from '@assets/generated_images/pakistan_hunza_valley_hero.png';
import { useToast } from '@/hooks/use-toast';

export default function HomePage() {
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [travelers, setTravelers] = useState<number>(1);
  const [budgetRange, setBudgetRange] = useState<string>('any');

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      if (selectedDestination !== 'all' && pkg.destination !== selectedDestination) {
        return false;
      }

      const selectedBudget = budgetRanges.find(b => b.label === budgetRange);
      if (selectedBudget) {
        const totalPrice = pkg.pricePerPerson * travelers;
        if (totalPrice < selectedBudget.min || totalPrice > selectedBudget.max) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDestination, budgetRange, travelers]);

  const handleAddToCart = (pkg: typeof packages[0]) => {
    addToCart({
      package: pkg,
      travelers,
      checkInDate: checkInDate || null,
      checkOutDate: checkOutDate || null,
      travelerDetails: []
    });
    toast({
      title: "Added to cart",
      description: `${pkg.name} has been added to your cart.`,
    });
    setLocation('/booking');
  };

  const handleSearch = () => {
    toast({
      title: "Filters applied",
      description: `Showing ${filteredPackages.length} package${filteredPackages.length !== 1 ? 's' : ''}.`,
    });
  };

  return (
    <div className="min-h-screen">
      <div 
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${heroImage})`
        }}
      >
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif" data-testid="text-hero-title">
            Explore the Beauty of Pakistan
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8" data-testid="text-hero-subtitle">
            Discover Pakistan's stunning landscapes, rich culture, and warm hospitality.<br />
            Book authentic travel packages from trusted local tour operators.
          </p>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-6xl px-4">
          <Card className="shadow-2xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Destination
                  </label>
                  <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                    <SelectTrigger data-testid="select-destination">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All destinations</SelectItem>
                      {destinations.map(dest => (
                        <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Check-in
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal" data-testid="button-checkin">
                        {checkInDate ? format(checkInDate, 'MMM dd, yyyy') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={checkInDate}
                        onSelect={setCheckInDate}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Check-out
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal" data-testid="button-checkout">
                        {checkOutDate ? format(checkOutDate, 'MMM dd, yyyy') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        disabled={(date) => date < (checkInDate || new Date())}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Travelers
                  </label>
                  <Select value={travelers.toString()} onValueChange={(v) => setTravelers(parseInt(v))}>
                    <SelectTrigger data-testid="select-travelers">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'person' : 'people'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    Budget
                  </label>
                  <Select value={budgetRange} onValueChange={setBudgetRange}>
                    <SelectTrigger data-testid="select-budget">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map(range => (
                        <SelectItem key={range.label} value={range.label}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="w-full md:w-auto mt-6 px-8" 
                size="lg"
                onClick={handleSearch}
                data-testid="button-search"
              >
                <Search className="mr-2 h-4 w-4" />
                Search Packages
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-packages-title">
            Available Packages
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-packages-count">
            Showing {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map(pkg => (
            <Card key={pkg.id} className="overflow-hidden hover-elevate transition-all" data-testid={`card-package-${pkg.id}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" data-testid={`badge-vendor-${pkg.id}`}>
                    {pkg.vendor}
                  </Badge>
                  <Badge variant="outline" data-testid={`badge-duration-${pkg.id}`}>
                    {pkg.duration} Days
                  </Badge>
                </div>
                <h3 className="text-xl font-bold font-serif" data-testid={`text-package-name-${pkg.id}`}>
                  {pkg.name}
                </h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {pkg.theme.slice(0, 3).map(theme => (
                    <Badge key={theme} variant="outline" className="text-xs">
                      {theme}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {pkg.description}
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">From</span>
                  <span className="text-3xl font-bold text-primary" data-testid={`text-price-${pkg.id}`}>
                    ₨{pkg.pricePerPerson.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">per person</span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Best time: {pkg.bestTime}
                </p>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleAddToCart(pkg)}
                  data-testid={`button-addcart-${pkg.id}`}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No packages found matching your filters. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
