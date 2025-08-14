'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const funMessages = [
  'Capturing your special moment!',
  'Adding your memory to the wall!',
  'Reliving the joy of your story!',
  'Crafting a timeless keepsake!',
  'Your memory is almost ready!',
  'Preserving your moment forever!',
  'Building your digital tapestry!',
  'Spinning your story into the wall!',
];

export default function SubmissionLoader() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => 
        (prevIndex + 1) % funMessages.length
      );
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 w-full max-w-sm mx-4"
      >
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-gray-700 text-center text-lg"
          >
            {funMessages[currentMessageIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}