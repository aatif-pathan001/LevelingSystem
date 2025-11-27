import { LevelData, QuestType, InventoryItem, Stats } from './types';

export const INVENTORY_ITEMS: InventoryItem[] = [
  { name: "ESP32 Development Board", description: "The brain. Wi-Fi/Bluetooth enabled.", approxCost: "₹400-600", mandatory: true },
  { name: "Micro USB Cable", description: "Data capable cable for programming.", approxCost: "₹100-200", mandatory: true },
  { name: "Breadboard", description: "Half-size or Full for prototyping.", approxCost: "₹100-200", mandatory: true },
  { name: "Jumper Wires", description: "Male-to-Male, Male-to-Female set.", approxCost: "₹150-250", mandatory: true },
  { name: "DHT11 Sensor", description: "Temperature and Humidity sensor.", approxCost: "₹100-150", mandatory: true },
  { name: "HC-SR04 Sensor", description: "Ultrasonic Distance sensor.", approxCost: "₹80-120", mandatory: true },
  { name: "Output Component Kit", description: "LEDs (RGB), Resistors (220/1k), Piezo Buzzer.", approxCost: "₹100-200", mandatory: true },
  { name: "Software: Thonny IDE", description: "Installed on laptop.", approxCost: "Free", mandatory: true },
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
  }
];

export const INITIAL_STATS: Stats = { str: 5, int: 15, wis: 5, agi: 5, gld: 1 };