'use client';

import React, { useEffect, useState } from 'react';

const ProxyComponent = () => {
  // Proxy design pattern

  // Proxy란 ??
  // JavaScript의 프록시는 다른 객체에 대해 수행되는 기본 작업을 수정하고 사용자 정의할 수 있는 객체 생성을 허용하는 기능입니다. 프록시는 다른 개체를 포함하고 해당 개체에 대한 액세스, 할당, 삭제 등의 기본 작업을 가로채는 개체입니다.
  // 자바스크립트 자체는 객체자체로 정의되어 있는 경우가 대부분이기 때문에 많은 영역에서 활용가능
  // utill, validate, 캐시, 서버접근 전후로 여러경우에 객체에 접근 활용하여 기능등을 대체할 수 있음 => 한단계씩 가상화 혹은 캡슐화가 가능

  // example : 리액트에서는 multer가 대표적인 예시 혹은 axios.client 처럼 axios실행 전에 설정할 수 있음

  // 보안 강화: 인증 및 권한 확인과 같은 보안 조치를 시행하여 권한이 있는 사용자만 민감한 데이터나 작업에 접근 할 수 있도록 할 수 있습니다.
  // 리소스 소비 감소: 지연 로딩, 캐싱, 프록시를 통한 제어된 접근은 애플리케이션의 리소스 소비를 줄일 수 있습니다.
  // 네트워크 최적화: 분산 시스템에서 프록시 디자인 패턴은 원격 객체의 플레이스홀더 역할을 함으로써 네트워크 통신을 최적화할 수 있습니다. 이는 네트워크 지연의 영향을 최소화하는 데 도움이 됩니다.
  // 동시성 제어 프록시는 공유 리소스에 대한 동시 접근을 제어하고, 경합 조건을 방지하며, 데이터 일관성을 보장하는 메커니즘을 구현할 수 있습니다

  // 자바스크립트의 프록시 객체는 객체와 상호작용하고 조작할 수 있는 매우 유연하고 동적인 방법을 제공합니다.

  // Proxy 매서드들
  // #Property
  // get
  // set
  // has
  // deleteProperty

  // #Method
  // apply
  // construct

  // #Object
  // getPrototypeOf
  // setPrototypeOf
  // isExtensible
  // preventExtensions
  // getOwnPropertyDescriptor
  // defineProperty
  // ownKeys

  const targetObj = {
    name: 'target',
    value: 42,
  };

  // multer와 비슷
  const handler: ProxyHandler<typeof targetObj> = {
    get: function (target, prop: string | symbol) {
      // 따로 속성이 있는지 체크 할 수 있음
      if (!(prop in target)) {
        return 'no Property !';
      }

      console.log(`Get ${String(prop)} from ${JSON.stringify(target)}`);
      return target[prop as keyof typeof targetObj];
    },
  };

  const proxy = new Proxy<typeof targetObj>(targetObj, handler); // 프록시 객체 생성

  console.log(proxy.name);
  // console 1 => target

  // 여러 만들어진 프록시 객체 메서드들로 객체 상호작용이 가능합니다. 보안강화, 정확성 등 여러 기능을 추가할 수 있습니다.
  // 고차 컴포넌트(HOC), 컨텍스트 API 또는 라우터 가드를 사용하는 것이 리액트에서 일반적이지만 따로 API 호출할시나 쿠키, 세션을 정교하게 다룰때는 충분히 가치가 있다 느껴짐.

  // 보안 강화를 해보자!
  type User = {
    username: string;
    password: string;
  };

  const [userData, setUserData] = useState<User |null >(null);

  const fetchUserData: ProxyHandler<T extends User>  = () => {
    console.log('Data fetching...');

    const data: User = {
      username: 'john_doe',
      password: 'user_password',
    };

    return data as T;
  };

  useEffect(() => {
    const userProxy = new Proxy(fetchUserData(), {
      get(target, prop) {
        // 사용자가 사용자 비밀번호에 접근할 수 있는 권한이 있는지 확인합니다.
        if (prop === 'password') {
          console.warn('Unauthorized access to password!');
          return null; // null을 반환하거나 허가되지 않은 접근을 처리합니다.
        }

        return target[prop];
      },
    });

    setUserData(userProxy);
  }, []);


  return <div>{userData}</div>;
};

export default ProxyComponent;


// let scores = {'라이언':[82,56,90], '어피치':[100,100,100]}
// let lastupdates = {'라이언':'2023-01-01','어피치':'2023-02-01'}

// let today = new Date()
// today = new Date(today.getFullYear(), today.getMonth(), today.getDate())

// let proxy = new Proxy(lastupdates, {
//     get(target, prop) {
//         if (prop in target) {
//             const lastupdate = new Date(target[prop]+' 00:00:00.000')
//             if(lastupdate < today){
//                 fetch('./getscore', {
//                     method: "POST", body: new URLSearchParams({name: `${target[prop]}`})
//                 }).then(response => {
//                     response.text().then(ret=> {
//                         //scores 객체 업데이트
//                     })
//                 }).catch(error => {
//                     console.error('에러.')
//                 });
//             }
//         } else {
//             return 'Error!';
//         }
//     } 
// });