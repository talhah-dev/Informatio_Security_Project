import { DB } from "@/lib/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest) {
    try {
        
        await DB()
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "All fields are required!!" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User does not exist!!" }, { status: 400 });
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return NextResponse.json({ message: "Password is incorrect!!" }, { status: 400 });
        }

        const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.SECRET_KEY!);

        if (!token) {
            return NextResponse.json({ message: "Something went wrong in the login up server!!" }, { status: 500 })
        }

        const response = NextResponse.json({ message: `Welcome ${user.name}` }, { status: 201 });

        response.cookies.set("token", token, {
            httpOnly: false,
            sameSite: "none",
        })

        return response;

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong in the login up server!!" }, { status: 500 })
    }
}