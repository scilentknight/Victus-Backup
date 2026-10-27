import sql, { connectDB } from "@/lib/db";

// =======================
// GET ALL PAYMENTS (with user name)
// =======================
export const getAllPayments = async () => {
  const pool = await connectDB();

  const result = await pool.request().query(`
    SELECT 
      p.id,
      p.user_id,
      u.name AS paid_by,
      p.amount,
      p.payment_method,
      p.status,
      p.payment_date
    FROM payments p
    INNER JOIN users u ON p.user_id = u.id
    ORDER BY p.id DESC
  `);

  return result.recordset;
};

// =======================
// GET PAYMENT BY ID
// =======================
export const getPaymentById = async (id) => {
  const pool = await connectDB();

  const result = await pool.request().input("id", sql.Int, id).query(`
      SELECT 
        p.id,
        p.user_id,
        u.name AS paid_by,
        p.amount,
        p.payment_method,
        p.status,
        p.payment_date
      FROM payments p
      INNER JOIN users u ON p.user_id = u.id
      WHERE p.id = @id
    `);

  return result.recordset[0];
};

// =======================
// UPDATE PAYMENT STATUS
// =======================
export const updatePaymentStatus = async (id, status) => {
  const pool = await connectDB();

  await pool.request().input("id", sql.Int, id).input("status", sql.VarChar, status).input("updated_at", sql.DateTime, new Date()).query(`
      UPDATE payments
      SET 
        status = @status,
        updated_at = @updated_at
      WHERE id = @id
    `);

  return true;
};

// =======================
// DELETE PAYMENT
// =======================
export const deletePayment = async (id) => {
  const pool = await connectDB();

  const result = await pool.request().input("id", sql.Int, id).query(`
      DELETE FROM payments
      WHERE id = @id
    `);

  return result.rowsAffected[0];
};
