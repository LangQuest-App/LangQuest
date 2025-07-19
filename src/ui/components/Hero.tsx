import { Button } from '../components/ui/button';
import { ArrowRight, Play, Star } from 'lucide-react';
import heroImage from '../assets/heroImage.png';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 fade-in-up">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-muted-foreground">Trusted by 50K+ learners</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Master Languages
                <span className="block hero-gradient bg-clip-text text-transparent">
                  One Word at a Time
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Experience AI-powered language learning with personalized courses and immersive conversation practice in real-world scenarios.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="hero-gradient text-primary-foreground shadow-elegant hover:shadow-glow transition-smooth group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span>30+ Languages</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Real Conversations</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative float-animation">
              <img
                src={heroImage}
                alt="Language learning illustration"
                className="w-full h-auto rounded-2xl shadow-elegant"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-accent/90 backdrop-blur-sm rounded-full p-3 shadow-lg float-animation" style={{ animationDelay: '1s' }}>
                <span className="text-accent-foreground font-semibold">Hello!</span>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-secondary/90 backdrop-blur-sm rounded-full p-3 shadow-lg float-animation" style={{ animationDelay: '2s' }}>
                <span className="text-secondary-foreground font-semibold">¡Hola!</span>
              </div>
              
              <div className="absolute top-1/2 -right-6 bg-primary/90 backdrop-blur-sm rounded-full p-3 shadow-lg float-animation" style={{ animationDelay: '0.5s' }}>
                <span className="text-primary-foreground font-semibold">Bonjour!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;