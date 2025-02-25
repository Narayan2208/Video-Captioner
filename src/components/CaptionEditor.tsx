
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Caption {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

interface CaptionEditorProps {
  onAddCaption: (caption: Omit<Caption, "id">) => void;
}

export const CaptionEditor: React.FC<CaptionEditorProps> = ({ onAddCaption }) => {
  const [text, setText] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const start = parseTimeToSeconds(startTime);
    const end = parseTimeToSeconds(endTime);

    if (start === null || end === null) {
      toast.error("Please enter valid timestamps (mm:ss)");
      return;
    }

    if (start >= end) {
      toast.error("End time must be after start time");
      return;
    }

    if (!text.trim()) {
      toast.error("Please enter caption text");
      return;
    }

    onAddCaption({
      text: text.trim(),
      startTime: start,
      endTime: end,
    });

    setText("");
    setStartTime("");
    setEndTime("");
    toast.success("Caption added successfully");
  };

  const parseTimeToSeconds = (time: string): number | null => {
    const parts = time.split(":");
    if (parts.length !== 2) return null;

    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);

    if (isNaN(minutes) || isNaN(seconds)) return null;
    if (minutes < 0 || seconds < 0 || seconds >= 60) return null;

    return minutes * 60 + seconds;
  };

  return (
    <Card className="p-6 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="caption">Caption Text</Label>
          <Textarea
            id="caption"
            placeholder="Enter your caption text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px] font-sans"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time (mm:ss)</Label>
            <Input
              id="startTime"
              placeholder="00:00"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time (mm:ss)</Label>
            <Input
              id="endTime"
              placeholder="00:00"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Add Caption
        </Button>
      </form>
    </Card>
  );
};
