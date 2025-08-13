'use client';
import { Memory } from "@/generated/prisma";
import { HeartIcon, ChatBubbleOvalLeftIcon, BookmarkIcon } from "@heroicons/react/24/outline";
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
      style={{
        width: '100%',
        maxWidth: '24rem', 
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '9999px',
              backgroundColor: '#fed7aa', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#f97316', fontWeight: 600, fontSize: '0.875rem' }}>
              {memory.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{memory.name}</span>
        </div>
        <button
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#f97316',
            border: '1px solid #f97316',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.25rem',
          }}
        >
          Follow
        </button>
      </div>

      {/* Image */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1/1',
          backgroundColor: '#f9fafb',
          overflow: 'hidden',
        }}
      >
        <Image
          src={memory.imageUrl}
          alt={memory.name}
          width={400}
          height={400}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem 0',
        }}
      >
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <HeartIcon style={{ width: '1.25rem', height: '1.25rem' }} />
            <span style={{ fontSize: '0.75rem' }}>1,234</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <ChatBubbleOvalLeftIcon style={{ width: '1.25rem', height: '1.25rem' }} />
            <span style={{ fontSize: '0.75rem' }}>456</span>
          </div>
        </div>
        <div>
          <BookmarkIcon style={{ width: '1.25rem', height: '1.25rem' }} />
        </div>
      </div>

      {/* Caption */}
      <div style={{ padding: '0.5rem 1rem' }}>
        <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{memory.name}</p>
        <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
          {truncatedMessage}
        </p>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default forwardRef(CompositeMemoryCard);