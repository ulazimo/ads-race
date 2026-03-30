import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import AdVideoPlayer from '../components/AdVideoPlayer';

type Props = NativeStackScreenProps<RootStackParamList, 'WatchAd'>;

export default function WatchAdScreen({ route, navigation }: Props) {
  const { ad } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>{ad.brand}</Text>
        <Text style={styles.title}>{ad.title}</Text>
      </View>
      <AdVideoPlayer
        videoUri={ad.videoUri}
        watchSeconds={ad.watchSeconds}
        onFinished={() => navigation.replace('Quiz', { ad })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  brand: {
    color: '#888',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
