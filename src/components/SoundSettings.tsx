import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useSettings } from "@/contexts/SettingsContext";
import { Button } from "./ui/button";
import { Volume2 } from "lucide-react";

const SoundSettings = () => {
  const { alertSound, setAlertSound, playAlertSound } = useSettings();

  return (
    <div className="space-y-4">
      <div className="font-medium text-white">Alert Sound</div>
      <RadioGroup
        value={alertSound}
        onValueChange={(value) => {
          setAlertSound(value);
          playAlertSound(value); // Stops previous and plays selected
        }}
        className="space-y-3"
      >
        {[
          { value: 'bell', label: 'Bell Sound' },
          { value: 'chicken', label: 'Chicken Sound' },
          { value: 'alert', label: 'Alert Sound' },
          { value: 'chime', label: 'Chime Sound' }
        ].map((sound) => (
          <div key={sound.value} className="flex items-center justify-between p-2 rounded bg-white/10">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={sound.value}
                id={sound.value}
                className="border-white data-[state=checked]:bg-white"
              />
              <Label htmlFor={sound.value} className="text-white">{sound.label}</Label>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => playAlertSound(sound.value)}
              className="h-8 w-8 p-0"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default SoundSettings;
