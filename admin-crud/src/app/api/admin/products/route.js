// import { getAllUsers, createUser, getUsersCount } from "@/models/userModel";

import { addProduct, getAllProducts, getProductsCount } from "@/models/productModel";

export default async function handler(req, res) {
  try {
    const totalProducts = await getProductsCount();

    res.status(200).json({
      totalProducts,
    });
    
    console.log(totalProducts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function GET() {
  try {
    const products = await getAllProducts();

    return Response.json({
      success: true,
      data: products,
    });
  } catch (error) {
    return Response.json({ success: false, message: "Error fetching products" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const product = await addProduct(body);

    return Response.json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    console.log("CREATE ERROR:", error);
    return Response.json({ success: false, message: "Error adding product" }, { status: 500 });
  }
}
