import { NextRequest, NextResponse } from "next/server";

// pages 따로 필요 없음
export const dynamic = "force-dynamic"; // default
// export async function GET(request:Request) {} //파일 경로에 유의깊게 코딩해야함

// rest api
// get, post, put, patch, delete, HEAD 지원


// next 따로 지원 api => NextRequest, NextResponse => 기본 요청 도우미


// 캐싱과 같은 여러 동적 옵션가능
export async function GET() {
  const res = await fetch('http://localhost:3000/api/v1', {
    // headers: {
    //   'Content-Type': 'application/json',
    //   'API-Key': process.env.DATA_API_KEY,
    // },
  })
  // const data = await res.json({success : 'success'})

 
  return Response.json({ data })
}