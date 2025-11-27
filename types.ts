export interface Stats {
  str: number;
  int: number;
  wis: number;
  agi: number;
  gld: number;
}

export enum QuestType {
  DAILY = 'DAILY',
  MAIN = 'MAIN',
  COMBAT = 'COMBAT',
  BOSS = 'BOSS',
  SIDE = 'SIDE'
}

export interface QuestAttributes {
  pi: number; // Physical Intensity (1-5)
  tr: number; // Time Requirement (1-5)
  sc: number; // Skill Complexity (1-5)
  rc: number; // Resource Cost (1-3)
}

export interface Quest {
  id: string;
  text: string;
  type: QuestType;
  required?: boolean;
  attributes?: QuestAttributes;
  difficulty?: number;
}

export interface LevelData {
  level: number;
  title: string;
  theme: string;
  duration: string;
  description: string;
  objectives: string[];
  quests: Quest[];
  rewards: Stats;
  rankUp?: string; // e.g., "RANK D"
}

export interface PlayerState {
  currentLevel: number; // Represents the Story/Content Level (1-10)
  playerLevel: number;  // Represents the RPG Character Level (1-99)
  exp: number;
  maxExp: number;
  completedQuests: string[]; // Array of Quest IDs
  customQuests: Quest[];
  stats: Stats;
  rank: string;
  inventoryAcquired: boolean;
}

export interface InventoryItem {
  name: string;
  description: string;
  approxCost: string;
  mandatory: boolean;
}