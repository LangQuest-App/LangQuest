import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Brain, Target, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Lessons', href: '/lessons', icon: BookOpen },
    { name: 'Quiz', href: '/quiz', icon: Brain },
    { name: 'Practice', href: '/practice', icon: Target },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (href:any) => location.pathname === href;

  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        className={`transition-all duration-500 ease-out ${
          isScrolled ? 'scale-95 opacity-90' : 'scale-100 opacity-95'
        }`}
      >
        {/* Main Floating Navbar */}
        <div className="relative group">
          {/* Lighter gradient background for glassmorphic effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-green-50/80 to-emerald-50/70 rounded-3xl border border-zinc-800 shadow-2xl shadow-black/5"></div>
          
          <div className="relative px-6 py-3 flex items-center space-x-6 backdrop-blur-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative group/item transition-all duration-300 ${
                    active 
                      ? 'transform scale-110' 
                      : 'hover:transform hover:scale-105'
                  }`}
                >
                  <div className={`relative px-4 py-3 rounded-2xl transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-b from-[#45BB19]/90 via-emerald-400/85 to-green-500/90 shadow-xl shadow-[#45BB19]/20 backdrop-blur-sm'
                      : 'hover:bg-gradient-to-b hover:from-green-50/60 hover:to-emerald-50/50 hover:shadow-lg hover:backdrop-blur-sm hover:border hover:border-green-100/40'
                  }`}>
                    
                    {/* Active item glossy overlay - lighter and more subtle */}
                    {active && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/25 to-transparent rounded-2xl"></div>
                        <div className="absolute top-0 left-0 w-2/3 h-1/3 bg-gradient-to-br from-white/40 to-transparent rounded-tl-2xl"></div>
                        <div className="absolute inset-0 rounded-2xl shadow-inner shadow-green-900/5"></div>
                      </>
                    )}
                    
                    <div className="relative flex flex-col items-center space-y-1.5">
                      <Icon className={`h-6 w-6 transition-colors duration-300 ${
                        active 
                          ? 'text-white drop-shadow-sm' 
                          : 'text-gray-600 group-hover/item:text-[#45BB19]'
                      }`} />
                      <span className={`text-xs font-medium transition-colors duration-300 ${
                        active 
                          ? 'text-white drop-shadow-sm' 
                          : 'text-gray-700 group-hover/item:text-[#45BB19]'
                      }`}>
                        {item.name}
                      </span>
                    </div>
                    
                    {/* Active indicator dot - lighter and more elegant */}
                    {active && (
                      <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-white to-green-100 rounded-full shadow-lg border border-white/60"></div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
          
          {/* Bottom shadow for depth */}
          <div className="absolute -bottom-2 left-2 right-2 h-4 bg-gradient-to-b from-black/5 to-transparent rounded-full blur-md"></div>
        </div>       
      </div>
    </nav>
  );
};

export default Navbar;