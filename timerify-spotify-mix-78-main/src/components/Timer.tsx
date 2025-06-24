import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Timer as TimerIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useSettings } from "@/contexts/SettingsContext";

interface TimerProps {
  mode: 'pomodoro' | 'shortBreak' | 'longBreak';
}

const Timer = ({ mode }: TimerProps) => {
  const { timerDurations, fontFamily, fontColor, useGradient, gradientColors, playAlertSound } = useSettings();
  
  const getInitialTime = () => {
    switch (mode) {
      case 'shortBreak':
        return timerDurations.shortBreak * 60;
      case 'longBreak':
        return timerDurations.longBreak * 60;
      default:
        return timerDurations.pomodoro * 60;
    }
  };

  const [time, setTime] = useState(getInitialTime());
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setTime(getInitialTime());
    setIsRunning(false);
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            playAlertSound();
            toast({
              title: "Timer Complete",
              description: "Time to take a break!",
              duration: 3000,
            });
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, toast, playAlertSound]);

  const formatTime = useCallback((timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
    toast({
      title: !isRunning ? "Timer Started" : "Timer Paused",
      description: !isRunning ? "Stay focused!" : "Timer has been paused",
      duration: 3000,
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(getInitialTime());
    setLaps([]);
    toast({
      title: "Timer Reset",
      description: "Timer has been reset",
      duration: 3000,
    });
  };

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, formatTime(time)]);
    toast({
      title: "Lap Recorded",
      description: `Lap time: ${formatTime(time)}`,
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
        fontWeight: 'bold',
      }
    : {
        fontFamily,
        color: fontColor,
        fontWeight: 'bold',
      };

  return (
    <div className="text-center">
      <div 
        className="text-[8rem] font-light mb-8 font-mono tracking-wider font-bold"
        style={textStyle}
      >
        {formatTime(time)}
      </div>
      
      <div className="flex justify-center gap-4">
        <Button
          size="lg"
          onClick={handleStartStop}
          className="bg-white text-black hover:bg-white/90 rounded-full px-8"
          style={{ fontFamily }}
        >
          {isRunning ? (
            "pause"
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              start
            </>
          )}
        </Button>
        
        <Button
          size="icon"
          variant="ghost"
          onClick={handleLap}
          className="text-white hover:bg-white/10"
          style={{ fontFamily }}
        >
          <TimerIcon className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={handleReset}
          className="text-white hover:bg-white/10"
          style={{ fontFamily }}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {laps.length > 0 && (
        <div className="mt-8" style={textStyle}>
          <h3 className="text-sm font-medium mb-2">Laps</h3>
          <div className="space-y-1">
            {laps.map((lap, index) => (
              <div key={index} className="text-sm">
                Lap {index + 1}: {lap}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
