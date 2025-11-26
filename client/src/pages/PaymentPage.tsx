import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle2, Copy, MessageCircle, Phone, Check, CreditCard, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function PaymentPage() {
  const [, setLocation] = useLocation();
  const { cart, totalPrice } = useCart();
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const whatsappNumber = '+923001234567';
  const accountNumber = '1234567890';
  const accountTitle = 'Humsafar Travel Services';
  const bankName = 'HBL - Habib Bank Limited';

  useEffect(() => {
    if (!cart) {
      setLocation('/');
      return;
    }
    
    const allDetailsFilled = cart.travelerDetails.length === cart.travelers &&
      cart.travelerDetails.every(detail => 
        detail.name && detail.age && detail.cnic && detail.contact
      );
    
    if (!allDetailsFilled) {
      setLocation('/booking');
    }
  }, [cart, setLocation]);

  if (!cart) {
    return null;
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast({
      title: "Copied!",
      description: `${label} has been copied to clipboard.`,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I've booked the ${cart.package.name} package for ${cart.travelers} traveler(s). Total amount: ₨${totalPrice.toLocaleString()}. I'm ready to share the payment screenshot.`
    );
    window.open(`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2" data-testid="text-payment-title">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete your payment to finalize the booking
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="aspect-video rounded-md overflow-hidden mb-4">
                    <img 
                      src={cart.package.image} 
                      alt={cart.package.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2" data-testid="text-package-name">
                    {cart.package.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{cart.package.duration} Days</Badge>
                    <Badge variant="outline">{cart.package.destination}</Badge>
                  </div>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Travelers</span>
                    <span className="font-medium" data-testid="text-travelers">{cart.travelers} {cart.travelers === 1 ? 'person' : 'people'}</span>
                  </div>
                  {cart.checkInDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Check-in</span>
                      <span className="font-medium">{format(cart.checkInDate, 'MMM dd, yyyy')}</span>
                    </div>
                  )}
                  {cart.checkOutDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Check-out</span>
                      <span className="font-medium">{format(cart.checkOutDate, 'MMM dd, yyyy')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price per person</span>
                    <span className="font-medium">₨{cart.package.pricePerPerson.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-3xl font-bold text-primary" data-testid="text-total-amount">
                      ₨{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <Badge className="w-full justify-center" variant="secondary">
                    <Check className="mr-2 h-4 w-4" />
                    Booking Confirmed
                  </Badge>
                </div>

                <div className="bg-muted/50 rounded-md p-4">
                  <p className="text-sm font-medium mb-2">Lead Traveler:</p>
                  <p className="text-sm text-muted-foreground">
                    {cart.travelerDetails[0]?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {cart.travelerDetails[0]?.contact}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-md p-6">
                  <h3 className="font-semibold text-lg mb-4">Follow these steps to complete payment:</h3>
                  <ol className="space-y-4">
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-1">Transfer the amount</p>
                        <p className="text-sm text-muted-foreground">
                          Transfer <strong className="text-foreground">₨{totalPrice.toLocaleString()}</strong> to our bank account
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-1">Take a screenshot</p>
                        <p className="text-sm text-muted-foreground">
                          Capture a clear screenshot of your payment confirmation
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-1">Send to WhatsApp</p>
                        <p className="text-sm text-muted-foreground">
                          Share the screenshot on our WhatsApp number below
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>

                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      Bank Account Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Account Title</p>
                          <p className="font-medium" data-testid="text-account-title">{accountTitle}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(accountTitle, 'Account title')}
                          data-testid="button-copy-title"
                        >
                          {copied === 'Account title' ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Account Number</p>
                          <p className="font-medium font-mono" data-testid="text-account-number">{accountNumber}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(accountNumber, 'Account number')}
                          data-testid="button-copy-account"
                        >
                          {copied === 'Account number' ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Bank Name</p>
                          <p className="font-medium">{bankName}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-500/20 bg-green-500/5">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 text-green-700 dark:text-green-400">
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-background rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <Phone className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Send screenshot to</p>
                          <p className="font-medium font-mono" data-testid="text-whatsapp">{whatsappNumber}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(whatsappNumber, 'WhatsApp number')}
                        data-testid="button-copy-whatsapp"
                      >
                        {copied === 'WhatsApp number' ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                      onClick={openWhatsApp}
                      data-testid="button-whatsapp"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Open WhatsApp & Share Screenshot
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Our team will confirm your booking within 24 hours after receiving payment
                    </p>
                  </CardContent>
                </Card>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-4">
                  <p className="text-sm font-medium mb-2">Important Notes:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Keep your payment receipt safe for future reference</li>
                    <li>Include your name in the WhatsApp message</li>
                    <li>Payment confirmation will be sent via WhatsApp</li>
                    <li>For queries, contact us on the same WhatsApp number</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
