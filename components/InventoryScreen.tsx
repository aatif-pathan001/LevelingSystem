import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, AlertTriangle } from 'lucide-react';
import { INVENTORY_ITEMS } from '../constants';

interface InventoryScreenProps {
  onComplete: () => void;
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-black p-6 pb-24 text-system-blue font-sans">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="max-w-2xl mx-auto"
      >
        <header className="mb-8 border-b border-system-border pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">PRE-GAME PREPARATION</h1>
          <p className="text-gray-400 font-mono text-sm">To initiate the System, you must acquire the required vessels.</p>
        </header>

        <div className="bg-system-panel border border-system-border p-4 rounded-lg mb-6 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-yellow-500 shrink-0" />
            <div>
              <h3 className="font-bold text-white mb-1">WARNING</h3>
              <p className="text-sm text-gray-400">
                You cannot start Level 1 without these items. Order them from Robu.in, ElectronicsComp, or Amazon. 
                Total cost est: ₹1500 - ₹2000.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {INVENTORY_ITEMS.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-800 rounded-lg"
            >
              <div>
                <h4 className="font-bold text-white">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <span className="text-xs font-mono text-system-gold bg-system-gold/10 px-2 py-1 rounded">
                {item.approxCost}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button 
            onClick={onComplete}
            className="group relative px-8 py-3 bg-system-blue text-black font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 overflow-hidden"
          >
             <span className="relative z-10 flex items-center gap-2">
               I have acquired the items <ChevronRight />
             </span>
             <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default InventoryScreen;