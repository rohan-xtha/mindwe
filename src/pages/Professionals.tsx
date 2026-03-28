import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserCheck, MessageSquare, Heart, X, CheckCircle2 } from "lucide-react";
import { Therapist } from "@/src/types";

const therapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    specialty: "Anxiety & Depression Specialist",
    bio: "Helping individuals find balance and resilience through cognitive behavioral therapy. A warm and empathetic approach to healing.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
  },
  {
    id: "2",
    name: "Dr. James Wilson",
    specialty: "Relationship Counselor",
    bio: "Focused on improving communication and building stronger emotional connections. Let's work together to restore harmony.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
  },
  {
    id: "3",
    name: "Dr. Elena Rodriguez",
    specialty: "Trauma & PTSD Expert",
    bio: "Specializing in somatic experiencing and mindfulness-based stress reduction. Creating a safe space for your recovery journey.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
  }
];

export default function Professionals() {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const handleBook = () => {
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setSelectedTherapist(null);
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] mt-20 bg-transparent pt-12 pb-24 px-8 relative z-10 w-full max-w-[1400px] mx-auto">
      <div className="space-y-32">
        <header className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-medium text-[#4A4F3D]/60 w-fit px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-white/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <UserCheck size={14} className="text-[#5A634A]" />
              <span>Certified Network</span>
            </div>
            <h1 className="text-7xl font-serif text-[#3A4030] tracking-tight">The <span className="italic text-[#5A634A]">Specialists.</span></h1>
          </div>
          <p className="text-[#4A4F3D]/70 max-w-md text-lg leading-relaxed font-light">
            Hand-picked professionals dedicated to your mental and emotional growth through gentle, evidence-based practices.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapists.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/60 backdrop-blur-2xl rounded-[40px] border border-white shadow-[0_8px_32px_rgb(0,0,0,0.02)] overflow-hidden hover:bg-white/80 hover:shadow-[0_20px_40px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden relative m-4 rounded-[32px] shrink-0">
                <img
                  src={doc.image}
                  alt={doc.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#5A634A] shadow-lg flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Available Now
                </div>
              </div>
              
              <div className="p-8 pb-8 space-y-6 flex flex-col flex-1">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif text-[#3A4030] group-hover:text-[#4A4F3D] transition-colors">{doc.name}</h3>
                  <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#5A634A]/70">{doc.specialty}</p>
                </div>
                <p className="text-[15px] text-[#4A4F3D]/60 leading-relaxed max-w-sm line-clamp-3 flex-1">{doc.bio}</p>
                
                <div className="flex gap-4 pt-4 border-t border-[#4A4F3D]/5 mt-auto">
                  <button 
                    onClick={() => setSelectedTherapist(doc)}
                    className="flex-1 bg-gradient-to-r from-[#5A634A] to-[#4A4F3D] text-[#F4F5F0] py-4 rounded-3xl text-[13px] font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#5A634A]/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Heart size={16} className="shrink-0" /> <span className="truncate">Book Session</span>
                  </button>
                  <button 
                    onClick={() => {
                      alert("Message functionality is currently under development to ensure end-to-end encryption.");
                    }}
                    className="p-4 bg-white/50 border border-white text-[#5A634A] rounded-3xl hover:bg-white hover:text-[#3A4030] hover:shadow-md active:scale-95 transition-all duration-300 flex items-center justify-center group-hover:bg-[#F4F5F0] shrink-0"
                  >
                    <MessageSquare size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emergency Section - Calm but urgent style */}
        <section className="bg-gradient-to-br from-[#5A634A] to-[#4A4F3D] rounded-[48px] p-16 lg:p-24 text-center space-y-8 relative overflow-hidden shadow-[0_20px_60px_rgb(0,0,0,0.1)]">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-emerald-100/10 rounded-full blur-[80px]" />
          
          <div className="absolute top-0 right-0 p-8">
            <div className="writing-mode-vertical-rl rotate-180 text-[10px] uppercase tracking-[0.3em] font-medium text-white/20">
              CRISIS SUPPORT — 24/7
            </div>
          </div>

          <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
            <h2 className="text-5xl font-serif text-[#F4F5F0] tracking-tight">Immediate Support.</h2>
            <p className="text-white/80 text-[17px] leading-relaxed font-light">
              If you are in crisis, please don't wait. Our emergency network is available 24/7 to provide immediate assistance and compassionate guidance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <a 
                href="tel:988" 
                className="flex-1 bg-white text-[#4A4F3D] py-5 px-8 rounded-full text-[13px] font-medium hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-black/10 flex items-center justify-center"
              >
                Call Crisis Line (988)
              </a>
              <a 
                href="https://www.google.com/maps/search/mental+health+center+near+me" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 bg-white/10 border border-white/20 text-[#F4F5F0] backdrop-blur-md py-5 px-8 rounded-full text-[13px] font-medium hover:bg-white/20 active:scale-95 transition-all duration-300 flex items-center justify-center"
              >
                Find Nearest Center
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedTherapist && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTherapist(null)}
              className="absolute inset-0 bg-[#3A4030]/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#F4F5F0] rounded-[40px] p-8 shadow-2xl border border-white overflow-hidden"
            >
              {isBooked ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-3xl font-serif text-[#3A4030]">Session Confirmed</h3>
                  <p className="text-[#4A4F3D]/60 leading-relaxed font-light">
                    Your appointment with {selectedTherapist.name} has been successfully requested. They will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-serif text-[#3A4030]">Schedule Session</h3>
                    <button 
                      onClick={() => setSelectedTherapist(null)}
                      className="p-2 bg-white/50 border border-white rounded-full text-[#4A4F3D] hover:bg-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-white/60 rounded-[28px] border border-white">
                    <img src={selectedTherapist.image} alt="" className="w-16 h-16 rounded-full object-cover shadow-sm" />
                    <div>
                      <p className="font-serif text-lg text-[#3A4030]">{selectedTherapist.name}</p>
                      <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#5A634A]/70">{selectedTherapist.specialty}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={handleBook}
                      className="w-full bg-gradient-to-r from-[#5A634A] to-[#4A4F3D] text-[#F4F5F0] py-4 rounded-full text-[13px] font-medium transition-all duration-300 hover:shadow-lg active:scale-95"
                    >
                      Confirm Booking Request
                    </button>
                    <p className="text-center text-[11px] text-[#4A4F3D]/50 font-medium">Free 15-minute introductory call</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

