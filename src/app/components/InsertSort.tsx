import React from 'react';

const InsertSort = () => {
  // console.log(InsertSortFunc([1, 2, 3, 4, 5, 1, 42, 54363, 222, 44, 232]));
  return <div></div>;
};

export default InsertSort;

function InsertSortFunc(array: number[]): number[] {
  for (let i = 1; i < array.length; i++) {
    let currentValue = array[i];
    let j: number;
    for (j = i - 1; j >= 0 && array[j] > currentValue; j--) {
      array[j + 1] = array[j];
    }
    array[j + 1] = currentValue;
  }
  return array;
}
