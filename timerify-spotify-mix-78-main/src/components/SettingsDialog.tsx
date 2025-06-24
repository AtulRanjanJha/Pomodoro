import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/contexts/SettingsContext";
import { useToast } from "@/components/ui/use-toast";
import SoundSettings from "./SoundSettings";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const {
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
  } = useSettings();
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBackground(url);
      setBackgroundType(file.type.startsWith('video/') ? 'video' : 'image');
    }
  };

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been applied successfully.",
    });
    onOpenChange(false);
  };

  const handleSpotifyUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    // Extract playlist ID from URL or use as is
    const playlistId = url.includes('spotify.com') 
      ? url.split('/').pop()?.split('?')[0] 
      : url;
    setSpotifyPlaylistUrl(playlistId || '');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1A1A] text-white border-none max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Settings</DialogTitle>
          <DialogDescription className="text-white/60">
            Customize your timer experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="font-medium">Timer Settings</div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Pomodoro (minutes)</Label>
                <Input
                  type="number"
                  min="1"
                  value={timerDurations.pomodoro}
                  onChange={(e) => setTimerDurations({
                    ...timerDurations,
                    pomodoro: parseInt(e.target.value) || 25
                  })}
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label>Short Break (minutes)</Label>
                <Input
                  type="number"
                  min="1"
                  value={timerDurations.shortBreak}
                  onChange={(e) => setTimerDurations({
                    ...timerDurations,
                    shortBreak: parseInt(e.target.value) || 5
                  })}
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label>Long Break (minutes)</Label>
                <Input
                  type="number"
                  min="1"
                  value={timerDurations.longBreak}
                  onChange={(e) => setTimerDurations({
                    ...timerDurations,
                    longBreak: parseInt(e.target.value) || 15
                  })}
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="font-medium">Spotify Settings</div>
            <div>
              <Label>SoundCloud Playlist URL or ID</Label>
              <Input
                type="text"
                value={spotifyPlaylistUrl}
                onChange={handleSpotifyUrlChange}
                placeholder="Enter Spotify playlist URL or ID"
                className="bg-black/50 border-white/10 text-white"
              />
              <p className="text-sm text-white/60 mt-1">
                Paste a Soundcloud playlist URL or just the playlist ID
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label>Show Music player</Label>
              <Switch
                checked={showSpotify}
                onCheckedChange={setShowSpotify}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="font-medium">Theme</div>
            <div className="space-y-4">
              <div>
                <Label>Select theme:</Label>
                <Select>
                  <SelectTrigger className="bg-black/50 border-white/10 text-white">
                    <SelectValue placeholder="Seoul Sunrise" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] text-white border-white/10">
                    <SelectItem value="seoul">Seoul Sunrise</SelectItem>
                    <SelectItem value="tokyo">Tokyo Night</SelectItem>
                    <SelectItem value="purple">Purple Dream</SelectItem>
                    <SelectItem value="ocean">Ocean Breeze</SelectItem>
                    <SelectItem value="forest">Forest Mist</SelectItem>
                    <SelectItem value="sunset">Sunset Glow</SelectItem>
                    <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                    <SelectItem value="minimal">Minimal White</SelectItem>
                    <SelectItem value="nature">Nature Green</SelectItem>
                    <SelectItem value="space">Space Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Background Media</Label>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="bg-black/50 border-white/10 text-white"
                />
                <p className="text-sm text-white/60">
                  Upload an image or video for background
                </p>
              </div>

              <div className="space-y-4">
                <Label>Font Settings</Label>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Font Family</Label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger className="bg-black/50 border-white/10 text-white">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1A1A] text-white border-white/10">
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                        <SelectItem value="Lora">Lora</SelectItem>
                        <SelectItem value="Source Code Pro">Source Code Pro</SelectItem>
                        <SelectItem value="Space Grotesk">Space Grotesk</SelectItem>
                        <SelectItem value="DM Sans">DM Sans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Use Gradient Text</Label>
                      <Switch
                        checked={useGradient}
                        onCheckedChange={setUseGradient}
                      />
                    </div>
                    
                    {useGradient ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Gradient From</Label>
                          <Input
                            type="color"
                            value={gradientColors.from}
                            onChange={(e) => setGradientColors({ ...gradientColors, from: e.target.value })}
                            className="h-10 p-1 bg-black/50 border-white/10"
                          />
                        </div>
                        <div>
                          <Label>Gradient To</Label>
                          <Input
                            type="color"
                            value={gradientColors.to}
                            onChange={(e) => setGradientColors({ ...gradientColors, to: e.target.value })}
                            className="h-10 p-1 bg-black/50 border-white/10"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Label>Solid Color</Label>
                        <Input
                          type="color"
                          value={fontColor}
                          onChange={(e) => setFontColor(e.target.value)}
                          className="h-10 p-1 bg-black/50 border-white/10"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SoundSettings />

          <div className="flex justify-between pt-4">
            <Button
              variant="destructive"
              className="bg-red-500/20 text-red-500 hover:bg-red-500/30"
              onClick={() => {
                setShowSpotify(true);
                setBackground('');
                setFontColor('#FFFFFF');
                setFontFamily('Inter');
                setUseGradient(false);
                setGradientColors({ from: '#FFFFFF', to: '#FFFFFF' });
                setTimerDurations({ pomodoro: 25, shortBreak: 5, longBreak: 15 });
                setSpotifyPlaylistUrl('4d3PqXgP9C9GhdmHsuztXx');
              }}
            >
              Reset all
            </Button>
            <div className="space-x-2">
              <Button
                variant="outline"
                className="text-white bg-white/10 hover:bg-white/20"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>Save changes</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
