import React from 'react';

// O(n^2) 시간복잡도

const SelectionSort = () => {
  // console.log(SelectionSortFunc([1, 2, 3, 4, 5, 1, 42, 54363, 222, 44, 232]));
  return <div></div>;
};

export default SelectionSort;

function SelectionSortFunc(array: number[]): any {
  let indexMin, temp;

  for (let i = 0; i < array.length - 1; i++) {
    let indexMin = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[indexMin]) {
        indexMin = j;
      }
    }

    temp = array[indexMin];
    array[indexMin] = array[i];
    array[i] = temp;
  }

  return array
}
