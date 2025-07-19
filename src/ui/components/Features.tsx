import { Card } from '../components/ui/card';
import { Brain, MessageSquare, Target, Zap, Globe, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Generated Courses",
      description: "Personalized learning paths that adapt to your pace and style, focusing on one word at a time for maximum retention.",
      gradient: "hero-gradient"
    },
    {
      icon: MessageSquare,
      title: "Scene-Based Conversations",
      description: "Practice real-world scenarios with AI voice agents in restaurants, airports, meetings, and everyday situations.",
      gradient: "feature-gradient"
    },
    {
      icon: Target,
      title: "Bite-Sized Learning",
      description: "Master languages through focused micro-lessons that fit into your busy schedule, just 5-10 minutes daily.",
      gradient: "hero-gradient"
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Get real-time pronunciation correction and grammar tips powered by advanced AI language models.",
      gradient: "feature-gradient"
    },
    {
      icon: Globe,
      title: "30+ Languages",
      description: "From Spanish and French to Mandarin and Arabic, start your journey in any language you desire.",
      gradient: "hero-gradient"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Connect with fellow learners, share progress, and practice together in a supportive environment.",
      gradient: "feature-gradient"
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Why Choose <span className="hero-gradient bg-clip-text text-transparent">LangQuest</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of language learning with cutting-edge AI technology and immersive conversation practice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 border-0 shadow-elegant hover:shadow-glow transition-smooth group hover:-translate-y-2 bg-card/80 backdrop-blur-sm"
            >
              <div className="space-y-6">
                <div className={`w-14 h-14 rounded-2xl ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;