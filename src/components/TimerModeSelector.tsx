import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

interface TimerModeSelectorProps {
  mode: 'pomodoro' | 'shortBreak' | 'longBreak';
  onModeChange: (mode: 'pomodoro' | 'shortBreak' | 'longBreak') => void;
}

const TimerModeSelector = ({ mode, onModeChange }: TimerModeSelectorProps) => {
  const { fontFamily, fontColor, useGradient, gradientColors } = useSettings();

  const textStyle = useGradient
    ? {
        fontFamily,
        backgroundImage: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }
    : {
        fontFamily,
        color: fontColor,
      };

  return (
    <div className="flex gap-2 bg-white/10 backdrop-blur-lg rounded-full p-1">
      <Button
        variant="ghost"
        className={`rounded-full hover:text-white hover:bg-white/20 ${
          mode === 'pomodoro' ? 'bg-white/20' : ''
        }`}
        onClick={() => onModeChange('pomodoro')}
        style={textStyle}
      >
        Pomodoro
      </Button>
      <Button
        variant="ghost"
        className={`rounded-full hover:text-white hover:bg-white/20 ${
          mode === 'shortBreak' ? 'bg-white/20' : ''
        }`}
        onClick={() => onModeChange('shortBreak')}
        style={textStyle}
      >
        Short Break
      </Button>
      <Button
        variant="ghost"
        className={`rounded-full hover:text-white hover:bg-white/20 ${
          mode === 'longBreak' ? 'bg-white/20' : ''
        }`}
        onClick={() => onModeChange('longBreak')}
        style={textStyle}
      >
        Long Break
      </Button>
    </div>
  );
};

export default TimerModeSelector;