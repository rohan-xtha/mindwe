import { motion } from "motion/react";
import { UserCheck, Star, MessageSquare, Calendar } from "lucide-react";
import { Therapist } from "@/src/types";

const therapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    specialty: "Anxiety & Depression Specialist",
    bio: "Helping individuals find balance and resilience through cognitive behavioral therapy.",
    image: "https://picsum.photos/seed/doc1/400/400"
  },
  {
    id: "2",
    name: "Dr. James Wilson",
    specialty: "Relationship Counselor",
    bio: "Focused on improving communication and building stronger emotional connections.",
    image: "https://picsum.photos/seed/doc2/400/400"
  },
  {
    id: "3",
    name: "Dr. Elena Rodriguez",
    specialty: "Trauma & PTSD Expert",
    bio: "Specializing in somatic experiencing and mindfulness-based stress reduction.",
    image: "https://picsum.photos/seed/doc3/400/400"
  }
];

export default function Professionals() {
  return (
    <div className="min-h-screen bg-[#F5F5F4] pt-32 pb-24 px-8">
      <div className="max-w-[1400px] mx-auto space-y-32">
        <header className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0A0A0A]/40">
              <UserCheck size={14} />
              <span>Certified Network</span>
            </div>
            <h1 className="text-7xl font-bold tracking-tight text-[#0A0A0A]">The Specialists.</h1>
          </div>
          <p className="text-[#0A0A0A]/40 max-w-sm text-lg leading-relaxed font-medium">
            Hand-picked professionals dedicated to your mental and emotional growth through evidence-based practices.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapists.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[40px] border border-[#0A0A0A]/5 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={doc.image}
                  alt={doc.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A]">
                  Available Now
                </div>
              </div>
              
              <div className="p-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold tracking-tight text-[#0A0A0A]">{doc.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A0A0A]/40">{doc.specialty}</p>
                </div>
                <p className="text-sm text-[#0A0A0A]/60 leading-relaxed font-medium line-clamp-3">{doc.bio}</p>
                <div className="flex gap-4 pt-4">
                  <button className="flex-1 bg-[#0A0A0A] text-white py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                    Book Session
                  </button>
                  <button className="p-4 border border-[#0A0A0A]/10 rounded-full hover:bg-[#F5F5F4] transition-all">
                    <MessageSquare size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emergency Section - Clean Utility */}
        <section className="bg-[#0A0A0A] rounded-[48px] p-16 lg:p-24 text-center space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <div className="writing-mode-vertical-rl rotate-180 text-[10px] uppercase tracking-[0.3em] font-bold text-white/10">
              CRISIS INTERVENTION — 24/7
            </div>
          </div>

          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-white tracking-tight">Immediate Support.</h2>
            <p className="text-white/40 text-lg leading-relaxed font-medium">
              If you are in crisis, please don't wait. Our emergency network is available 24/7 to provide immediate assistance and guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <button className="bg-white text-[#0A0A0A] px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl">
                Call Crisis Line
              </button>
              <button className="bg-transparent border border-white/20 text-white px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
                Find Nearest Center
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

