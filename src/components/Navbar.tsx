import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, MessageSquare, Users, Sparkles, UserCheck, Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: Heart },
  { path: "/therapy", label: "Therapy", icon: Users },
  { path: "/chat", label: "AI Sathi", icon: Sparkles },
  { path: "/professionals", label: "Experts", icon: UserCheck },
  { path: "/wellness", label: "Wellness", icon: MessageSquare },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#F5F5F4]/80 backdrop-blur-xl border-b border-[#0A0A0A]/5 px-8 py-6 z-50">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
            <Heart size={20} fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-[-0.02em] text-[#0A0A0A]">MindSathi.</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-[#0A0A0A]/5 p-1 rounded-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300",
                  isActive 
                    ? "text-white bg-[#0A0A0A] shadow-lg" 
                    : "text-[#0A0A0A]/40 hover:text-[#0A0A0A] hover:bg-white/50"
                )}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/therapy"
            className="hidden sm:block text-[13px] font-bold text-[#0A0A0A] hover:opacity-60 transition-opacity"
          >
            Support
          </Link>
          <Link
            to="/chat"
            className="px-6 py-2.5 bg-[#0A0A0A] text-white rounded-full text-[13px] font-bold hover:scale-105 active:scale-95 transition-all"
          >
            Talk to AI
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[#0A0A0A]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#F5F5F4] z-40 flex flex-col items-center justify-center lg:hidden">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300",
                    isActive 
                      ? "text-white bg-[#0A0A0A] shadow-lg" 
                      : "text-[#0A0A0A]/60 hover:text-[#0A0A0A] hover:bg-white/50"
                  )}
                  onClick={() => setIsOpen(false)} // Close menu on item click
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col gap-4">
            <Link
              to="/therapy"
              className="px-8 py-4 bg-[#0A0A0A]/5 text-[#0A0A0A] rounded-full text-lg font-bold text-center hover:bg-[#0A0A0A]/10 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Support
            </Link>
            <Link
              to="/chat"
              className="px-8 py-4 bg-[#0A0A0A] text-white rounded-full text-lg font-bold text-center hover:scale-105 active:scale-95 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Talk to AI
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}