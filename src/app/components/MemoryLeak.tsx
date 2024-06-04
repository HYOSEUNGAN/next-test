import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { pipe } from 'ramda';

// SSR (서버사이드렌더링)을 사용하는 이유?
// 저는 기존에 하드웨어의 성장을 믿고 개발을 하는 회사에서 일한 경험이 있는데 결국은 뒤쳐지고 큰 흐름을 놓치는 테크 회사를 다녔다고 느꼈습니다(meteor.js)를 썼음(풀스택) ㅎ npm trends 연간 3000다운로드..
// 하드웨어의 성장을 뛰어넘는 '웹'이라는 서비스는 자유로움이 있지만 하나의 큰 소프트웨어로서의 발전을 계속 해오던 것
// 서비스는 많아지고 이제는 여러 소프트웨어(엔지니어링) 레벨까지 도달해버려서 기술 트렌드와 서비스는 더욱 빠르고 성능을 원하고 있는 추세가 이어지고 있음을 깨닫는 단계.
// 결국 서버사이드 렌더링은 웹에 더한 성능을 원하는 도구로서 많은 옵션 중 하나이다?!

// 메모리 누수를 발생시키는 컴포넌트를 제작
// 수치화를 목표로 합니다.

// 메모리 누수의 원인

// 1. 상태관리 2. 캐시 3. 서버 리소스 관리 4. 이벤트 리스너

// 해결 방안
// 1. 메모리 프로파일링 도구 사용 2. 전역 변수 최소화 3. 이벤트 리스너 정리 4. 올바른 상태 관리 5. 알맞은 비동기 처리 6. 클린업 함수 사용

// So how?! Garbage Collection??
// 힙메모리를 눌려주거나 메모리를 신경쓰면서 비지니스 로직을 작성한다.
// 힙사이즈 확인 후 작업?
// 혹은 api연속 호출, 데이터(메모리)량 제어 

// 경험공유

interface MemoryLeakProps {
  initialData: number[];
}

const MemoryLeak: React.FC<MemoryLeakProps> = ({ initialData }) => {
  // 제어 프록시


  const data2 ={user:123}
  memoryProxy(data2)

  const [data, setData] = useState<number[]>(initialData);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const set0Data = (): void => setData([]);

  console.log('MemoryLeak Component Render');

  useEffect(() => {
    // 메모리 사용량을 추적하는 함수
    const trackMemoryUsage = (): void => {
      const memory = (window.performance as any).memory; // 브라우저에서 제공하는 메모리 정보
      const usedMemory = memory.usedJSHeapSize / 1024 / 1024; // 사용 중인 메모리 크기(MB)
      setMemoryUsage(usedMemory.toFixed(2) as any); // 소수점 2자리까지 표시
    };

    // 1초마다 메모리 사용량 추적
    const intervalId = setInterval(trackMemoryUsage, 1000);

    // 컴포넌트 언마운트 시에 인터벌 제거
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        if (prevData.length > 1000) {
          // 메모리 누수를 방지하기 위해 데이터 길이 제한
          return prevData.slice(-1000);
        }
        return [...prevData, Math.random()];
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      setData([]); // 상태 초기화
    };
  }, []);

  return (
    <div style={{ color: 'blue' }}>
      {/* 160에서 약 0.07MB씩 늘어남 */}
      <h1>How much is MemoryLeak (SSR): {memoryUsage}</h1>
      <div>
        <h1>Memory Leak Test with SSR</h1>
        <ul>
          {data?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button onClick={set0Data} style={{ background: 'beige' }}>
          ZERO
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetStaticProps = async () => {
  const initialData = Array.from({ length: 10 }, () => {Math.random()});
  return {
    props: {
      initialData, // 초기 데이터로 빈 배열을 전달
    },
  };
};

export default MemoryLeak;

export const memoryProxy = (data:any) => {

  return new Proxy(data, {
    get(target:any, prop) {
      if (prop === 'password') {
        console.warn('Unauthorized access to password!');
        return null;
      }

      return target[prop];
    },

    set(target, prop, value) {
      if (prop === 'username') {
        console.warn('Unauthorized change of username!');
        return false;
      }

      target[prop] = value;
      return true;
    },
  });
};
