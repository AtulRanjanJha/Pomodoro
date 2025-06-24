import React, { createContext, useContext, useState } from 'react';

interface SettingsContextType {
  showSpotify: boolean;
  setShowSpotify: (show: boolean) => void;
  background: string;
  setBackground: (bg: string) => void;
  backgroundType: 'image' | 'video';
  setBackgroundType: (type: 'image' | 'video') => void;
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
  setTimerDurations: (durations: { pomodoro: number; shortBreak: number; longBreak: number }) => void;
  spotifyPlaylistUrl: string;
  setSpotifyPlaylistUrl: (url: string) => void;
  alertSound: string;
  setAlertSound: (sound: string) => void;
  playAlertSound: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [showSpotify, setShowSpotify] = useState(true);
  const [background, setBackground] = useState('');
  const [backgroundType, setBackgroundType] = useState<'image' | 'video'>('image');
  const [fontColor, setFontColor] = useState('#FFFFFF');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [gradientColors, setGradientColors] = useState({ from: '#FFFFFF', to: '#FFFFFF' });
  const [useGradient, setUseGradient] = useState(false);
  const [timerDurations, setTimerDurations] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15
  });
  const [spotifyPlaylistUrl, setSpotifyPlaylistUrl] = useState('4d3PqXgP9C9GhdmHsuztXx');
  const [alertSound, setAlertSound] = useState('bell');

  const playAlertSound = () => {
    const audio = new Audio(`/sounds/${alertSound}.mp3`);
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        showSpotify,
        setShowSpotify,
        background,
        setBackground,
        backgroundType,
        setBackgroundType,
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
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
