import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronRight, MapPin, Calendar, Users, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useCart } from '@/context/CartContext';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const travelerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.string().min(1, 'Age is required'),
  cnic: z.string().min(10, 'Valid CNIC/Passport required'),
  contact: z.string().min(10, 'Valid contact number required'),
});

export default function BookingPage() {
  const [, setLocation] = useLocation();
  const { cart, updateTravelerDetails } = useCart();
  const { toast } = useToast();
  const [currentTraveler, setCurrentTraveler] = useState(0);

  const form = useForm<z.infer<typeof travelerSchema>>({
    resolver: zodResolver(travelerSchema),
    defaultValues: {
      name: '',
      age: '',
      cnic: '',
      contact: '',
    },
  });

  useEffect(() => {
    if (!cart) {
      setLocation('/');
    }
  }, [cart, setLocation]);

  useEffect(() => {
    if (cart && cart.travelerDetails[currentTraveler]) {
      form.reset(cart.travelerDetails[currentTraveler]);
    } else {
      form.reset({
        name: '',
        age: '',
        cnic: '',
        contact: '',
      });
    }
  }, [currentTraveler, cart, form]);

  const saveCurrentFormData = () => {
    const currentValues = form.getValues();
    if (currentValues.name || currentValues.age || currentValues.cnic || currentValues.contact) {
      const updatedDetails = [...cart.travelerDetails];
      updatedDetails[currentTraveler] = currentValues;
      updateTravelerDetails(updatedDetails);
    }
  };

  if (!cart) {
    return null;
  }

  const onSubmit = (values: z.infer<typeof travelerSchema>) => {
    const updatedDetails = [...cart.travelerDetails];
    updatedDetails[currentTraveler] = values;
    updateTravelerDetails(updatedDetails);

    if (currentTraveler < cart.travelers - 1) {
      toast({
        title: "Traveler details saved",
        description: `Information for traveler ${currentTraveler + 1} has been saved.`,
      });
      setCurrentTraveler(currentTraveler + 1);
    } else {
      toast({
        title: "All details saved",
        description: "All traveler information has been saved. Proceeding to payment...",
      });
      setLocation('/payment');
    }
  };

  const handlePrevious = () => {
    if (currentTraveler > 0) {
      saveCurrentFormData();
      setCurrentTraveler(currentTraveler - 1);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Packages</span>
            <ChevronRight className="h-4 w-4" />
            <span>{cart.package.name}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Booking Details</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif" data-testid="text-booking-title">
            Complete Your Booking
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Package Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video rounded-md overflow-hidden">
                  <img 
                    src={cart.package.image} 
                    alt={cart.package.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-serif mb-2" data-testid="text-package-name">
                    {cart.package.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{cart.package.vendor}</Badge>
                    <Badge variant="outline">{cart.package.duration} Days</Badge>
                    <Badge variant="outline">{cart.package.destination}</Badge>
                  </div>
                  <p className="text-muted-foreground">{cart.package.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Check-in</p>
                    <p className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {cart.checkInDate ? format(cart.checkInDate, 'MMM dd, yyyy') : 'Not selected'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Check-out</p>
                    <p className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {cart.checkOutDate ? format(cart.checkOutDate, 'MMM dd, yyyy') : 'Not selected'}
                    </p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="itinerary">
                    <AccordionTrigger>View Full Itinerary</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {cart.package.itinerary.map((day) => (
                          <div key={day.day} className="border-l-2 border-primary pl-4">
                            <h4 className="font-semibold mb-2">
                              Day {day.day}: {day.title}
                            </h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                              {day.activities.map((activity, idx) => (
                                <li key={idx}>{activity}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Traveler Information
                  </span>
                  <Badge variant="outline">
                    {currentTraveler + 1} of {cart.travelers}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Please provide details for traveler {currentTraveler + 1}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-6">
                  {Array.from({ length: cart.travelers }).map((_, idx) => {
                    const traveler = cart.travelerDetails[idx];
                    const isComplete = traveler?.name && traveler?.age && traveler?.cnic && traveler?.contact;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          saveCurrentFormData();
                          setCurrentTraveler(idx);
                        }}
                        className={`flex-1 h-2 rounded-full transition-colors ${
                          idx === currentTraveler 
                            ? 'bg-primary' 
                            : isComplete
                            ? 'bg-primary/50' 
                            : 'bg-muted'
                        }`}
                        data-testid={`progress-traveler-${idx}`}
                        aria-label={`Traveler ${idx + 1}${isComplete ? ' - Completed' : ''}`}
                      />
                    );
                  })}
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full name" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input placeholder="Age" {...field} data-testid="input-age" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+92 300 1234567" {...field} data-testid="input-contact" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="cnic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNIC / Passport Number</FormLabel>
                          <FormControl>
                            <Input placeholder="XXXXX-XXXXXXX-X" {...field} data-testid="input-cnic" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 pt-4">
                      {currentTraveler > 0 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handlePrevious}
                          className="flex-1"
                          data-testid="button-previous"
                        >
                          Previous
                        </Button>
                      )}
                      <Button 
                        type="submit" 
                        className="flex-1"
                        data-testid="button-next"
                      >
                        {currentTraveler < cart.travelers - 1 ? 'Next Traveler' : 'Proceed to Payment'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Price Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base price per person</span>
                    <span data-testid="text-base-price">₨{cart.package.pricePerPerson.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Number of travelers</span>
                    <span data-testid="text-travelers-count">× {cart.travelers}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold">Total Amount</span>
                    <span className="text-3xl font-bold text-primary" data-testid="text-total-price">
                      ₨{(cart.package.pricePerPerson * cart.travelers).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-md p-4 space-y-2">
                  <p className="text-sm font-medium">What's included:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {cart.package.highlights.slice(0, 4).map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-muted-foreground">
                  Best time to visit: {cart.package.bestTime}
                </p>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Free cancellation up to 7 days before departure</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
