import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface FetchResult<T> {
  data: T | null; //data?은 undefined를 허용하지만 null은 허용하지 않는다.
  loading: boolean;
  error: Error | null;
}

const useFetch = <T>(url: string, method:string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const METHOD = method
    const fetchData = async () => {
      try {
        // 일단 get으로 고정
        const response: AxiosResponse<T> = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err as Error);
        // throw new Error(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
