import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, RoundState } from '../navigation/AppNavigator';
import { useAds } from '../hooks/useAds';
import { useScore } from '../hooks/useScore';
import { Ad } from '../data/ads';

const ADS_PER_ROUND = 3;

function pickRandom(ads: Ad[], count: number): Ad[] {
  const shuffled = [...ads].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { totalScore, resetScore } = useScore();
  const { ads, loading, error } = useAds();

  function startGame() {
    const roundAds = pickRandom(ads, Math.min(ADS_PER_ROUND, ads.length));
    const round: RoundState = { ads: roundAds, currentIndex: 0, scores: [] };
    navigation.navigate('WatchAd', { round });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.appName}>AdRace</Text>
        <Text style={styles.tagline}>Gledaj. Zapamti. Pobedi.</Text>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Ukupni score</Text>
          <Text style={styles.scoreValue}>{totalScore}</Text>
          <Text style={styles.scoreUnit}>poena</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : error ? (
          <Text style={styles.errorText}>Greška: {error}</Text>
        ) : (
          <>
            <TouchableOpacity style={styles.playButton} onPress={startGame}>
              <Text style={styles.playButtonText}>Igraj</Text>
            </TouchableOpacity>
            <Text style={styles.adCount}>{ads.length} reklama dostupno</Text>
          </>
        )}

        <TouchableOpacity
          style={styles.leaderboardButton}
          onPress={() => navigation.navigate('Leaderboard')}
        >
          <Text style={styles.leaderboardText}>Leaderboard</Text>
        </TouchableOpacity>

        {totalScore > 0 && (
          <TouchableOpacity onPress={resetScore} style={styles.resetButton}>
            <Text style={styles.resetText}>Resetuj score</Text>
          </TouchableOpacity>
        )}
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
    gap: 16,
  },
  appName: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -1,
  },
  tagline: {
    color: '#666',
    fontSize: 16,
    marginBottom: 16,
  },
  scoreBox: {
    backgroundColor: '#1e1e2e',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 48,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3e',
    marginBottom: 16,
  },
  scoreLabel: {
    color: '#888',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreValue: {
    color: '#4CAF50',
    fontSize: 56,
    fontWeight: '900',
    lineHeight: 64,
  },
  scoreUnit: {
    color: '#666',
    fontSize: 14,
  },
  playButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 64,
    paddingVertical: 18,
    borderRadius: 32,
    width: '100%',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  adCount: {
    color: '#555',
    fontSize: 13,
  },
  resetButton: {
    marginTop: 8,
  },
  resetText: {
    color: '#555',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  leaderboardButton: {
    backgroundColor: '#1e1e2e',
    paddingVertical: 14,
    borderRadius: 28,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  leaderboardText: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#e53935',
    fontSize: 14,
    textAlign: 'center',
  },
});
