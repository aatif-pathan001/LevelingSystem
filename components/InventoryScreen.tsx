import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Check, Package, Lock } from 'lucide-react';
import { INVENTORY_ITEMS } from '../constants';

interface InventoryScreenProps {
  acquiredItems: string[];
  onToggleItem: (name: string) => void;
  currentLevel: number;
}

const InventoryScreen = ({ acquiredItems, onToggleItem, currentLevel }: InventoryScreenProps) => {
  const visibleItems = INVENTORY_ITEMS; // We show all, but some are locked
  const acquiredSet = new Set(acquiredItems);
  
  // Calculate if the mandatory starter kit (Level 1) is fully acquired
  const level1Mandatory = visibleItems.filter(i => i.unlockLevel === 1 && i.mandatory);
  const isStarterKitComplete = level1Mandatory.every(i => acquiredSet.has(i.name));

  return (
    <div className="space-y-6">
      <header className="mb-6 border-b border-system-border pb-4">
        <h2 className="text-system-blue font-mono font-bold text-xl mb-2 tracking-widest flex items-center gap-2">
            <Package className="w-6 h-6" /> EQUIPMENT
        </h2>
        <p className="text-gray-400 font-mono text-sm">Required vessels to initiate system protocols.</p>
      </header>

      {/* Warning for Starter Kit */}
      {!isStarterKitComplete && (
        <div className="bg-system-panel border border-system-danger-50 p-4 rounded-lg" style={{ boxShadow: '0 0 15px rgba(255,0,60,0.1)' }}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-system-danger shrink-0" />
            <div>
              <h3 className="font-bold text-white mb-1">STARTER KIT REQUIRED</h3>
              <p className="text-sm text-gray-400">
                You have not confirmed possession of all basic items. 
                Order them from Robu.in, ElectronicsComp, or Amazon. 
                <br/>Total cost est: ₹1500 - ₹2500.
              </p>
            </div>
          </div>
        </div>
      )}

      {isStarterKitComplete && (
         <div className="bg-system-panel border border-system-blue-50 p-4 rounded-lg flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-system-blue flex items-center justify-center">
                <Check className="text-black font-bold w-5 h-5" />
            </div>
            <div>
                <h3 className="font-bold text-white">BASIC DEPLOYMENT READY</h3>
                <p className="text-xs text-gray-400">Starter inventory verified. Advanced items unlock with level.</p>
            </div>
         </div>
      )}

      <div className="space-y-3">
        {visibleItems.map((item, idx) => {
          const isLocked = currentLevel < item.unlockLevel;
          const isAcquired = acquiredSet.has(item.name);

          return (
            <motion.div 
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: isLocked ? 0.5 : 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => !isLocked && onToggleItem(item.name)}
                className={`flex items-center justify-between p-4 bg-gray-900 bg-opacity-50 border rounded-lg relative overflow-hidden cursor-pointer transition-colors ${
                    isAcquired ? 'border-system-blue border-opacity-50 bg-system-blue-5' : (!isLocked ? 'border-gray-800 hover:border-gray-600' : 'border-gray-800')
                }`}
            >
                {isLocked && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10 backdrop-blur-[1px] cursor-not-allowed">
                         <div className="flex items-center gap-2 text-gray-500 font-mono text-sm border border-gray-700 px-3 py-1 rounded bg-black">
                            <Lock className="w-3 h-3" />
                            <span>UNLOCKS AT LEVEL {item.unlockLevel}</span>
                         </div>
                    </div>
                )}

                <div className="flex items-center flex-1 mr-4">
                  {/* Checkbox Icon */}
                  <div className={`mr-4 w-6 h-6 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isAcquired ? 'bg-system-blue border-system-blue' : 'border-gray-600 bg-black'
                  }`}>
                      {isAcquired && <Check className="w-4 h-4 text-black font-bold" />}
                  </div>

                  <div>
                    <h4 className={`font-bold ${!isLocked && isAcquired ? 'text-gray-300 line-through decoration-system-blue' : 'text-gray-300'}`}>
                        {item.name}
                    </h4>
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs font-mono px-2 py-1 rounded whitespace-nowrap ${
                        !isLocked ? 'text-system-gold bg-system-gold-5' : 'text-gray-600 bg-gray-800'
                    }`}>
                        {item.approxCost}
                    </span>
                    {item.mandatory && !isLocked && !isAcquired && (
                        <span className="text-xxs text-system-danger font-mono uppercase tracking-wider">Required</span>
                    )}
                </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryScreen;