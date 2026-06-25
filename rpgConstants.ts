import { RPGItem, EquipSlot, Skill } from './types';

export const RPG_ITEMS: RPGItem[] = [
  // --- WEAPONS ---
  {
    id: 'weapon_rusty_sword',
    name: "Rusty Knight's Sword",
    description: "A standard, worn-out iron sword discarded in a low-rank dungeon. Better than bare hands.",
    slot: EquipSlot.WEAPON,
    statModifiers: { str: 2, agi: 1 },
    rarity: 'COMMON',
    unlockLevel: 1,
    gldCost: 10,
    iconName: 'Sword'
  },
  {
    id: 'weapon_kasaka_fang',
    name: "Kasaka's Venom Fang",
    description: "A dagger crafted from the swamp viper's fang. Coated in paralyzing venom.",
    slot: EquipSlot.WEAPON,
    statModifiers: { str: 8, agi: 5 },
    rarity: 'RARE',
    unlockLevel: 3,
    gldCost: 40,
    iconName: 'Zap'
  },
  {
    id: 'weapon_knight_killer',
    name: "Knight Killer",
    description: "A serrated heavy dagger designed to pierce thick metal armor. Highly effective.",
    slot: EquipSlot.WEAPON,
    statModifiers: { str: 18, agi: 10 },
    rarity: 'EPIC',
    unlockLevel: 6,
    gldCost: 90,
    iconName: 'Sword'
  },
  {
    id: 'weapon_demon_king_dagger',
    name: "Demon King's Dagger",
    description: "A legendary weapon overflowing with white lightning. Traces of the Demon King Baran remain.",
    slot: EquipSlot.WEAPON,
    statModifiers: { str: 35, agi: 20, wis: 10 },
    rarity: 'LEGENDARY',
    unlockLevel: 10,
    gldCost: 250,
    iconName: 'Flame'
  },

  // --- ARMOR ---
  {
    id: 'armor_scavenger_cloth',
    name: "Scavenger's Leather Wraps",
    description: "Lightweight, flexible wraps that offer minimal protection but do not restrict movement.",
    slot: EquipSlot.ARMOR,
    statModifiers: { agi: 3, str: 1 },
    rarity: 'COMMON',
    unlockLevel: 1,
    gldCost: 5,
    iconName: 'Shield'
  },
  {
    id: 'armor_warden_chest',
    name: "Steel Warden Breastplate",
    description: "A heavy chest plate from a dungeon guard. Increases raw durability.",
    slot: EquipSlot.ARMOR,
    statModifiers: { str: 10, wis: 4 },
    rarity: 'RARE',
    unlockLevel: 4,
    gldCost: 50,
    iconName: 'ShieldAlert'
  },
  {
    id: 'armor_monarch_cloak',
    name: "Shadow Monarch's Cloak",
    description: "A flowing cloak of pure darkness, shifting and blending with the shadows of the user.",
    slot: EquipSlot.ARMOR,
    statModifiers: { agi: 18, int: 12, wis: 12 },
    rarity: 'EPIC',
    unlockLevel: 8,
    gldCost: 120,
    iconName: 'Sparkles'
  },

  // --- ACCESSORIES ---
  {
    id: 'acc_slayer_ring',
    name: "Beast Slayer's Ring",
    description: "A ring forged with essence of magical beasts, giving a slight edge in mental concentration.",
    slot: EquipSlot.ACCESSORY,
    statModifiers: { int: 3, agi: 2 },
    rarity: 'UNCOMMON',
    unlockLevel: 2,
    gldCost: 15,
    iconName: 'Activity'
  },
  {
    id: 'acc_warlock_amulet',
    name: "High Warlock's Amulet",
    description: "An amulet containing a swirling purple mana crystal, greatly expanding the user's intelligence.",
    slot: EquipSlot.ACCESSORY,
    statModifiers: { int: 12, wis: 8 },
    rarity: 'RARE',
    unlockLevel: 5,
    gldCost: 65,
    iconName: 'Crown'
  },
  {
    id: 'acc_monarch_ring',
    name: "Overlord's Ring of Power",
    description: "A celestial ring that unleashes hidden potential, harmonizing physical and magical stats.",
    slot: EquipSlot.ACCESSORY,
    statModifiers: { str: 15, int: 15, wis: 15, agi: 15 },
    rarity: 'LEGENDARY',
    unlockLevel: 10,
    gldCost: 200,
    iconName: 'Gem'
  }
];

