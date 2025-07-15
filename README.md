# ⏱️ Study Timer App 
A customizable and visually stunning Pomodoro timer built with React + TypeScript, featuring multiple modes (Pomodoro, Short Break, Long Break), dynamic backgrounds, alert sounds, and aesthetic themes.

## 🚀 Features
- 🎨 Theme and font customization  
- ⏰ Set durations independently for Pomodoro, Short Break, and Long Break  
- 🌄 Background options: Image, Video, or Solid Color  
- 🔔 Choose from multiple alert sounds  
- 🔊 Optional ambient background sounds (rain, forest, waves)  
- 🧠 Lap tracking and visual timer feedback  
- 🛠️ Responsive and smooth user interface using Tailwind CSS  

## 🧰 Tech Stack
- React + TypeScript  
- Tailwind CSS  
- Lucide Icons  
- Context API for global state  
- Audio for alarm and ambient background sounds  

## 🔗 Link  
[🌐 Live Demo](https://pomodoroappp.netlify.app/)

## 📦 Folder Structure
```bash
src/
├── components/
│   ├── Timer.tsx           # Core timer logic and display
│   ├── SettingsDialog.tsx  # Settings modal for customizing timer
│   ├── TimerModeSelector.tsx
│   ├── QuoteButton.tsx     # Optional motivational quote button
│   └── ControlButtons.tsx
├── contexts/
│   └── SettingsContext.tsx # Global context for theme/settings
├── pages/
│   └── Index.tsx           # Main page
└── public/
    └── sounds/             # Alert sound files (bell.mp3, etc.)
```

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/study-timer-app.git
cd study-timer-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## ⚙️ Customizing Max Timer Durations
You can change the max allowed time for each timer in `SettingsDialog.tsx`:

```tsx
const maxValues = {
  pomodoro: 180,      // in minutes
  shortBreak: 20,
  longBreak: 30,
};
```

## 📸 Preview
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/6033173e-d309-49f9-933a-911c79a4a613" />

## 🙌 Credits
- UI components inspired by ShadCN  
- Icons provided by [Lucide](https://lucide.dev)  
- Sounds from [FreeSound](https://freesound.org) or other open sources  

## 📄 License
This project is licensed under the **MIT License**.

