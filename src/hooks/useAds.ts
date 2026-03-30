import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Ad } from '../data/ads';

const ADS_URL =
  Platform.OS === 'web'
    ? 'ads.json'  // relativni path — radi sa bilo kojim baseUrl
    : 'https://ulazimo.github.io/ads-race/ads.json';

export function useAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(ADS_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Ad[]) => {
        setAds(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { ads, loading, error };
}
