import { NextResponse } from "next/server";
import userSignup from "@/libs/userSignup";

export async function POST(req: Request) {
    try {
        const { name, email, password, phone, role } = await req.json();

        if (!name || !email || !password || !phone || !role) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const newUser = await userSignup(name, email, password, phone, role);
        return NextResponse.json(newUser, { status: 201 });

    } catch (error: any) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
