import { DB } from "@/lib/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

DB()

export async function POST(req: NextRequest) {
    try {

        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required!!" }, { status: 400 });
        }


        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ message: "User already exists!!" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "User created successfully!!" }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong in the Sign up server!!" })
    }
}