import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Timer as TimerIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSettings } from "@/contexts/SettingsContext";

interface TimerProps {
  mode: "pomodoro" | "shortBreak" | "longBreak";
}

const Timer = ({ mode }: TimerProps) => {
  const {
    timerDurations,
    fontFamily,
    fontColor,
    useGradient,
    gradientColors,
    alertSound,
  } = useSettings();

  const { toast } = useToast();

  const [timeMap, setTimeMap] = useState<Record<TimerProps["mode"], number>>({
    pomodoro: timerDurations.pomodoro * 90,
    shortBreak: timerDurations.shortBreak * 90,
    longBreak: timerDurations.longBreak * 90,
  });

  const [time, setTime] = useState(timeMap[mode]);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<string[]>([]);
  const [showAlarmPopup, setShowAlarmPopup] = useState(false);
  const [alarmAudio, setAlarmAudio] = useState<HTMLAudioElement | null>(null);

  // Store time before switching mode
  const [previousMode, setPreviousMode] = useState(mode);

  useEffect(() => {
    // Save time of previous mode before switching
    setTimeMap((prev) => ({
      ...prev,
      [previousMode]: time,
    }));
    setPreviousMode(mode);
    setTime(timeMap[mode]); // Restore time for new mode
    setIsRunning(false); // Pause on switch
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;

          // Save new time in map
          setTimeMap((prevMap) => ({
            ...prevMap,
            [mode]: newTime,
          }));

          if (newTime === 10) {
            toast({
              title: "Almost Done!",
              description: "Timer will complete in 10 seconds",
              duration: 3000,
            });
          }

          if (newTime <= 0) {
            setIsRunning(false);
            const audio = new Audio(`/sounds/${alertSound}.mp3`);
            audio.loop = true;
            audio.play();
            setAlarmAudio(audio);
            setShowAlarmPopup(true);

            toast({
              title: "Timer Complete",
              description: "Time to take a break!",
              duration: 3000,
            });

            return 0;
          }

          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time, toast, alertSound, mode]);

  const formatTime = useCallback((timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
    toast({
      title: !isRunning ? "Timer Started" : "Timer Paused",
      description: !isRunning ? "Stay focused!" : "Timer has been paused",
      duration: 3000,
    });
  };

  const handleReset = () => {
    const initial = {
      pomodoro: timerDurations.pomodoro * 60,
      shortBreak: timerDurations.shortBreak * 60,
      longBreak: timerDurations.longBreak * 60,
    };

    setTime(initial[mode]);
    setTimeMap(initial);
    setIsRunning(false);
    setLaps([]);

    toast({
      title: "Timer Reset",
      description: "Timer has been reset",
      duration: 3000,
    });
  };

  const handleLap = () => {
    const lapTime = formatTime(time);
    if (!laps.includes(lapTime)) {
      setLaps((prevLaps) => [...prevLaps, lapTime]);
      toast({
        title: "Lap Recorded",
        description: `Lap time: ${lapTime}`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Duplicate Lap Ignored",
        description: `Lap ${lapTime} already exists`,
        duration: 2000,
      });
    }
  };

  const handleStopAlarm = () => {
    if (alarmAudio) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
    }
    setShowAlarmPopup(false);
  };

  const textStyle = useGradient
    ? {
        fontFamily,
        backgroundImage: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontWeight: "bold",
      }
    : {
        fontFamily,
        color: fontColor,
        fontWeight: "bold",
      };

  return (
    <div className="text-center relative">
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
            "Pause"
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Start
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
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4 text-white/80">Laps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {laps.map((lap, index) => (
              <div
                key={index}
                className="bg-white/10 p-3 rounded-lg shadow-md border border-white/10 text-sm text-white backdrop-blur"
              >
                <span className="font-bold text-white/90">
                  Lap {index + 1}:
                </span>{" "}
                {lap}
              </div>
            ))}
          </div>
        </div>
      )}

      {showAlarmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur z-50">
          <div className="bg-white text-black p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">⏰ Time's Up!</h2>
            <p className="mb-4">Click below to stop the alarm.</p>
            <Button
              onClick={handleStopAlarm}
              className="bg-red-600 text-white hover:bg-red-700 px-6"
            >
              Stop Alarm
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
