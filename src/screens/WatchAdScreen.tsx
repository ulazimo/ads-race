import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import AdVideoPlayer from '../components/AdVideoPlayer';

type Props = NativeStackScreenProps<RootStackParamList, 'WatchAd'>;

export default function WatchAdScreen({ route, navigation }: Props) {
  const { round } = route.params;
  const ad = round.ads[round.currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.roundBadge}>
          {round.currentIndex + 1} / {round.ads.length}
        </Text>
        <View>
          <Text style={styles.brand}>{ad.brand}</Text>
          <Text style={styles.title}>{ad.title}</Text>
        </View>
      </View>
      <AdVideoPlayer
        videoUri={ad.videoUri}
        watchSeconds={ad.watchSeconds}
        onFinished={() => navigation.replace('Quiz', { round })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8,
  },
  roundBadge: {
    color: '#4CAF50', fontSize: 13, fontWeight: '700',
    backgroundColor: 'rgba(76,175,80,0.15)', paddingHorizontal: 10,
    paddingVertical: 4, borderRadius: 10, overflow: 'hidden',
  },
  brand: { color: '#888', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  title: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
