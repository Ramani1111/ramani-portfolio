import { useState, useEffect, useRef } from 'react';

export function useTyped(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words?.length) {
      setDisplay('');
      return undefined;
    }
    if (wi >= words.length) {
      setWi(0);
      setCi(0);
      setDeleting(false);
      return undefined;
    }
    const word = words[wi];
    const delay = deleting ? speed / 2 : speed;
    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, ci + 1));
        if (ci + 1 === word.length) setTimeout(() => setDeleting(true), pause);
        else setCi(ci + 1);
      } else {
        setDisplay(word.slice(0, ci - 1));
        if (ci - 1 === 0) {
          setDeleting(false);
          setWi((wi + 1) % words.length);
          setCi(0);
        } else setCi(ci - 1);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [ci, deleting, wi, words, speed, pause]);

  return display;
}

export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function usePortfolioData() {
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const STORAGE_KEY = 'ramani_portfolio_data_v1';
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setData(JSON.parse(raw));
      }
    } catch (e) {
      console.error('Failed to load portfolio data:', e);
    }
  }, [refresh]);

  useEffect(() => {
    const handleStorageChange = () => {
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { data, refresh: () => setRefresh(r => r + 1) };
}
