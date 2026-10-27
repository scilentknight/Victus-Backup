import { getAllPayments } from "@/models/paymentModel";

// GET ALL PAYMENTS
export async function GET() {
  try {
    const payments = await getAllPayments();

    return Response.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.log(error);

    return Response.json({ success: false, message: "Error fetching payments" }, { status: 500 });
  }
}