export const SKILLS: Skill[] = [
  {
    id: 'skill_dash',
    name: "Early Morning Sprint (Dash)",
    description: "Inspired by Fajr Jog/Walk and physical baseline challenges. A quick burst of physical agility and routine consistency. Enhances AGI and STR.",
    type: 'ACTIVE',
    maxLevel: 5,
    reqPlayerLevel: 1,
    costPerLevel: 1,
    statModifiersPerLevel: { agi: 3, str: 1 },
    iconName: 'Wind'
  },
  {
    id: 'skill_will_survive',
    name: "Iron Fajr Fortitude",
    description: "Inspired by waking up at 5:00 AM and Fajr prayer on time. A passive mental shield that hardens the body and strengthens mental discipline. Boosts STR and WIS.",
    type: 'PASSIVE',
    maxLevel: 5,
    reqPlayerLevel: 2,
    costPerLevel: 1,
    statModifiersPerLevel: { str: 4, wis: 2 },
    iconName: 'Shield'
  },
  {
    id: 'skill_bloodlust',
    name: "Deep Work Focus (Bloodlust)",
    description: "Inspired by high-intensity deep work sessions and zero morning social media. Exert an overwhelming focus aura that terrifies distraction, allowing massive productivity blocks. Boosts STR and AGI.",
    type: 'ACTIVE',
    maxLevel: 5,
    reqPlayerLevel: 4,
    costPerLevel: 1,
    statModifiersPerLevel: { str: 5, agi: 2 },
    iconName: 'Eye'
  },
  {
    id: 'skill_longevity',
    name: "MicroPython Core (Longevity)",
    description: "Inspired by clean code, Thonny IDE, and flashing firmware. Passive logical structure that purifies physical fatigue and mental exhaustion. Boosts WIS and INT.",
    type: 'PASSIVE',
    maxLevel: 5,
    reqPlayerLevel: 5,
    costPerLevel: 2,
    statModifiersPerLevel: { wis: 6, int: 3 },
    iconName: 'HeartPulse'
  },
  {
    id: 'skill_stealth',
    name: "Dopamine Detox (Stealth)",
    description: "Inspired by 24h Dopamine Detox and early morning silence. Conceal your presence from cheap dopamine hits, entering an ultra-high awareness state. Boosts AGI and INT.",
    type: 'ACTIVE',
    maxLevel: 5,
    reqPlayerLevel: 6,
    costPerLevel: 2,
    statModifiersPerLevel: { agi: 8, int: 2 },
    iconName: 'EyeOff'
  },
  {
    id: 'skill_vital_strike',
    name: "Sensor Resonance (Vital Strike)",
    description: "Inspired by DHT11 and HC-SR04 ultrasonic sensor integration. Focus all measuring forces and mental processing on the precise point of weakness. Boosts STR and AGI.",
    type: 'ACTIVE',
    maxLevel: 5,
    reqPlayerLevel: 8,
    costPerLevel: 2,
    statModifiersPerLevel: { str: 10, agi: 5 },
    iconName: 'Target'
  },
  {
    id: 'skill_rulers_authority',
    name: "Monarch's Smart Automation",
    description: "Inspired by the S-Rank Smart Fan System and Web Server relay control. Command the ambient world and control physical objects remotely using code and telekinetic force. Boosts INT and WIS.",
    type: 'ACTIVE',
    maxLevel: 5,
    reqPlayerLevel: 10,
    costPerLevel: 3,
    statModifiersPerLevel: { int: 15, wis: 15 },
    iconName: 'Crown'
  }
];
