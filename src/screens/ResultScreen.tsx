import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useScore } from '../hooks/useScore';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ route, navigation }: Props) {
  const { score, total, adTitle } = route.params;
  const { addScore } = useScore();
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  useEffect(() => {
    addScore(score);
  }, []);

  function getEmoji() {
    if (percentage === 100) return '🏆';
    if (percentage >= 70) return '🎉';
    if (percentage >= 40) return '👍';
    return '📺';
  }

  function getMessage() {
    if (percentage === 100) return 'Savršeno!';
    if (percentage >= 70) return 'Odlično!';
    if (percentage >= 40) return 'Dobro!';
    return 'Gledaj pažljivije!';
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{getEmoji()}</Text>
        <Text style={styles.message}>{getMessage()}</Text>
        <Text style={styles.adTitle}>{adTitle}</Text>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreValue}>
            {score}<Text style={styles.total}> / {total}</Text>
          </Text>
          <Text style={styles.scoreLabel}>poena</Text>
        </View>

        <View style={styles.percentageBar}>
          <View style={[styles.percentageFill, { width: `${percentage}%` as any }]} />
        </View>
        <Text style={styles.percentageText}>{percentage}% tačnih odgovora</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.playAgainButton}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.playAgainText}>Igraj opet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.homeText}>Početak</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  emoji: {
    fontSize: 64,
  },
  message: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
  },
  adTitle: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  scoreBox: {
    alignItems: 'center',
    marginBottom: 4,
  },
  scoreValue: {
    color: '#4CAF50',
    fontSize: 52,
    fontWeight: '900',
  },
  total: {
    color: '#555',
    fontSize: 32,
    fontWeight: '400',
  },
  scoreLabel: {
    color: '#666',
    fontSize: 14,
  },
  percentageBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#2a2a3e',
    borderRadius: 4,
    overflow: 'hidden',
  },
  percentageFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  percentageText: {
    color: '#888',
    fontSize: 13,
    marginBottom: 16,
  },
  buttons: {
    width: '100%',
    gap: 10,
    marginTop: 8,
  },
  playAgainButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
  },
  playAgainText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  homeButton: {
    backgroundColor: '#1e1e2e',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  homeText: {
    color: '#aaa',
    fontSize: 17,
    fontWeight: '600',
  },
});
