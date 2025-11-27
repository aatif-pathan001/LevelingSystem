import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Award } from 'lucide-react';
import { LevelData, QuestType } from '../types';
import { QUEST_EXP_MULTIPLIERS } from '../constants';
import QuestItem from './QuestItem';

interface LevelViewProps {
  levelData: LevelData;
  completedQuests: string[];
  onQuestToggle: (id: string, type: QuestType) => void;
  onLevelComplete: () => void;
  isPreviousLevelComplete: boolean;
  playerLevel: number;
}

const LevelView: React.FC<LevelViewProps> = ({ 
  levelData, 
  completedQuests, 
  onQuestToggle, 
  onLevelComplete,
  isPreviousLevelComplete,
  playerLevel
}) => {
  // Logic to check completion
  const requiredQuests = levelData.quests.map(q => q.id);
  const isLevelComplete = requiredQuests.every(id => completedQuests.includes(id));

  if (!isPreviousLevelComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
        <Lock className="w-16 h-16 mb-4 opacity-50" />
        <h2 className="text-xl font-mono uppercase tracking-widest">Level Locked</h2>
        <p className="text-sm">Complete previous level to access.</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
       {/* Header Image/Banner Area */}
       <div className="relative h-32 w-full overflow-hidden rounded-lg mb-6 border border-system-border bg-system-panel group">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
        <img 
          src={`https://picsum.photos/seed/level${levelData.level}/800/200`} 
          alt="Level Banner" 
          className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
        />
        <div className="absolute bottom-3 left-4 z-20">
          <h2 className="text-3xl font-black text-white tracking-tighter italic">LEVEL {levelData.level}</h2>
          <p className="text-system-blue font-mono text-xs uppercase tracking-widest">{levelData.title}</p>
        </div>
      </div>

      {/* Info Panel */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-start">
           <div>
             <h3 className="text-gray-400 text-xs font-mono mb-1">THEME</h3>
             <p className="text-white font-sans text-lg">{levelData.theme}</p>
           </div>
           <div className="text-right">
             <h3 className="text-gray-400 text-xs font-mono mb-1">DURATION</h3>
             <p className="text-system-gold font-sans">{levelData.duration}</p>
           </div>
        </div>
        <div className="bg-system-panel/50 p-3 rounded border border-gray-800">
          <p className="text-sm text-gray-300 leading-relaxed">
            {levelData.description}
          </p>
        </div>
      </div>

      {/* Quest List */}
      <div className="mb-8">
        <h3 className="text-system-blue font-mono text-sm mb-4 border-b border-gray-800 pb-2 flex items-center gap-2">
          <Award className="w-4 h-4" /> QUESTS
        </h3>
        <div className="space-y-1">
          {levelData.quests.map((quest) => (
            <QuestItem 
              key={quest.id} 
              quest={quest} 
              isCompleted={completedQuests.includes(quest.id)}
              onToggle={onQuestToggle}
              expReward={(QUEST_EXP_MULTIPLIERS[quest.type] || 0) * playerLevel}
            />
          ))}
        </div>
      </div>

      {/* Completion Button */}
      <AnimatePresence>
        {isLevelComplete && (
           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-24 left-0 right-0 px-6 flex justify-center z-50 pointer-events-none" // pointer-events-none to let click through to button
           >
             <button 
              onClick={onLevelComplete}
              className="pointer-events-auto bg-system-blue text-black font-black text-xl py-4 px-12 rounded shadow-[0_0_30px_rgba(0,240,255,0.6)] animate-pulse-slow hover:scale-105 transition-transform uppercase"
             >
               COMPLETE LEVEL {levelData.level}
             </button>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LevelView;