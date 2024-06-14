import { NextRequest, NextResponse } from "next/server";

// pages 따로 필요 없음
export const dynamic = "force-dynamic"; // default
// export async function GET(request:Request) {} //파일 경로에 유의깊게 코딩해야함

// rest api
// get, post, put, patch, delete, HEAD 지원


// next 따로 지원 api => NextRequest, NextResponse => 기본 요청 도우미

export async function GET(){
  const items = [
    { id: 1, name: "Item 1", description: "This is the first item" },
    { id: 2, name: "Item 2", description: "This is the second item" },
    { id: 3, name: "Item 3", description: "This is the third item" },
  ];

  const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

  await (delay(2000))

  return NextResponse.json({items})
}

// 캐싱과 같은 여러 동적 옵션가능
// export async function GET() {
//   const res = await fetch('http://localhost:3000/api/v1', {
//     // headers: {
//     //   'Content-Type': 'application/json',
//     //   'API-Key': process.env.DATA_API_KEY,
//     // },
//   })
//   const data = await res.json({success : 'success'})

 
//   return NextResponse.json({ data })
// }