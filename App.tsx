import React, { useState, useEffect } from 'react';
import { User, Layers, Menu, Terminal, Plus, ListTodo, AlertTriangle, RefreshCw, Sun, ShoppingBag } from 'lucide-react';
import { loadState, saveState, calculateMaxExp, DEFAULT_STATE } from './utils/storage';
import { PlayerState, Quest, QuestType, QuestAttributes, Stats, LevelData } from './types';
import { LEVELS, QUEST_EXP_MULTIPLIERS, INVENTORY_ITEMS } from './constants';
import InventoryScreen from './components/InventoryScreen';
import LevelView from './components/LevelView';
import StatsRadar from './components/StatsRadar';
import QuestItem from './components/QuestItem';

const App = () => {
  const [playerState, setPlayerState] = useState<PlayerState>(loadState());
  const [activeTab, setActiveTab] = useState<'SYSTEM' | 'STATUS' | 'INVENTORY'>('SYSTEM');
  const [levelCompleteData, setLevelCompleteData] = useState<LevelData | null>(null);
  const [showPlayerLevelUp, setShowPlayerLevelUp] = useState<number | null>(null);
  
  // Custom Quest State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addQuestType, setAddQuestType] = useState<QuestType>(QuestType.SIDE);
  const [newQuestText, setNewQuestText] = useState('');
  const [newQuestRewardStats, setNewQuestRewardStats] = useState<(keyof Stats)[]>([]);
  const [newQuestAttributes, setNewQuestAttributes] = useState<QuestAttributes>({
    pi: 1,
    tr: 1,
    sc: 1,
    rc: 1
  });

  // Daily Carry Over State
  const [carryOverCandidates, setCarryOverCandidates] = useState<Quest[] | null>(null);
  const [selectedCarryOverIds, setSelectedCarryOverIds] = useState<string[]>([]);

  useEffect(() => {
    saveState(playerState);
  }, [playerState]);

  const handleQuestToggle = (questId: string, type: QuestType) => {
    setPlayerState(prev => {
      const isCompleted = prev.completedQuests.includes(questId);
      
      // Calculate EXP
      let expValue = 0;
      
      // Check for custom quest difficulty first (applies to Custom Daily and Side)
      const customQuest = prev.customQuests.find(q => q.id === questId);

      if (customQuest && customQuest.difficulty) {
           // Formula: Difficulty * 20 * Level
           expValue = Math.round(customQuest.difficulty * 20 * prev.playerLevel);
      } else {
           // Fallback for legacy side quests or standard quests
           const multiplier = QUEST_EXP_MULTIPLIERS[type] || 0;
           expValue = multiplier * prev.playerLevel;
      }
      
      let newCompleted;
      let newExp = prev.exp;
      let newPlayerLevel = prev.playerLevel;
      let newMaxExp = prev.maxExp;
      let newUnallocatedStats = prev.unallocatedStats;
      let newStats = { ...prev.stats };
      let leveledUp = false;

      if (isCompleted) {
        // Toggle OFF (Undo)
        newCompleted = prev.completedQuests.filter(id => id !== questId);
        newExp = Math.max(0, prev.exp - expValue);
        
        // Revert Stat Rewards (Only if they exist on the quest)
        if (customQuest && customQuest.rewardStats) {
             customQuest.rewardStats.forEach(stat => {
                newStats[stat] = Math.max(0, newStats[stat] - 1);
             });
        }
      } else {
        // Toggle ON (Complete)
        newCompleted = [...prev.completedQuests, questId];
        newExp = prev.exp + expValue;
        
        // Apply Stat Rewards (Only if they exist on the quest)
        if (customQuest && customQuest.rewardStats) {
             customQuest.rewardStats.forEach(stat => {
                newStats[stat] += 1;
             });
        }
        
        // Level Up Logic
        if (newExp >= prev.maxExp) {
           leveledUp = true;
           newPlayerLevel += 1;
           newExp = newExp - prev.maxExp;
           newMaxExp = calculateMaxExp(newPlayerLevel);
           
           // Grant Stat Points (3 points per level)
           newUnallocatedStats += 3;
        }
      }
      
      if (leveledUp) {
         setShowPlayerLevelUp(newPlayerLevel);
         setTimeout(() => setShowPlayerLevelUp(null), 3000);
      }

      return { 
        ...prev, 
        completedQuests: newCompleted,
        exp: newExp,
        playerLevel: newPlayerLevel,
        maxExp: newMaxExp,
        unallocatedStats: newUnallocatedStats,
        stats: newStats
      };
    });
  };

  const handleRepeatQuest = (questId: string, type: QuestType) => {
    if (type !== QuestType.DAILY) return;

    setPlayerState(prev => {
      let expValue = 0;
      
      // Check for custom quest difficulty
      const customQuest = prev.customQuests.find(q => q.id === questId);
      if (customQuest && customQuest.difficulty) {
           expValue = Math.round(customQuest.difficulty * 20 * prev.playerLevel);
      } else {
           const multiplier = QUEST_EXP_MULTIPLIERS[QuestType.DAILY] || 0;
           expValue = multiplier * prev.playerLevel;
      }
      
      let newExp = prev.exp + expValue;
      let newPlayerLevel = prev.playerLevel;
      let newMaxExp = prev.maxExp;
      let newUnallocatedStats = prev.unallocatedStats;
      let leveledUp = false;
      
      // Level Up Logic
      if (newExp >= prev.maxExp) {
         leveledUp = true;
         newPlayerLevel += 1;
         newExp = newExp - prev.maxExp;
         newMaxExp = calculateMaxExp(newPlayerLevel);
         
         // Grant Stat Points (3 points per level)
         newUnallocatedStats += 3;
      }
      
      if (leveledUp) {
         setShowPlayerLevelUp(newPlayerLevel);
         setTimeout(() => setShowPlayerLevelUp(null), 3000);
      }

      return { 
        ...prev, 
        exp: newExp,
        playerLevel: newPlayerLevel,
        maxExp: newMaxExp,
        unallocatedStats: newUnallocatedStats
      };
    });
  };

  const handleResetLevelDailies = () => {
    if (!window.confirm("RESET DAILY ROUTINE?\n\nThis will uncheck all completed Daily Quests for the current level.\nConfirm to proceed.")) return;

    setPlayerState(prev => {
        // Ensure we find the correct level data corresponding to what is displayed
        const displayLevelIndex = Math.max(1, Math.min(prev.currentLevel, LEVELS.length));
        const currentLevelData = LEVELS.find(l => l.level === displayLevelIndex);
        
        if (!currentLevelData) return prev;

        const levelDailyIds = currentLevelData.quests
            .filter(q => q.type === QuestType.DAILY)
            .map(q => q.id);

        if (levelDailyIds.length === 0) return prev;

        // Create a set for O(1) lookup
        const levelDailySet = new Set(levelDailyIds);
        
        // Keep only quests that are NOT in the daily set
        const newCompleted = prev.completedQuests.filter(id => !levelDailySet.has(id));

        return {
            ...prev,
            completedQuests: newCompleted
        };
    });
  };

  const handleResetHabits = () => {
    if (!window.confirm("RESET HABITS?\n\nThis will uncheck all completed Habits.\nConfirm to proceed.")) return;

    setPlayerState(prev => {
        const habitIds = prev.customQuests
            .filter(q => q.type === QuestType.DAILY)
            .map(q => q.id);
        
        if (habitIds.length === 0) return prev;
        
        const habitSet = new Set(habitIds);

        const newCompleted = prev.completedQuests.filter(id => !habitSet.has(id));

        return {
            ...prev,
            completedQuests: newCompleted
        };
    });
  };

  const handleLevelComplete = () => {
    const currentLevelData = LEVELS.find(l => l.level === playerState.currentLevel);
    if (!currentLevelData) return;

    const dailyQuests = currentLevelData.quests.filter(q => q.type === QuestType.DAILY);
    
    if (dailyQuests.length > 0) {
        setCarryOverCandidates(dailyQuests);
        setSelectedCarryOverIds(dailyQuests.map(q => q.id));
        return; 
    }

    executeLevelUp();
  };

  const executeLevelUp = (additionalQuests: Quest[] = []) => {
    const currentLevelData = LEVELS.find(l => l.level === playerState.currentLevel);
    if (!currentLevelData) return;

    const newStats = {
      str: playerState.stats.str + currentLevelData.rewards.str,
      int: playerState.stats.int + currentLevelData.rewards.int,
      wis: playerState.stats.wis + currentLevelData.rewards.wis,
      agi: playerState.stats.agi + currentLevelData.rewards.agi,
      gld: playerState.stats.gld + currentLevelData.rewards.gld,
    };
    
    let newRank = playerState.rank;
    if (currentLevelData.rankUp) {
      newRank = currentLevelData.rankUp;
    }

    let newJobClass = playerState.jobClass;
    if (currentLevelData.jobClassUp) {
      newJobClass = currentLevelData.jobClassUp;
    }

    setPlayerState(prev => ({
      ...prev,
      currentLevel: prev.currentLevel + 1,
      stats: newStats,
      rank: newRank,
      jobClass: newJobClass,
      customQuests: [...additionalQuests, ...prev.customQuests]
    }));

    setCarryOverCandidates(null);
    setLevelCompleteData(currentLevelData);
    // Auto close after 5 seconds if not clicked
    setTimeout(() => setLevelCompleteData(null), 5000);
  };

  const confirmCarryOver = () => {
    if (!carryOverCandidates) return;
    const questsToCarry = carryOverCandidates.filter(q => selectedCarryOverIds.includes(q.id));
    const newQuests: Quest[] = questsToCarry.map(q => ({
        ...q,
        id: `habit-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        type: QuestType.DAILY,
    }));
    executeLevelUp(newQuests);
  };

  const handleInventoryToggle = (itemName: string) => {
    setPlayerState(prev => {
        const currentList = prev.acquiredInventory || [];
        const newList = currentList.includes(itemName)
            ? currentList.filter(i => i !== itemName)
            : [...currentList, itemName];
        
        // Auto-update legacy flag if all Level 1 mandatory items are acquired
        const level1Mandatory = INVENTORY_ITEMS.filter(i => i.unlockLevel === 1 && i.mandatory);
        const isLevel1Complete = level1Mandatory.every(i => newList.includes(i.name));

        return {
            ...prev,
            acquiredInventory: newList,
            inventoryAcquired: isLevel1Complete
        };
    });
  };

  const handleAddCustomQuest = () => {
    if (!newQuestText.trim()) return;
    
    const { pi, tr, sc, rc } = newQuestAttributes;
    const difficulty = (0.4 * pi) + (0.3 * tr) + (0.2 * sc) + (0.1 * rc);
    const roundedDifficulty = Math.round(difficulty * 100) / 100;

    const newQuest: Quest = {
      id: `custom-${Date.now()}`,
      text: newQuestText,
      type: addQuestType,
      required: false,
      attributes: { ...newQuestAttributes },
      difficulty: roundedDifficulty,
      // Only attach reward stats for Side Quests to prevent daily farming of permanent stats
      rewardStats: (addQuestType === QuestType.SIDE && newQuestRewardStats.length > 0) ? newQuestRewardStats : undefined
    };

    setPlayerState(prev => ({
      ...prev,
      customQuests: [newQuest, ...(prev.customQuests || [])]
    }));
    
    setNewQuestText('');
    setNewQuestAttributes({ pi: 1, tr: 1, sc: 1, rc: 1 });
    setNewQuestRewardStats([]);
    setIsAddModalOpen(false);
  };

  const handleDeleteCustomQuest = (id: string) => {
    setPlayerState(prev => ({
      ...prev,
      customQuests: prev.customQuests.filter(q => q.id !== id),
      completedQuests: prev.completedQuests.filter(qid => qid !== id) 
    }));
  };

  const handleSystemReset = () => {
    if (window.confirm("SYSTEM ALERT:\n\nAre you sure you want to perform a SYSTEM RESET?\nThis will permanently delete all progress, stats, and quests.\n\nThe system will restart at Level 1.")) {
      // Soft reset to Level 1, inventory logic reset
      const resetState: PlayerState = {
         ...DEFAULT_STATE,
         inventoryAcquired: false,
         acquiredInventory: [],
         currentLevel: 1
      };
      
      setPlayerState(resetState);
      saveState(resetState); // Force immediate save
      setActiveTab('SYSTEM');
    }
  };

  const handleStatIncrease = (stat: keyof Stats) => {
    if (playerState.unallocatedStats <= 0) return;
    if (stat === 'gld') return; 

    setPlayerState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: prev.stats[stat] + 1
      },
      unallocatedStats: prev.unallocatedStats - 1
    }));
  };

  const toggleRewardStatSelection = (stat: keyof Stats) => {
    setNewQuestRewardStats(prev => 
      prev.includes(stat) 
        ? prev.filter(s => s !== stat)
        : [...prev, stat]
    );
  };
  
  const toggleCarryOverSelection = (id: string) => {
      setSelectedCarryOverIds(prev => 
        prev.includes(id)
            ? prev.filter(i => i !== id)
            : [...prev, id]
      );
  };

  const getCustomQuestExp = (quest: Quest) => {
    if (quest.difficulty) {
       return Math.round(quest.difficulty * 20 * playerState.playerLevel);
    }
    return (QUEST_EXP_MULTIPLIERS[quest.type] || 0) * playerState.playerLevel;
  };

  const displayLevel = Math.min(playerState.currentLevel, LEVELS.length);
  const currentLevelData = LEVELS.find(l => l.level === displayLevel) || LEVELS[LEVELS.length - 1];
  const expPercentage = Math.min(100, (playerState.exp / playerState.maxExp) * 100);

  // Derived lists for display
  const habits = playerState.customQuests.filter(q => q.type === QuestType.DAILY);
  const sideQuests = playerState.customQuests.filter(q => q.type === QuestType.SIDE);
  const hasCompletedHabits = habits.some(h => playerState.completedQuests.includes(h.id));

  const AttributeSlider = ({ label, code, value, max, onChange }: { label: string, code: string, value: number, max: number, onChange: (val: number) => void }) => (
    <div className="mb-3">
       <div className="flex justify-between mb-1">
         <label className="text-xxs font-mono text-gray-400">{label} ({code})</label>
         <span className="text-xs font-bold text-system-blue">{value}</span>
       </div>
       <input 
         type="range" 
         min="1" 
         max={max} 
         value={value} 
         onChange={(e) => onChange(parseInt(e.target.value))}
         className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-system-blue"
       />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-system-blue selection:text-black">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-90 backdrop-blur-md border-b border-gray-900 z-40 px-4 py-3 h-20">
         <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-system-blue bg-gray-900 flex items-center justify-center">
                <User className="text-system-blue w-6 h-6" />
              </div>
              <div>
                <h1 className="text-white font-bold leading-none tracking-wider">AATIF</h1>
                <span className="text-xxs font-mono text-system-blue">{playerState.rank}</span>
              </div>
            </div>
            <div className="text-right">
                <span className="block text-xxs text-gray-500 font-mono tracking-widest">PLAYER LEVEL</span>
                <span className="text-2xl font-black text-white font-mono leading-none">{playerState.playerLevel}</span>
            </div>
         </div>
         
         {/* EXP Bar */}
         <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-system-blue transition-all duration-500 ease-out"
              style={{ width: `${expPercentage}%`, boxShadow: '0 0 10px #00f0ff' }}
            />
         </div>
         <div className="flex justify-between text-xxs font-mono text-gray-500 mt-1">
            <span>EXP</span>
            <span>{playerState.exp} / {playerState.maxExp}</span>
         </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-4 pb-24 max-w-lg mx-auto">
        
        {activeTab === 'SYSTEM' && (
          <>
            <LevelView 
              levelData={currentLevelData}
              completedQuests={playerState.completedQuests}
              onQuestToggle={handleQuestToggle}
              onRepeatQuest={handleRepeatQuest}
              onLevelComplete={handleLevelComplete}
              onResetDailies={handleResetLevelDailies}
              isPreviousLevelComplete={true} 
              playerLevel={playerState.playerLevel}
            />

            {/* HABITS SECTION */}
            <div className="mt-8 pt-6 border-t border-gray-900">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-system-blue font-mono text-sm flex items-center gap-2 font-bold tracking-widest">
                      <Sun className="w-4 h-4" /> HABITS
                    </h3>
                    <div className="flex gap-2">
                      {hasCompletedHabits && (
                        <button 
                            onClick={handleResetHabits}
                            className="flex items-center gap-1.5 text-xxs font-mono text-gray-400 hover:text-system-blue transition-colors border border-gray-800 hover:border-system-blue px-2 py-1 rounded bg-black"
                        >
                            <RefreshCw className="w-3 h-3" /> RESET ALL
                        </button>
                      )}
                      <button 
                        onClick={() => { setAddQuestType(QuestType.DAILY); setIsAddModalOpen(true); }}
                        className="p-2 rounded bg-system-panel border border-system-border hover:border-system-blue hover:text-system-blue transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                </div>
                {habits.length > 0 ? (
                  <div className="space-y-1">
                    {habits.map(quest => (
                        <QuestItem 
                            key={quest.id}
                            quest={quest}
                            isCompleted={playerState.completedQuests.includes(quest.id)}
                            onToggle={handleQuestToggle}
                            onRepeat={handleRepeatQuest}
                            onDelete={handleDeleteCustomQuest}
                            expReward={getCustomQuestExp(quest)}
                        />
                    ))}
                  </div>
                ) : (
                   <div className="text-center py-6 border border-dashed border-gray-900 rounded-lg text-gray-600 text-xxs font-mono">
                     NO ACTIVE HABITS
                   </div>
                )}
            </div>

            {/* SIDE QUESTS SECTION */}
            <div className="mt-8 pt-6 border-t border-gray-900">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-system-blue font-mono text-sm flex items-center gap-2 font-bold tracking-widest">
                    <ListTodo className="w-4 h-4" /> SIDE QUESTS
                  </h3>
                  <button 
                    onClick={() => { setAddQuestType(QuestType.SIDE); setIsAddModalOpen(true); }}
                    className="p-2 rounded bg-system-panel border border-system-border hover:border-system-blue hover:text-system-blue transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
               </div>
               
               <div className="space-y-1">
                 {sideQuests.length > 0 ? (
                    sideQuests.map((quest) => (
                      <QuestItem 
                        key={quest.id} 
                        quest={quest} 
                        isCompleted={playerState.completedQuests.includes(quest.id)}
                        onToggle={handleQuestToggle}
                        onDelete={handleDeleteCustomQuest}
                        expReward={getCustomQuestExp(quest)}
                      />
                    ))
                 ) : (
                   <div className="text-center py-6 border border-dashed border-gray-900 rounded-lg text-gray-600 text-xxs font-mono">
                     NO PENDING SIDE QUESTS
                   </div>
                 )}
               </div>
            </div>
          </>
        )}

        {activeTab === 'STATUS' && (
          <div className="space-y-6">
             <div className="bg-system-panel border border-system-border p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20">
                  <Terminal size={100} />
                </div>
                <h2 className="text-system-blue font-mono font-bold text-xl mb-6 tracking-widest border-b border-gray-800 pb-2">STATUS</h2>
                
                <StatsRadar stats={playerState.stats} />

                {playerState.unallocatedStats > 0 && (
                   <div className="mt-4 text-center animate-pulse">
                      <span className="text-system-gold font-mono text-sm border border-system-gold px-3 py-1 rounded">
                        AVAILABLE POINTS: {playerState.unallocatedStats}
                      </span>
                   </div>
                )}

                <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                  <div className="bg-black bg-opacity-40 p-3 rounded border border-gray-800 relative group">
                    <div className="text-xxs text-gray-500 font-mono">STR</div>
                    <div className="text-2xl font-bold text-white">{playerState.stats.str}</div>
                    {playerState.unallocatedStats > 0 && (
                      <button 
                        onClick={() => handleStatIncrease('str')}
                        className="absolute top-1/2 -translate-y-1/2 right-2 bg-system-blue text-black rounded-full w-6 h-6 flex items-center justify-center font-bold hover:bg-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="bg-black bg-opacity-40 p-3 rounded border border-gray-800 relative group">
                    <div className="text-xxs text-gray-500 font-mono">AGI</div>
                    <div className="text-2xl font-bold text-white">{playerState.stats.agi}</div>
                    {playerState.unallocatedStats > 0 && (
                      <button 
                        onClick={() => handleStatIncrease('agi')}
                        className="absolute top-1/2 -translate-y-1/2 right-2 bg-system-blue text-black rounded-full w-6 h-6 flex items-center justify-center font-bold hover:bg-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="bg-black bg-opacity-40 p-3 rounded border border-gray-800 relative group">
                    <div className="text-xxs text-gray-500 font-mono">INT</div>
                    <div className="text-2xl font-bold text-white">{playerState.stats.int}</div>
                    {playerState.unallocatedStats > 0 && (
                      <button 
                        onClick={() => handleStatIncrease('int')}
                        className="absolute top-1/2 -translate-y-1/2 right-2 bg-system-blue text-black rounded-full w-6 h-6 flex items-center justify-center font-bold hover:bg-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="bg-black bg-opacity-40 p-3 rounded border border-gray-800 relative group">
                    <div className="text-xxs text-gray-500 font-mono">WIS</div>
                    <div className="text-2xl font-bold text-white">{playerState.stats.wis}</div>
                     {playerState.unallocatedStats > 0 && (
                      <button 
                        onClick={() => handleStatIncrease('wis')}
                        className="absolute top-1/2 -translate-y-1/2 right-2 bg-system-blue text-black rounded-full w-6 h-6 flex items-center justify-center font-bold hover:bg-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="bg-black bg-opacity-40 p-3 rounded border border-gray-800 col-span-2">
                    <div className="text-xxs text-gray-500 font-mono">GLD</div>
                    <div className="text-2xl font-bold text-system-gold">{playerState.stats.gld}</div>
                  </div>
                </div>
             </div>

             <div className="bg-system-panel border border-system-border p-6 rounded-xl">
               <h3 className="text-gray-400 font-mono text-sm mb-4">JOB CLASS</h3>
               <p className="text-white font-bold text-lg">{playerState.jobClass}</p>
               {playerState.jobClass === 'NONE' && (
                 <p className="text-xxs text-gray-500 mt-2">Complete Level 20 to unlock Job Change Quest.</p>
               )}
             </div>

             <div className="mt-8 pt-6 border-t border-gray-900">
                <button 
                  onClick={handleSystemReset}
                  className="w-full py-4 border border-system-danger-50 text-system-danger font-mono text-sm hover:bg-system-danger-10 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 group"
                >
                  <AlertTriangle className="w-5 h-5 group-hover:animate-pulse" /> SYSTEM RESET
                </button>
             </div>
          </div>
        )}

        {activeTab === 'INVENTORY' && (
            <InventoryScreen 
                acquiredItems={playerState.acquiredInventory}
                onToggleItem={handleInventoryToggle}
                currentLevel={playerState.currentLevel}
            />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-system-panel border-t border-gray-900 pb-safe z-40">
        <div className="flex justify-around items-center h-16">
          <button 
            onClick={() => setActiveTab('SYSTEM')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'SYSTEM' ? 'text-system-blue' : 'text-gray-600 hover:text-gray-400'}`}
          >
            <Layers className="w-6 h-6 mb-1" />
            <span className="text-xxs font-mono tracking-widest">SYSTEM</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('INVENTORY')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'INVENTORY' ? 'text-system-blue' : 'text-gray-600 hover:text-gray-400'}`}
          >
            <ShoppingBag className="w-6 h-6 mb-1" />
            <span className="text-xxs font-mono tracking-widest">INV</span>
          </button>

          <button 
             onClick={() => setActiveTab('STATUS')}
             className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'STATUS' ? 'text-system-blue' : 'text-gray-600 hover:text-gray-400'}`}
          >
            <Menu className="w-6 h-6 mb-1" />
            <span className="text-xxs font-mono tracking-widest">STATUS</span>
          </button>
        </div>
      </nav>

      {/* Story Level Up Modal */}
      {levelCompleteData && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setLevelCompleteData(null)}
        >
          <div className="bg-black border-2 border-system-blue p-8 rounded-lg text-center transform scale-100 animate-bounce-short max-w-sm w-full mx-4" style={{ boxShadow: '0 0 50px rgba(0,240,255,0.4)' }}>
             <h2 className="text-3xl font-black text-system-blue italic tracking-tighter mb-2">SYSTEM NOTIFICATION</h2>
             <p className="text-white font-mono text-lg border-b border-gray-800 pb-4 mb-4">
               LEVEL {levelCompleteData.level} COMPLETE
             </p>
             
             <div className="space-y-2">
                <p className="text-xs text-gray-500 font-mono tracking-widest mb-3">REWARDS ACQUIRED</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {Object.entries(levelCompleteData.rewards).map(([stat, value]) => {
                        const val = value as number;
                        if (val > 0) {
                            return (
                                <div key={stat} className="flex justify-between items-center">
                                    <span className="text-gray-400 font-mono uppercase text-sm">{stat}</span>
                                    <span className="text-system-gold font-bold font-mono">+{val}</span>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
             </div>

             {levelCompleteData.rankUp && (
                 <div className="mt-6 pt-4 border-t border-gray-800">
                    <p className="text-xs text-gray-500 font-mono mb-1">RANK UPDATED</p>
                    <p className="text-xl font-black text-white italic">{levelCompleteData.rankUp}</p>
                 </div>
             )}
             
             <div className="mt-6 text-xxs text-gray-600 font-mono">Tap to dismiss</div>
          </div>
        </div>
      )}

      {/* Player Level Up Modal */}
      {showPlayerLevelUp && (
         <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-black bg-opacity-90 border border-system-gold p-6 rounded-lg text-center animate-in zoom-in duration-300" style={{ boxShadow: '0 0 50px rgba(255,215,0,0.4)' }}>
               <h2 className="text-2xl font-black text-system-gold italic tracking-tighter mb-1">LEVEL UP!</h2>
               <div className="w-full h-px bg-system-gold mb-3 opacity-50"></div>
               <p className="text-white font-mono text-lg">PLAYER LEVEL {showPlayerLevelUp}</p>
               <div className="mt-2 text-system-blue font-mono text-xs">+3 STAT POINTS AVAILABLE</div>
            </div>
         </div>
      )}

      {/* Carry Over Modal */}
      {carryOverCandidates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-md bg-system-panel border-2 border-system-blue p-6 rounded-lg" style={{ boxShadow: '0 0 30px rgba(0,240,255,0.2)' }}>
                <h2 className="text-xl font-black text-system-blue italic tracking-tighter mb-2 text-center">LEVEL COMPLETE</h2>
                <div className="text-center mb-6">
                    <p className="text-white font-mono text-sm mb-2">DAILY QUESTS DETECTED</p>
                    <p className="text-gray-400 text-xs">Select the habits you want to carry over to the next level. They will be added to your Side Quests list.</p>
                </div>
                
                <div className="space-y-2 mb-8 max-h-60 overflow-y-auto pr-2">
                    {carryOverCandidates.map(quest => (
                        <div 
                            key={quest.id} 
                            onClick={() => toggleCarryOverSelection(quest.id)}
                            className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-colors ${
                                selectedCarryOverIds.includes(quest.id)
                                ? 'bg-system-blue-10 border-system-blue'
                                : 'bg-black border-gray-800 hover:border-gray-600'
                            }`}
                        >
                             <div className={`w-5 h-5 border rounded flex items-center justify-center shrink-0 ${
                                 selectedCarryOverIds.includes(quest.id) ? 'bg-system-blue border-system-blue' : 'border-gray-600'
                             }`}>
                                 {selectedCarryOverIds.includes(quest.id) && <User className="w-3 h-3 text-black" />} 
                             </div>
                             <p className="text-sm font-mono text-gray-200">{quest.text}</p>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={confirmCarryOver}
                    className="w-full py-3 bg-system-blue text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded"
                >
                    CONFIRM & ADVANCE
                </button>
            </div>
        </div>
      )}

      {/* Add Quest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className="w-full max-w-md bg-system-panel border border-system-blue p-6 rounded-lg" style={{ boxShadow: '0 0 20px rgba(0,240,255,0.2)' }}>
              <h3 className="text-system-blue font-bold font-mono mb-4 text-lg border-b border-gray-800 pb-2">
                  NEW {addQuestType === QuestType.DAILY ? 'DAILY HABIT' : 'SIDE QUEST'}
              </h3>
              
              <div className="mb-4">
                <input 
                  type="text"
                  autoFocus
                  placeholder="Enter quest description..."
                  value={newQuestText}
                  onChange={(e) => setNewQuestText(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-system-blue focus:outline-none font-mono text-sm"
                />
              </div>

              {/* Reward Selector - Only for Side Quests */}
              {addQuestType === QuestType.SIDE && (
                  <div className="mb-4">
                     <label className="text-xxs text-gray-500 font-mono mb-2 block">REWARD ATTRIBUTES (OPTIONAL)</label>
                     <div className="flex gap-2 flex-wrap">
                        {['str', 'agi', 'int', 'wis', 'gld'].map(stat => (
                           <button 
                              key={stat}
                              onClick={() => toggleRewardStatSelection(stat as keyof Stats)}
                              className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${
                                 newQuestRewardStats.includes(stat as keyof Stats)
                                 ? 'bg-system-blue text-black border-system-blue font-bold' 
                                 : 'bg-black text-gray-400 border-gray-800 hover:border-gray-600'
                              }`}
                              style={newQuestRewardStats.includes(stat as keyof Stats) ? { boxShadow: '0 0 10px rgba(0,240,255,0.4)' } : {}}
                           >
                              {stat.toUpperCase()}
                           </button>
                        ))}
                     </div>
                  </div>
              )}

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 p-3 bg-black bg-opacity-40 rounded border border-gray-800">
                 <AttributeSlider label="Physical Intensity" code="PI" value={newQuestAttributes.pi} max={5} 
                   onChange={(val) => setNewQuestAttributes({...newQuestAttributes, pi: val})} />
                 <AttributeSlider label="Time Requirement" code="TR" value={newQuestAttributes.tr} max={5} 
                   onChange={(val) => setNewQuestAttributes({...newQuestAttributes, tr: val})} />
                 <AttributeSlider label="Skill Complexity" code="SC" value={newQuestAttributes.sc} max={5} 
                   onChange={(val) => setNewQuestAttributes({...newQuestAttributes, sc: val})} />
                 <AttributeSlider label="Resource Cost" code="RC" value={newQuestAttributes.rc} max={3} 
                   onChange={(val) => setNewQuestAttributes({...newQuestAttributes, rc: val})} />
                 
                 <div className="col-span-2 mt-2 pt-2 border-t border-gray-800 flex justify-between items-center">
                   <span className="text-xxs text-gray-500 font-mono">ESTIMATED DIFFICULTY</span>
                   <span className="text-system-gold font-bold font-mono">
                     {((0.4 * newQuestAttributes.pi) + (0.3 * newQuestAttributes.tr) + (0.2 * newQuestAttributes.sc) + (0.1 * newQuestAttributes.rc)).toFixed(2)}
                   </span>
                 </div>
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white font-mono text-sm"
                >
                  CANCEL
                </button>
                <button 
                  onClick={handleAddCustomQuest}
                  className="px-6 py-2 bg-system-blue text-black font-bold rounded font-mono text-sm hover:bg-white transition-colors"
                >
                  CREATE QUEST
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;