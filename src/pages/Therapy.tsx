import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, MessageCircle, Heart, Users, ShieldCheck, Edit, X } from "lucide-react";
import PostCard from "../components/PostCard";
import { cn } from "@/src/lib/utils";

// Import the Reply interface from PostCard
import { Reply } from "../components/PostCard";

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  isVerified?: boolean;
  replies?: Reply[]; // Add replies to the Post interface
}

export default function Therapy() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Anonymous Friend",
      content: "Finally took a small step toward seeking help today. It felt heavy at first, but now I feel a sense of lightness I haven't known in months. To anyone still waiting: you don't have to carry it all alone.",
      timestamp: "2 hours ago",
      likes: 24,
      isVerified: false,
      replies: [
        {
          author: "Dr. Elara Vance",
          content: "That's a wonderful and brave step! Acknowledging your feelings and seeking support is a sign of immense strength. Remember, every small step forward is progress. Keep nurturing that sense of lightness.",
          timestamp: "1 hour ago",
          isVerified: true,
        },
        {
          author: "Supportive Soul",
          content: "So proud of you for taking that step! It really does get lighter. We're all here for you.",
          timestamp: "30 minutes ago",
        }
      ]
    },
    {
      id: "2",
      author: "Mindful Explorer",
      content: "Breath is the bridge which connects life to consciousness, which unites your body to your thoughts. Today I am simply breathing.",
      timestamp: "5 hours ago",
      likes: 15,
      isVerified: true,
      replies: [
        {
          author: "Dr. Alex Chen",
          content: "A beautiful reminder, Mindful Explorer. Focusing on the breath is a powerful anchor in the present moment, fostering calm and clarity. Keep exploring this connection.",
          timestamp: "2 hours ago",
          isVerified: true,
        }
      ]
    },
    {
      id: "3",
      author: "Quiet Observer",
      content: "Sometimes the silence is the loudest. Trying to find my voice again amidst the noise.",
      timestamp: "1 day ago",
      likes: 8,
      isVerified: false,
      replies: [
        {
          author: "Dr. Maya Singh",
          content: "It takes courage to acknowledge the weight of silence and to seek your voice. Remember, your voice is valuable, and it's okay to take your time to find it. We're here to listen when you're ready.",
          timestamp: "18 hours ago",
          isVerified: true,
        }
      ]
    },
    {
      id: "4",
      author: "Hopeful Heart",
      content: "Feeling a glimmer of hope today after a long time. Holding onto it tightly.",
      timestamp: "3 days ago",
      likes: 30,
      isVerified: false,
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [isRightPaneOpen, setIsRightPaneOpen] = useState(false); // State for right pane visibility

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      author: "Anonymous Me",
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      isVerified: false,
      replies: [], // New posts start with no replies
    };
    setPosts([post, ...posts]);
    setNewPost("");
    setIsRightPaneOpen(false); // Close the right pane after posting on mobile
  };

  return (
    <div className="min-h-screen bg-[#F5F5F4] pt-24 flex flex-col lg:flex-row">
      {/* Left Pane - Community Feed */}
      <div className="flex-1 p-8 lg:p-16 space-y-12 overflow-y-auto border-r border-[#0A0A0A]/5">
        <header className="space-y-2 mb-8 flex justify-between items-start">
          <div>
            <p className="text-sm uppercase tracking-widest text-[#5A5A40]/60">Community Ecosystem</p>
            <h1 className="font-serif text-4xl text-[#5A5A40]">Shared Voices</h1>
            <p className="text-[#5A5A40]/60 italic">
              A calm space for honest reflections. Your identity remains protected, your voice remains heard.
            </p>
          </div>
          {/* Mobile Post Button */}
          <button 
            className="lg:hidden p-3 bg-[#5A5A40] text-white rounded-full shadow-lg"
            onClick={() => setIsRightPaneOpen(true)}
          >
            <Edit size={20} />
          </button>
        </header>

        {/* Safety Protocol Active Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#5A5A40]/10 flex items-center space-x-4">
          <ShieldCheck size={24} className="text-green-500" />
          <div>
            <h2 className="font-semibold text-[#5A5A40]">Safety Protocol Active</h2>
            <p className="text-[#5A5A40]/60 text-sm">
              Every post is moderated by our wellness team to ensure a supportive environment free from judgment.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <AnimatePresence>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                author={post.author}
                time={post.timestamp}
                content={post.content}
                supportCount={post.isVerified ? undefined : post.likes}
                resonatesCount={post.isVerified ? post.likes : undefined}
                isVerified={post.isVerified}
                replies={post.replies} // Pass replies to PostCard
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Pane - Post Input */}
      <aside className={cn(
        "fixed inset-0 bg-white p-8 space-y-8 overflow-y-auto z-40 transform transition-transform duration-300 ease-in-out",
        isRightPaneOpen ? "translate-x-0" : "translate-x-full",
        "lg:relative lg:translate-x-0 lg:w-[450px] lg:border-l lg:border-[#0A0A0A]/5" // Desktop styles
      )}>
        <div className="lg:hidden flex justify-end mb-4">
          <button 
            className="text-[#0A0A0A]"
            onClick={() => setIsRightPaneOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <div className="sticky top-8 space-y-8"> {/* Adjusted top for mobile overlay */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Share your thoughts.</h2>
            <p className="text-sm text-[#0A0A0A]/40 leading-relaxed">
              Your voice matters. Share anonymously with the community.
            </p>
          </div>

          <div className="space-y-6">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full min-h-[240px] p-6 rounded-[32px] bg-[#F5F5F4] border border-[#0A0A0A]/5 focus:border-[#0A0A0A] focus:ring-0 resize-none text-lg font-medium text-[#0A0A0A] placeholder:text-[#0A0A0A]/20 outline-none transition-all"
            />
            <button
              onClick={handlePost}
              disabled={!newPost.trim()}
              className="w-full py-5 bg-[#0A0A0A] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20"
            >
              Post Anonymously
            </button>
          </div>

          <div className="p-8 rounded-[32px] bg-[#F5F5F4] border border-[#0A0A0A]/5 space-y-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A]/40">
              <ShieldCheck size={14} />
              <span>Safety Protocol</span>
            </div>
            <p className="text-[11px] text-[#0A0A0A]/60 leading-relaxed">
              All posts are moderated to ensure a safe and supportive environment for everyone.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}