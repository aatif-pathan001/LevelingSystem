import { PlayerState, Stats } from '../types';
import { INITIAL_STATS, INVENTORY_ITEMS } from '../constants';

export const STORAGE_KEY = 'solo_leveling_system_v1';

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

export const DEFAULT_STATE: PlayerState = {
  currentLevel: 1, // Default to Level 1 so the app is usable immediately
  playerLevel: 1,
  exp: 0,
  maxExp: calculateMaxExp(1),
  completedQuests: [],
  customQuests: [],
  stats: INITIAL_STATS,
  rank: 'E-RANK (Pending)',
  jobClass: 'NONE',
  inventoryAcquired: false,
  acquiredInventory: [],
  unallocatedStats: 0,
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

    // Migration: ensure customQuests exists and migrate old rewardStat to rewardStats array
    const mergedCustomQuests = (parsed.customQuests || []).map((q: any) => {
        // If old 'rewardStat' exists but 'rewardStats' does not, migrate it
        if (q.rewardStat && !q.rewardStats) {
            return { 
              ...q, 
              rewardStats: [q.rewardStat], 
              rewardStat: undefined // cleanup old property
            };
        }
        return q;
    });

    // Ensure numeric types
    const playerLevel = Number(parsed.playerLevel) || 1;
    const currentLevel = Number(parsed.currentLevel) || 1; // Fallback to 1
    const exp = Number(parsed.exp) || 0;
    const maxExp = calculateMaxExp(playerLevel);
    const unallocatedStats = Number(parsed.unallocatedStats) || 0;

    // Migration: ensure jobClass exists
    const jobClass = parsed.jobClass || 'NONE';
    const inventoryAcquired = parsed.inventoryAcquired === true; // Strict boolean check
    
    // Migration: acquiredInventory
    let acquiredInventory: string[] = Array.isArray(parsed.acquiredInventory) ? parsed.acquiredInventory : [];
    
    // Backward compatibility: if inventoryAcquired was true but acquiredInventory is empty, fill with Level 1 items
    if (inventoryAcquired && acquiredInventory.length === 0) {
        acquiredInventory = INVENTORY_ITEMS.filter(i => i.unlockLevel === 1).map(i => i.name);
    }

    return {
      ...DEFAULT_STATE,
      ...parsed,
      currentLevel,
      playerLevel,
      exp,
      maxExp,
      stats: mergedStats,
      customQuests: mergedCustomQuests,
      unallocatedStats,
      jobClass,
      inventoryAcquired,
      acquiredInventory
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