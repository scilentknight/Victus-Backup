import { NextResponse } from "next/server";
import sql, { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const db = await connectDB();

    // Get user
    const result = await db.request().input("email", email).query("SELECT * FROM users WHERE email = @email");

    const user = result.recordset[0];

    // user not found
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 401 });
    }

    // password check (bcrypt OR fallback)
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // admin check (BIT safe conversion)
    const isAdmin = Number(user.isAdmin) === 1;

    if (!isAdmin) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        username: user.username,
        name: user.name,
      },
      process.env.JWT_SECRET || "default_jwt_secret_key",
      { expiresIn: "1d" },
    );

    // Response with HTTP-only cookie
    const response = NextResponse.json({
      message: "Login successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}
