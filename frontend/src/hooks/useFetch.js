import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import apiClient from '../services/apiClient';

function normalizePayload(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return payload;
}

function getErrorMessage(error) {
  if (axios.isCancel(error) || error?.name === 'CanceledError') {
    return null;
  }

  return error?.response?.data?.message ?? error?.message ?? 'Não foi possível carregar os dados.';
}

export default function useFetch(url, options = {}) {
  const { initialData = [], enabled = true } = options;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(Boolean(url && enabled));
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (signal) => {
      if (!url || !enabled) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.get(url, { signal });
        setData(normalizePayload(response.data));
      } catch (requestError) {
        const message = getErrorMessage(requestError);

        if (message) {
          setError(message);
        }
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [enabled, url],
  );

  useEffect(() => {
    const controller = new AbortController();

    Promise.resolve().then(() => {
      if (!controller.signal.aborted) {
        fetchData(controller.signal);
      }
    });

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  return { data, loading, error, refetch: () => fetchData() };
}
