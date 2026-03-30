import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';

interface Props {
  videoUri: string | number;
  watchSeconds: number;
  onFinished: () => void;
}

// ── Web: plain HTML5 <video> ──────────────────────────────────────────────
function WebVideoPlayer({ videoUri, watchSeconds, onFinished }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(watchSeconds);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!isPlaying || doneRef.current) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          if (!doneRef.current) { doneRef.current = true; onFinished(); }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying]);

  function handleEnded() {
    if (!doneRef.current) { doneRef.current = true; onFinished(); }
  }

  const src = typeof videoUri === 'string' ? videoUri : '';

  return (
    <View style={styles.container}>
      <video
        src={src}
        autoPlay
        playsInline
        muted={false}
        onPlay={() => setIsPlaying(true)}
        onEnded={handleEnded}
        style={{ width: '100%', maxHeight: '60%', objectFit: 'contain', backgroundColor: '#000' } as any}
      />
      <View style={styles.overlay}>
        <View style={styles.watchingBadge}>
          {!isPlaying ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.watchingText}>Gledaj pažljivo... {secondsLeft}s</Text>
          )}
        </View>
      </View>
    </View>
  );
}

// ── Native: expo-video ────────────────────────────────────────────────────
function NativeVideoPlayer({ videoUri, watchSeconds, onFinished }: Props) {
  const { useVideoPlayer, VideoView } = require('expo-video');
  const [secondsLeft, setSecondsLeft] = useState(watchSeconds);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const doneRef = useRef(false);

  const player = useVideoPlayer(videoUri as any, (p: any) => {
    p.loop = false;
    p.play();
  });

  useEffect(() => {
    const playSub = player.addListener('playingChange', ({ isPlaying: playing }: any) => {
      setIsPlaying(playing);
      if (!playing && player.currentTime > 0 && !doneRef.current) {
        doneRef.current = true;
        onFinished();
      }
    });
    const statusSub = player.addListener('statusChange', ({ status }: any) => {
      if (status === 'error' && !doneRef.current) {
        doneRef.current = true;
        onFinished();
      }
    });
    return () => { playSub.remove(); statusSub.remove(); };
  }, [player]);

  useEffect(() => {
    if (!isPlaying || doneRef.current) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          if (!doneRef.current) { doneRef.current = true; onFinished(); }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="contain"
        nativeControls={false}
      />
      <View style={styles.overlay}>
        <View style={styles.watchingBadge}>
          {!isPlaying ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.watchingText}>Gledaj pažljivo... {secondsLeft}s</Text>
          )}
        </View>
      </View>
    </View>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────
export default function AdVideoPlayer(props: Props) {
  if (Platform.OS === 'web') return <WebVideoPlayer {...props} />;
  return <NativeVideoPlayer {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  overlay: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  watchingBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  watchingText: {
    color: '#aaa',
    fontSize: 14,
  },
});
