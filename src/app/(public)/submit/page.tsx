'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useUploadThing } from '@/lib/uploadthing';
import html2canvas from 'html2canvas-pro';
import MemoryCard from '@/app/components/CompositeMemoryCard';
import { Memory } from '@/generated/prisma';

export default function SubmitPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { startUpload } = useUploadThing('memoryImage');

  // Camera setup
  const startCamera = async () => {
    try {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', aspectRatio: 9 / 16 },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast.error('Camera access denied. Please allow camera permissions.');
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach(track => track.stop());
      }
    };
  }, []);

  // Countdown effect
  useEffect(() => {
    if (countdown === null) return;

    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        setCountdown(null);
        captureImage();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const startCountdown = () => {
    setCountdown(3);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl);
        const uniqueId = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)}`;
        const uniqueFilename = `memory-${uniqueId}.jpg`;
        const file = dataURLtoFile(dataUrl, uniqueFilename);
        setImageFile(file);
      }
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const captureCompositeImage = async () => {
    if (!cardRef.current) {
      console.error('MemoryCard ref not available');
      return null;
    }
    try {
      // Delay to ensure DOM is rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#ffffff', 
      });
      const dataUrl = canvas.toDataURL('image/png');
      const uniqueId = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}`;
      const uniqueFilename = `composite-${uniqueId}.png`;
      return dataURLtoFile(dataUrl, uniqueFilename);
    } catch (error) {
      console.error('html2canvas error:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!image || !imageFile) {
      toast.error('Please capture or upload an image');
      return;
    }

    setIsSubmitting(true);
    try {
      // Capture composite image (optional)
      const compositeFile = await captureCompositeImage();
      const filesToUpload = compositeFile ? [imageFile, compositeFile] : [imageFile];

      // Upload images
      const uploadResponse = await startUpload(filesToUpload);
      if (!uploadResponse?.[0]?.url) {
        throw new Error('Image upload failed');
      }

      // Prepare form data
      const formData = {
        name,
        message,
        imageUrl: uploadResponse[0].url,
        ...(compositeFile && uploadResponse[1]?.ufsUrl && { fPhotoUrl: uploadResponse[1].ufsUrl }),
        ...(email.trim() !== '' && { email }),
      };

      // Submit to API
      const res = await fetch('/api/submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Submission failed');
      }

      toast.success('Memory submitted successfully!');
      setName('');
      setMessage('');
      setEmail('');
      setImage(null);
      setImageFile(null);
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
      console.log('Restarting camera');
      await startCamera();
    }
  };

  const handleRefreshCamera = async () => {
    setImage(null);
    setImageFile(null);
    await startCamera();
  };

  const isFormValid = name.trim() && message.trim() && image;

  return (
    <div className="min-h-screen bg-slate-200 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-[#f97316] mb-6 text-center">
          Share Your Memory
        </h1>

        {/* Hidden CompositeMemoryCard */}
        {image && (
          <div className="absolute -left-[9999px]">
            <MemoryCard
              ref={cardRef}
              memory={{
                id: 'temp-id',
                name,
                message,
                email: email.trim() || null,
                imageUrl: image,
                approved: false,
                createdAt: new Date(),
                fPhotoUrl: null,
              }}
            />
          </div>
        )}

        <div className="mb-4">
          {!image ? (
            <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
                {countdown !== null ? (
                  <div className="text-white text-6xl font-bold mb-4">
                    {countdown}
                  </div>
                ) : (
                  <button
                    onClick={startCountdown}
                    className="bg-white rounded-full p-3 shadow-lg"
                    disabled={isSubmitting}
                  >
                    <div className="w-12 h-12 bg-[#f97316] rounded-full flex items-center justify-center">
                      <span className="text-white text-xl"></span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={image}
                alt="Captured"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleRefreshCamera}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full"
              >
                ↻
              </button>
            </div>
          )}

          <div className="mt-2 flex justify-center">
            <label className="inline-block bg-[#f97316] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#e66915] transition">
              <span>Upload from Gallery</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const file = e.target.files[0];
                    const uniqueId = `${Date.now()}-${Math.random()
                      .toString(36)
                      .substring(2, 8)}`;
                    const uniqueFilename = `memory-${uniqueId}.jpg`;
                    const renamedFile = new File([file], uniqueFilename, {
                      type: file.type,
                    });
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        setImage(event.target.result as string);
                        setImageFile(renamedFile);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#f97316] focus:border-[#f97316]"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Message *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#f97316] focus:border-[#f97316]"
              placeholder="What's this memory about?"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#f97316] focus:border-[#f97316]"
              placeholder="your@email.com"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-3 text-lg ${
              isFormValid
                ? 'bg-[#f97316] hover:bg-[#e66915]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Share Memory'}
          </Button>
        </div>
      </div>
    </div>
  );
}