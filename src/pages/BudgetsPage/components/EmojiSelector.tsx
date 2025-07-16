
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EmojiSelectorProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
}

const emojis = [
  { emoji: "💰", name: "Money" },
  { emoji: "🛒", name: "Shopping" },
  { emoji: "🏡", name: "Home" },
  { emoji: "🌱", name: "Garden" },
  { emoji: "🚗", name: "Car" },
  { emoji: "📺", name: "TV" },
  { emoji: "🍔", name: "Food" },
  { emoji: "✈️", name: "Travel" },
  { emoji: "🎮", name: "Games" },
  { emoji: "👕", name: "Clothing" },
  { emoji: "📚", name: "Education" },
  { emoji: "💻", name: "Technology" },
  { emoji: "🏥", name: "Healthcare" },
  { emoji: "🏋️", name: "Fitness" },
  { emoji: "🎁", name: "Gifts" },
  { emoji: "🏦", name: "Banking" },
  { emoji: "🎭", name: "Entertainment" },
  { emoji: "🧸", name: "Kids" }
];

const EmojiSelector = ({ selectedEmoji, onEmojiSelect }: EmojiSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Select Emoji</Label>
      <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto">
        {emojis.map((emojiOption) => (
          <Button
            key={emojiOption.emoji}
            variant={selectedEmoji === emojiOption.emoji ? "default" : "outline"}
            className="h-10 p-0"
            onClick={() => onEmojiSelect(emojiOption.emoji)}
            title={emojiOption.name}
          >
            <span className="text-xl">{emojiOption.emoji}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EmojiSelector;