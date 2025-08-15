"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Heart, 
  Camera, 
  GalleryVerticalEnd, 
  Sparkles, 
  Share2, 
  Users 
} from "lucide-react";

export default function Home() {
  const icons = [Heart, Camera, GalleryVerticalEnd, Sparkles, Share2, Users];
  
  return (
    <div className="relative min-h-screen bg-red-100/10 overflow-hidden">
      {/* Animated background icons */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 -z-10 opacity-10">
        {Array.from({ length: 36 }).map((_, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.05, 0.15, 0.05],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center"
            >
              <Icon className="w-6 h-6 text-gray-800" />
            </motion.div>
          );
        })}
      </div>

      <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-gray-900"
            whileHover={{ scale: 1.02 }}
          >
            MEMORY <span className="text-red-500">WALL</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Capture moments, share memories. A digital tapestry of life's special events, 
            where every photo tells a story and every memory finds its place.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/submit">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-red-500 text-white rounded-lg font-medium shadow-lg hover:shadow-red-200 transition-all"
              >
                Share Your Memory
              </motion.div>
            </Link>
            
            <Link href="/wall">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                View the Wall
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {[
            {
              icon: <Camera className="w-8 h-8 text-red-500" />,
              title: "Capture",
              text: "Snap photos directly or upload your favorite moments"
            },
            {
              icon: <GalleryVerticalEnd className="w-8 h-8 text-red-500" />,
              title: "Curate",
              text: "Beautifully displayed memories in a digital gallery"
            },
            {
              icon: <Share2 className="w-8 h-8 text-red-500" />,
              title: "Share",
              text: "Send memories to friends or share on social media"
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-red-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How to Use Section */}
        <motion.section
          className="mt-24 w-full max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How to Use Memory Wall
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "Step 1",
                title: "Share Your Memory",
                content: (
                  <>
                    Click the{" "}
                    <Link href="/submit" className="text-red-500 hover:underline">
                      Share a Photo
                    </Link>{" "}
                    button to get started:
                    <ol className="list-disc list-inside mt-4 text-gray-600">
                      <li>Take a photo</li>
                      <li>Enter your name</li>
                      <li>Enter your message</li>
                      <li>Enter your email (optional) to receive a copy of your photo card</li>
                    </ol>
                  </>
                ),
              },
              {
                step: "Step 2",
                title: "View the Photo Wall",
                content: (
                  <>
                    To see all shared memories, click the{" "}
                    <Link href="/wall" className="text-red-500 hover:underline">
                      View Wall
                    </Link>{" "}
                    button to explore the digital gallery.
                  </>
                ),
              },
              {
                step: "Step 3",
                title: "Enjoy Your Memories",
                content: "Browse, share, and celebrate the moments that matter most on the Memory Wall!",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-sm font-semibold text-red-500 mb-2">{item.step}</span>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <span className="text-gray-600">{item.content}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}