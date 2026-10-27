import { getAllUsers, createUser, getUsersCount } from "@/models/userModel";

export default async function handler(req, res) {
  try {
    const totalUsers = await getUsersCount();

    res.status(200).json({
      totalUsers,
    });
    console.log(totalUsers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function GET() {
  try {
    const users = await getAllUsers();

    return Response.json({
      success: true,
      data: users,
    });
  } catch (error) {
    return Response.json({ success: false, message: "Error fetching users" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const user = await createUser(body);

    return Response.json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log("CREATE ERROR:", error);
    return Response.json({ success: false, message: "Error creating user" }, { status: 500 });
  }
}
