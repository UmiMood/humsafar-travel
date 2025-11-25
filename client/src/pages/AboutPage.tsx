import { MapPin, Users, Award, Heart, Mountain, Shield, Banknote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const stats = [
    { label: 'Tours Completed', value: '500+' },
    { label: 'Happy Travelers', value: '5,000+' },
    { label: 'Destinations', value: '25+' },
    { label: 'Years Experience', value: '8+' },
  ];

  const values = [
    {
      icon: MapPin,
      title: 'Authentic Experiences',
      description: 'We partner with local communities to provide genuine cultural immersion and support sustainable tourism across Pakistan.',
    },
    {
      icon: Users,
      title: 'Expert Local Guides',
      description: 'Our experienced guides are locals who know every trail, every story, and every hidden gem in their regions.',
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Every tour is carefully curated with comfortable accommodations, safe transportation, and memorable activities.',
    },
    {
      icon: Heart,
      title: 'Passion for Pakistan',
      description: 'We are dedicated to showcasing the breathtaking beauty and rich heritage of Pakistan to the world.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6" data-testid="text-about-title">
            About Musafar
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner for exploring the majestic landscapes, rich culture, and warm hospitality of Pakistan.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-6">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold font-serif mb-6 text-center">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Musafar was founded in 2017 with a simple mission: to make the stunning beauty of Pakistan accessible to travelers from around the world. The name "Musafar" means "traveler" in Urdu, reflecting our deep connection to the spirit of exploration.
            </p>
            <p>
              What started as a small team of passionate adventurers has grown into a trusted travel company, connecting thousands of travelers with unforgettable experiences across the northern regions of Pakistan—from the turquoise lakes of Skardu to the alpine meadows of Fairy Meadows.
            </p>
            <p>
              We believe that travel should be transformative. That's why we work closely with local communities, employ local guides, and promote responsible tourism practices that benefit both travelers and the destinations they visit.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold font-serif mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="hover-elevate">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-serif mb-6">Why Choose Musafar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Mountain className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Curated Destinations</h3>
              <p className="text-sm text-muted-foreground">Hand-picked locations showcasing Pakistan's most breathtaking scenery</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Safe Travel</h3>
              <p className="text-sm text-muted-foreground">Experienced guides, reliable transport, and 24/7 support throughout your journey</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Banknote className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Best Value</h3>
              <p className="text-sm text-muted-foreground">Competitive pricing with no hidden costs—all-inclusive packages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
