import React, { useState, useEffect } from 'react';
import { User, Layers, Menu, Terminal, Plus, ListTodo } from 'lucide-react';
import { loadState, saveState, calculateMaxExp } from './utils/storage';
import { PlayerState, Quest, QuestType, QuestAttributes } from './types';
import { LEVELS, QUEST_EXP_MULTIPLIERS } from './constants';
import InventoryScreen from './components/InventoryScreen';
import LevelView from './components/LevelView';
import StatsRadar from './components/StatsRadar';
import QuestItem from './components/QuestItem';

const App = () => {
  const [playerState, setPlayerState] = useState<PlayerState>(loadState());
  const [activeTab, setActiveTab] = useState<'SYSTEM' | 'STATUS'>('SYSTEM');
  const [showLevelUpModal, setShowLevelUpModal] = useState<string | null>(null);
  const [showPlayerLevelUp, setShowPlayerLevelUp] = useState<number | null>(null);
  
  // Custom Quest State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newQuestText, setNewQuestText] = useState('');
  const [newQuestAttributes, setNewQuestAttributes] = useState<QuestAttributes>({
    pi: 1,
    tr: 1,
    sc: 1,
    rc: 1
  });

  useEffect(() => {
    saveState(playerState);
  }, [playerState]);

  const handleQuestToggle = (questId: string, type: QuestType) => {
    setPlayerState(prev => {
      const isCompleted = prev.completedQuests.includes(questId);
      
      // Calculate EXP
      let expValue = 0;

      if (type === QuestType.SIDE) {
        // Find the custom quest to check for specific difficulty
        const customQuest = prev.customQuests.find(q => q.id === questId);
        if (customQuest && customQuest.difficulty) {
           // Formula: Difficulty * 20 * Level
           expValue = Math.round(customQuest.difficulty * 20 * prev.playerLevel);
        } else {
           // Fallback for legacy side quests
           const multiplier = QUEST_EXP_MULTIPLIERS[type] || 0;
           expValue = multiplier * prev.playerLevel;
        }
      } else {
        // Standard quests
        const multiplier = QUEST_EXP_MULTIPLIERS[type] || 0;
        expValue = multiplier * prev.playerLevel;
      }
      
      let newCompleted;
      let newExp = prev.exp;
      let newPlayerLevel = prev.playerLevel;
      let newMaxExp = prev.maxExp;
      let newStats = { ...prev.stats };
      let leveledUp = false;

      if (isCompleted) {
        // Toggle OFF (Undo)
        newCompleted = prev.completedQuests.filter(id => id !== questId);
        newExp = Math.max(0, prev.exp - expValue);
        // We do not de-level the player to avoid complexity with stat rollback
      } else {
        // Toggle ON (Complete)
        newCompleted = [...prev.completedQuests, questId];
        newExp = prev.exp + expValue;
        
        // Level Up Logic
        if (newExp >= prev.maxExp) {
           leveledUp = true;
           newPlayerLevel += 1;
           newExp = newExp - prev.maxExp;
           newMaxExp = calculateMaxExp(newPlayerLevel);
           
           // Grant Stat Bonuses for Player Level Up
           newStats.str += 1;
           newStats.agi += 1;
           newStats.int += 1;
           newStats.wis += 1;
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
        stats: newStats
      };
    });
  };

  const handleLevelComplete = () => {
    const currentLevelData = LEVELS.find(l => l.level === playerState.currentLevel);
    if (!currentLevelData) return;

    const newStats = {
      str: playerState.stats.str + currentLevelData.rewards.str,
      int: playerState.stats.int + currentLevelData.rewards.int,
      wis: playerState.stats.wis + currentLevelData.rewards.wis,
      agi: playerState.stats.agi + currentLevelData.rewards.agi,
      gld: playerState.stats.gld + currentLevelData.rewards.gld,
    };
    
    // Determine rank upgrade
    let newRank = playerState.rank;
    if (currentLevelData.rankUp) {
      newRank = currentLevelData.rankUp;
    }

    setPlayerState(prev => ({
      ...prev,
      currentLevel: prev.currentLevel + 1,
      stats: newStats,
      rank: newRank,
    }));

    setShowLevelUpModal(`STORY LEVEL ${currentLevelData.level} COMPLETE`);
    setTimeout(() => setShowLevelUpModal(null), 3000);
  };

  const handleInventoryComplete = () => {
    setPlayerState(prev => ({
      ...prev,
      inventoryAcquired: true,
      currentLevel: 1 // Start game
    }));
  };

  const handleAddSideQuest = () => {
    if (!newQuestText.trim()) return;
    
    // Calculate Difficulty
    // Formula: 0.4*PI + 0.3*TR + 0.2*SC + 0.1*RC
    const { pi, tr, sc, rc } = newQuestAttributes;
    const difficulty = (0.4 * pi) + (0.3 * tr) + (0.2 * sc) + (0.1 * rc);
    // Round difficulty to 2 decimal places for storage cleanliness
    const roundedDifficulty = Math.round(difficulty * 100) / 100;

    const newQuest: Quest = {
      id: `custom-${Date.now()}`,
      text: newQuestText,
      type: QuestType.SIDE,
      required: false,
      attributes: { ...newQuestAttributes },
      difficulty: roundedDifficulty
    };

    setPlayerState(prev => ({
      ...prev,
      customQuests: [newQuest, ...(prev.customQuests || [])]
    }));
    
    setNewQuestText('');
    setNewQuestAttributes({ pi: 1, tr: 1, sc: 1, rc: 1 });
    setIsAddModalOpen(false);
  };

  const handleDeleteSideQuest = (id: string) => {
    setPlayerState(prev => ({
      ...prev,
      customQuests: prev.customQuests.filter(q => q.id !== id),
      completedQuests: prev.completedQuests.filter(qid => qid !== id) 
    }));
  };

  // Render logic helper for side quests XP
  const getSideQuestExp = (quest: Quest) => {
    if (quest.difficulty) {
       return Math.round(quest.difficulty * 20 * playerState.playerLevel);
    }
    return (QUEST_EXP_MULTIPLIERS[QuestType.SIDE] || 0) * playerState.playerLevel;
  };

  if (!playerState.inventoryAcquired) {
    return <InventoryScreen onComplete={handleInventoryComplete} />;
  }

  // Ensure current level doesn't exceed content
  const displayLevel = Math.min(playerState.currentLevel, LEVELS.length);
  const currentLevelData = LEVELS.find(l => l.level === displayLevel) || LEVELS[LEVELS.length - 1];

  // Calculate Progress for Bar
  const expPercentage = Math.min(100, (playerState.exp / playerState.maxExp) * 100);

  // Helper for attribute sliders
  const AttributeSlider = ({ label, code, value, max, onChange }: { label: string, code: string, value: number, max: number, onChange: (val: number) => void }) => (
    <div className="mb-3">
       <div className="flex justify-between mb-1">
         <label className="text-xs font-mono text-gray-400">{label} ({code})</label>
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
      <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-gray-900 z-40 px-4 py-3 h-20">
         <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-system-blue bg-gray-900 flex items-center justify-center">
                <User className="text-system-blue w-6 h-6" />
              </div>
              <div>
                <h1 className="text-white font-bold leading-none tracking-wider">AATIF</h1>
                <span className="text-xs font-mono text-system-blue">{playerState.rank}</span>
              </div>
            </div>
            <div className="text-right">
                <span className="block text-[10px] text-gray-500 font-mono tracking-widest">PLAYER LEVEL</span>
                <span className="text-2xl font-black text-white font-mono leading-none">{playerState.playerLevel}</span>
            </div>
         </div>
         
         {/* EXP Bar */}
         <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-system-blue shadow-[0_0_10px_#00f0ff] transition-all duration-500 ease-out"
              style={{ width: `${expPercentage}%` }}
            />
         </div>
         <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
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
              onLevelComplete={handleLevelComplete}
              isPreviousLevelComplete={true} 
              playerLevel={playerState.playerLevel}
            />

            {/* Side Quests Section */}
            <div className="mt-8 pt-6 border-t border-gray-900">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-system-blue font-mono text-sm flex items-center gap-2 font-bold tracking-widest">
                    <ListTodo className="w-4 h-4" /> SIDE QUESTS
                  </h3>
                  <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="p-2 rounded bg-system-panel border border-system-border hover:border-system-blue hover:text-system-blue transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
               </div>
               
               <div className="space-y-1">
                 {playerState.customQuests && playerState.customQuests.length > 0 ? (
                    playerState.customQuests.map((quest) => (
                      <QuestItem 
                        key={quest.id} 
                        quest={quest} 
                        isCompleted={playerState.completedQuests.includes(quest.id)}
                        onToggle={handleQuestToggle}
                        onDelete={handleDeleteSideQuest}
                        expReward={getSideQuestExp(quest)}
                      />
                    ))
                 ) : (
                   <div className="text-center py-6 border border-dashed border-gray-900 rounded-lg text-gray-600 text-xs font-mono">
                     NO PENDING QUESTS
                   </div>
                 )}
               </div>
            </div>
          </>
        )}

        {activeTab === 'STATUS' && (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="bg-system-panel border border-system-border p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20">
                  <Terminal size={100} />
                </div>
                <h2 className="text-system-blue font-mono font-bold text-xl mb-6 tracking-widest border-b border-gray-800 pb-2">STATUS</h2>
                
                <StatsRadar stats={playerState.stats} />

                <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                  <div className="bg-black/40 p-3 rounded border border-gray-800">
                    <div className="text-xs text-gray-500 font-mono">STR</div>
                    <div className="text-2xl font-bold text-white">{playerState.stats.str}</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded border border-gray-800">
                    <div className="text-xs text-gray-500 font-mono">AGI</div>
                    <div className="text-2xl font-bold text-white">{playerState.stats.agi}</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded border border-gray-800">
                    <div className="text-xs text-gray-500 font-mono">INT</div>
                    <div className="text-2xl font-bold text-white">{playerState.stats.int}</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded border border-gray-800">
                    <div className="text-xs text-gray-500 font-mono">WIS</div>
                    <div className="text-2xl font-bold text-white">{playerState.stats.wis}</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded border border-gray-800 col-span-2">
                    <div className="text-xs text-gray-500 font-mono">GLD</div>
                    <div className="text-2xl font-bold text-system-gold">{playerState.stats.gld}</div>
                  </div>
                </div>
             </div>

             <div className="bg-system-panel border border-system-border p-6 rounded-xl">
               <h3 className="text-gray-400 font-mono text-sm mb-4">JOB CLASS</h3>
               <p className="text-white font-bold text-lg">NONE</p>
               <p className="text-xs text-gray-500 mt-2">Complete Level 10 to unlock Job Change Quest.</p>
             </div>
          </div>
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
            <span className="text-[10px] font-mono tracking-widest">SYSTEM</span>
          </button>
          
          <button 
             onClick={() => setActiveTab('STATUS')}
             className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'STATUS' ? 'text-system-blue' : 'text-gray-600 hover:text-gray-400'}`}
          >
            <Menu className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-mono tracking-widest">STATUS</span>
          </button>
        </div>
      </nav>

      {/* Story Level Up Modal */}
      {showLevelUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-black border-2 border-system-blue p-8 rounded-lg shadow-[0_0_50px_rgba(0,240,255,0.4)] text-center transform scale-100 animate-bounce-short">
             <h2 className="text-3xl font-black text-system-blue italic tracking-tighter mb-2">SYSTEM ALERT</h2>
             <p className="text-white font-mono text-xl">{showLevelUpModal}</p>
             <div className="mt-4 text-system-gold font-mono text-sm">Stats Increased significantly.</div>
          </div>
        </div>
      )}

      {/* Player Level Up Modal */}
      {showPlayerLevelUp && (
         <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-black/90 border border-system-gold p-6 rounded-lg shadow-[0_0_50px_rgba(255,215,0,0.4)] text-center animate-in zoom-in duration-300">
               <h2 className="text-2xl font-black text-system-gold italic tracking-tighter mb-1">LEVEL UP!</h2>
               <div className="w-full h-px bg-system-gold mb-3 opacity-50"></div>
               <p className="text-white font-mono text-lg">PLAYER LEVEL {showPlayerLevelUp}</p>
               <div className="mt-2 text-system-blue font-mono text-xs">+1 TO ALL ATTRIBUTES</div>
            </div>
         </div>
      )}

      {/* Add Quest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className="w-full max-w-md bg-system-panel border border-system-blue p-6 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <h3 className="text-system-blue font-bold font-mono mb-4 text-lg border-b border-gray-800 pb-2">NEW SIDE QUEST</h3>
              
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

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 p-3 bg-black/40 rounded border border-gray-800">
                 <AttributeSlider label="Physical Intensity" code="PI" value={newQuestAttributes.pi} max={5} 
                   onChange={(val) => setNewQuestAttributes({...newQuestAttributes, pi: val})} />
                 <AttributeSlider label="Time Requirement" code="TR" value={newQuestAttributes.tr} max={5} 
                   onChange={(val) => setNewQuestAttributes({...newQuestAttributes, tr: val})} />
                 <AttributeSlider label="Skill Complexity" code="SC" value={newQuestAttributes.sc} max={5} 
                   onChange={(val) => setNewQuestAttributes({...newQuestAttributes, sc: val})} />
                 <AttributeSlider label="Resource Cost" code="RC" value={newQuestAttributes.rc} max={3} 
                   onChange={(val) => setNewQuestAttributes({...newQuestAttributes, rc: val})} />
                 
                 <div className="col-span-2 mt-2 pt-2 border-t border-gray-800 flex justify-between items-center">
                   <span className="text-xs text-gray-500 font-mono">ESTIMATED DIFFICULTY</span>
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
                  onClick={handleAddSideQuest}
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