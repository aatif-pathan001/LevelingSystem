import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import config from '../firebase-applet-config.json';

const app = initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
});

// Connect to the specific firestore database ID from AI Studio setup
export const db = config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, config.firestoreDatabaseId)
  : getFirestore(app);

// Helper to generate a random Solo Leveling styled sync code: HUNTER-XXXX-XXXX
export function generateSyncCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous chars
  const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `HUNTER-${part1}-${part2}`;
}

// Save profile state to Firestore
export async function saveProfileToCloud(syncCode: string, state: any): Promise<void> {
  const normalizedCode = syncCode.trim().toUpperCase();
  if (!normalizedCode) return;
  
  const docRef = doc(db, 'player_profiles', normalizedCode);
  await setDoc(docRef, {
    ...state,
    lastSyncedAt: new Date().toISOString()
  });
}

// Load profile state from Firestore
export async function loadProfileFromCloud(syncCode: string): Promise<any | null> {
  const normalizedCode = syncCode.trim().toUpperCase();
  if (!normalizedCode) return null;

  const docRef = doc(db, 'player_profiles', normalizedCode);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data();
  }
  return null;
}
