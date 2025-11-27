import { PlayerState, Stats } from '../types';
import { INITIAL_STATS } from '../constants';

const STORAGE_KEY = 'solo_leveling_system_v1';

export const calculateMaxExp = (level: number): number => {
  let val = 0;
  if (level <= 5) {
    // Formula for Level 1-5: 25*(Level)^2 + 15*(Level)
    val = 25 * Math.pow(level, 2) + 15 * level;
  } else {
    // Formula for Level 6+: 25*(Level)^2 + 0.9^(Level - 1)
    val = 25 * Math.pow(level, 2) + Math.pow(0.9, level - 1);
  }
  // Round to nearest tens
  return Math.round(val / 10) * 10;
};

const DEFAULT_STATE: PlayerState = {
  currentLevel: 0, // 0 means inventory check
  playerLevel: 1,
  exp: 0,
  maxExp: calculateMaxExp(1),
  completedQuests: [],
  customQuests: [],
  stats: INITIAL_STATS,
  rank: 'E-RANK (Pending)',
  inventoryAcquired: false,
};

export const loadState = (): PlayerState => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return DEFAULT_STATE;
    const parsed = JSON.parse(serialized);
    
    // Migration: ensure new stats properties exist if loading old data
    const mergedStats = {
      ...DEFAULT_STATE.stats,
      ...(parsed.stats || {})
    };

    // Migration: ensure customQuests exists
    const mergedCustomQuests = parsed.customQuests || [];

    // Migration: ensure new EXP fields exist and recalculate maxExp based on new formula
    const playerLevel = parsed.playerLevel || 1;
    const exp = parsed.exp !== undefined ? parsed.exp : 0;
    const maxExp = calculateMaxExp(playerLevel);

    return {
      ...DEFAULT_STATE,
      ...parsed,
      playerLevel,
      exp,
      maxExp,
      stats: mergedStats,
      customQuests: mergedCustomQuests
    };
  } catch (e) {
    console.error("Failed to load state", e);
    return DEFAULT_STATE;
  }
};

export const saveState = (state: PlayerState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state", e);
  }
};

export const calculateStats = (base: Stats, levelsCompleted: number, levelData: any[]): Stats => {
    // Re-calculate stats based on completed levels to ensure consistency
    let newStats = { ...base };
    return newStats;
}