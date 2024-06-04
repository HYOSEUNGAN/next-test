import React from 'react';

type RestaurantDef = {
  name: string;
  totalOrders: number;
  avgRating: number;
  likes: number;
  distance: number;
};

// 각 평가 항목에 대한 가중치
const weights = { totalOrders: 0.2, avgRating: 0.3, likes: 0.2, distance: 0.3 }; //데터 가중치가 높긴하겠다 호이스팅시

const BubbleSort = () => {
  // 저장된 식당 목록
  let restaurants = [
    { name: '음식점A', totalOrders: 300, avgRating: 4.5, likes: 200, distance: 5 },
    { name: '음식점B', totalOrders: 250, avgRating: 4.2, likes: 180, distance: 25 },
    { name: '음식점C', totalOrders: 400, avgRating: 4.7, likes: 250, distance: 15 },
    { name: '음식점D', totalOrders: 200, avgRating: 4.1, likes: 150, distance: 30 },
    { name: '음식점E', totalOrders: 350, avgRating: 4.4, likes: 220, distance: 10 },
  ];

  const calculateScore = (restaurant: RestaurantDef) => {
    const maxDistance = 30;
    // 배열을 순회하며 리턴하는건 O(n)이다. 시간복잡도가 높다.
    if (restaurant && restaurant.distance > 20) return null;

    let score =
      weights.totalOrders * restaurant.totalOrders +
      weights.avgRating * restaurant.avgRating +
      weights.likes * restaurant.likes +
      weights.distance * (maxDistance - restaurant.distance);

    return score;
  };

  function bubbleSort(arr: RestaurantDef[]) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        let score1 = calculateScore(arr[j]);
        let score2 = calculateScore(arr[j + 1]);
        if (score1 && score2 && score1 < score2) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }

  return (
    <div>
      {bubbleSort(restaurants).map((restaurant) => (
        <div key={restaurant.name}>{restaurant.name}</div>
      ))}
    </div>
  );
};

export default BubbleSort;
