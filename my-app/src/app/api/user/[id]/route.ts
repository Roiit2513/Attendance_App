import connectMongoDB from "@/app/libs/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";


export async function GET({ params }: { params: any }) {
    console.log(params);
    // const { id } = params;
    // let email = id.replace("%40", "@");
    // console.log(email);
    // await connectMongoDB();
    // const user = await User.findOne({ email: email });
    // return NextResponse.json({ user }, { status: 200 });
}