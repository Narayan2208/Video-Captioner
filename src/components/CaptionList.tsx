
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Caption {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

interface CaptionListProps {
  captions: Caption[];
  onDeleteCaption: (id: string) => void;
}

export const CaptionList: React.FC<CaptionListProps> = ({ captions, onDeleteCaption }) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-2">
        {captions.map((caption) => (
          <div
            key={caption.id}
            className="flex items-start justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent/70 transition-colors group"
          >
            <div className="space-y-1">
              <p className="font-mono text-sm text-muted-foreground">
                {formatTime(caption.startTime)} - {formatTime(caption.endTime)}
              </p>
              <p className="text-sm">{caption.text}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDeleteCaption(caption.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
