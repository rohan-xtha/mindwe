import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Users, UserCheck, ArrowRight, MessageCircle, ShieldCheck, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen text-[#4A4F3D] font-sans bg-transparent relative z-10">
      <main className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)] mt-20">
        {/* Left Pane - Content */}
        <section className="p-8 lg:p-24 flex flex-col justify-center space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-medium text-[#4A4F3D]/60">
              <Activity size={14} className="opacity-70" />
              <span>A Safe Space For You</span>
            </div>
            <h1 className="text-[72px] md:text-[96px] leading-[1.05] font-serif font-light text-[#3A4030] tracking-tight">
              Mind<br /><span className="italic text-[#5A634A]">Sathi.</span>
            </h1>
            <p className="max-w-md text-lg text-[#4A4F3D]/80 leading-relaxed font-light">
              Your gentle companion for emotional expression, mindful reflection, and professional guidance. We're here for you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/therapy"
              className="group relative px-8 py-4 bg-[#5A5A40] text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 font-semibold">Get Started</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link
              to="/chat"
              className="px-8 py-4 border border-[#5A5A40] rounded-full font-semibold hover:bg-[#5A5A40] hover:text-white transition-all"
            >
              Talk to AI
            </Link>
          </motion.div>

          <div className="pt-12 grid grid-cols-2 gap-8 border-t border-[#5A5A40]/10">
            <div>
              <span className="block text-2xl font-semibold tracking-tight">98%</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40]/40">Accuracy Rate</span>
            </div>
            <div>
              <span className="block text-2xl font-semibold tracking-tight">24/7</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40]/40">Active Support</span>
            </div>
          </div>
        </section>

        {/* Right Pane - Visual/Features */}
        <section className="relative p-8 lg:p-24 flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl border-l border-white/50" />
          
          <div className="absolute top-0 right-0 p-8 z-10">
            <div className="writing-mode-vertical-rl rotate-180 text-[10px] uppercase tracking-[0.3em] font-medium text-[#4A4F3D]/30">
              MINDFUL WELLNESS ENVIRONMENT
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 relative z-10 w-full max-w-md mx-auto lg:mx-0">
            {[
              {
                title: "Community Space",
                icon: Users,
                desc: "A gentle environment for peer support.",
                link: "/therapy"
              },
              {
                title: "AI Companion",
                icon: Sparkles,
                desc: "An empathetic AI to listen and reflect.",
                link: "/chat"
              },
              {
                title: "Professional Care",
                icon: UserCheck,
                desc: "Compassionate certified experts.",
                link: "/professionals"
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
              >
                <Link
                  to={item.link}
                  className="group block p-8 bg-white/60 border border-white/80 rounded-[40px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:bg-white hover:shadow-[0_20px_40px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-4 bg-[#F4F5F0] rounded-3xl group-hover:bg-[#EAE4D9]/50 transition-colors">
                      <item.icon size={24} className="text-[#5A634A]" />
                    </div>
                    <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-[#5A634A]" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#3A4030] mb-2">{item.title}</h3>
                  <p className="text-[15px] text-[#4A4F3D]/60 leading-relaxed">
                    {item.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-white/50 rounded-full blur-[80px]" />
        </section>
      </main>
    </div>
  );
}



