import { motion } from "framer-motion";
import { Play, Music, Wind, Sun } from "lucide-react";
import { useState } from "react";
import MeditationPlayer from "./MeditationPlayer";

interface WellnessContent {
  id: string;
  title: string;
  type: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
}

const content: WellnessContent[] = [
  {
    id: "1",
    title: "Morning Flow Yoga",
    type: "Yoga",
    duration: "27 min",
    thumbnail: "https://antarnaad.net/app/docs/20211011041011927.png",
    videoUrl: "https://www.youtube.com/embed/hJbRpHZr_d0"
  },
  {
    id: "2",
    title: "Deep Sleep Meditation",
    type: "Meditation",
    duration: "10 min",
    thumbnail: "https://images.onlymyhealth.com/imported/images/2021/November/24_Nov_2021/big_ds.jpg",
    videoUrl: "https://www.youtube.com/embed/LWGSwfchz_A"
  },
  {
    id: "3",
    title: "Focus & Clarity Beats",
    type: "Music",
    duration: "15 min",
    thumbnail: "https://i.ytimg.com/vi/olJK1Gx2ERs/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/AImuCtIokl0"
  },
  {
    id: "4",
    title: "Stress Relief Breathing",
    type: "Meditation",
    duration: "10 min",
    thumbnail: "https://www.onemedical.com/media/images/iStock-1252358868.width-2000.jpg",
    videoUrl: "https://www.youtube.com/embed/VUjiXcfKBn8"
  }
];

export default function Wellness() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeItem, setActiveItem] = useState<WellnessContent | null>(null);

  const filteredContent =
    selectedCategory === "All"
      ? content
      : content.filter((item) => item.type === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f5f5f0] pt-20 pb-24 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="font-serif text-4xl text-[#5A5A40]">Wellness Hub</h1>
          <p className="text-[#5A5A40]/60 italic">
            Nurture your body, calm your mind.
          </p>
        </header>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[
            { label: "All", icon: Sun },
            { label: "Meditation", icon: Wind },
            { label: "Yoga", icon: Play },
            { label: "Music", icon: Music }
          ].map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border font-medium whitespace-nowrap transition-all
              ${
                selectedCategory === cat.label
                  ? "bg-[#5A5A40] text-white"
                  : "bg-white text-[#5A5A40] border-[#5A5A40]/10 hover:bg-[#5A5A40] hover:text-white"
              }`}
            >
              <cat.icon size={16} /> {cat.label}
            </button>
          ))}
        </div>

        {/* Meditation Banner */}
        {selectedCategory === "Meditation" && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#5A5A40]/10">
            <h2 className="font-serif text-2xl text-[#5A5A40] mb-2">
              🧘 Meditation Zone
            </h2>
            <p className="text-[#5A5A40]/60 text-sm">
              Relax, breathe, and let your thoughts flow peacefully.
            </p>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredContent.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => {
                if (item.videoUrl) setActiveItem(item);
              }}
            >
              <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-sm border border-[#5A5A40]/5">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-[#5A5A40]">
                  {item.duration}
                </div>
              </div>

              <div className="mt-4 px-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                  {item.type}
                </span>
                <h3 className="font-serif text-xl text-[#5A5A40] mt-1">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🎥 Meditation/Yoga/Music Player */}
      <MeditationPlayer
        activeItem={activeItem}
        onClose={() => setActiveItem(null)}
      />
    </div>
  );
}