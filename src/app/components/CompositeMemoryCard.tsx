'use client';
import { Memory } from "@/generated/prisma";
import { HeartIcon, ChatBubbleOvalLeftIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { Share2 } from "lucide-react";
import Image from "next/image";
import { forwardRef } from 'react';

const CompositeMemoryCard = ({ memory }: { memory: Memory }, ref: React.Ref<HTMLDivElement>) => {
  const truncatedMessage = memory.message.length > 100 
    ? `${memory.message.substring(0, 100)}...` 
    : memory.message;

  const formattedDate = memory.createdAt
    ? new Date(memory.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Unknown date';

  return (
    <div
      ref={ref}
      className="w-full max-w-[24rem] bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
            <span className="text-orange-500 font-semibold text-sm">
              {memory.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="font-semibold text-sm">{memory.name}</span>
        </div>
        <button className="text-xs font-bold text-orange-500 border border-orange-500 px-3 py-1 rounded cursor-pointer hover:bg-orange-50">
          Follow
        </button>
      </div>

      {/* Image */}
      <div className="w-full aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={memory.imageUrl}
          alt={memory.name}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col p-3 pt-0">
        <div className="flex items-start justify-between mt-3">
        <div className="flex gap-4">
          <div className="flex gap-1">
            <HeartIcon className="w-6 h-6 text-red-500 fill-red-500" />
          </div>
          <div className="flex items-center gap-1">
            <ChatBubbleOvalLeftIcon className="w-6 h-6" />
            <span className="text-xs"></span>
          </div>
        </div>
        <div>
          <BookmarkIcon className="w-6 h-6" />
        </div>
      </div>
      <span className="text-[10px] mt-1">Liked by <b>movingsurface_ng</b> and <b>others</b></span>
      </div>

      {/* Caption */}
      <div className="p-3 pt-0">
        <p className="text-sm font-semibold">{memory.name}</p>
        <p className="text-sm text-gray-800 mt-1">{truncatedMessage}</p>
        <p className="text-xs text-gray-400 mt-2">{formattedDate}</p>
      </div>
    </div>
  );
};

export default forwardRef(CompositeMemoryCard);