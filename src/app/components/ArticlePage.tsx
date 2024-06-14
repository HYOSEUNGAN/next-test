'use Client';

import React, { useTransition } from 'react';
import useFetch from '../hooks/useFetch';

// { id: 1, name: "Item 1", description: "This is the first item" },
type Article = {
  id: number;
  name: string;
  description: string;
};
type itemType = {
  items: Article[];
};

const ArticlePage = () => {
  const { data, loading, error } = useFetch<itemType>(`/api`, 'GET');
  const [isPending, startTransition] = useTransition(); // suspense 컴포넌트 드릴링으로 중첩될때 Transition으로 이전 ui를 저장하여 pending시에 보여줌 =>suspense 생략
  
  return <div>{loading ? <div>Loading...</div> : data?.items.map((article) => article.name)}</div>;
};

export default ArticlePage;
