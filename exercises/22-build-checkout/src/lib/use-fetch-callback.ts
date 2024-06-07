import { useCallback, useState } from 'react';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
} as const;

export type UseFetchStatus = (typeof Status)[keyof typeof Status];

function useFetchCallback() {
  const [status, setStatus] = useState<UseFetchStatus>(Status.IDLE);
  const [data, setData] = useState();

  const fetchData = useCallback(async (url: string, options?: RequestInit) => {
    setStatus(Status.PENDING);
    const response = await fetch(url, options);

    if (!response.ok) {
      setStatus(Status.REJECTED);
      throw new Error('Failed to fetch data');
    }

    setStatus(Status.RESOLVED);
    const data = await response.json();

    setData(data);

    return data;
  }, []);

  return { fetchData, data, status };
}

export { useFetchCallback, Status };
