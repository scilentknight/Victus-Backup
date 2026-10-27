import { deleteProduct, getProductById, updateProduct } from "@/models/productModel";

export async function GET(req, { params }) {
  try {
    const resolvedParams = await params;
    const product = await getProductById(resolvedParams.id);

    if (!product) {
      return Response.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return Response.json({ success: false, message: "Error fetching product" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const resolvedParams = await params;
    const body = await req.json();

    await updateProduct(resolvedParams.id, body);

    return Response.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    return Response.json({ success: false, message: "Error updating product" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const resolvedParams = await params;
  console.log("DELETE hit:", resolvedParams?.id);

  try {
    const id = parseInt(resolvedParams.id);

    const deleted = await deleteProduct(id);

    if (deleted === 0) {
      return Response.json({
        success: false,
        message: "Product not found or already deleted",
      });
    }

    return Response.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return Response.json({ success: false, message: "Error deleting product" }, { status: 500 });
  }
}
