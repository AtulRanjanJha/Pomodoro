import { Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";

const ControlButtons = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();
  const { fontFamily, fontColor, useGradient, gradientColors } = useSettings();

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Fullscreen mode is not supported in your browser",
        variant: "destructive",
        duration: 3000,
      });
    }
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
    <div className="fixed bottom-4 right-4">
      <Button
        onClick={toggleFullscreen}
        variant="outline"
        className="h-8 px-2 gap-1"
        style={textStyle}
      >
        <Maximize2 className="h-4 w-4" />
        {isFullscreen ? "Exit" : "Full"}
      </Button>
    </div>
  );
};

export default ControlButtons;
