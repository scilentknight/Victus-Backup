import { getUserById, updateUser, deleteUser } from "@/models/userModel";

export async function GET(req, { params }) {
  try {
    const resolvedParams = await params;
    const user = await getUserById(resolvedParams.id);

    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return Response.json({ success: false, message: "Error fetching user" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const resolvedParams = await params;
    const body = await req.json();

    await updateUser(resolvedParams.id, body);

    return Response.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    return Response.json({ success: false, message: "Error updating user" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const resolvedParams = await params;
  console.log("DELETE hit:", resolvedParams?.id);

  try {
    const id = parseInt(resolvedParams.id);

    const deleted = await deleteUser(id);

    if (deleted === 0) {
      return Response.json({
        success: false,
        message: "User not found or already deleted",
      });
    }

    return Response.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return Response.json({ success: false, message: "Error deleting user" }, { status: 500 });
  }
}
