import { LevelData, QuestType, InventoryItem, Stats } from './types';

export const INVENTORY_ITEMS: InventoryItem[] = [
  // Arc 1: The Awakening (Level 1+)
  { name: "ESP32 Development Board", description: "The brain. Wi-Fi/Bluetooth enabled.", approxCost: "₹400-600", mandatory: true, unlockLevel: 1 },
  { name: "Micro USB Cable", description: "Data capable cable for programming.", approxCost: "₹100-200", mandatory: true, unlockLevel: 1 },
  { name: "Breadboard", description: "Half-size or Full for prototyping.", approxCost: "₹100-200", mandatory: true, unlockLevel: 1 },
  { name: "Jumper Wires", description: "Male-to-Male, Male-to-Female set.", approxCost: "₹150-250", mandatory: true, unlockLevel: 1 },
  { name: "DHT11 Sensor", description: "Temperature and Humidity sensor.", approxCost: "₹100-150", mandatory: true, unlockLevel: 1 },
  { name: "HC-SR04 Sensor", description: "Ultrasonic Distance sensor.", approxCost: "₹80-120", mandatory: true, unlockLevel: 1 },
  { name: "Output Component Kit", description: "LEDs (RGB), Resistors (220/1k), Piezo Buzzer.", approxCost: "₹100-200", mandatory: true, unlockLevel: 1 },
  { name: "Software: Thonny IDE", description: "Installed on laptop.", approxCost: "Free", mandatory: true, unlockLevel: 1 },
  
  // Arc 2: The Junior Technomancer (Level 15+)
  { name: "Servo Motor (SG90)", description: "For Levels 15+ (The Sentry).", approxCost: "₹100-150", mandatory: true, unlockLevel: 15 },
  { name: "Soldering Iron Kit", description: "Iron, Solder Wire, Flux. For Level 20.", approxCost: "₹300-500", mandatory: true, unlockLevel: 20 },
  { name: "Zero PCB (Perfboard)", description: "For making circuits permanent.", approxCost: "₹50-100", mandatory: true, unlockLevel: 20 },
  
  // Arc 3: The Prototyper (Level 25+)
  { name: "BME280 Sensor", description: "Pressure/Temp/Humidity (Level 25).", approxCost: "₹300-400", mandatory: true, unlockLevel: 25 },
  { name: "OLED Display (0.96\" I2C)", description: "Display data (Level 25).", approxCost: "₹250-350", mandatory: true, unlockLevel: 25 },
  { name: "TP4056 + 18650 Battery", description: "Power Management (Level 27).", approxCost: "₹200-300", mandatory: true, unlockLevel: 27 },
  
  // Arc 4: The Neural Edge (Level 31+)
  { name: "Raspberry Pi 4/5 (4GB+)", description: "The Microcomputer for AI/Edge Computing.", approxCost: "₹5000-8000", mandatory: true, unlockLevel: 31 },
  { name: "Pi Camera Module / Webcam", description: "For Computer Vision.", approxCost: "₹500-2000", mandatory: true, unlockLevel: 31 },
  { name: "USB Microphone", description: "For Voice Recognition.", approxCost: "₹200-500", mandatory: true, unlockLevel: 37 },
  
  // Arc 5: The Guild Master - Robotics (Level 41+)
  { name: "Robot Chassis Kit (2WD/4WD)", description: "Acrylic plate + DC Motors + Wheels.", approxCost: "₹1000-2000", mandatory: true, unlockLevel: 41 },
  { name: "L298N Motor Driver", description: "H-Bridge module to control motors.", approxCost: "₹150-250", mandatory: true, unlockLevel: 41 },
  { name: "Portable Power Bank", description: "5V 3A Output for Raspberry Pi.", approxCost: "₹1000-2000", mandatory: true, unlockLevel: 41 },
  { name: "Li-Ion Battery Pack (12V)", description: "To power the motors/driver.", approxCost: "₹800-1500", mandatory: true, unlockLevel: 41 },
  { name: "Lidar Sensor (Optional)", description: "For advanced SLAM/Mapping (Level 46).", approxCost: "₹4000-8000", mandatory: false, unlockLevel: 46 },
  
  // Arc 6: The Architect (Level 51+)
  { name: "Secondary Device (ESP32/Pi)", description: "For Multi-Robot Swarm logic.", approxCost: "₹500-5000", mandatory: true, unlockLevel: 55 },

  // Arc 7: The National Ranker (Level 61+)
  { name: "Depth Camera (RGB-D)", description: "RealSense / OAK-D / Kinect for 3D Vision.", approxCost: "₹5000-20000", mandatory: true, unlockLevel: 62 },

  // Arc 8: The World Class (Level 71+)
  { name: "Biosignal Sensor (EEG/EMG)", description: "NeuroSky, Muse, or MyoWare for BCI.", approxCost: "₹3000-15000", mandatory: true, unlockLevel: 71 },

  // Arc 9: The Monarch's Vessel (Level 81+)
  { name: "Professional Lab Suite", description: "Oscilloscope, Soldering Station, Bench Power Supply.", approxCost: "₹20000-50000", mandatory: true, unlockLevel: 81 },

  // Arc 10: The Shadow Monarch (Level 91+)
  { name: "Industrial Tooling (Jigs/Molds)", description: "For Mass Production scale-up.", approxCost: "₹50000+", mandatory: true, unlockLevel: 91 },
];

export const QUEST_EXP_MULTIPLIERS: Record<QuestType, number> = {
  [QuestType.DAILY]: 10,
  [QuestType.SIDE]: 20,
  [QuestType.COMBAT]: 35,
  [QuestType.MAIN]: 35,
  [QuestType.BOSS]: 50
};

