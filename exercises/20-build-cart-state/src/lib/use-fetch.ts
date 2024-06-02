import { useEffect, useState } from 'react';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
} as const;

type FetchOptions<T> = RequestInit & { initialData: T };

export type UseFetchStatus = (typeof Status)[keyof typeof Status];

function useFetch<T>(url: string, { initialData, ...opts }: FetchOptions<T>) {
  const [status, setStatus] = useState<UseFetchStatus>(Status.IDLE);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let ignore = false;

    setStatus(Status.PENDING);

    fetch(url, opts)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        return response.json();
      })
      .then((data) => {
        if (!ignore) {
          setData(data);
          setStatus(Status.RESOLVED);
        }
      })
      .catch(() => {
        setStatus(Status.REJECTED);
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, status };
}

useFetch;

export { useFetch, Status };
