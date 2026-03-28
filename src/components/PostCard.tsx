import React from 'react';
import { Heart, MessageSquare, Sparkles, User } from 'lucide-react';

interface PostCardProps {
  author: string;
  time: string;
  content: string;
  supportCount?: number;
  resonatesCount?: number;
  isVerified?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  time,
  content,
  supportCount,
  resonatesCount,
  isVerified = false,
}) => {
  const cardClasses = isVerified
    ? "bg-[#F5F3FF] rounded-3xl p-6 shadow-sm border border-[#5A5A40]/10"
    : "bg-white rounded-3xl p-6 shadow-sm border border-[#5A5A40]/10";

  const iconClasses = isVerified ? "text-[#8B5CF6]" : "text-[#5A5A40]";

  return (
    <div className={cardClasses}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {isVerified ? (
            <div className="w-10 h-10 bg-[#DDD6FE] rounded-full flex items-center justify-center">
              <Sparkles size={20} className="text-[#8B5CF6]" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-[#E0E0E0] rounded-full flex items-center justify-center">
              <User size={20} className="text-[#5A5A40]" />
            </div>
          )}
          <div>
            <p className="font-semibold text-[#5A5A40]">{author}</p>
            {isVerified && (
              <p className="text-xs text-[#8B5CF6] font-medium">VERIFIED JOURNEY</p>
            )}
            <p className="text-xs text-[#5A5A40]/60">{time}</p>
          </div>
        </div>
        <button className="text-[#5A5A40]/60 hover:text-[#5A5A40]">
          •••
        </button>
      </div>
      <p className="text-[#5A5A40] mb-4">{`"${content}"`}</p>
      <div className="flex space-x-4">
        {supportCount !== undefined && (
          <button className="flex items-center space-x-2 text-[#5A5A40]/80 hover:text-[#5A5A40] transition-colors">
            <Heart size={18} className={iconClasses} />
            <span>Support ({supportCount})</span>
          </button>
        )}
        {resonatesCount !== undefined && (
          <button className="flex items-center space-x-2 text-[#5A5A40]/80 hover:text-[#5A5A40] transition-colors">
            <Sparkles size={18} className={iconClasses} />
            <span>Resonates ({resonatesCount})</span>
          </button>
        )}
        {supportCount !== undefined && ( // Only show reply if support is also shown
          <button className="flex items-center space-x-2 text-[#5A5A40]/80 hover:text-[#5A5A40] transition-colors">
            <MessageSquare size={18} className={iconClasses} />
            <span>Reply</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;