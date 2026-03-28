import { motion, AnimatePresence } from "framer-motion";

interface MeditationPlayerProps {
  activeItem: {
    title: string;
    videoUrl: string;
  } | null;
  onClose: () => void;
}

export default function MeditationPlayer({ activeItem, onClose }: MeditationPlayerProps) {
  return (
    <AnimatePresence>
      {activeItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative w-full max-w-3xl aspect-video bg-black rounded-3xl shadow-lg overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-black/70"
            >
              ✕
            </button>

            {/* YouTube Video */}
            <iframe
              src={`${activeItem.videoUrl}?autoplay=1&rel=0&controls=0`}
              title={activeItem.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
