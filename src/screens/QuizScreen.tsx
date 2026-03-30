import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import QuizCard from '../components/QuizCard';
import ProgressBar from '../components/ProgressBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

export default function QuizScreen({ route, navigation }: Props) {
  const { round } = route.params;
  const ad = round.ads[round.currentIndex];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [adScore, setAdScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = ad.questions[currentIndex];
  const isLastQuestion = currentIndex === ad.questions.length - 1;

  const advanceAfterQuestion = useCallback(
    (earnedPoints: number) => {
      const newAdScore = adScore + earnedPoints;

      if (isLastQuestion) {
        // Done with this ad's quiz — go to next ad or result
        const newScores = [...round.scores, newAdScore];
        const nextIndex = round.currentIndex + 1;

        if (nextIndex < round.ads.length) {
          // More ads to go
          navigation.replace('WatchAd', {
            round: { ...round, currentIndex: nextIndex, scores: newScores },
          });
        } else {
          // Round complete
          navigation.replace('Result', {
            round: { ...round, scores: newScores },
          });
        }
      } else {
        setAdScore(newAdScore);
        setCurrentIndex(i => i + 1);
        setSelectedIndex(null);
        setIsAnswered(false);
      }
    },
    [adScore, isLastQuestion, round, currentIndex]
  );

  function handleSelect(index: number) {
    if (isAnswered) return;
    setSelectedIndex(index);
    setIsAnswered(true);
    const correct = index === question.correctIndex;
    setTimeout(() => advanceAfterQuestion(correct ? question.points : 0), 1200);
  }

  function handleTimeout() {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedIndex(-1);
    setTimeout(() => advanceAfterQuestion(0), 1200);
  }

  const maxAdScore = ad.questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.roundLabel}>
            Reklama {round.currentIndex + 1}/{round.ads.length}
          </Text>
          <Text style={styles.counter}>
            Pitanje {currentIndex + 1}/{ad.questions.length}
          </Text>
          <Text style={styles.score}>{adScore}/{maxAdScore}</Text>
        </View>
        <ProgressBar
          key={`${round.currentIndex}-${currentIndex}`}
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
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, gap: 10 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  roundLabel: { color: '#4CAF50', fontSize: 13, fontWeight: '700' },
  counter: { color: '#888', fontSize: 14, fontWeight: '600' },
  score: { color: '#4CAF50', fontSize: 14, fontWeight: '700' },
  body: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  footer: { paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center' },
  adLabel: { color: '#555', fontSize: 12 },
});
