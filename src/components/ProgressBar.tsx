import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  duration: number;
  onExpired: () => void;
}

function getColor(progress: number): string {
  if (progress > 0.6) return '#4CAF50';
  if (progress > 0.3) return '#FFA726';
  return '#e53935';
}

export default function ProgressBar({ duration, onExpired }: Props) {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    setProgress(1);
    const endTime = Date.now() + duration * 1000;

    const interval = setInterval(() => {
      const p = Math.max(0, (endTime - Date.now()) / (duration * 1000));
      setProgress(p);
      if (p <= 0) {
        clearInterval(interval);
        onExpired();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <View style={styles.track}>
      <View
        style={[
          styles.bar,
          {
            width: `${Math.round(progress * 100)}%` as any,
            backgroundColor: getColor(progress),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 3,
  },
});