export const LEVELS: LevelData[] = [
  {
    level: 1,
    title: "THE AWAKENING",
    theme: "Breaking Inertia",
    duration: "Approx. 3 Days",
    description: "Establish the 5:00 AM wake-up habit and set up your environment.",
    objectives: ["Wake up early", "Setup Development Environment", "Baseline Fitness"],
    quests: [
      { id: "1-d-1", text: "Wake up at 5:00 AM", type: QuestType.DAILY },
      { id: "1-d-2", text: "Fajr Prayer on time", type: QuestType.DAILY },
      { id: "1-d-3", text: "10 Minutes stretching", type: QuestType.DAILY },
      { id: "1-m-1", text: "Install Python & Thonny IDE", type: QuestType.MAIN },
      { id: "1-m-2", text: "Flash MicroPython firmware to ESP32", type: QuestType.MAIN },
      { id: "1-m-3", text: "Verify '>>>' prompt in Thonny", type: QuestType.MAIN },
      { id: "1-c-1", text: "Test Max Pushups (Record Baseline)", type: QuestType.COMBAT },
    ],
    rewards: { str: 5, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 2,
    title: "HELLO WORLD",
    theme: "Your First Code",
    duration: "Approx. 3 Days",
    description: "Control hardware with software.",
    objectives: ["Control GPIO Pins", "Basic Python Loop"],
    quests: [
      { id: "2-d-1", text: "Fajr + 1 Page Quran (Translation)", type: QuestType.DAILY },
      { id: "2-d-2", text: "20 mins Deep Work (Tech)", type: QuestType.DAILY },
      { id: "2-d-3", text: "20 mins Jog/Walk", type: QuestType.DAILY },
      { id: "2-m-1", text: "Connect LED to GPIO Pin 2", type: QuestType.MAIN },
      { id: "2-m-2", text: "Write Blink Script (1s ON, 1s OFF)", type: QuestType.MAIN },
      { id: "2-c-1", text: "Accumulate 30 Pushups total today", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 3,
    title: "SENSORY INPUT",
    theme: "Reading the Environment",
    duration: "Approx. 4 Days",
    description: "Learn to read inputs (Digital/Analog).",
    objectives: ["DHT11 Implementation", "Strict Morning Routine"],
    quests: [
      { id: "3-d-1", text: "Strict Protocol 24 (Morning Block)", type: QuestType.DAILY },
      { id: "3-d-2", text: "No Social Media before 8:00 AM", type: QuestType.DAILY },
      { id: "3-m-1", text: "Connect DHT11 Sensor", type: QuestType.MAIN },
      { id: "3-m-2", text: "Script: Print Temp/Humidity every 2s", type: QuestType.MAIN },
      { id: "3-m-3", text: "Test: Breathe on sensor to change values", type: QuestType.MAIN },
      { id: "3-c-1", text: "Run 1km without stopping", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 2, agi: 0, gld: 0 }
  },
  {
    level: 4,
    title: "THE LOGIC GATE",
    theme: "If This, Then That",
    duration: "Approx. 4 Days",
    description: "Automation Logic implementation.",
    objectives: ["Conditional Logic", "Tech Podcast"],
    quests: [
      { id: "4-d-1", text: "Standard Morning Routine", type: QuestType.DAILY },
      { id: "4-d-2", text: "Listen to Tech Podcast during commute", type: QuestType.DAILY },
      { id: "4-m-1", text: "Combine LED and DHT11 circuit", type: QuestType.MAIN },
      { id: "4-m-2", text: "Code: If Temp > 30°C, Red LED ON, Else Green", type: QuestType.MAIN },
      { id: "4-c-1", text: "3 sets of 10 Pushups (60s rest)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 5,
    title: "THE MINI-BOSS",
    theme: "First Real Application",
    duration: "1 Day",
    description: "Build a standalone functional parking assistant.",
    objectives: ["HC-SR04 Logic", "100 Rep Challenge"],
    quests: [
      { id: "5-b-1", text: "Build: Distance < 10cm = Fast Beep", type: QuestType.BOSS },
      { id: "5-b-2", text: "Build: Distance < 20cm = Slow Beep", type: QuestType.BOSS },
      { id: "5-b-3", text: "Build: Distance > 20cm = Silence", type: QuestType.BOSS },
      { id: "5-c-1", text: "100 Squats in under 10 minutes", type: QuestType.COMBAT },
    ],
    rewards: { str: 2, int: 4, wis: 0, agi: 0, gld: 0 },
    rankUp: "E-RANK"
  },
  {
    level: 6,
    title: "THE WIRELESS AGE",
    theme: "Connectivity (IoT)",
    duration: "Approx. 4 Days",
    description: "Connect your ESP32 to Home Wi-Fi.",
    objectives: ["Network Library", "Wudu before sleep"],
    quests: [
      { id: "6-d-1", text: "Perform Wudu before sleep", type: QuestType.DAILY },
      { id: "6-m-1", text: "Script: Connect ESP32 to Wi-Fi", type: QuestType.MAIN },
      { id: "6-m-2", text: "Success Indicator: Blink LED 3x on connect", type: QuestType.MAIN },
      { id: "6-c-1", text: "Run 2km under 14 minutes", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 4, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 7,
    title: "THE CLOUD",
    theme: "Data Logging",
    duration: "Approx. 5 Days",
    description: "Send data from your room to the internet.",
    objectives: ["ThingSpeak/Blynk API", "Surah Al-Mulk"],
    quests: [
      { id: "7-d-1", text: "Read Surah Al-Mulk before sleep", type: QuestType.DAILY },
      { id: "7-m-1", text: "Setup ThingSpeak/Blynk Account", type: QuestType.MAIN },
      { id: "7-m-2", text: "Upload Temp data every 15s", type: QuestType.MAIN },
      { id: "7-m-3", text: "Verify graph on phone", type: QuestType.MAIN },
      { id: "7-c-1", text: "Plank: Hold for 60 seconds", type: QuestType.COMBAT },
    ],
    rewards: { str: 2, int: 3, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 8,
    title: "REMOTE CONTROL",
    theme: "Two-way Communication",
    duration: "Approx. 5 Days",
    description: "Control the physical world from your phone.",
    objectives: ["Web Server", "Tahajjud"],
    quests: [
      { id: "8-d-1", text: "Wake up for Tahajjud once this week", type: QuestType.DAILY },
      { id: "8-m-1", text: "Code ESP32 Web Server", type: QuestType.MAIN },
      { id: "8-m-2", text: "Create web page with ON/OFF buttons", type: QuestType.MAIN },
      { id: "8-m-3", text: "Control LED via phone browser", type: QuestType.MAIN },
      { id: "8-c-1", text: "50 Pushups total", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 4, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 9,
    title: "PRE-RAID PREP",
    theme: "Integration",
    duration: "3 Days",
    description: "Clean up code and prepare for the Level 10 Boss.",
    objectives: ["Relay Module", "Dopamine Detox"],
    quests: [
      { id: "9-d-1", text: "Dopamine Detox (24h No Media)", type: QuestType.DAILY },
      { id: "9-m-1", text: "Learn/Wire Relay Module (5V/9V)", type: QuestType.MAIN },
      { id: "9-m-2", text: "Script: Toggle Relay with Button", type: QuestType.MAIN },
      { id: "9-c-1", text: "30 mins stretching/mobility", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 5, agi: 0, gld: 0 }
  },
  {
    level: 10,
    title: "THE BOSS RAID",
    theme: "Mastery of Basics",
    duration: "The Weekend",
    description: "Complete all three Boss Challenges to advance.",
    objectives: ["Smart Fan System", "5K Run", "Charity"],
    quests: [
      { id: "10-b-1", text: "TECH BOSS: Smart Fan (Temp Auto + Web Manual)", type: QuestType.BOSS },
      { id: "10-b-2", text: "PHYSICAL BOSS: Run 5km (No walking > 1min)", type: QuestType.BOSS },
      { id: "10-b-3", text: "SPIRITUAL BOSS: Give Sadaqah (₹500+) & Gratitude", type: QuestType.BOSS },
    ],
    rewards: { str: 10, int: 10, wis: 10, agi: 0, gld: 0 },
    rankUp: "D-RANK"
  },
  // ARC 2: THE JUNIOR TECHNOMANCER
  {
    level: 11,
    title: "THE THIRD EYE",
    theme: "Software Vision",
    duration: "3 Days",
    description: "Install vision libraries. Your machines will now see.",
    objectives: ["Install OpenCV", "Dead Hangs"],
    quests: [
      { id: "11-d-1", text: "Protocol 24 + Drink 1L water on waking", type: QuestType.DAILY },
      { id: "11-m-1", text: "Install OpenCV (pip install opencv-python)", type: QuestType.MAIN },
      { id: "11-m-2", text: "Script: Display Webcam Feed in window", type: QuestType.MAIN },
      { id: "11-c-1", text: "Dead Hangs: Accumulate 3 mins total", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 12,
    title: "DIGITAL SIGHT",
    theme: "Image Processing",
    duration: "3 Days",
    description: "Teach the machine to differentiate colors/shapes.",
    objectives: ["HSV Color Space", "Negative Pull-ups"],
    quests: [
      { id: "12-d-1", text: "Read 1 page of Quran (Focus on Tafseer)", type: QuestType.DAILY },
      { id: "12-m-1", text: "Script: Convert Webcam frame to HSV", type: QuestType.MAIN },
      { id: "12-m-2", text: "Script: Create Mask for Red Objects", type: QuestType.MAIN },
      { id: "12-c-1", text: "Negative Pull-ups: 3 sets of 5 reps", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 1, agi: 0, gld: 0 }
  },
  {
    level: 13,
    title: "FACE ID",
    theme: "Detection Logic",
    duration: "4 Days",
    description: "Detect a human face using Haar Cascades.",
    objectives: ["Face Detection", "Center Point Calc"],
    quests: [
      { id: "13-d-1", text: "Sunnah: Fast on Mon or Thu", type: QuestType.DAILY },
      { id: "13-m-1", text: "Download haarcascade_frontalface_default.xml", type: QuestType.MAIN },
      { id: "13-m-2", text: "Draw Green Rectangle around face", type: QuestType.MAIN },
      { id: "13-m-3", text: "Calculate & Print Face Center (X,Y)", type: QuestType.MAIN },
      { id: "13-c-1", text: "Run 3km under 20 minutes", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 14,
    title: "THE BRIDGE",
    theme: "PC to Microcontroller",
    duration: "4 Days",
    description: "Make Python talk to ESP32 via Serial.",
    objectives: ["Serial Communication", "First Pull-up"],
    quests: [
      { id: "14-d-1", text: "No 'luxury' food items this week", type: QuestType.DAILY },
      { id: "14-m-1", text: "Python: Send '1'/'0' via Serial", type: QuestType.MAIN },
      { id: "14-m-2", text: "ESP32: Listen to sys.stdin loop", type: QuestType.MAIN },
      { id: "14-m-3", text: "Control ESP32 LED via Laptop Keyboard", type: QuestType.MAIN },
      { id: "14-c-1", text: "1 Strict Pull-up (or 20 Rows)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 15,
    title: "THE SENTRY",
    theme: "Integration Mini-Boss",
    duration: "Weekend Raid",
    description: "Build a machine that watches and follows you.",
    objectives: ["Servo Motor", "Face Tracker"],
    quests: [
      { id: "15-b-1", text: "Build: Connect Servo to ESP32", type: QuestType.BOSS },
      { id: "15-b-2", text: "Code: Laptop sends Face X-Coord to ESP32", type: QuestType.BOSS },
      { id: "15-b-3", text: "Code: ESP32 moves Servo to follow face", type: QuestType.BOSS },
      { id: "15-c-1", text: "The Gauntlet: 50 Pushups + 50 Squats + 1km Run", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 5 }, // 5 Unassigned points
    rankUp: "D-RANK (SENTRY)"
  },
  {
    level: 16,
    title: "THE ARCHITECT",
    theme: "PCB Design Tools",
    duration: "3 Days",
    description: "Stop using breadboards. Start designing PCBs.",
    objectives: ["EasyEDA Setup", "MMA/Boxing"],
    quests: [
      { id: "16-d-1", text: "Listen to Hardware Eng. Podcast", type: QuestType.DAILY },
      { id: "16-m-1", text: "Create account on EasyEDA", type: QuestType.MAIN },
      { id: "16-m-2", text: "Find ESP32-DEVKIT-V1 Footprint", type: QuestType.MAIN },
      { id: "16-m-3", text: "Place component on blank schematic", type: QuestType.MAIN },
      { id: "16-c-1", text: "Attend MMA/Boxing Class (or 45m Bag Work)", type: QuestType.COMBAT },
    ],
    rewards: { str: 2, int: 2, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 17,
    title: "THE BLUEPRINT",
    theme: "Schematic Capture",
    duration: "4 Days",
    description: "Draw the map of electricity for your Sentry.",
    objectives: ["Schematic Design", "Pull-up Resistors"],
    quests: [
      { id: "17-d-1", text: "Pray Tahajjud once this week", type: QuestType.DAILY },
      { id: "17-m-1", text: "Design Sentry Schematic", type: QuestType.MAIN },
      { id: "17-m-2", text: "Add 3-pin Header for Servo", type: QuestType.MAIN },
      { id: "17-m-3", text: "Add DC Power Jack & Pull-ups", type: QuestType.MAIN },
      { id: "17-c-1", text: "Shadow Boxing: 3 rounds of 3 mins", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 4, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 18,
    title: "THE LAYOUT",
    theme: "Physical Routing",
    duration: "5 Days",
    description: "Convert Schematic to PCB Layout.",
    objectives: ["PCB Routing", "Design Rules"],
    quests: [
      { id: "18-d-1", text: "10 mins Dhikr after work/school", type: QuestType.DAILY },
      { id: "18-m-1", text: "Arrange components in PCB View", type: QuestType.MAIN },
      { id: "18-m-2", text: "Route Tracks (0.5mm Sig, 1.0mm Pwr)", type: QuestType.MAIN },
      { id: "18-m-3", text: "Pass DRC (Design Rule Check) with 0 errors", type: QuestType.MAIN },
      { id: "18-c-1", text: "Run 3km under 18 minutes", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 19,
    title: "THE FABRICATION",
    theme: "Manufacturing Prep",
    duration: "3 Days",
    description: "Generate files for the factory.",
    objectives: ["Gerber Files", "BOM"],
    quests: [
      { id: "19-d-1", text: "Call parents/family (Silat ar-Rahim)", type: QuestType.DAILY },
      { id: "19-m-1", text: "Export Gerber Files & BOM", type: QuestType.MAIN },
      { id: "19-m-2", text: "Inspect layers in Online Gerber Viewer", type: QuestType.MAIN },
      { id: "19-c-1", text: "2 Strict Pull-ups", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 2, agi: 0, gld: 0 }
  },
  {
    level: 20,
    title: "THE JOB CHANGE",
    theme: "Permanence",
    duration: "1 Week",
    description: "Make it permanent. Prove your worth.",
    objectives: ["Soldering", "Fasting", "High Intensity"],
    quests: [
      { id: "20-b-1", text: "TECH BOSS: Transfer Sentry to Perfboard & Solder", type: QuestType.BOSS },
      { id: "20-b-2", text: "PHYSICAL BOSS: 60min Gym Session OR 5k + 50 Burpees", type: QuestType.BOSS },
      { id: "20-b-3", text: "SPIRITUAL BOSS: Full Day Fast (Dawn to Sunset)", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 15 }, // 15 Unassigned points
    rankUp: "C-RANK",
    jobClassUp: "HARDWARE ENGINEER"
  },
  // ARC 3: THE PROTOTYPER
  {
    level: 21,
    title: "THE CLOUD GATE",
    theme: "IoT Protocols (MQTT)",
    duration: "3 Days",
    description: "Move beyond local Wi-Fi. Talk to the global internet.",
    objectives: ["HiveMQ/Adafruit IO", "MQTT Publish/Subscribe", "Hydration"],
    quests: [
      { id: "21-d-1", text: "Hydration: Drink 3 Liters of water daily", type: QuestType.DAILY },
      { id: "21-d-2", text: "Focus: No phone in the bedroom after 10 PM", type: QuestType.DAILY },
      { id: "21-m-1", text: "Set up HiveMQ or Adafruit IO account", type: QuestType.MAIN },
      { id: "21-m-2", text: "Python Script: 'Publish' message from Laptop", type: QuestType.MAIN },
      { id: "21-m-3", text: "ESP32 Script: 'Subscribe' & blink LED on msg", type: QuestType.MAIN },
      { id: "21-c-1", text: "Bench Press: Test 5 Rep Max (or Decline Pushups)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 22,
    title: "THE INFINITE SCROLL",
    theme: "Database & Logging",
    duration: "4 Days",
    description: "Data must survive after the device turns off.",
    objectives: ["Firebase Realtime DB", "Uptime Logging", "Smile"],
    quests: [
      { id: "22-d-1", text: "Sunnah: Smile at colleagues/family", type: QuestType.DAILY },
      { id: "22-m-1", text: "Create Google Firebase Project", type: QuestType.MAIN },
      { id: "22-m-2", text: "Connect ESP32 to Firebase", type: QuestType.MAIN },
      { id: "22-m-3", text: "Log 'Uptime' to DB every 1 minute", type: QuestType.MAIN },
      { id: "22-c-1", text: "Squats: 3 Sets of 12 (Add weight/reps)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 4, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 23,
    title: "THE SHELL (CAD)",
    theme: "3D Design",
    duration: "5 Days",
    description: "Electronics without a case are trash. Learn to package them.",
    objectives: ["Fusion 360/Tinkercad", "Enclosure Design", "Overhead Press"],
    quests: [
      { id: "23-d-1", text: "Watch 1 CAD tutorial during lunch", type: QuestType.DAILY },
      { id: "23-m-1", text: "Design ESP32 Enclosure (Box + Lid)", type: QuestType.MAIN },
      { id: "23-m-2", text: "Add holes for USB and Sensor", type: QuestType.MAIN },
      { id: "23-m-3", text: "Export completed .STL file", type: QuestType.MAIN },
      { id: "23-c-1", text: "Overhead Press: 3 Sets of 10", type: QuestType.COMBAT },
    ],
    rewards: { str: 2, int: 3, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 24,
    title: "THE FABRICATION",
    theme: "3D Printing / Manufacturing",
    duration: "3 Days",
    description: "Turn digital atoms into physical matter.",
    objectives: ["3D Printing", "Surah Al-Asr"],
    quests: [
      { id: "24-d-1", text: "Read Surah Al-Asr translation", type: QuestType.DAILY },
      { id: "24-m-1", text: "Print the Case (Own printer or Service)", type: QuestType.MAIN },
      { id: "24-m-2", text: "Fit ESP32 inside (File down if needed)", type: QuestType.MAIN },
      { id: "24-c-1", text: "Farmer's Walk: 2 minutes with heavy weights", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 4, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 25,
    title: "THE MINI-BOSS (WEATHER STATION)",
    theme: "The Full Stack Device",
    duration: "The Weekend Raid",
    description: "A polished, standalone product.",
    objectives: ["Weather Station", "5K Run"],
    quests: [
      { id: "25-b-1", text: "TECH BOSS: Build Weather Station (BME280+OLED+Case)", type: QuestType.BOSS },
      { id: "25-b-2", text: "TECH BOSS: Log data to Firebase autonomously (24h)", type: QuestType.BOSS },
      { id: "25-b-3", text: "PHYSICAL BOSS: Run 5km under 28 minutes", type: QuestType.BOSS },
    ],
    rewards: { str: 2, int: 3, wis: 0, agi: 0, gld: 0 },
    rankUp: "C-RANK"
  },
  {
    level: 26,
    title: "THE DASHBOARD",
    theme: "Frontend (UI/UX)",
    duration: "5 Days",
    description: "Data is useless if humans can't read it easily.",
    objectives: ["Web App", "Deadlift"],
    quests: [
      { id: "26-d-1", text: "Charity: Donate ₹50 daily", type: QuestType.DAILY },
      { id: "26-m-1", text: "Build HTML/JS/React Page", type: QuestType.MAIN },
      { id: "26-m-2", text: "Fetch & Display Firebase Graph Live", type: QuestType.MAIN },
      { id: "26-c-1", text: "Deadlift: Bodyweight x 5 reps", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 27,
    title: "THE ENERGY",
    theme: "Power Management",
    duration: "3 Days",
    description: "Cut the cord. Go wireless.",
    objectives: ["Li-Ion Battery", "Deep Sleep", "Detox"],
    quests: [
      { id: "27-d-1", text: "Detox: No music. White noise/Silence only.", type: QuestType.DAILY },
      { id: "27-m-1", text: "Wire TP4056 + 18650 Battery to ESP32", type: QuestType.MAIN },
      { id: "27-m-2", text: "Code: Deep Sleep mode (Wake, Send, Sleep)", type: QuestType.MAIN },
      { id: "27-m-3", text: "Run for 24h+ on battery", type: QuestType.MAIN },
      { id: "27-c-1", text: "HIIT: 10 rounds (30s Sprint / 30s Rest)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 1, gld: 0 }
  },
  {
    level: 28,
    title: "THE WATCHER",
    theme: "Alerts & Automation",
    duration: "3 Days",
    description: "The machine notifies YOU.",
    objectives: ["Telegram Bot", "Yoga"],
    quests: [
      { id: "28-d-1", text: "Cook a meal or wash dishes for family", type: QuestType.DAILY },
      { id: "28-m-1", text: "Create Telegram Bot (BotFather)", type: QuestType.MAIN },
      { id: "28-m-2", text: "Code: Send Alert if Temp > 35°C", type: QuestType.MAIN },
      { id: "28-c-1", text: "Yoga/Mobility: 30 min session", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 29,
    title: "THE DOCUMENTATION",
    theme: "Communication",
    duration: "4 Days",
    description: "If it's not documented, it doesn't exist.",
    objectives: ["GitHub Readme", "Gratitude Journal"],
    quests: [
      { id: "29-d-1", text: "Gratitude Journal: Write 3 things daily", type: QuestType.DAILY },
      { id: "29-m-1", text: "Upload Weather Station code to GitHub", type: QuestType.MAIN },
      { id: "29-m-2", text: "Write README (Diagram, Dashboard, Photos)", type: QuestType.MAIN },
      { id: "29-c-1", text: "Rest Day: Review Stats & Portfolio", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 5, agi: 0, gld: 0 }
  },
  {
    level: 30,
    title: "THE BOSS RAID (PORTFOLIO)",
    theme: "Identity & Marketing",
    duration: "1 Week",
    description: "Complete all 3 Boss Challenges to launch yourself.",
    objectives: ["Portfolio Website", "200kg Total", "Anger Fasting"],
    quests: [
      { id: "30-b-1", text: "TECH BOSS: Launch Personal Website (Projects/About)", type: QuestType.BOSS },
      { id: "30-b-2", text: "PHYSICAL BOSS: 200kg Total OR Calisthenics Challenge", type: QuestType.BOSS },
      { id: "30-b-3", text: "SPIRITUAL BOSS: Anger Fasting (7 Days - No outbursts)", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 20 },
    rankUp: "JUNIOR INNOVATOR",
  },
  // ARC 4: THE NEURAL EDGE
  {
    level: 31,
    title: "THE BRAIN TRANSPLANT",
    theme: "Moving to Linux",
    duration: "3 Days",
    description: "Master the Microcomputer (Raspberry Pi / Jetson). Rules change now.",
    objectives: ["Headless Linux", "SSH", "Optimization"],
    quests: [
      { id: "31-d-1", text: "Optimization: Prep gym bag/work clothes night before", type: QuestType.DAILY },
      { id: "31-m-1", text: "Install Raspberry Pi OS (Lite - Headless)", type: QuestType.MAIN },
      { id: "31-m-2", text: "Connect via SSH from laptop (No Monitor allowed)", type: QuestType.MAIN },
      { id: "31-c-1", text: "Speed Work: 400m Sprints x 4 rounds (2m rest)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 32,
    title: "THE COMMAND LINE",
    theme: "OS Mastery",
    duration: "4 Days",
    description: "Navigate without a mouse. Master the terminal.",
    objectives: ["Bash Scripting", "Financial Literacy"],
    quests: [
      { id: "32-d-1", text: "Read 5 pages of Financial Literacy book", type: QuestType.DAILY },
      { id: "32-m-1", text: "Learn basics: ls, cd, grep, chmod", type: QuestType.MAIN },
      { id: "32-m-2", text: "Write setup.sh to auto-install Python/OpenCV", type: QuestType.MAIN },
      { id: "32-m-3", text: "Run ./setup.sh to configure Pi", type: QuestType.MAIN },
      { id: "32-c-1", text: "Squat Strength: 5 sets of 5 reps (Heavy)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 0, gld: 1 }
  },
  {
    level: 33,
    title: "THE DATASET",
    theme: "Garbage In, Garbage Out",
    duration: "4 Days",
    description: "Prepare data for AI training. Annotation is key.",
    objectives: ["Image Annotation", "Oral Hygiene"],
    quests: [
      { id: "33-d-1", text: "Sunnah: Use Miswak/Floss daily", type: QuestType.DAILY },
      { id: "33-m-1", text: "Take 50 photos of specific object (angles)", type: QuestType.MAIN },
      { id: "33-m-2", text: "Annotate images using LabelImg/Roboflow", type: QuestType.MAIN },
      { id: "33-m-3", text: "Verify dataset structure (YOLO format)", type: QuestType.MAIN },
      { id: "33-c-1", text: "Plank Challenge: Accumulate 5 minutes total", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 4, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 34,
    title: "THE TRAINING",
    theme: "Deep Learning",
    duration: "5 Days",
    description: "Train your first Custom Model using YOLOv8.",
    objectives: ["Model Training", "Charity"],
    quests: [
      { id: "34-d-1", text: "Charity: Automate monthly donation (Passive Good)", type: QuestType.DAILY },
      { id: "34-m-1", text: "Upload dataset to Google Colab", type: QuestType.MAIN },
      { id: "34-m-2", text: "Train YOLOv8 Nano model on your data", type: QuestType.MAIN },
      { id: "34-m-3", text: "Achieve mAP > 0.8", type: QuestType.MAIN },
      { id: "34-c-1", text: "The 10k Prep: Run 6km (Slow pace)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 35,
    title: "THE MINI-BOSS (THE SMART EYE)",
    theme: "Edge Inference",
    duration: "Weekend Raid",
    description: "Run AI on the Edge (Pi), not the Cloud.",
    objectives: ["Edge AI", "The Murph"],
    quests: [
      { id: "35-b-1", text: "TECH BOSS: Transfer model to Raspberry Pi", type: QuestType.BOSS },
      { id: "35-b-2", text: "TECH BOSS: Python script to detect object >95% conf", type: QuestType.BOSS },
      { id: "35-b-3", text: "PHYSICAL BOSS: Half Murph (800m run, 50 pull, 100 push, 150 sq, 800m run)", type: QuestType.BOSS },
    ],
    rewards: { str: 2, int: 3, wis: 0, agi: 0, gld: 0 },
    rankUp: "C-RANK+"
  },
  {
    level: 36,
    title: "THE SHADOW ARMY",
    theme: "Asset Allocation",
    duration: "2 Days",
    description: "Your money must start working. Build assets.",
    objectives: ["SIP Investment", "Expense Audit"],
    quests: [
      { id: "36-d-1", text: "Audit: Track/Categorize last 30 days spending", type: QuestType.DAILY },
      { id: "36-m-1", text: "Open Demat Account (Zerodha/Groww)", type: QuestType.MAIN },
      { id: "36-m-2", text: "Start SIP in Index Fund/Ethical Fund", type: QuestType.MAIN },
      { id: "36-c-1", text: "Active Recovery: 45 mins Swim/Cycle", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 5 }
  },
  {
    level: 37,
    title: "THE VOICE",
    theme: "Speech Recognition",
    duration: "4 Days",
    description: "Talk to the machine. Offline STT.",
    objectives: ["Voice Command", "Silence"],
    quests: [
      { id: "37-d-1", text: "Silence: Practice silence of tongue at work", type: QuestType.DAILY },
      { id: "37-m-1", text: "Install USB Mic & Vosk/Whisper Lib", type: QuestType.MAIN },
      { id: "37-m-2", text: "Script: Recognize 'Light On' command", type: QuestType.MAIN },
      { id: "37-c-1", text: "Deadlift Volume: 3 sets of 8 reps (70%)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 38,
    title: "THE VISION + VOICE",
    theme: "Multimodal AI",
    duration: "5 Days",
    description: "Combine senses. Sight and Sound.",
    objectives: ["Multimodal Assistant", "Call Family"],
    quests: [
      { id: "38-d-1", text: "Call a relative you haven't spoken to in a month", type: QuestType.DAILY },
      { id: "38-m-1", text: "Combine Vision (Lvl 35) + Voice (Lvl 37)", type: QuestType.MAIN },
      { id: "38-m-2", text: "Logic: Detect object -> TTS 'This is a [Object]'", type: QuestType.MAIN },
      { id: "38-c-1", text: "Interval Runs: 1km warm, 200m Sprint/Walk x6", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 39,
    title: "THE REFACTOR",
    theme: "Code Quality",
    duration: "3 Days",
    description: "Write code others can read. Software Engineering.",
    objectives: ["OOP", "Journaling"],
    quests: [
      { id: "39-d-1", text: "Journal: Post-Mortem of your 20s so far", type: QuestType.DAILY },
      { id: "39-m-1", text: "Rewrite messy scripts into Classes (OOP)", type: QuestType.MAIN },
      { id: "39-m-2", text: "Create Camera, Motor, AI classes", type: QuestType.MAIN },
      { id: "39-c-1", text: "Test Max Broad Jump (Explosive Power)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 2, agi: 0, gld: 0 }
  },
  {
    level: 40,
    title: "THE BOSS RAID (THE PRODUCT)",
    theme: "Solving a Problem",
    duration: "1 Week",
    description: "Build a complete product for someone else.",
    objectives: ["The Smart Assist", "Speedster", "Night Vigil"],
    quests: [
      { id: "40-b-1", text: "TECH BOSS: Build 'Smart Assist' (Vision+Audio+Logic+Case)", type: QuestType.BOSS },
      { id: "40-b-2", text: "PHYSICAL BOSS: Run 5km < 25min OR DL 1.5x BW for 3", type: QuestType.BOSS },
      { id: "40-b-3", text: "SPIRITUAL BOSS: Tahajjud Streak (3 days before Fajr)", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 25 },
    rankUp: "AI ARCHITECT"
  },
  // ARC 5: THE GUILD MASTER
  {
    level: 41,
    title: "THE CHASSIS",
    theme: "Mechanical Engineering Basics",
    duration: "4 Days",
    description: "Build the skeleton. Assemble the robot chassis.",
    objectives: ["Assemble Chassis", "Mount Motors", "Sugar Detox"],
    quests: [
      { id: "41-d-1", text: "Nutrition: No added sugar/sweets", type: QuestType.DAILY },
      { id: "41-m-1", text: "Buy & Assemble Robot Chassis Kit", type: QuestType.MAIN },
      { id: "41-m-2", text: "Mount Motors & Wheels", type: QuestType.MAIN },
      { id: "41-m-3", text: "Mount Pi & Power Bank securely", type: QuestType.MAIN },
      { id: "41-c-1", text: "Jump Rope: 10 mins continuous", type: QuestType.COMBAT },
    ],
    rewards: { str: 3, int: 0, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 42,
    title: "THE DRIVER",
    theme: "H-Bridges & PWM",
    duration: "3 Days",
    description: "Control high power with low logic.",
    objectives: ["Motor Control", "Punctuality"],
    quests: [
      { id: "42-d-1", text: "Punctuality: Arrive 10 mins early everywhere", type: QuestType.DAILY },
      { id: "42-m-1", text: "Wire Motors to L298N & Pi GPIO", type: QuestType.MAIN },
      { id: "42-m-2", text: "Script: Functions for Forward, Backward, Stop", type: QuestType.MAIN },
      { id: "42-c-1", text: "Wall Sit: Hold for 2 minutes", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 43,
    title: "KINEMATICS",
    theme: "Differential Drive Logic",
    duration: "4 Days",
    description: "How to turn a tank. Master movement logic.",
    objectives: ["Turning Logic", "Wisdom Reading"],
    quests: [
      { id: "43-d-1", text: "Read Surah Luqman translation", type: QuestType.DAILY },
      { id: "43-m-1", text: "Script: Zero Radius Turn (Left/Right)", type: QuestType.MAIN },
      { id: "43-m-2", text: "Script: Soft Turn (Differential speeds)", type: QuestType.MAIN },
      { id: "43-m-3", text: "Drive perfect Figure-8 pattern", type: QuestType.MAIN },
      { id: "43-c-1", text: "Agility Drills: 10m Suicides x 10", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 4, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 44,
    title: "TELEOPERATION",
    theme: "Remote Control",
    duration: "3 Days",
    description: "Cut the SSH cord. Drive it like a toy.",
    objectives: ["Web Interface", "Financial Reality Check"],
    quests: [
      { id: "44-d-1", text: "Finance: Calculate 'Survival Months' runway", type: QuestType.DAILY },
      { id: "44-m-1", text: "Create Web Interface (Flask/Django)", type: QuestType.MAIN },
      { id: "44-m-2", text: "Map WASD keys to Robot Movements", type: QuestType.MAIN },
      { id: "44-m-3", text: "Drive robot from another room", type: QuestType.MAIN },
      { id: "44-c-1", text: "Core Strength: 3 sets of 15 Leg Raises", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 1, gld: 0 }
  },
  {
    level: 45,
    title: "MINI-BOSS (THE EXPLORER)",
    theme: "FPV (First Person View)",
    duration: "Weekend Raid",
    description: "See what the robot sees. Low latency streaming.",
    objectives: ["Video Streaming", "5K Time Trial"],
    quests: [
      { id: "45-b-1", text: "TECH BOSS: Stream Pi Camera video to Web Controller", type: QuestType.BOSS },
      { id: "45-b-2", text: "TECH BOSS: Find object in another room via FPV only", type: QuestType.BOSS },
      { id: "45-b-3", text: "PHYSICAL BOSS: Beat your previous 5K time", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 },
    rankUp: "B-RANK"
  },
  {
    level: 46,
    title: "THE SENSE OF SPACE",
    theme: "Distance Perception",
    duration: "5 Days",
    description: "The robot must know 'How far is the wall?'.",
    objectives: ["Obstacle Avoidance", "Charity"],
    quests: [
      { id: "46-d-1", text: "Charity: Feed a hungry person/animal daily", type: QuestType.DAILY },
      { id: "46-m-1", text: "Mount Ultrasonic Sensors or Lidar", type: QuestType.MAIN },
      { id: "46-m-2", text: "Script: Auto-Stop & Turn on obstacle < 30cm", type: QuestType.MAIN },
      { id: "46-m-3", text: "Robot wanders room without crashing", type: QuestType.MAIN },
      { id: "46-c-1", text: "Box Jumps: 3 sets of 10 (Knee height)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 47,
    title: "THE OPERATING SYSTEM",
    theme: "ROS 2 (Robot Operating System)",
    duration: "7 Days",
    description: "Stop writing Python scripts. Start writing Nodes.",
    objectives: ["ROS 2 Installation", "Nodes & Topics"],
    quests: [
      { id: "47-d-1", text: "Watch ROS 2 Beginner Tutorials", type: QuestType.DAILY },
      { id: "47-m-1", text: "Install ROS 2 (Humble/Jazzy) on Pi", type: QuestType.MAIN },
      { id: "47-m-2", text: "Rewrite motor control as ROS 2 Node", type: QuestType.MAIN },
      { id: "47-m-3", text: "Subscribe to /cmd_vel topic", type: QuestType.MAIN },
      { id: "47-c-1", text: "Iso Holds: Plank(2m)+WallSit(2m)+Bridge(2m)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 48,
    title: "THE FINANCIAL FORTRESS",
    theme: "Security & Risk Management",
    duration: "3 Days",
    description: "Build the shield that protects your creativity.",
    objectives: ["Emergency Fund", "Subscription Audit"],
    quests: [
      { id: "48-d-1", text: "Audit: Cancel unused subscriptions", type: QuestType.DAILY },
      { id: "48-m-1", text: "Plan: 3 Months Expenses Emergency Fund", type: QuestType.MAIN },
      { id: "48-m-2", text: "Action: Move first tranche to Liquid Fund", type: QuestType.MAIN },
      { id: "48-c-1", text: "Sprints: 100m x 8 (Max effort)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 10 }
  },
  {
    level: 49,
    title: "THE MENTOR",
    theme: "Zakat of Knowledge",
    duration: "5 Days",
    description: "To master a subject, you must teach it.",
    objectives: ["Content Creation", "Family Connection"],
    quests: [
      { id: "49-d-1", text: "Call parents & discuss career goals", type: QuestType.DAILY },
      { id: "49-m-1", text: "Create Tutorial (Blog/Video) on Levels 41-47", type: QuestType.MAIN },
      { id: "49-m-2", text: "Publish content (Medium/LinkedIn/YouTube)", type: QuestType.MAIN },
      { id: "49-c-1", text: "Active Rest: Yoga/Long Walk. Visualize Boss.", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 5, agi: 0, gld: 0 }
  },
  {
    level: 50,
    title: "THE BOSS RAID (AUTONOMY)",
    theme: "The Autonomous Rover",
    duration: "1 Week",
    description: "Complete all 3 Boss Challenges to become a Technomancer.",
    objectives: ["Autonomous Navigation", "Combat Sports", "Repentance"],
    quests: [
      { id: "50-b-1", text: "TECH BOSS: Robot navigates around chair autonomously", type: QuestType.BOSS },
      { id: "50-b-2", text: "PHYSICAL BOSS: 3 Rounds Heavy Bag OR 10km Run", type: QuestType.BOSS },
      { id: "50-b-3", text: "SPIRITUAL BOSS: Salat al-Tawbah (Night Prayer)", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 30 },
    rankUp: "TECHNOMANCER (RANK B)"
  },
  // ARC 6: THE ARCHITECT
  {
    level: 51,
    title: "THE STANDARD (ROS 2)",
    theme: "Professional Robotics Architecture",
    duration: "5 Days",
    description: "Forget Python scripts. Learn Nodes, Topics, and Services.",
    objectives: ["ROS 2 Workspace", "Publisher/Subscriber"],
    quests: [
      { id: "51-d-1", text: "Nutrition: High-protein breakfast (Eggs/Whey)", type: QuestType.DAILY },
      { id: "51-m-1", text: "Create ROS 2 Workspace (colcon build)", type: QuestType.MAIN },
      { id: "51-m-2", text: "Create package 'my_robot_controller'", type: QuestType.MAIN },
      { id: "51-m-3", text: "Write Publisher & Subscriber Nodes", type: QuestType.MAIN },
      { id: "51-c-1", text: "Weighted Pull-ups: +5kg, 3 sets of 5 reps", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 52,
    title: "THE SIMULATION",
    theme: "Virtual Prototyping (Gazebo)",
    duration: "5 Days",
    description: "Crash the robot in the computer, not in real life.",
    objectives: ["Gazebo Installation", "Launch Files"],
    quests: [
      { id: "52-d-1", text: "Finance: Read 'The Intelligent Investor' or 'Rich Dad Poor Dad'", type: QuestType.DAILY },
      { id: "52-m-1", text: "Install Gazebo/Ignition & Load TurtleBot3", type: QuestType.MAIN },
      { id: "52-m-2", text: "Write launch file for Robot + Maze world", type: QuestType.MAIN },
      { id: "52-m-3", text: "Drive virtual robot using keyboard", type: QuestType.MAIN },
      { id: "52-c-1", text: "5k Tempo Run (Zone 3/4)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 4, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 53,
    title: "THE NAVIGATOR (NAV2)",
    theme: "SLAM & Path Planning",
    duration: "7 Days",
    description: "The robot looks at a map and finds a path.",
    objectives: ["SLAM", "Nav2 Stack"],
    quests: [
      { id: "53-d-1", text: "Spiritual: Pray Salat al-Duha on weekends", type: QuestType.DAILY },
      { id: "53-m-1", text: "Implement SLAM in simulation", type: QuestType.MAIN },
      { id: "53-m-2", text: "Generate map of virtual maze", type: QuestType.MAIN },
      { id: "53-m-3", text: "Nav2: Autonomous navigation to clicked point", type: QuestType.MAIN },
      { id: "53-c-1", text: "Overhead Squat (PVC/Broom): 3 sets of 15", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 54,
    title: "THE TWIN",
    theme: "Sim-to-Real Transfer",
    duration: "4 Days",
    description: "Run the simulation code on real hardware.",
    objectives: ["Physical SLAM", "Mapping"],
    quests: [
      { id: "54-d-1", text: "Social: Comment meaningfully on 3 LinkedIn posts", type: QuestType.DAILY },
      { id: "54-m-1", text: "Run SLAM node on physical robot", type: QuestType.MAIN },
      { id: "54-m-2", text: "Create digital map of room while driving", type: QuestType.MAIN },
      { id: "54-c-1", text: "Deadlift: 5 sets of 3 reps @ 80% 1RM", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 55,
    title: "MINI-BOSS (THE FLEET)",
    theme: "Multi-Robot Communication",
    duration: "Weekend Raid",
    description: "Two robots sharing one brain.",
    objectives: ["Leader-Follower Logic", "Farmer's Carry"],
    quests: [
      { id: "55-b-1", text: "TECH BOSS: Setup Leader Robot (Publishes /cmd_vel)", type: QuestType.BOSS },
      { id: "55-b-2", text: "TECH BOSS: Setup Follower Robot (Subscribes & mimics)", type: QuestType.BOSS },
      { id: "55-b-3", text: "PHYSICAL BOSS: Farmer's Carry (Bodyweight total, 50m)", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 },
    rankUp: "B-RANK+"
  },
  {
    level: 56,
    title: "THE ENTITY (BUSINESS)",
    theme: "Legal Sovereignty",
    duration: "3 Days",
    description: "You are no longer just a person; you are a Company.",
    objectives: ["Business Registration", "Bank Account"],
    quests: [
      { id: "56-d-1", text: "Identity: Update LinkedIn headline (Founder/Researcher)", type: QuestType.DAILY },
      { id: "56-m-1", text: "Register Sole Proprietorship/LLC (e.g., Udyam)", type: QuestType.MAIN },
      { id: "56-m-2", text: "Open separate Business Bank Account", type: QuestType.MAIN },
      { id: "56-c-1", text: "Mobility Flow: 30 mins Yoga/Stretching", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 10 }
  },
  {
    level: 57,
    title: "THE SWARM LOGIC",
    theme: "Decentralized Algorithms",
    duration: "5 Days",
    description: "Boids Algorithm (Flocking). Robots moving together.",
    objectives: ["Flocking Simulation", "Charity"],
    quests: [
      { id: "57-d-1", text: "Charity: Sponsor a meal for a poor family", type: QuestType.DAILY },
      { id: "57-m-1", text: "Spawn 3 robots in Gazebo", type: QuestType.MAIN },
      { id: "57-m-2", text: "Script: Flocking (Separation, Alignment, Cohesion)", type: QuestType.MAIN },
      { id: "57-c-1", text: "Sprint Intervals: 200m x 8 (1 min rest)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 58,
    title: "THE PREACHER",
    theme: "Public Speaking / Dawah",
    duration: "3 Days",
    description: "Articulate your vision.",
    objectives: ["Pitch Deck", "Presentation"],
    quests: [
      { id: "58-d-1", text: "Spiritual: Listen to lecture on Fiqh of Business", type: QuestType.DAILY },
      { id: "58-m-1", text: "Create Pitch Deck (5-7 Slides)", type: QuestType.MAIN },
      { id: "58-m-2", text: "Record presentation & critique body language", type: QuestType.MAIN },
      { id: "58-c-1", text: "Bench Press: 3 sets of 8 reps (Control descent)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 2, wis: 3, agi: 0, gld: 0 }
  },
  {
    level: 59,
    title: "THE PILGRIM'S INTENT",
    theme: "Spiritual Preparation",
    duration: "4 Days",
    description: "Prepare for the Journey (Umrah).",
    objectives: ["Umrah Planning", "Savings Fund"],
    quests: [
      { id: "59-d-1", text: "Tahajjud: Pray 2 Raka'at every night", type: QuestType.DAILY },
      { id: "59-m-1", text: "Check flight/visa prices for Umrah", type: QuestType.MAIN },
      { id: "59-m-2", text: "Open 'Pilgrimage Fund' & Deposit installment", type: QuestType.MAIN },
      { id: "59-m-3", text: "Make sincere Niyyah for Umrah within 12 months", type: QuestType.MAIN },
      { id: "59-c-1", text: "Long Walk: 10km endurance", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 10, agi: 0, gld: 0 }
  },
  {
    level: 60,
    title: "THE BOSS RAID (THE SWARM ARCHITECT)",
    theme: "System Integration",
    duration: "1 Week",
    description: "Complete all 3 Boss Challenges. Master the Swarm.",
    objectives: ["Map Merge", "Heavy Lift", "Zakat"],
    quests: [
      { id: "60-b-1", text: "TECH BOSS: Multi-Robot Map Merge (Real/Sim)", type: QuestType.BOSS },
      { id: "60-b-2", text: "PHYSICAL BOSS: Deadlift 1.5x Bodyweight (1 Rep)", type: QuestType.BOSS },
      { id: "60-b-3", text: "SPIRITUAL BOSS: Calculate Zakat & Write Ethical Constitution", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 35 },
    rankUp: "SYSTEM ARCHITECT (RANK A)"
  },
  // ARC 7: THE NATIONAL RANKER
  {
    level: 61,
    title: "THE NOVELTY",
    theme: "Literature Review & Ideation",
    duration: "5 Days",
    description: "Find a gap in the world's knowledge. Innovate.",
    objectives: ["Research Papers", "Problem Statement"],
    quests: [
      { id: "61-d-1", text: "Optimization: Silence during Deep Work (No music)", type: QuestType.DAILY },
      { id: "61-m-1", text: "Identify specific unsolved Robotics/AI problem", type: QuestType.MAIN },
      { id: "61-m-2", text: "Read 5 IEEE/ArXiv Research Papers on topic", type: QuestType.MAIN },
      { id: "61-m-3", text: "Write 1-page Novel Abstract", type: QuestType.MAIN },
      { id: "61-c-1", text: "Volume Squats: 5 sets of 10 reps", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 2, agi: 0, gld: 0 }
  },
  {
    level: 62,
    title: "THE DEPTH (3D VISION)",
    theme: "RGB-D (Red, Green, Blue + Depth)",
    duration: "5 Days",
    description: "The robot sees in 3D (Point Clouds).",
    objectives: ["Depth Camera", "Point Clouds"],
    quests: [
      { id: "62-d-1", text: "Spiritual: Memorize 5 Ayahs of Surah Al-Baqarah", type: QuestType.DAILY },
      { id: "62-m-1", text: "Acquire Depth Camera (RealSense/OAK-D/Kinect)", type: QuestType.MAIN },
      { id: "62-m-2", text: "Visualize Point Cloud in Rviz2 or Open3D", type: QuestType.MAIN },
      { id: "62-c-1", text: "Weighted Dips: 3 sets of 8 reps", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 4, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 63,
    title: "THE VOXEL",
    theme: "3D Data Processing",
    duration: "6 Days",
    description: "Filter the noise. Process 3D data.",
    objectives: ["Voxel Grid", "RANSAC"],
    quests: [
      { id: "63-d-1", text: "Finance: Review & Rebalance Investment Portfolio", type: QuestType.DAILY },
      { id: "63-m-1", text: "Apply Voxel Downsampling to Point Cloud", type: QuestType.MAIN },
      { id: "63-m-2", text: "Use RANSAC to detect floor plane", type: QuestType.MAIN },
      { id: "63-m-3", text: "Highlight Floor (Green) vs Obstacles (Red)", type: QuestType.MAIN },
      { id: "63-c-1", text: "Deadlift Form Check (Record & Analyze)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 64,
    title: "THE AUTHOR",
    theme: "Technical Writing (LaTeX)",
    duration: "4 Days",
    description: "Look like a Scientist. Write professionally.",
    objectives: ["LaTeX", "IEEE Format"],
    quests: [
      { id: "64-d-1", text: "Sunnah: Eat sitting on floor / Strict etiquette", type: QuestType.DAILY },
      { id: "64-m-1", text: "Create Overleaf account", type: QuestType.MAIN },
      { id: "64-m-2", text: "Transcribe Abstract into IEEE Conference Format", type: QuestType.MAIN },
      { id: "64-m-3", text: "Generate professional PDF with BibTeX citations", type: QuestType.MAIN },
      { id: "64-c-1", text: "Bench Press: Heavy Singles (90% 1RM x 3)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 2, agi: 0, gld: 0 }
  },
  {
    level: 65,
    title: "MINI-BOSS (THE SPATIAL BOT)",
    theme: "3D Obstacle Avoidance",
    duration: "Weekend Raid",
    description: "Don't just avoid walls; avoid hanging objects.",
    objectives: ["3D Navigation", "1.5x Deadlift"],
    quests: [
      { id: "65-b-1", text: "TECH BOSS: Mount Depth Camera to Robot", type: QuestType.BOSS },
      { id: "65-b-2", text: "TECH BOSS: Navigate under table/chair using 3D vision", type: QuestType.BOSS },
      { id: "65-b-3", text: "PHYSICAL BOSS: Deadlift 1.5x Bodyweight for 3 reps (Perfect Form)", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 10 },
    rankUp: "A-RANK (CANDIDATE)"
  },
  {
    level: 66,
    title: "THE MANUFACTURER (DFM)",
    theme: "Design for Manufacturing",
    duration: "5 Days",
    description: "Design for machines, not humans.",
    objectives: ["Panelization", "Fiducials"],
    quests: [
      { id: "66-d-1", text: "Charity: Donate old clothes/books (1 year unused)", type: QuestType.DAILY },
      { id: "66-m-1", text: "Panelize PCB design (Multiple copies)", type: QuestType.MAIN },
      { id: "66-m-2", text: "Add Fiducial Markers & Tooling Holes", type: QuestType.MAIN },
      { id: "66-c-1", text: "Chin-ups: 3 sets of Max Reps", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 67,
    title: "THE BATCH",
    theme: "PCBA (PCB Assembly)",
    duration: "4 Days",
    description: "Automated Assembly simulation.",
    objectives: ["CPL File", "Ordering Process"],
    quests: [
      { id: "67-d-1", text: "Network: Message Founder/CTO for advice", type: QuestType.DAILY },
      { id: "67-m-1", text: "Generate Pick and Place (CPL) file", type: QuestType.MAIN },
      { id: "67-m-2", text: "Simulate order on JLCPCB/PCBWay (Check DFM)", type: QuestType.MAIN },
      { id: "67-c-1", text: "Sprint Intervals: 400m x 4", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 0, agi: 0, gld: 2 }
  },
  {
    level: 68,
    title: "THE PROTECTOR (IP)",
    theme: "Intellectual Property",
    duration: "5 Days",
    description: "Own your idea.",
    objectives: ["Provisional Patent", "Memorization"],
    quests: [
      { id: "68-d-1", text: "Spiritual: Memorize Ayatul Kursi / Next 5 Ayahs", type: QuestType.DAILY },
      { id: "68-m-1", text: "Draft Provisional Patent Application", type: QuestType.MAIN },
      { id: "68-m-2", text: "Complete Abstract, Background, & Claims sections", type: QuestType.MAIN },
      { id: "68-c-1", text: "Hanging Leg Raises: 3 sets of 12", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 5, agi: 0, gld: 0 }
  },
  {
    level: 69,
    title: "THE VALIDATION",
    theme: "Beta Testing",
    duration: "4 Days",
    description: "Feedback is painful but necessary.",
    objectives: ["User Testing", "UX Fixes"],
    quests: [
      { id: "69-d-1", text: "Kindness: Call parents & listen (No work talk)", type: QuestType.DAILY },
      { id: "69-m-1", text: "Conduct blind user test of prototype", type: QuestType.MAIN },
      { id: "69-m-2", text: "Record 3 UX flaws & Fix them in code", type: QuestType.MAIN },
      { id: "69-c-1", text: "Deload Week: Light weights & Stretching", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 3, wis: 2, agi: 0, gld: 0 }
  },
  {
    level: 70,
    title: "BOSS RAID (THE NATIONAL RANKER)",
    theme: "Authority & Strength",
    duration: "1 Week",
    description: "Complete all 3 Boss Challenges. Prove your expertise.",
    objectives: ["Publish Paper", "Heavy Deadlift", "Quran Memorization"],
    quests: [
      { id: "70-b-1", text: "TECH BOSS: Publish Whitepaper/Paper (Peer Reviewed)", type: QuestType.BOSS },
      { id: "70-b-2", text: "PHYSICAL BOSS: Deadlift 1.8x Bodyweight (1 Rep)", type: QuestType.BOSS },
      { id: "70-b-3", text: "SPIRITUAL BOSS: Memorize 1st Juz or 20 Ayahs of Baqarah", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 40 },
    rankUp: "NATIONAL RANKER (RANK A)"
  },
  // ARC 8: THE WORLD CLASS
  {
    level: 71,
    title: "THE NEURAL LINK",
    theme: "Biosignals (EEG/EMG)",
    duration: "5 Days",
    description: "Read the electricity of the body. Bio-Hacking begins.",
    objectives: ["Biosignals", "Meditation"],
    quests: [
      { id: "71-d-1", text: "Focus: 20 minutes of Meditation (Muraqabah) daily", type: QuestType.DAILY },
      { id: "71-m-1", text: "Connect Biosignal device (NeuroSky/MyoWare) to Python", type: QuestType.MAIN },
      { id: "71-m-2", text: "Visualize raw EEG/EMG signals on real-time graph", type: QuestType.MAIN },
      { id: "71-c-1", text: "Explosive High Pull-ups: 3 sets of 10", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 4, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 72,
    title: "THE ARTIFACT",
    theme: "Signal Processing (DSP)",
    duration: "5 Days",
    description: "Separate the signal from the noise.",
    objectives: ["Signal Filtering", "Clean Data"],
    quests: [
      { id: "72-d-1", text: "Knowledge: Read paper on 'Signal Filtering for BCI'", type: QuestType.DAILY },
      { id: "72-m-1", text: "Apply 50Hz Notch Filter & Bandpass Filter (8-30Hz)", type: QuestType.MAIN },
      { id: "72-m-2", text: "Achieve clean graph spikes on blink/flex", type: QuestType.MAIN },
      { id: "72-c-1", text: "Tuck Front Lever: Hold 20s x 4 sets", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 73,
    title: "THE TELEKINETIC",
    theme: "Threshold Logic",
    duration: "4 Days",
    description: "Mind over Matter. Control via thought.",
    objectives: ["Mind Control", "Tahajjud"],
    quests: [
      { id: "73-d-1", text: "Spiritual: Tahajjud - Pray for Nur (Insight)", type: QuestType.DAILY },
      { id: "73-m-1", text: "Connect Biosignal setup to Arduino/ESP32", type: QuestType.MAIN },
      { id: "73-m-2", text: "Logic: If Signal > Threshold, turn on LED", type: QuestType.MAIN },
      { id: "73-c-1", text: "Weighted Pull-ups: 1.25x Bodyweight x 3 reps", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 74,
    title: "THE CLASSIFIER",
    theme: "Machine Learning on Biosignals",
    duration: "6 Days",
    description: "Decode the intent using ML.",
    objectives: ["SVM/Neural Network", "Pattern Recognition"],
    quests: [
      { id: "74-d-1", text: "Finance: Increase SIP contribution by 10%", type: QuestType.DAILY },
      { id: "74-m-1", text: "Record data: 'Relaxed' vs 'Focused' states", type: QuestType.MAIN },
      { id: "74-m-2", text: "Train SVM/Neural Network classifier in Python", type: QuestType.MAIN },
      { id: "74-m-3", text: "Real-time classification: Print state to screen", type: QuestType.MAIN },
      { id: "74-c-1", text: "Pike Pushups: 3 sets of 12 (Feet elevated)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 75,
    title: "MINI-BOSS (THE JEDI)",
    theme: "Bio-Robotics",
    duration: "Weekend Raid",
    description: "Control the Robot with your Body/Mind.",
    objectives: ["Bio-Control", "Muscle Up"],
    quests: [
      { id: "75-b-1", text: "TECH BOSS: Integrate BCI/EMG with Robot", type: QuestType.BOSS },
      { id: "75-b-2", text: "TECH BOSS: Navigate 3m path using biosignals only", type: QuestType.BOSS },
      { id: "75-b-3", text: "PHYSICAL BOSS: 1 Clean Bar Muscle Up OR 15 Strict Pull-ups", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 10 },
    rankUp: "CYBER-KINETIC (RANK A)"
  },
  {
    level: 76,
    title: "THE CROSSOVER",
    theme: "Financial Escape Velocity",
    duration: "Admin Focus",
    description: "Passive Income Milestone.",
    objectives: ["Passive Income", "Burn Rate"],
    quests: [
      { id: "76-d-1", text: "Audit: Calculate your Monthly Burn Rate", type: QuestType.DAILY },
      { id: "76-m-1", text: "Create roadmap for Side Income > 50% Salary", type: QuestType.MAIN },
      { id: "76-m-2", text: "Launch Paid Product (Course/Kit) & Earn ₹10k", type: QuestType.MAIN },
      { id: "76-c-1", text: "Squat: 1.5x Bodyweight x 5 reps", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 10 }
  },
  {
    level: 77,
    title: "THE BLACK BELT MINDSET",
    theme: "Mastery of Violence",
    duration: "1 Month",
    description: "Proficiency in Combat.",
    objectives: ["Martial Arts Rank", "Sparring"],
    quests: [
      { id: "77-d-1", text: "Discipline: Arrive early to Dojo/Gym & Clean mats", type: QuestType.DAILY },
      { id: "77-m-1", text: "Achieve Brown Belt (or advanced rank)", type: QuestType.MAIN },
      { id: "77-m-2", text: "Survive 3 rounds of Shark Tank sparring", type: QuestType.MAIN },
      { id: "77-c-1", text: "Cardio: 10km Run in under 50 minutes", type: QuestType.COMBAT },
    ],
    rewards: { str: 5, int: 0, wis: 0, agi: 5, gld: 0 }
  },
  {
    level: 78,
    title: "THE GLOBAL VILLAGE",
    theme: "International Recognition",
    duration: "5 Days",
    description: "Go Global. Contribute to the world.",
    objectives: ["Open Source", "Language"],
    quests: [
      { id: "78-d-1", text: "Language: Learn 50 words of new language", type: QuestType.DAILY },
      { id: "78-m-1", text: "Contribute to Open Source Repo or Int'l Collab", type: QuestType.MAIN },
      { id: "78-m-2", text: "Get Pull Request (PR) Merged", type: QuestType.MAIN },
      { id: "78-c-1", text: "L-Sit: Hold for 20 seconds", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 79,
    title: "THE LEGACY (WAQF)",
    theme: "Spiritual Permanence",
    duration: "4 Days",
    description: "A system that runs after you die.",
    objectives: ["Sadaqah Jariyah", "Death Reflection"],
    quests: [
      { id: "79-d-1", text: "Reflection: Visit graveyard (20 mins)", type: QuestType.DAILY },
      { id: "79-m-1", text: "Establish a formal Waqf (Endowment)", type: QuestType.MAIN },
      { id: "79-m-2", text: "Complete transaction/planting for Waqf", type: QuestType.MAIN },
      { id: "79-c-1", text: "Active Recovery: Swim 1km", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 10, agi: 0, gld: 0 }
  },
  {
    level: 80,
    title: "BOSS RAID (THE WORLD CLASS)",
    theme: "S-Rank Evolution",
    duration: "1 Week",
    description: "Complete all 3 Boss Challenges. Reach S-Rank.",
    objectives: ["Mind Interface", "Elite Fitness", "Quran Half"],
    quests: [
      { id: "80-b-1", text: "TECH BOSS: Build Mind-Controlled Interface & Demo it", type: QuestType.BOSS },
      { id: "80-b-2", text: "PHYSICAL BOSS: 5 Muscle Ups OR DL 1.8x BW OR Half Marathon", type: QuestType.BOSS },
      { id: "80-b-3", text: "SPIRITUAL BOSS: Memorize 141 Ayahs of Baqarah OR Full Tafseer", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 50 },
    rankUp: "S-RANK (WORLD CLASS)"
  },
  // ARC 9: THE MONARCH'S VESSEL
  {
    level: 81,
    title: "THE DOMAIN (R&D LAB)",
    theme: "Physical Infrastructure",
    duration: "1 Week",
    description: "Establish a professional workspace. The bedroom is no longer enough.",
    objectives: ["Professional Workspace", "Zone 2 Training"],
    quests: [
      { id: "81-d-1", text: "Sleep Hygiene: Pitch black room, 8 hours", type: QuestType.DAILY },
      { id: "81-m-1", text: "Setup Lab: Soldering Stn, 3D Printers, Oscilloscope", type: QuestType.MAIN },
      { id: "81-m-2", text: "Send photo of new 'Iron Man Cave'", type: QuestType.MAIN },
      { id: "81-c-1", text: "Zone 2 Training: 60 mins Cycle/Run (130-140 BPM)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 2, agi: 0, gld: 5 }
  },
  {
    level: 82,
    title: "THE APPRENTICE",
    theme: "Leadership & Delegation",
    duration: "2 Weeks",
    description: "Clone yourself. Delegate tasks.",
    objectives: ["Hire Intern", "Delegate Task"],
    quests: [
      { id: "82-d-1", text: "Social: No 'Tech Talk' at dinner with family", type: QuestType.DAILY },
      { id: "82-m-1", text: "Hire an Intern/Junior Engineer", type: QuestType.MAIN },
      { id: "82-m-2", text: "Delegate a Level 40 task & Guide without touching code", type: QuestType.MAIN },
      { id: "82-c-1", text: "The Brick: 10km Bike + 2km Run immediately", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 5, agi: 0, gld: 0 }
  },
  {
    level: 83,
    title: "THE MOLD",
    theme: "Injection Molding",
    duration: "1 Week",
    description: "Move from 3D Printing to Manufacturing.",
    objectives: ["Design for Moldability", "Swim Tech"],
    quests: [
      { id: "83-d-1", text: "Spiritual: Fast (Dawud or Mon/Thu)", type: QuestType.DAILY },
      { id: "83-m-1", text: "Redesign Product for Injection Molding (Draft Angles)", type: QuestType.MAIN },
      { id: "83-m-2", text: "Run Mold Flow Analysis in CAD", type: QuestType.MAIN },
      { id: "83-c-1", text: "Swim Technique: 500m focus on drag reduction", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 84,
    title: "THE WAR CHEST",
    theme: "Capital Raising",
    duration: "1 Week",
    description: "Fuel for the engine. Raise funds.",
    objectives: ["Government Grant", "Funding"],
    quests: [
      { id: "84-d-1", text: "Finance: Review P&L, cut Zombie Costs", type: QuestType.DAILY },
      { id: "84-m-1", text: "Apply for Gov Grant or Pitch Investors", type: QuestType.MAIN },
      { id: "84-m-2", text: "Allocate ₹1 Lakh+ War Chest for launch", type: QuestType.MAIN },
      { id: "84-c-1", text: "Long Run: 12km endurance", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 5 }
  },
  {
    level: 85,
    title: "MINI-BOSS (THE SPRINT TRIATHLON)",
    theme: "Multi-Disciplinary Endurance",
    duration: "Weekend Raid",
    description: "Prove you are an All-Terrain Vehicle.",
    objectives: ["Sprint Triathlon", "Bio-Telemetry"],
    quests: [
      { id: "85-b-1", text: "TECH BOSS: Record & Analyze Biometrics during race", type: QuestType.BOSS },
      { id: "85-b-2", text: "PHYSICAL BOSS: Sprint Triathlon (750m Swim, 20km Bike, 5km Run)", type: QuestType.BOSS },
      { id: "85-b-3", text: "Target Time: Under 1 Hour 45 Minutes", type: QuestType.BOSS },
    ],
    rewards: { str: 10, int: 0, wis: 0, agi: 10, gld: 0 },
    rankUp: "ELITE (RANK S-)"
  },
  {
    level: 86,
    title: "THE ALGORITHM OF ETHICS",
    theme: "AI Safety & Bias",
    duration: "5 Days",
    description: "Just because you can, doesn't mean you should.",
    objectives: ["Bias Audit", "Ethics Statement"],
    quests: [
      { id: "86-d-1", text: "Spiritual: Read 'Kitab al-Adab' (Book of Manners)", type: QuestType.DAILY },
      { id: "86-m-1", text: "Audit AI models for Bias (Skin tone/Gender)", type: QuestType.MAIN },
      { id: "86-m-2", text: "Retrain model & Publish Ethics Statement", type: QuestType.MAIN },
      { id: "86-c-1", text: "Recovery Swim: 1km slow", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 10, agi: 0, gld: 0 }
  },
  {
    level: 87,
    title: "THE SUPPLY CHAIN",
    theme: "Logistics & Sourcing",
    duration: "5 Days",
    description: "Amateurs talk strategy; professionals talk logistics.",
    objectives: ["BOM Optimization", "Alternative Sourcing"],
    quests: [
      { id: "87-d-1", text: "Networking: Lunch with non-tech person (Lawyer/Accountant)", type: QuestType.DAILY },
      { id: "87-m-1", text: "Find Alternative Suppliers for critical chips", type: QuestType.MAIN },
      { id: "87-m-2", text: "Reduce BOM cost by 10%", type: QuestType.MAIN },
      { id: "87-c-1", text: "Threshold Run: 5km at Race Pace", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 3 }
  },
  {
    level: 88,
    title: "THE AUTOMATON (BUSINESS)",
    theme: "Standard Operating Procedures",
    duration: "1 Week",
    description: "The business runs without you.",
    objectives: ["SOPs", "Detachment"],
    quests: [
      { id: "88-d-1", text: "Detachment: 4-hour block without phone", type: QuestType.DAILY },
      { id: "88-m-1", text: "Write SOPs for Apprentice (Solder, Test, Ship)", type: QuestType.MAIN },
      { id: "88-m-2", text: "Take 2-day vacation; ensure work continues", type: QuestType.MAIN },
      { id: "88-c-1", text: "Long Ride: 40km Cycle", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 5, agi: 0, gld: 0 }
  },
  {
    level: 89,
    title: "THE NIGHT WATCHMAN",
    theme: "Spiritual Apex",
    duration: "10 Days",
    description: "The Monarch draws power from the Unseen.",
    objectives: ["Tahajjud Streak", "Sunnah Diet"],
    quests: [
      { id: "89-d-1", text: "Diet: Eat Sunnah Foods (Dates, Honey, Olive Oil)", type: QuestType.DAILY },
      { id: "89-m-1", text: "Pray Tahajjud every night for 10 days", type: QuestType.MAIN },
      { id: "89-m-2", text: "Ask for Barakah and Legacy impact", type: QuestType.MAIN },
      { id: "89-c-1", text: "Taper Week: Reduce volume by 50%", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 15, agi: 0, gld: 0 }
  },
  {
    level: 90,
    title: "BOSS RAID (THE MONARCH'S VESSEL)",
    theme: "Endurance & Magnum Opus",
    duration: "1 Week",
    description: "Complete all 3 Boss Challenges. Prove your endurance.",
    objectives: ["Magnum Opus Alpha", "Half Ironman", "Wasiyah"],
    quests: [
      { id: "90-b-1", text: "TECH BOSS: Unveil Magnum Opus Prototype (Live Demo)", type: QuestType.BOSS },
      { id: "90-b-2", text: "PHYSICAL BOSS: Ironman 70.3 (1.9k Swim, 90k Bike, 21.1k Run)", type: QuestType.BOSS },
      { id: "90-b-3", text: "SPIRITUAL BOSS: Write Islamic Will (Wasiyah)", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 50 },
    rankUp: "COMMANDER (RANK S)"
  },
  // ARC 10: THE SHADOW MONARCH
  {
    level: 91,
    title: "THE SCALE (MASS PRODUCTION)",
    theme: "Industrial Engineering",
    duration: "2 Weeks",
    description: "Move from 'Batch of 50' to 'Batch of 1,000'.",
    objectives: ["Mass Production", "Leadership"],
    quests: [
      { id: "91-d-1", text: "Leadership: 1-on-1 mentorship meeting with Lead Engineer", type: QuestType.DAILY },
      { id: "91-m-1", text: "Sign contract with Mass Manufacturer", type: QuestType.MAIN },
      { id: "91-m-2", text: "Design Jig and Fixture for automated testing", type: QuestType.MAIN },
      { id: "91-m-3", text: "Watch first unit roll off assembly line", type: QuestType.MAIN },
      { id: "91-c-1", text: "Yoga/Mobility Flow: 30 mins daily", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 10 }
  },
  {
    level: 92,
    title: "THE PATENT (OWNERSHIP)",
    theme: "Intellectual Property Enforcement",
    duration: "Admin Focus",
    description: "Legal defense of your creation.",
    objectives: ["Legal Defense", "Claims"],
    quests: [
      { id: "92-d-1", text: "Charity: Feed 10 people this week", type: QuestType.DAILY },
      { id: "92-m-1", text: "Convert Provisional Patent to Non-Provisional/PCT", type: QuestType.MAIN },
      { id: "92-m-2", text: "Work with Patent Attorney to defend Claims", type: QuestType.MAIN },
      { id: "92-c-1", text: "Swim: 2km non-stop", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 0, agi: 0, gld: 5 }
  },
  {
    level: 93,
    title: "THE KEYNOTE (INFLUENCE)",
    theme: "Public Authority",
    duration: "1 Week",
    description: "Shift the culture.",
    objectives: ["Shift Culture", "Public Speaking"],
    quests: [
      { id: "93-d-1", text: "Reading: Read biography of a great leader", type: QuestType.DAILY },
      { id: "93-m-1", text: "Deliver Keynote Speech at major Tech Conference/TEDx", type: QuestType.MAIN },
      { id: "93-m-2", text: "Upload video & influence next generation", type: QuestType.MAIN },
      { id: "93-c-1", text: "1000 Rep Challenge: Pull/Push/Squat/Lunge mix", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 5, agi: 0, gld: 0 }
  },
  {
    level: 94,
    title: "THE EXIT (FREEDOM)",
    theme: "True Financial Independence",
    duration: "Admin Focus",
    description: "The business runs even if you disappear.",
    objectives: ["Business Autonomy", "Chairman Role"],
    quests: [
      { id: "94-d-1", text: "Family: Take parents/spouse on fully funded vacation", type: QuestType.DAILY },
      { id: "94-m-1", text: "Promote Apprentice to GM/COO", type: QuestType.MAIN },
      { id: "94-m-2", text: "Go offline for 7 days (Business Check)", type: QuestType.MAIN },
      { id: "94-c-1", text: "Deadlift Check: Pull 2x Bodyweight", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 20 }
  },
  {
    level: 95,
    title: "THE MINI-BOSS (HAJJ)",
    theme: "The Ultimate Journey",
    duration: "2-3 Weeks",
    description: "Rebirth. The Pilgrimage.",
    objectives: ["Rebirth", "Disconnect"],
    quests: [
      { id: "95-b-1", text: "SPIRITUAL BOSS: Perform Hajj (Pure earnings, No Tech)", type: QuestType.BOSS },
      { id: "95-b-2", text: "PHYSICAL BOSS: The Walk (10-20km/day in heat)", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 0, wis: 10, agi: 0, gld: 0 } // Spiritual Reset handled implicitly
  },
  {
    level: 96,
    title: "THE ACADEMY (LEGACY)",
    theme: "Institutionalizing Knowledge",
    duration: "Ongoing",
    description: "Create more 'You's.",
    objectives: ["Create Legacy", "Mentorship"],
    quests: [
      { id: "96-d-1", text: "Mentorship: Review student work", type: QuestType.DAILY },
      { id: "96-m-1", text: "Establish Research Fellowship or Academy", type: QuestType.MAIN },
      { id: "96-m-2", text: "Fund 3 students to build inventions", type: QuestType.MAIN },
      { id: "96-c-1", text: "Ironman Maintenance: 3-hour Bike Ride", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 10, agi: 0, gld: 0 }
  },
  {
    level: 97,
    title: "THE OPEN SOURCE (CHARITY)",
    theme: "Zakat of Science",
    duration: "1 Week",
    description: "Give back to the community that raised you.",
    objectives: ["Give Back", "Open Source"],
    quests: [
      { id: "97-d-1", text: "Humility: Clean toilets in own office/lab", type: QuestType.DAILY },
      { id: "97-m-1", text: "Open Source older core technology on GitHub", type: QuestType.MAIN },
      { id: "97-m-2", text: "Achieve 100+ Stars on Repository", type: QuestType.MAIN },
      { id: "97-c-1", text: "Sprint: 100m in under 13 seconds", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 5, wis: 5, agi: 0, gld: 0 }
  },
  {
    level: 98,
    title: "THE GLOBAL DEPLOYMENT",
    theme: "Impact at Scale",
    duration: "1 Month",
    description: "Solve a problem for 10,000+ people.",
    objectives: ["Scale Impact", "Case Study"],
    quests: [
      { id: "98-d-1", text: "Gratitude: Sujood al-Shukr daily", type: QuestType.DAILY },
      { id: "98-m-1", text: "Deploy Magnum Opus in the field (10k+ users)", type: QuestType.MAIN },
      { id: "98-m-2", text: "Document lives changed in News/Case Study", type: QuestType.MAIN },
      { id: "98-c-1", text: "The Murph: 1 mile run, 100 pull, 200 push, 300 squat, 1 mile run (Vest)", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 0 } // Reputation handled via title
  },
  {
    level: 99,
    title: "THE VOID (ITIKAF)",
    theme: "Detachment & Preparation",
    duration: "10 Days",
    description: "Disconnect from the Matrix before the final ascent.",
    objectives: ["Disconnect", "Contentment"],
    quests: [
      { id: "99-d-1", text: "Silence: Speak only for Dhikr or necessity", type: QuestType.DAILY },
      { id: "99-m-1", text: "Perform Itikaf (10 days or 3 days retreat)", type: QuestType.MAIN },
      { id: "99-m-2", text: "Achieve Ridha (Contentment)", type: QuestType.MAIN },
      { id: "99-c-1", text: "Fasting: Maintain muscle mass while fasting", type: QuestType.COMBAT },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 0 }
  },
  {
    level: 100,
    title: "THE FINAL BOSS (THE SHADOW MONARCH)",
    theme: "The Complete Human",
    duration: "Rest of Life",
    description: "Legacy & Eternity.",
    objectives: ["Magnum Opus Live", "Iron Vessel", "Waqf"],
    quests: [
      { id: "100-b-1", text: "TECH BOSS: Magnum Opus is Global Standard (Live)", type: QuestType.BOSS },
      { id: "100-b-2", text: "PHYSICAL BOSS: Iron Vessel (10% BF, 2x DL, 10k Run)", type: QuestType.BOSS },
      { id: "100-b-3", text: "SPIRITUAL BOSS: The Waqf (Sadaqah Jariyah established)", type: QuestType.BOSS },
    ],
    rewards: { str: 0, int: 0, wis: 0, agi: 0, gld: 0 },
    rankUp: "SHADOW MONARCH (S-RANK)"
  }
];

export const INITIAL_STATS: Stats = { str: 5, int: 15, wis: 5, agi: 5, gld: 1 };