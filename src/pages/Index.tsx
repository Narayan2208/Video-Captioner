
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { VideoPlayer } from "@/components/VideoPlayer";
import { CaptionEditor } from "@/components/CaptionEditor";
import { CaptionList } from "@/components/CaptionList";
import { toast } from "sonner";

interface Caption {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

const Index = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  const handleAddCaption = (newCaption: Omit<Caption, "id">) => {
    const caption: Caption = {
      ...newCaption,
      id: crypto.randomUUID(),
    };

    setCaptions((prev) => [...prev].sort((a, b) => a.startTime - b.startTime));
    setCaptions((prev) => [...prev, caption]);
  };

  const handleDeleteCaption = (id: string) => {
    setCaptions((prev) => prev.filter((caption) => caption.id !== id));
    toast.success("Caption deleted");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-7xl space-y-8 animate-fade-in">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Video Verse Captioner
          </h1>
          <p className="text-muted-foreground">
            Add captions to your videos with ease
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              type="url"
              placeholder="Enter video URL..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
        </Card>

        {videoUrl && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <VideoPlayer
                videoUrl={videoUrl}
                captions={captions}
                onTimeUpdate={setCurrentTime}
              />
              <CaptionEditor onAddCaption={handleAddCaption} />
            </div>
            <CaptionList captions={captions} onDeleteCaption={handleDeleteCaption} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
