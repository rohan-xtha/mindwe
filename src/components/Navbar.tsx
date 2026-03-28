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
    <nav className="fixed top-0 left-0 right-0 bg-white/40 backdrop-blur-2xl border-b border-[#5A5A40]/5 px-8 py-5 z-50 shadow-[0_4px_30px_rgb(0,0,0,0.01)]">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5A634A] to-[#4A4F3D] flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform duration-500">
            <Heart size={18} fill="currentColor" />
          </div>
          <span className="text-xl font-serif font-medium tracking-tight text-[#3A4030]">Mind<span className="italic text-[#5A634A]">Sathi.</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-white/50 p-1.5 rounded-full border border-white shadow-sm backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-300",
                  isActive 
                    ? "text-[#F4F5F0] bg-[#4A4F3D] shadow-md" 
                    : "text-[#4A4F3D]/60 hover:text-[#3A4030] hover:bg-white/60"
                )}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-5">
          <Link
            to="/therapy"
            className="hidden sm:block text-[13px] font-medium text-[#4A4F3D]/80 hover:text-[#3A4030] transition-colors"
          >
            Support
          </Link>
          <Link
            to="/chat"
            className="px-6 py-2.5 bg-gradient-to-r from-[#5A634A] to-[#4A4F3D] text-[#F4F5F0] rounded-full text-[13px] font-medium hover:shadow-lg hover:shadow-[#5A634A]/20 active:scale-95 transition-all"
          >
            Talk to AI
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[#4A4F3D] p-2 bg-white/50 rounded-full border border-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#F4F5F0]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center lg:hidden">
          <div className="flex flex-col gap-4 w-full max-w-sm px-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-2xl text-[15px] font-medium transition-all duration-300",
                    isActive 
                      ? "text-[#F4F5F0] bg-[#4A4F3D] shadow-lg shadow-[#4A4F3D]/10" 
                      : "text-[#4A4F3D]/70 bg-white/50 hover:text-[#3A4030] hover:bg-white"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <div className={cn("p-2 rounded-xl", isActive ? "bg-white/10" : "bg-[#F4F5F0]")}>
                    <Icon size={18} />
                  </div>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 flex flex-col gap-4 w-full max-w-sm px-6">
            <Link
              to="/therapy"
              className="px-6 py-4 bg-white/60 text-[#4A4F3D] rounded-2xl text-[15px] font-medium text-center hover:bg-white transition-all border border-white"
              onClick={() => setIsOpen(false)}
            >
              Support Community
            </Link>
            <Link
              to="/chat"
              className="px-6 py-4 bg-gradient-to-r from-[#5A634A] to-[#4A4F3D] text-[#F4F5F0] rounded-2xl text-[15px] font-medium text-center hover:shadow-xl hover:shadow-[#5A634A]/20 active:scale-95 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Talk to AI Sathi
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
