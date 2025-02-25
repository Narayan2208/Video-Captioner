
import React, { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface Caption {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

interface VideoPlayerProps {
  videoUrl: string;
  captions: Caption[];
  onTimeUpdate?: (currentTime: number) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  captions,
  onTimeUpdate,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      onTimeUpdate?.(currentTime);

      const currentCaption = captions.find(
        (caption) => currentTime >= caption.startTime && currentTime <= caption.endTime
      );

      if (captionRef.current) {
        captionRef.current.textContent = currentCaption?.text || "";
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [captions, onTimeUpdate]);

  const handleError = () => {
    toast.error("Error loading video. Please check the URL and try again.");
  };

  return (
    <Card className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        controls
        onError={handleError}
      >
        Your browser does not support the video tag.
      </video>
      <div
        ref={captionRef}
        className="absolute bottom-16 left-0 right-0 text-center text-white text-lg font-semibold px-4 py-2 bg-black/50 transition-opacity duration-200"
      />
    </Card>
  );
};
