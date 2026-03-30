import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Ad } from '../data/ads';

// Na webu Expo koristi baseUrl iz app.json (/ads-race),
// na nativnom uređaju fečujemo sa GitHub Pages direktno.
const BASE =
  Platform.OS === 'web'
    ? ''
    : 'https://ulazimo.github.io/ads-race';

export function useAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE}/ads.json`)
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
