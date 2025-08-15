'use client';
import { useState, useEffect } from 'react';
import MemoryCard from '@/app/components/CompositeMemoryCard';
import { Memory } from '@/generated/prisma';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type MemoriesResponse = {
  memories: Memory[];
  tableDropped: boolean;
};

export default function WallPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [tableDropped, setTableDropped] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Maximum number of cards to display (adjustable based on screen size)
  const MAX_CARDS = 20;

  const fetchMemories = async () => {
    try {
      const res = await fetch(`/api/memories?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch memories');
      }

      const data: MemoriesResponse = await res.json();

      if (data.tableDropped) {
        setTableDropped(true);
        setMemories([]);
        setError(null);
        return;
      }

      // Sort by createdAt (handle null) and take the latest MAX_CARDS
      const sortedMemories = data.memories
        .sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA; // Descending order (newest first)
        })
        .slice(0, MAX_CARDS);

      // Update if memories differ
      const currentIds = memories.map(m => m.id).sort();
      const newIds = sortedMemories.map(m => m.id).sort();
      if (currentIds.join() !== newIds.join() || memories.length !== sortedMemories.length) {
        setMemories(sortedMemories);
        setTableDropped(false);
        setError(null);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to load memories');
    }
  };

  useEffect(() => {
    fetchMemories();
    const interval = setInterval(fetchMemories, 5000);
    return () => clearInterval(interval);
  }, []);

  const goBack = () => {
    router.back();
  };

  return (
    <div className="bg-red-100/10 min-h-screen p-4 flex flex-col items-center">
      <div className='gap-x-1'>
        <button
        onClick={goBack}
        className="fixed top-4 left-4 z-10 bg-red-500 text-white rounded-full p-2 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-[#e66915] transition-colors"
        aria-label="Go back"
      >
        <ChevronLeftIcon className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <h1 className="text-3xl font-bold text-red-500 mb-8 text-center">
        Memory Wall
      </h1>
      </div>
      {error && (
        <div className="text-center text-red-500 mb-4">
          {error}
        </div>
      )}
      {tableDropped && (
        <div className="text-center text-gray-500">
          No memories available. The database table may have been dropped.
        </div>
      )}
      {!error && !tableDropped && memories.length === 0 && (
        <div className="text-center text-gray-500">
          No approved memories yet. Share yours now!
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2.5 w-full max-w-[1920px] mx-auto">
        {memories.map((memory) => (
          <MemoryCard
            key={memory.id}
            memory={{
              ...memory,
              imageUrl: memory.imageUrl || memory.imageUrl,
            }}
          />
        ))}
      </div>
    </div>
  );
}