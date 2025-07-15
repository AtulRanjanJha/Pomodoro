import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

interface SettingsContextType {
  showSpotify: boolean;
  setShowSpotify: (show: boolean) => void;
  background: string;
  setBackground: (bg: string) => void;
  backgroundKey: number;
  backgroundType: "image" | "video" | "color";
  setBackgroundType: (type: "image" | "video" | "color") => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  fontColor: string;
  setFontColor: (color: string) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  gradientColors: {
    from: string;
    to: string;
  };
  setGradientColors: (colors: { from: string; to: string }) => void;
  useGradient: boolean;
  setUseGradient: (use: boolean) => void;
  timerDurations: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };
  setTimerDurations: (durations: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  }) => void;
  spotifyPlaylistUrl: string;
  setSpotifyPlaylistUrl: (url: string) => void;
  alertSound: string;
  setAlertSound: (sound: string) => void;
  playAlertSound: (overrideSound?: string, previewOnly?: boolean) => void;
  glowColor: string;
  setGlowColor: (color: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [showSpotify, setShowSpotify] = useState(true);
  const [background, setBackground] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#0d0d0d");
  const [backgroundKey, setBackgroundKey] = useState(0);
  const [backgroundType, setBackgroundType] = useState<
    "image" | "video" | "color"
  >("image");

  const [fontColor, setFontColor] = useState("#FFFFFF");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [gradientColors, setGradientColors] = useState({
    from: "#FFFFFF",
    to: "#FFFFFF",
  });
  const [useGradient, setUseGradient] = useState(false);
  const [timerDurations, setTimerDurations] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [spotifyPlaylistUrl, setSpotifyPlaylistUrl] = useState(
    "4d3PqXgP9C9GhdmHsuztXx"
  );
  const [alertSound, setAlertSound] = useState("bell");
  const [glowColor, setGlowColor] = useState("#b15cff");
  const [theme, setTheme] = useState("");

  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const playAlertSound = (
    overrideSound?: string,
    previewOnly: boolean = false
  ) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }

    const soundToPlay = overrideSound || alertSound;
    const newAudio = new Audio(`/sounds/${soundToPlay}.mp3`);
    currentAudioRef.current = newAudio;

    newAudio.play().catch((error) => {
      console.error("Error playing sound:", error);
    });

    if (previewOnly) {
      setTimeout(() => {
        newAudio.pause();
        newAudio.currentTime = 0;
      }, 2000);
    }
  };

  useEffect(() => {
    if (background.startsWith("blob:")) {
      setBackgroundKey((prev) => prev + 1);
    }
  }, [background]);

  useEffect(() => {
    if (theme === "sunset") {
      setBackground("/themes/sunset.jpg");
      setBackgroundType("image");
      setGlowColor("#f21000");
      setFontFamily("Poppins");
    } else if (theme === "sunset1") {
      setBackground("/themes/sunset1.jpg");
      setBackgroundType("image");
      setGlowColor("#FF6347");
      setFontFamily("Rubik");
    } else if (theme === "tokyo") {
      setBackground("/themes/tokyo.jpg");
      setBackgroundType("image");
      setGlowColor("#00CED1");
      setFontFamily("Sora");
    } else if (theme === "tokyo1") {
      setBackground("/themes/tokyo1.jpg");
      setBackgroundType("image");
      setGlowColor("#8568dd");
      setFontFamily("Sora");
    } else if (theme === "tokyo2") {
      setBackground("/themes/tokyo2.jpg");
      setBackgroundType("image");
      setGlowColor("#fa41de");
      setFontFamily("Sora");
    } else if (theme === "cyberpunk") {
      setBackground("/themes/Cyberpunk.png");
      setBackgroundType("image");
      setGlowColor("#ff00ff");
      setFontFamily("Orbitron");
    } else if (theme === "cyberpunk1") {
      setBackground("/themes/Cyberpunk1.png");
      setBackgroundType("image");
      setGlowColor("#39ff14");
      setFontFamily("Orbitron");
    } else if (theme === "nissan-gtr") {
      // ✅ New video theme
      setBackground("/videos/nissan-gtr.mp4");
      setBackgroundType("video");
      setGlowColor("#ff2d55"); // Customize as desired
      setFontFamily("Orbitron");
    }
  }, [theme]);

  return (
    <SettingsContext.Provider
      value={{
        showSpotify,
        setShowSpotify,
        background,
        setBackground,
        backgroundKey,
        backgroundType,
        setBackgroundType,
        backgroundColor,
        setBackgroundColor,
        fontColor,
        setFontColor,
        fontFamily,
        setFontFamily,
        gradientColors,
        setGradientColors,
        useGradient,
        setUseGradient,
        timerDurations,
        setTimerDurations,
        spotifyPlaylistUrl,
        setSpotifyPlaylistUrl,
        alertSound,
        setAlertSound,
        playAlertSound,
        glowColor,
        setGlowColor,
        theme,
        setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
