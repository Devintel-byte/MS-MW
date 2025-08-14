'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp } from 'lucide-react';

export default function SubmissionSuccess() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // No state change needed; modal is controlled by parent
    }, 5000); // Dismiss after 5 seconds
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
        <ThumbsUp className="w-12 h-12 text-green-500 fill-green-500" />
        <p className="text-green-500 text-2xl font-bold">SUCCESS</p>
      </motion.div>
    </div>
  );
}