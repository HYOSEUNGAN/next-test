'use client';

import Image from 'next/image';
import * as R from 'ramda';
import Ramda from './components/Ramda';
import Proxy from './components/Order';
import MemoryLeak from './components/MemoryLeak';
import BubbleSort from './components/BubbleSort';
import SelectionSort from './components/SelectionSort';
import InsertSort from './components/InsertSort';
import Hash from './components/Hash';
import LinkedList from './components/LinkedList';
import ArticlePage from './components/ArticlePage';
import ReactThinking from './components/ReactThinking';
import React18 from './components/React18';

export default function Home() {
  // console.log(R);
  const add = R.add(2, 3);
  const add2 = R.add(10)(7);

  // pipe test
  const total = R.pipe(R.add(5), R.add(10))(1);

  // arr test
  const arr: number[] = [1, 2, 3, 4, 5];
  const arrFunc = (arr: number[]) => arr.filter((i) => i % 2 === 0);
  const arrFunc2 = (arr: number[]) => arr.map((i) => i * 2);

  const checkArr = R.pipe(arrFunc, arrFunc2)(arr);

  // TODO : Database fetch해보기

  return (
    <>
      <h1>JUST TEST</h1>
      <React18 />
      {/* <ArticlePage /> */}
      {/* <ReactThinking /> */}
      {/* {add} / {add2}
      {total}
      <div>
        <h2>
          this : {checkArr[0]} {checkArr[1]}
        </h2>
        {R.sum(checkArr)}
      </div> */}
      {/* <MemoryLeak /> */}
      {/* <BubbleSort /> */}
      {/* <SelectionSort /> */}
      {/* <InsertSort /> */}
      {/* <Ramda /> */}
      {/* <Hash /> */}
      {/* <LinkedList /> */}
      {/* <Proxy /> */}
    </>
  );
}
