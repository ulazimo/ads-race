import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ads_race_total_score';

export function useScore() {
  const [totalScore, setTotalScore] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(val => {
      if (val !== null) setTotalScore(parseInt(val, 10));
      setLoaded(true);
    });
  }, []);

  async function addScore(points: number) {
    const newScore = totalScore + points;
    setTotalScore(newScore);
    await AsyncStorage.setItem(STORAGE_KEY, String(newScore));
  }

  async function resetScore() {
    setTotalScore(0);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  return { totalScore, addScore, resetScore, loaded };
}
