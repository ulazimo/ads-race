import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  questionText: string;
  options: string[];
  selectedIndex: number | null;
  correctIndex: number;
  onSelect: (index: number) => void;
  disabled: boolean;
}

export default function QuizCard({
  questionText,
  options,
  selectedIndex,
  correctIndex,
  onSelect,
  disabled,
}: Props) {
  function getOptionStyle(index: number) {
    if (selectedIndex === null) return styles.option;
    if (index === correctIndex) return [styles.option, styles.correct];
    if (index === selectedIndex) return [styles.option, styles.wrong];
    return styles.option;
  }

  function getOptionTextStyle(index: number) {
    if (selectedIndex === null) return styles.optionText;
    if (index === correctIndex || index === selectedIndex) return [styles.optionText, styles.optionTextActive];
    return styles.optionText;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{questionText}</Text>
      <View style={styles.options}>
        {options.map((opt, i) => (
          <TouchableOpacity
            key={i}
            style={getOptionStyle(i)}
            onPress={() => !disabled && onSelect(i)}
            disabled={disabled}
            activeOpacity={0.7}
          >
            <Text style={styles.optionLetter}>{String.fromCharCode(65 + i)}</Text>
            <Text style={getOptionTextStyle(i)}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e2e',
    borderRadius: 16,
    padding: 20,
  },
  question: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    marginBottom: 20,
  },
  options: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a3e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#3a3a5e',
    gap: 12,
  },
  correct: {
    backgroundColor: '#1b4332',
    borderColor: '#4CAF50',
  },
  wrong: {
    backgroundColor: '#4a1515',
    borderColor: '#e53935',
  },
  optionLetter: {
    color: '#888',
    fontWeight: '700',
    fontSize: 14,
    width: 20,
    textAlign: 'center',
  },
  optionText: {
    color: '#ccc',
    fontSize: 15,
    flex: 1,
  },
  optionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});
