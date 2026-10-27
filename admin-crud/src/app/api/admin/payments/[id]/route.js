import { getPaymentById, updatePaymentStatus, deletePayment } from "@/models/paymentModel";

// =======================
// GET SINGLE PAYMENT
// =======================
export async function GET(req, { params }) {
  try {
    const payment = await getPaymentById(params.id);

    if (!payment) {
      return Response.json({ success: false, message: "Payment not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    return Response.json({ success: false, message: "Error fetching payment" }, { status: 500 });
  }
}

// =======================
// UPDATE STATUS (APPROVE / REJECT)
// =======================
export async function PUT(req, { params }) {
  try {
    const body = await req.json();

    await updatePaymentStatus(params.id, body.status);

    return Response.json({
      success: true,
      message: "Payment status updated",
    });
  } catch (error) {
    return Response.json({ success: false, message: "Error updating payment" }, { status: 500 });
  }
}

// =======================
// DELETE PAYMENT
// =======================
export async function DELETE(req, { params }) {
  try {
    const deleted = await deletePayment(params.id);

    if (!deleted) {
      return Response.json({ success: false, message: "Payment not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    return Response.json({ success: false, message: "Error deleting payment" }, { status: 500 });
  }
}
