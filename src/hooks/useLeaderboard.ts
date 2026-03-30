import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ads_race_leaderboard';

export interface LeaderboardEntry {
  name: string;
  score: number;
  adTitle: string;
  date: string;
}

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(val => {
      if (val) setEntries(JSON.parse(val));
      setLoaded(true);
    });
  }, []);

  async function addEntry(entry: LeaderboardEntry) {
    const updated = [...entries, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);
    setEntries(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }

  async function clearLeaderboard() {
    setEntries([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  return { entries, addEntry, clearLeaderboard, loaded };
}
