import { useState, useRef, useEffect } from "react";
import Timer from "@/components/Timer";
import { Settings, Volume2, Trees, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import TimerModeSelector from "@/components/TimerModeSelector";
import SettingsDialog from "@/components/SettingsDialog";
import { useToast } from "@/components/ui/use-toast";
import { SettingsProvider, useSettings } from "@/contexts/SettingsContext";
import QuoteButton from "@/components/QuoteButton";
import ControlButtons from "@/components/ControlButtons";

const IndexContent = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const { toast } = useToast();
  const {
    background,
    backgroundType,
    backgroundColor,
    fontColor,
    fontFamily,
    timerDurations // ✅ added
  } = useSettings();

  const soundRefs = useRef({
    waves: new Audio("/audio/waves.mp3"),
    forest: new Audio("/audio/forest.mp3"),
    rain: new Audio("/audio/rain.mp3"),
  });

  useEffect(() => {
    Object.values(soundRefs.current).forEach((audio) => {
      audio.loop = true;
    });

    return () => {
      Object.values(soundRefs.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  const stopAllSounds = () => {
    Object.values(soundRefs.current).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    setActiveSound(null);
  };

  const handleSoundToggle = (sound: string) => {
    const selectedAudio = soundRefs.current[sound as keyof typeof soundRefs.current];

    if (!selectedAudio) return;

    if (activeSound === sound) {
      selectedAudio.pause();
      selectedAudio.currentTime = 0;
      setActiveSound(null);
      toast({
        title: "Sound stopped",
        description: `${sound} sound has been stopped`,
      });
    } else {
      stopAllSounds();
      selectedAudio.play().catch((err) => console.error("Playback error:", err));
      setActiveSound(sound);
      toast({
        title: "Sound playing",
        description: `Now playing ${sound} sound`,
      });
    }
  };

  const backgroundStyle =
    backgroundType === "color"
      ? { backgroundColor: backgroundColor }
      : backgroundType === "video"
        ? {}
        : background
          ? {
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {
              backgroundImage: "linear-gradient(to bottom right, #2B1055, #7597DE)",
            };

  return (
    <div
      className="min-h-screen relative"
      style={{
        ...backgroundStyle,
        color: fontColor,
        fontFamily: fontFamily,
      }}
    >
      {/* Animated Background Layer */}
      <div
        key={backgroundType + background}
        className="absolute inset-0 w-full h-full -z-10 transition-opacity duration-500 opacity-100"
      >
        {backgroundType === "video" && background && (
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          >
            <source src={background} type="video/mp4" />
          </video>
        )}

        {backgroundType === "image" && background && (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
          />
        )}

        {backgroundType === "color" && (
          <div
            className="w-full h-full"
            style={{ backgroundColor }}
          />
        )}
      </div>

      <div className="container py-8 px-4 relative z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold opacity-90">
            study<span className="font-light">TimerApp</span>
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleSoundToggle("waves")}
              className={`opacity-90 hover:opacity-100 hover:bg-white/10 ${
                activeSound === "waves" ? "bg-white/20" : ""
              }`}
            >
              <Volume2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleSoundToggle("forest")}
              className={`opacity-90 hover:opacity-100 hover:bg-white/10 ${
                activeSound === "forest" ? "bg-white/20" : ""
              }`}
            >
              <Trees className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleSoundToggle("rain")}
              className={`opacity-90 hover:opacity-100 hover:bg-white/10 ${
                activeSound === "rain" ? "bg-white/20" : ""
              }`}
            >
              <Cloud className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(true)}
              className="opacity-90 hover:opacity-100 hover:bg-white/10"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center gap-8 mt-20">
          <TimerModeSelector mode={mode} onModeChange={setMode} />
          <Timer
            key={`${mode}-${timerDurations.pomodoro}-${timerDurations.shortBreak}-${timerDurations.longBreak}`}
            mode={mode}
          />
        </div>

        <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
      </div>

      <QuoteButton />
      <ControlButtons />
    </div>
  );
};

const Index = () => (
  <SettingsProvider>
    <IndexContent />
  </SettingsProvider>
);

export default Index;
