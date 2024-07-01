'use Client';

import React, { Suspense, startTransition, useDeferredValue, useEffect, useState, useTransition } from 'react'

// 리액트 18로 업데이트는 안할예정입니다. (개발 중에 테스트로 시도해봤지만 여러 라이브러리 호환 문제로 미룸 + 귀찮 ..ㅎ, 교육쪽이라 이벤트 페이지 폭탄 ㅎ)
// 그래서 간단하게 18 버전에 간단한 설명과 좋은 예시를 해외 글에서 참조해서 코드 설명을 할 예정입니다

// Automatic Batching : 여러 상태 업데이트를 단일 리렌더링으로 그룹화하여 성능을 향상시킵니다.
// Concurrent Feeture : 자바스크립트 싱글 스레드라는 한계로 여러 작업을 작은 단위로 나눠 우선순위를 통해 동시 작업은 아니지만 빠른 전환으로 UX를 개선시킵니다.
// New hooks : useTransition, useDeferredValue, useOpaqueIdentifier 등 ...

// 그 중 가장 핵심적인 Concurrent Feeture를 설명하겠습니다.
// useTransition hook과 useDeferredValue hook을 사용하여 비동기 작업을 처리할 수 있습니다.

// 사례들
// 데이터 로딩 및 성능 최적화: 대용량 데이터의 렌더링이 필요한 경우, 데이터를 비동기적으로 미리 가져와서 화면에 표시하기 전에 준비할 수 있습니다. 이는 사용자가 기다리는 시간을 최소화하고, 사용자 경험을 부드럽게 만드는 데 도움이 됩니다.
// 인피니트 스크롤링: 인피니트 스크롤링은 페이지를 스크롤할 때 추가적인 데이터를 비동기적으로 렌더링하여 사용자가 스크롤할 때마다 새로운 컨텐츠가 자연스럽게 로드되도록 합니다.
// 실시간 업데이트: 실시간 데이터 업데이트가 필요한 경우, 새로운 데이터가 도착할 때마다 비동기적으로 UI를 업데이트하여 실시간으로 변경 사항을 반영할 수 있습니다.
// 사용자 입력 응답: 사용자 입력에 따라 빠르게 반응할 수 있도록 비동기적으로 UI 상태를 업데이트하여 사용자 경험을 개선할 수 있습니다. 예를 들어, 자동 완성 기능이나 폼 입력 후 유효성 검사 등이 있습니다.
// UI 응답성 향상: 비동기적인 작업을 통해 UI 렌더링을 지연시키지 않고, 동시에 여러 작업을 처리하여 UI 응답성을 높이는 데 기여할 수 있습니다.

// 큰 프로젝트나 실시간 데이터를 다루는 프로젝트에서는 매우 유용하게 사용할 수 있을 것 같습니다.

const React18:React.FC = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading cards...</div>}>
        <Card text="Card 1 text" delay={1000} />
        <Card text="Card 2 text" delay={2000} />
      </Suspense>
    </div>
  )

}

export default React18


const Card:React.FC<CardProps> = ({ delay, text }) => {
  const [isPengding, startTransition] = useTransition();
  const [isPengding2, startTransition2] = useTransition();

  const [content, setContent] = useState('Loading...');
  const [arr, setArr] = useState<ArrType>(['Loading...']);

  const deferredValue = useDeferredValue(content)

  // Transition마다 우선순위가 존재하며 불필요한 렌더링은 건너뛰고 마지막 상태만 반영한다.
  // 비동기처리되는 작업에서 렌더링을 뒤로 미루는 작업이나 텍스트 입력시 렌더링을 뒤로 미루는 작업에 사용된다. # without blocking the UI #

  useEffect(() => {
    let isMounted = true;
    fetchTextWithDelay(text, delay).then((result) => {
      if (isMounted) {
        // 렌더링 우선순위를 미룸 (지연함수)
        // 여기서 추가적으로 보안작업이나 다른 작업을 할 수 있다.
        // 이를 통해 사용자는 UI가 멈추지 않고 부드럽게 동작하는 것을 경험할 수 있습니다​ 
        // ‘debounce’와 ‘throttle’을 사용 안해도  Blocking Rendering 가능합니다.
        // 또한 autobatching과 동시성으로 await비동기 작업을 대신 처리할 수 다.
        // 여러 오래된 기기나 네트워크가 한정된 상황에서 렌더링이 버벅거리는 현상이 있을 수 있는데 여기서는 그럼 어떻게 해야할까?

        // ✅ Second Transition
        startTransition(() => {
          setArr([1,2,3,4,5])
          setContent(result);
        });
        }
        });
        

        // ✅ Frist Transition
        // 한번 뿐아니라 여러 트랜잭션을 사용가능
        startTransition2(() => {
          setArr([1,2,3,4,5,6,7,8,9,10])
          setContent('3000');
          // alert('startTransition3000')
        })
    return () => {
      isMounted = false;
    };
  }, [delay, text]);

  return (
    <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      {content}
      {<div>Deferred value: {deferredValue}</div>}
      {isPengding ? <div>Loading...</div> : <div>Deferred value: {deferredValue}</div>}
      {arr.map((item, index) => (<div>{item}</div>))}
    </div>
  );
};

const fetchTextWithDelay = (text:string, delay:number):Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(text);
    }, delay);
  });
};

type CardProps = {
  delay:number;
  text:string;
}
type ArrType= number[] | string[];