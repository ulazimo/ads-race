import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useLeaderboard, LeaderboardEntry } from '../hooks/useLeaderboard';

type Props = NativeStackScreenProps<RootStackParamList, 'Leaderboard'>;

function getMedal(index: number) {
  if (index === 0) return '1.';
  if (index === 1) return '2.';
  if (index === 2) return '3.';
  return `${index + 1}.`;
}

function Row({ item, index }: { item: LeaderboardEntry; index: number }) {
  const isTop3 = index < 3;
  return (
    <View style={[styles.row, isTop3 && styles.rowTop3]}>
      <Text style={[styles.rank, isTop3 && styles.rankTop3]}>{getMedal(index)}</Text>
      <View style={styles.rowInfo}>
        <Text style={[styles.name, isTop3 && styles.nameTop3]}>{item.name}</Text>
        <Text style={styles.adTitle}>{item.adTitle}</Text>
      </View>
      <Text style={[styles.score, isTop3 && styles.scoreTop3]}>{item.score} pts</Text>
    </View>
  );
}

export default function LeaderboardScreen({ navigation }: Props) {
  const { entries, clearLeaderboard } = useLeaderboard();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Nazad</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={{ width: 60 }} />
      </View>

      {entries.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🏆</Text>
          <Text style={styles.emptyText}>Nema rezultata</Text>
          <Text style={styles.emptySubtext}>Igraj da se pojaviš na listi!</Text>
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item, index }) => <Row item={item} index={index} />}
          contentContainerStyle={styles.list}
        />
      )}

      {entries.length > 0 && (
        <TouchableOpacity onPress={clearLeaderboard} style={styles.clearButton}>
          <Text style={styles.clearText}>Obriši leaderboard</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backButton: { color: '#4CAF50', fontSize: 16, fontWeight: '600' },
  title: { color: '#fff', fontSize: 22, fontWeight: '800' },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e2e',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  rowTop3: { borderColor: '#4CAF50' },
  rank: { color: '#666', fontSize: 16, fontWeight: '700', width: 32 },
  rankTop3: { color: '#4CAF50' },
  rowInfo: { flex: 1 },
  name: { color: '#ccc', fontSize: 15, fontWeight: '600' },
  nameTop3: { color: '#fff' },
  adTitle: { color: '#555', fontSize: 12, marginTop: 2 },
  score: { color: '#888', fontSize: 16, fontWeight: '700' },
  scoreTop3: { color: '#4CAF50' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyIcon: { fontSize: 48 },
  emptyText: { color: '#fff', fontSize: 20, fontWeight: '700' },
  emptySubtext: { color: '#666', fontSize: 14 },
  clearButton: { alignItems: 'center', paddingVertical: 16 },
  clearText: { color: '#555', fontSize: 13, textDecorationLine: 'underline' },
});
