import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, MessageCircle, Heart, Users, ShieldCheck } from "lucide-react";

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

export default function Therapy() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Anonymous Friend",
      content: "Feeling a bit overwhelmed with work lately. How do you all manage stress?",
      timestamp: "2h ago",
      likes: 12
    },
    {
      id: "2",
      author: "Kind Soul",
      content: "Just finished a 10-minute meditation. It really helps clear the mind. Highly recommend it!",
      timestamp: "4h ago",
      likes: 24
    }
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      author: "Anonymous Me",
      content: newPost,
      timestamp: "Just now",
      likes: 0
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F4] pt-24 flex flex-col lg:flex-row">
      {/* Left Pane - Community Feed */}
      <div className="flex-1 p-8 lg:p-16 space-y-12 overflow-y-auto border-r border-[#0A0A0A]/5">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0A0A0A]/40">
            <Users size={14} />
            <span>Community Ecosystem</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-[#0A0A0A]">Shared Voices.</h1>
        </header>

        <div className="space-y-8">
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 bg-white rounded-[32px] border border-[#0A0A0A]/5 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F5F5F4] flex items-center justify-center text-[#0A0A0A]/40">
                      <User size={14} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A]/40">{post.author} • {post.timestamp}</span>
                  </div>
                </div>
                
                <p className="text-xl font-medium text-[#0A0A0A] leading-relaxed mb-8">
                  "{post.content}"
                </p>
                
                <div className="flex gap-6 pt-6 border-t border-[#F5F5F4]">
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A]/40 hover:text-[#0A0A0A] transition-colors">
                    <Heart size={14} /> {post.likes} Support
                  </button>
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A]/40 hover:text-[#0A0A0A] transition-colors">
                    <MessageCircle size={14} /> Reply
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Pane - Post Input */}
      <aside className="w-full lg:w-[450px] bg-white p-8 lg:p-16 space-y-8">
        <div className="sticky top-32 space-y-8">
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

