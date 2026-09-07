import { useEffect, useState } from 'react';

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function useApiCollection(endpoint, fallback) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const response = await fetch(`${API_URL}/${endpoint}`);
        const result = await response.json();
        if (isMounted && Array.isArray(result) && result.length > 0) {
          setData(result);
        }
      } catch (error) {
        console.error(`Failed to load ${endpoint}:`, error);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return data;
}

export function useApiObject(endpoint, fallback) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const response = await fetch(`${API_URL}/${endpoint}`);
        const result = await response.json();
        if (isMounted && result && Object.keys(result).length > 0) {
          setData((current) => ({ ...current, ...result }));
        }
      } catch (error) {
        console.error(`Failed to load ${endpoint}:`, error);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return data;
}
