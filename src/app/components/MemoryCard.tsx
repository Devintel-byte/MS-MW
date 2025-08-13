"use client"

import { Memory } from "@/generated/prisma";
import { HeartIcon, ChatBubbleOvalLeftIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { forwardRef } from 'react';

const MemoryCard = ({ memory }: { memory: Memory }, ref: React.Ref<HTMLDivElement>) => {
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

  // Fallback for frameImageUrl (shouldn't be needed after migration)

  return (
    <div ref={ref} className="w-full max-w-sm bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
            <span className="text-orange-500 font-semibold text-sm">
              {memory.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="font-semibold text-sm">{memory.name}</span>
        </div>
        <button className="text-xs font-bold text-orange-500 border border-orange-500 px-3 py-1 rounded">
          Follow
        </button>
      </div>

      <div className="w-full aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={memory.imageUrl}
          alt={memory.name}
          width={400}
          height={400}
          className="w-full h-full object-cover"
          // onError={() => console.error('Failed to load image:', memory.frameImageUrl)}
        />
      </div>

      <div className="flex justify-between px-4 pt-3">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1">
            <HeartIcon className="h-5 w-5" />
            <span className="text-xs">1,234</span>
          </div>
          <div className="flex items-center space-x-1">
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            <span className="text-xs">456</span>
          </div>
        </div>
        <div>
          <BookmarkIcon className="h-5 w-5" />
        </div>
      </div>

      <div className="px-4 py-2">
        <p className="text-sm font-semibold">{memory.name}</p>
        <p className="text-sm text-gray-800 mt-1">
          {truncatedMessage}
        </p>
        <p className="text-xs text-gray-400 mt-2">{formattedDate}</p>
      </div>
    </div>
  );
};

export default forwardRef(MemoryCard);