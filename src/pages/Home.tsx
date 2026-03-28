import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Users, UserCheck, ArrowRight, MessageCircle, ShieldCheck, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F4] text-[#0A0A0A] font-sans">
      <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Pane - Content */}
        <section className="p-8 lg:p-24 flex flex-col justify-center space-y-12 border-r border-[#0A0A0A]/10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#0A0A0A]/40">
              <Activity size={12} />
              <span>Professional Mental Health Ecosystem</span>
            </div>
            <h1 className="text-[80px] md:text-[112px] leading-[0.88] font-semibold tracking-[-0.04em]">
              Mind<br />Sathi.
            </h1>
            <p className="max-w-md text-lg text-[#0A0A0A]/60 leading-relaxed font-medium">
              A high-precision platform for emotional expression, community support, and expert guidance.
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
              className="group relative px-8 py-4 bg-[#0A0A0A] text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 font-semibold">Get Started</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link
              to="/chat"
              className="px-8 py-4 border border-[#0A0A0A] rounded-full font-semibold hover:bg-[#0A0A0A] hover:text-white transition-all"
            >
              Talk to AI
            </Link>
          </motion.div>

          <div className="pt-12 grid grid-cols-2 gap-8 border-t border-[#0A0A0A]/10">
            <div>
              <span className="block text-2xl font-semibold tracking-tight">98%</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A]/40">Accuracy Rate</span>
            </div>
            <div>
              <span className="block text-2xl font-semibold tracking-tight">24/7</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A]/40">Active Support</span>
            </div>
          </div>
        </section>

        {/* Right Pane - Visual/Features */}
        <section className="bg-[#0A0A0A] p-8 lg:p-24 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <div className="writing-mode-vertical-rl rotate-180 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">
              EST. 2026 — MENTAL WELLNESS
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 relative z-10">
            {[
              {
                title: "Community",
                icon: Users,
                desc: "Secure peer-to-peer support networks.",
                link: "/therapy"
              },
              {
                title: "AI Sathi",
                icon: Sparkles,
                desc: "Intelligent emotional monitoring.",
                link: "/chat"
              },
              {
                title: "Experts",
                icon: UserCheck,
                desc: "Certified professional consultations.",
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
                  className="group block p-8 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white hover:text-[#0A0A0A] transition-all duration-500"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-[#0A0A0A]/5 transition-colors">
                      <item.icon size={24} className="text-white group-hover:text-[#0A0A0A]" />
                    </div>
                    <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-[#0A0A0A]">{item.title}</h3>
                  <p className="text-sm text-white/40 group-hover:text-[#0A0A0A]/60 leading-relaxed max-w-[200px]">
                    {item.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-[20%] right-[-5%] w-32 h-32 border border-white/10 rounded-full rotate-12" />
        </section>
      </main>
    </div>
  );
}



