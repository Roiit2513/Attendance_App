import connectMongoDB from "@/app/libs/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const { email } = await request.json();
    await connectMongoDB();
    const currentUser = await User.findOne({ email: email });
    if (currentUser){
        return NextResponse.json({ message: "User exist" }, { status: 201 });
    } else {
        await User.create({ email });
        return NextResponse.json({ message: "User Created" }, { status: 201 });
    }
}