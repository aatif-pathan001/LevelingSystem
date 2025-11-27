import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sword, Book, Sun, Skull, ListTodo, X } from 'lucide-react';
import { Quest, QuestType } from '../types';

interface QuestItemProps {
  quest: Quest;
  isCompleted: boolean;
  onToggle: (id: string, type: QuestType) => void;
  onDelete?: (id: string) => void;
  expReward: number;
}

const QuestItem: React.FC<QuestItemProps> = ({ quest, isCompleted, onToggle, onDelete, expReward }) => {
  const getIcon = () => {
    switch (quest.type) {
      case QuestType.COMBAT: return <Sword className="w-4 h-4 text-red-500" />;
      case QuestType.DAILY: return <Sun className="w-4 h-4 text-yellow-500" />;
      case QuestType.MAIN: return <Book className="w-4 h-4 text-blue-500" />;
      case QuestType.BOSS: return <Skull className="w-4 h-4 text-purple-500" />;
      case QuestType.SIDE: return <ListTodo className="w-4 h-4 text-green-500" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  const getBorderColor = () => {
     switch (quest.type) {
      case QuestType.BOSS: return 'border-purple-900/50 bg-purple-900/10';
      case QuestType.COMBAT: return 'border-red-900/50 bg-red-900/10';
      case QuestType.SIDE: return 'border-green-900/30 bg-green-900/5';
      default: return 'border-system-border bg-system-panel';
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative flex items-center p-4 mb-3 border rounded-lg cursor-pointer transition-all ${getBorderColor()} ${isCompleted ? 'opacity-60' : 'hover:border-system-blue/50'}`}
      onClick={() => onToggle(quest.id, quest.type)}
    >
      <div className={`flex items-center justify-center w-6 h-6 mr-4 border-2 rounded shrink-0 ${isCompleted ? 'bg-system-blue border-system-blue' : 'border-gray-600'}`}>
        {isCompleted && <Check className="w-4 h-4 text-black font-bold" />}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {getIcon()}
          <span className={`text-xs font-bold tracking-wider ${isCompleted ? 'text-gray-500' : 'text-gray-400'}`}>
            [{quest.type}]
          </span>
          {!isCompleted && (
             <span className="text-[10px] font-mono text-system-blue border border-system-blue/30 px-1 rounded bg-system-blue/5">
               +{expReward} EXP
             </span>
          )}
        </div>
        <p className={`font-mono text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
          {quest.text}
        </p>
      </div>

      {onDelete && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(quest.id);
          }}
          className="absolute top-2 right-2 p-1 text-gray-600 hover:text-red-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

export default QuestItem;