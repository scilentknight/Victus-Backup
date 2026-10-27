import sql, { connectDB } from "@/lib/db";

// GET ALL PRODUCTS
export const getAllProducts = async () => {
  const pool = await connectDB();
  const result = await pool.request().query("SELECT * FROM products");
  return result.recordset;
};

// Total products count
export const getProductsCount = async () => {
  const pool = await connectDB();

  const result = await pool.request().query("SELECT COUNT(*) AS totalProducts FROM products");

  return result.recordset[0].totalProducts;
};

// GET PRODUCT BY ID
export const getProductById = async (id) => {
  const pool = await connectDB();

  const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM products WHERE pid = @id");

  return result.recordset[0];
};

// ADD PRODUCT
export const addProduct = async (product) => {
  const pool = await connectDB();

  const result = await pool
    .request()
    .input("pname", sql.VarChar, product.pname)
    .input("quantity", sql.Int, product.quantity)
    .input("price", sql.Decimal(10, 2), product.price)
    .input("created_at", sql.DateTime, new Date()).query(`
      INSERT INTO products (
        pname,
        quantity,
        price,
        created_at
      )
      VALUES (
        @pname,
        @quantity,
        @price,
        @created_at
      );

      SELECT SCOPE_IDENTITY() AS pid;
    `);

  return result.recordset[0];
};

// UPDATE PRODUCT
export const updateProduct = async (id, product) => {
  const pool = await connectDB();

  await pool
    .request()
    .input("pid", sql.Int, id)
    .input("pname", sql.VarChar, product.pname)
    .input("quantity", sql.Int, product.quantity)
    .input("price", sql.Decimal(10, 2), product.price)
    .input("updated_at", sql.DateTime, new Date()).query(`
      UPDATE products SET
        pname = @pname,
        quantity = @quantity,
        price = @price,
        updated_at = @updated_at
      WHERE pid = @pid
    `);

  return true;
};

export const deleteProduct = async (id) => {
  const pool = await connectDB();

  const result = await pool.request().input("id", sql.Int, id).query("DELETE FROM products WHERE pid = @id");

  console.log("Rows affected:", result.rowsAffected);

  return result.rowsAffected[0];
};
