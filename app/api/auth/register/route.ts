// frontend\app\api\auth\register\route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" }, 
        { status: 400 }
      );
    }

    // 1. Connect to DB
    await connectToDB();

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" }, 
        { status: 400 }
      );
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });

  } catch (error) {
    console.log("Registration Error:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." }, 
      { status: 500 }
    );
  }
}