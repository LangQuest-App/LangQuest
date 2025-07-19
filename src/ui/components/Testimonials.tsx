import { Card } from '../components/ui/card';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      country: "🇺🇸 USA",
      content: "LangQuest's AI courses are incredible! I'm finally conversational in Spanish after just 3 months.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Marco Rodriguez",
      role: "Business Analyst",
      country: "🇲🇽 Mexico",
      content: "The conversation scenarios feel so real. I practiced ordering food before my trip to France!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Yuki Tanaka",
      role: "Student",
      country: "🇯🇵 Japan",
      content: "One word at a time approach really works. I can remember vocabulary much better now.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Ahmed Hassan",
      role: "Doctor",
      country: "🇪🇬 Egypt",
      content: "Perfect for my busy schedule. Just 10 minutes daily and I'm learning German effectively.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Elena Volkov",
      role: "Marketing Manager",
      country: "🇷🇺 Russia",
      content: "The AI voice agents are amazing. They helped me prepare for my job interview in English.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "David Kim",
      role: "Designer",
      country: "🇰🇷 South Korea",
      content: "Most engaging language app I've used. The scenes make learning feel like a game.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            What Our <span className="feature-gradient bg-clip-text text-transparent">Learners</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful language learners who transformed their skills with LangQuest.
          </p>
        </div>
      </div>

      {/* Auto-scrolling testimonials */}
      <div className="relative">
        <div className="flex space-x-6 animate-scroll">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <Card 
              key={index} 
              className="flex-shrink-0 w-80 p-6 border-0 shadow-elegant bg-card/80 backdrop-blur-sm"
            >
              <div className="space-y-4">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-accent opacity-60" />
                
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center space-x-3 pt-4 border-t border-border">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm">{testimonial.country}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Testimonials;