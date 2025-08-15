'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp } from 'lucide-react';

export default function SubmissionSuccess() {
  useEffect(() => {
    const timer = setTimeout(() => {
    }, 3000); // Dismiss after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 w-full max-w-sm mx-4"
      >
        <div className="rounded-full border-2 border-green-500 p-3 flex items-center justify-center">
          <ThumbsUp className="w-10 h-10 text-green-500 fill-green-500" />
        </div>
        <p className="text-green-500 text-2xl font-bold">SUCCESS</p>
        <p className="text-gray-900 text-sm font-medium">Email sent, Check inbox</p>
      </motion.div>
    </div>
  );
}