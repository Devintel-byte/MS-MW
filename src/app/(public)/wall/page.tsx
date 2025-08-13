'use client';
import { useState, useEffect } from 'react';
import MemoryCard from '@/app/components/CompositeMemoryCard';
import { Memory } from '@/generated/prisma';

type MemoriesResponse = {
  memories: Memory[];
  tableDropped: boolean;
};

export default function WallPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [tableDropped, setTableDropped] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMemories = async () => {
    try {
      const res = await fetch('/api/memories', {
        cache: 'no-store',
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

      // Update if memories differ (by IDs or length)
      const currentIds = memories.map(m => m.id).sort();
      const newIds = data.memories.map(m => m.id).sort();
      if (currentIds.join() !== newIds.join() || memories.length !== data.memories.length) {
        setMemories(data.memories);
        setTableDropped(false);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load memories');
    }
  };

  useEffect(() => {
    fetchMemories();
    const interval = setInterval(fetchMemories, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-orange-500 mb-8 text-center">
        Memory Wall
      </h1>
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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