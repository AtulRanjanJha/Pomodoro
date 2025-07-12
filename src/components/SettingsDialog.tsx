import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/contexts/SettingsContext";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Volume2 } from "lucide-react";

const SettingsDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const {
    fontFamily,
    setFontFamily,
    fontColor,
    setFontColor,
    timerDurations,
    setTimerDurations,
    alertSound,
    setAlertSound,
   
    playAlertSound,
    glowColor,
    setGlowColor,
    theme,
    setTheme,
    background,
    setBackground,
    backgroundType,
    setBackgroundType,
    backgroundColor,
    setBackgroundColor,
  } = useSettings();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-[#0d0d0d] text-white max-h-[90vh] overflow-y-auto scrollbar-thin"
        style={{
          border: `1px solid ${glowColor}`,
          boxShadow: `0 0 20px ${glowColor}44`,
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: glowColor }}>Settings</DialogTitle>
        </DialogHeader>

        {/* Theme Picker */}
        <div className="space-y-2">
          <Label className="text-white">Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="bg-[#111] border border-white/20 text-white">
              <SelectValue placeholder="Choose Theme" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] text-white border-white/10">
              <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
              <SelectItem value="cyberpunk1">Cyberpunk 1</SelectItem>
              <SelectItem value="sunset">Sunset Glow</SelectItem>
              <SelectItem value="sunset1">Sunset Glow 1</SelectItem>
              <SelectItem value="tokyo">Tokyo Night</SelectItem>
              <SelectItem value="tokyo1">Tokyo Night 1</SelectItem>
              <SelectItem value="tokyo2">Tokyo Night 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Background Type */}
        <div className="flex items-center justify-between">
          <Label className="text-white">Background Type</Label>
          <Select value={backgroundType} onValueChange={setBackgroundType}>
            <SelectTrigger className="bg-[#111] border border-white/20 text-white w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] text-white border-white/10">
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="color">Color</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Upload Background File */}
        <div className="space-y-2">
          <Label className="text-white">Upload Background File</Label>
          <Input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const tempURL = URL.createObjectURL(file);
                setBackground(tempURL);

                if (file.type.startsWith("video/")) {
                  setBackgroundType("video");
                } else {
                  setBackgroundType("image");
                }
              }
            }}
            className="bg-black/50 border-white/10"
          />
        </div>

        {/* Background Color Picker */}
        {backgroundType === "color" && (
          <div className="space-y-2">
            <Label className="text-white">Background Color</Label>
            <Input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="h-10 w-20 bg-black/50 border-white/10 p-1"
            />
          </div>
        )}

        {/* Glow Color */}
        <div className="space-y-2">
          <Label className="text-white">Glow Color</Label>
          <Input
            type="color"
            value={glowColor}
            onChange={(e) => setGlowColor(e.target.value)}
            className="h-10 w-20 bg-black/50 border-white/10 p-1"
          />
        </div>

        {/* Font Selector */}
        <div className="space-y-2">
          <Label className="text-white">Font Family</Label>
          <Select value={fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger className="bg-[#111] border border-white/20 text-white">
              <SelectValue placeholder="Choose Font" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] text-white border-white/10">
              <SelectItem value="Inter">Inter</SelectItem>
              <SelectItem value="Orbitron">Orbitron</SelectItem>
              <SelectItem value="VT323">VT323</SelectItem>
              <SelectItem value="Poppins">Poppins</SelectItem>
              <SelectItem value="Roboto Mono">Roboto Mono</SelectItem>
              <SelectItem value="Bebas Neue">Bebas Neue</SelectItem>
              <SelectItem value="Monoton">Monoton</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
  <Label className="text-white">Font Color</Label>
  <div className="flex items-center gap-4">
    <input
      type="color"
      value={fontColor}
      onChange={(e) => setFontColor(e.target.value)}
      className="w-12 h-10 p-1 rounded border border-white/20 bg-transparent"
    />
    <button
      onClick={() => setFontColor("#FFFFFF")} // default color
      className="text-sm text-white/70 underline hover:text-white"
    >
      Reset
    </button>
  </div>
</div>



        {/* Timer Durations */}
        <div className="space-y-4">
          <div className="font-medium" style={{ color: glowColor }}>
            Timer Settings
          </div>
          {(["pomodoro", "shortBreak", "longBreak"] as const).map((key) => (
            <div key={key}>
              <Label className="capitalize">{key.replace(/([A-Z])/g, " $1")}</Label>
              <Slider
                min={1}
                max={180}
                step={1}
                value={[timerDurations[key]]}
                onValueChange={([value]) =>
                  setTimerDurations({ ...timerDurations, [key]: value })
                }
              />
              <div className="text-xs text-white/70">
                {timerDurations[key]} minutes
              </div>
            </div>
          ))}
        </div>

        {/* Alert Sounds */}
        <div className="space-y-4">
          <div className="font-medium" style={{ color: glowColor }}>
            Alert Sound
          </div>
          <RadioGroup
            value={alertSound}
            onValueChange={(value) => {
              setAlertSound(value);
              playAlertSound(value, true);
            }}
            className="space-y-3"
          >
            {[
              { value: "bell", label: "Bell Sound" },
              { value: "chicken", label: "Chicken Sound" },
              { value: "alert", label: "Alert Sound" },
              { value: "chime", label: "Chime Sound" },
            ].map((sound) => (
              <div
                key={sound.value}
                className="flex items-center justify-between p-2 rounded bg-white/10"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={sound.value}
                    id={sound.value}
                    className="border-white data-[state=checked]:bg-white"
                  />
                  <Label htmlFor={sound.value} className="text-white">
                    {sound.label}
                  </Label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => playAlertSound(sound.value, true)}
                  className="h-8 w-8 p-0"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </RadioGroup>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
