import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useScore } from '../hooks/useScore';
import { useLeaderboard } from '../hooks/useLeaderboard';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ route, navigation }: Props) {
  const { score, total, adTitle } = route.params;
  const { addScore } = useScore();
  const { addEntry } = useLeaderboard();
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    addScore(score);
  }, []);

  async function handleSave() {
    if (!name.trim()) return;
    await addEntry({
      name: name.trim(),
      score,
      adTitle,
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
          <TouchableOpacity
            style={styles.playAgainButton}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.playAgainText}>Igraj opet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.leaderboardButton}
            onPress={() => navigation.navigate('Leaderboard')}
          >
            <Text style={styles.leaderboardText}>Leaderboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  content: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 32, gap: 10,
  },
  emoji: { fontSize: 52 },
  message: { color: '#fff', fontSize: 28, fontWeight: '800' },
  adTitle: { color: '#666', fontSize: 14 },
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
  saveRow: {
    flexDirection: 'row', width: '100%', gap: 10, marginTop: 4,
  },
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
