import { Quote } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useSettings } from "@/contexts/SettingsContext";

const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Don't count the days, make the days count. - Muhammad Ali",
  "Success is not final, failure is not fatal. - Winston Churchill",
  "The future depends on what you do today. - Mahatma Gandhi",
  "Focus on being productive instead of busy. - Tim Ferriss",
  "Time is what we want most, but what we use worst. - William Penn",
  "The key is not spending time, but investing it. - Stephen R. Covey",
  "Lost time is never found again. - Benjamin Franklin",
  "Time management is life management. - Robin Sharma",
  "Yesterday is gone. Tomorrow has not yet come. We have only today. - Mother Teresa"
];

const QuoteButton = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const { toast } = useToast();
  const { fontFamily, fontColor, useGradient, gradientColors } = useSettings();

  const showNewQuote = () => {
    const newIndex = (currentQuoteIndex + 1) % quotes.length;
    setCurrentQuoteIndex(newIndex);
    toast({
      title: "Daily Inspiration",
      description: quotes[newIndex],
      duration: 3000,
    });
  };

  const textStyle = useGradient
    ? {
        fontFamily,
        backgroundImage: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: "black", // Explicitly set color to black
      }
    : {
        fontFamily,
        color: "black", // Ensure color is always black
      };

  return (
    <Button
      onClick={showNewQuote}
      variant="outline"
      className="fixed bottom-4 right-[94px] h-8 px-2 gap-1"
      style={textStyle}
    >
      <Quote className="h-4 w-4" />
      Quote
    </Button>
  );
};

export default QuoteButton;

