import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useScore } from '../hooks/useScore';
import { useLeaderboard } from '../hooks/useLeaderboard';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ route, navigation }: Props) {
  const { round } = route.params;
  const { addScore } = useScore();
  const { addEntry } = useLeaderboard();
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  const totalScore = round.scores.reduce((s, v) => s + v, 0);
  const maxScore = round.ads.reduce(
    (s, ad) => s + ad.questions.reduce((qs, q) => qs + q.points, 0),
    0
  );
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  useEffect(() => {
    addScore(totalScore);
  }, []);

  async function handleSave() {
    if (!name.trim()) return;
    const adNames = round.ads.map(a => a.brand).join(', ');
    await addEntry({
      name: name.trim(),
      score: totalScore,
      adTitle: adNames,
      date: new Date().toISOString().split('T')[0],
    });
    setSaved(true);
  }

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
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.emoji}>{getEmoji()}</Text>
        <Text style={styles.message}>{getMessage()}</Text>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreValue}>
            {totalScore}<Text style={styles.total}> / {maxScore}</Text>
          </Text>
          <Text style={styles.scoreLabel}>ukupno poena</Text>
        </View>

        <View style={styles.percentageBar}>
          <View style={[styles.percentageFill, { width: `${percentage}%` as any }]} />
        </View>
        <Text style={styles.percentageText}>{percentage}% tačnih odgovora</Text>

        {/* Breakdown per ad */}
        <View style={styles.breakdown}>
          {round.ads.map((ad, i) => {
            const adMax = ad.questions.reduce((s, q) => s + q.points, 0);
            return (
              <View key={ad.id} style={styles.breakdownRow}>
                <Text style={styles.breakdownBrand}>{ad.brand}</Text>
                <Text style={styles.breakdownScore}>
                  {round.scores[i] ?? 0} / {adMax}
                </Text>
              </View>
            );
          })}
        </View>

        {!saved ? (
          <View style={styles.saveRow}>
            <TextInput
              style={styles.nameInput}
              placeholder="Tvoje ime"
              placeholderTextColor="#555"
              value={name}
              onChangeText={setName}
              maxLength={20}
            />
            <TouchableOpacity
              style={[styles.saveButton, !name.trim() && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={!name.trim()}
            >
              <Text style={styles.saveText}>Sačuvaj</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.savedText}>Sačuvano na leaderboard!</Text>
        )}

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.playAgainButton} onPress={() => navigation.popToTop()}>
            <Text style={styles.playAgainText}>Igraj opet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.leaderboardButton}
            onPress={() => navigation.navigate('Leaderboard')}
          >
            <Text style={styles.leaderboardText}>Leaderboard</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  content: {
    flexGrow: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 32, paddingVertical: 24, gap: 10,
  },
  emoji: { fontSize: 52 },
  message: { color: '#fff', fontSize: 28, fontWeight: '800' },
  scoreBox: { alignItems: 'center', marginBottom: 4 },
  scoreValue: { color: '#4CAF50', fontSize: 48, fontWeight: '900' },
  total: { color: '#555', fontSize: 28, fontWeight: '400' },
  scoreLabel: { color: '#666', fontSize: 14 },
  percentageBar: {
    width: '100%', height: 8, backgroundColor: '#2a2a3e',
    borderRadius: 4, overflow: 'hidden',
  },
  percentageFill: { height: '100%', backgroundColor: '#4CAF50', borderRadius: 4 },
  percentageText: { color: '#888', fontSize: 13 },
  breakdown: {
    width: '100%', backgroundColor: '#1e1e2e', borderRadius: 12,
    padding: 14, gap: 8, borderWidth: 1, borderColor: '#2a2a3e',
  },
  breakdownRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  breakdownBrand: { color: '#ccc', fontSize: 14, fontWeight: '600' },
  breakdownScore: { color: '#4CAF50', fontSize: 14, fontWeight: '700' },
  saveRow: { flexDirection: 'row', width: '100%', gap: 10, marginTop: 4 },
  nameInput: {
    flex: 1, backgroundColor: '#1e1e2e', borderRadius: 12,
    padding: 14, color: '#fff', fontSize: 15,
    borderWidth: 1, borderColor: '#2a2a3e',
  },
  saveButton: {
    backgroundColor: '#4CAF50', borderRadius: 12,
    paddingHorizontal: 20, justifyContent: 'center',
  },
  saveButtonDisabled: { opacity: 0.4 },
  saveText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  savedText: { color: '#4CAF50', fontSize: 14, fontWeight: '600' },
  buttons: { width: '100%', gap: 10, marginTop: 8 },
  playAgainButton: {
    backgroundColor: '#4CAF50', paddingVertical: 16,
    borderRadius: 28, alignItems: 'center',
  },
  playAgainText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  leaderboardButton: {
    backgroundColor: '#1e1e2e', paddingVertical: 16,
    borderRadius: 28, alignItems: 'center',
    borderWidth: 1, borderColor: '#2a2a3e',
  },
  leaderboardText: { color: '#aaa', fontSize: 17, fontWeight: '600' },
});
