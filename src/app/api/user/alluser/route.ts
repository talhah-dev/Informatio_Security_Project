import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {

        const user = await User.find();
        return NextResponse.json({ user })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong in the Sign up server!!" }, { status: 500 })
    }

}