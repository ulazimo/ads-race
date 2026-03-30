import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import QuizCard from '../components/QuizCard';
import ProgressBar from '../components/ProgressBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

export default function QuizScreen({ route, navigation }: Props) {
  const { ad } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = ad.questions[currentIndex];
  const isLast = currentIndex === ad.questions.length - 1;

  const advance = useCallback(
    (earnedPoints: number) => {
      const newScore = totalScore + earnedPoints;
      if (isLast) {
        const maxScore = ad.questions.reduce((sum, q) => sum + q.points, 0);
        navigation.replace('Result', {
          score: newScore,
          total: maxScore,
          adTitle: ad.title,
        });
      } else {
        setTotalScore(newScore);
        setCurrentIndex(i => i + 1);
        setSelectedIndex(null);
        setIsAnswered(false);
      }
    },
    [totalScore, isLast, currentIndex]
  );

  function handleSelect(index: number) {
    if (isAnswered) return;
    setSelectedIndex(index);
    setIsAnswered(true);
    const correct = index === question.correctIndex;
    setTimeout(() => advance(correct ? question.points : 0), 1200);
  }

  function handleTimeout() {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedIndex(-1); // nothing selected, just show correct
    setTimeout(() => advance(0), 1200);
  }

  const maxScore = ad.questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.counter}>
            {currentIndex + 1} / {ad.questions.length}
          </Text>
          <Text style={styles.score}>{totalScore} / {maxScore} pts</Text>
        </View>
        <ProgressBar
          key={`${currentIndex}`}
          duration={question.timeoutSeconds}
          onExpired={handleTimeout}
        />
      </View>

      <View style={styles.body}>
        <QuizCard
          questionText={question.text}
          options={question.options}
          selectedIndex={selectedIndex}
          correctIndex={question.correctIndex}
          onSelect={handleSelect}
          disabled={isAnswered}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.adLabel}>{ad.brand} · {ad.title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counter: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  score: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  adLabel: {
    color: '#555',
    fontSize: 12,
  },
});
