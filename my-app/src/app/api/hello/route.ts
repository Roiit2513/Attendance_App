import { NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export async function GET(req: Request, res: NextApiResponse){
    // redirect('http://localhost:3000')
    return new Response(JSON.stringify([{name: 'rohit', age: 20}, {name: 'tejal', age:24}, ]))
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);
    console.log(req.cookies.getAll());
    console.log(req.headers.get('Authorization'));

    return new Response('OK')
}