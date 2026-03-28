import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Send, Sparkles, AlertCircle, RefreshCw, ShieldCheck, PanelRight, X } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { TruthGapResult } from "@/src/types";
import { cn } from "@/src/lib/utils";

export default function Chat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Hello, I'm Sathi. I'm here to listen and support you. How are you feeling right now?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [truthGap, setTruthGap] = useState<TruthGapResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      analyzeTruthGap(userMsg, ai);

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `
          You are "Sathi", a compassionate mental health assistant. 
          The user says: "${userMsg}"
          Provide a supportive, empathetic response. Keep it brief and encouraging.
          If the user seems in high distress, gently suggest professional help.
        `
      });
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm here for you." }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I'm having a bit of trouble connecting. But I'm still here for you." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const analyzeTruthGap = async (text: string, ai: GoogleGenAI) => {
    setIsAnalyzing(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `
          Analyze the "Truth Gap" for a mental health context.
          User says: "${text}"
          User's observed behavior/context: "User is interacting with a mental health chatbot."
          
          Identify if there's a mismatch between what they say and how they might be feeling.
          Provide:
          1. Risk Level (Low, Medium, High)
          2. Insight (Why is there a gap?)
          3. Suggested Action (What should the platform suggest?)
          
          Return ONLY JSON format: { "riskLevel": "Low" | "Medium" | "High", "insight": string, "suggestedAction": string }
        `,
        config: {
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text || "{}");
      setTruthGap(data);
    } catch (error) {
      console.error("Analysis Error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F4] pt-24 flex flex-col lg:flex-row">
      {/* Left Pane - Chat Area */}
      <div className="flex-1 flex flex-col border-r border-[#0A0A0A]/5">
        <header className="p-8 border-b border-[#0A0A0A]/5 flex items-center gap-4 bg-white/50 backdrop-blur-md">
          <div className="w-12 h-12 rounded-full bg-[#5A5A40] flex items-center justify-center">
            <Sparkles size={24} className="text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-[#5A5A40]">AI Sathi</h1>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40]/60">Active Session</span>
            </div>
          </div>
          {/* Toggle button for sidebar on mobile */}
          <button 
            className="ml-auto lg:hidden text-[#5A5A40]"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <PanelRight size={24} />}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#5A5A40] flex items-center justify-center mr-3 self-end">
                  <Sparkles size={16} className="text-white" />
                </div>
              )}
              <div className={cn(
                "max-w-[80%] p-6 text-[15px] leading-relaxed shadow-sm transition-all",
                msg.role === 'user'
                  ? "bg-[#5A5A40] text-white rounded-bl-3xl rounded-br-3xl rounded-tl-3xl"
                  : "bg-white text-[#5A5A40] border border-[#5A5A40]/10 rounded-bl-3xl rounded-br-3xl rounded-tr-3xl"
              )}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-[#5A5A40] flex items-center justify-center mr-3 self-end">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="bg-white p-6 rounded-bl-3xl rounded-br-3xl rounded-tr-3xl border border-[#5A5A40]/10 flex gap-1.5">
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-[#5A5A40]/20 rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#5A5A40]/20 rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#5A5A40]/20 rounded-full" />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <div className="p-8 bg-white/50 backdrop-blur-md border-t border-[#5A5A40]/5">
          <div className="max-w-4xl mx-auto relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="w-full p-5 pr-16 rounded-full bg-white border border-[#5A5A40]/10 focus:border-[#5A5A40] focus:ring-0 text-[#5A5A40] outline-none transition-all placeholder:text-[#5A5A40]/40 font-medium"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2.5 w-11 h-11 bg-[#5A5A40] text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Pane - Insights Area */}
      <aside className={cn(
        "fixed inset-y-0 right-0 w-full bg-[#F5F5F0] p-8 space-y-8 overflow-y-auto z-40 transform transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "translate-x-full",
        "lg:relative lg:translate-x-0 lg:w-[400px] lg:border-l lg:border-[#0A0A0A]/5" // Desktop styles
      )}>
        <div className="lg:hidden flex justify-end mb-4">
          <button 
            className="text-[#5A5A40]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#5A5A40]/60">
            <Sparkles size={14} />
            <span>Real-time Analysis</span>
          </div>

          <AnimatePresence mode="wait">
            {truthGap ? (
              <motion.div
                key="insight"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="p-6 rounded-[32px] bg-white border border-[#5A5A40]/10">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40]/60 block mb-4">Risk Assessment</span>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      truthGap.riskLevel === 'High' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]' :
                      truthGap.riskLevel === 'Medium' ? 'bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.5)]' :
                      'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]'
                    )} />
                    <span className="text-2xl font-bold tracking-tight text-[#5A5A40]">{truthGap.riskLevel}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40]/60 block">Truth Gap Insight</span>
                  <p className="text-[15px] text-[#5A5A40]/80 leading-relaxed font-medium italic">
                    "{truthGap.insight}"
                  </p>
                </div>

                <div className="p-6 rounded-[32px] border border-[#5A5A40]/10 space-y-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#5A5A40]/60">
                    <ShieldCheck size={14} />
                    <span>Recommended Protocol</span>
                  </div>
                  <p className="text-sm font-bold leading-relaxed text-[#5A5A40]">
                    {truthGap.suggestedAction}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#5A5A40]/20">
                  <RefreshCw size={32} className="animate-spin-slow" />
                </div>
                <p className="text-xs font-bold text-[#5A5A40]/40 uppercase tracking-widest">Awaiting Input...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-8 border-t border-[#5A5A40]/5">
          <div className="p-6 rounded-[32px] bg-[#5A5A40] text-white space-y-4">
            <h4 className="text-sm font-bold">Need immediate help?</h4>
            <p className="text-[11px] text-white/60 leading-relaxed">
              If you are in immediate danger, please contact emergency services or a crisis hotline.
            </p>
            <Link to="/professionals" className="block w-full py-3 bg-white text-[#5A5A40] rounded-full text-center text-xs font-bold hover:scale-105 transition-all">
              Find a Professional
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}