import sql, { connectDB } from "@/lib/db";

// GET ALL USERS
export const getAllUsers = async () => {
  const pool = await connectDB();
  const result = await pool.request().query("SELECT * FROM users");
  return result.recordset;
};

// Total Users count
export const getUsersCount = async () => {
  const pool = await connectDB();

  const result = await pool
    .request()
    .query("SELECT COUNT(*) AS totalUsers FROM users");

  return result.recordset[0].totalUsers;
};


// GET USER BY ID
export const getUserById = async (id) => {
  const pool = await connectDB();

  const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM users WHERE id = @id");

  return result.recordset[0];
};

// CREATE USER
export const createUser = async (user) => {
  const pool = await connectDB();

  const result = await pool
    .request()
    .input("name", sql.VarChar, user.name)
    .input("username", sql.VarChar, user.username)
    .input("email", sql.VarChar, user.email)
    .input("phone", sql.VarChar, user.phone || null)
    .input("password", sql.VarChar, user.password)

    .input("isVerified", sql.Bit, user.isVerified || 0)
    .input("isAdmin", sql.Bit, user.isAdmin || 0)

    .input("forgotPasswordToken", sql.VarChar, null)
    .input("forgotPasswordTokenExpiry", sql.DateTime, null)

    .input("verifyToken", sql.VarChar, null)
    .input("verifyTokenExpiry", sql.DateTime, null).query(`
      INSERT INTO users (
        name,
        username,
        email,
        phone,
        password,
        isVerified,
        isAdmin,
        forgotPasswordToken,
        forgotPasswordTokenExpiry,
        verifyToken,
        verifyTokenExpiry
      )
      VALUES (
        @name,
        @username,
        @email,
        @phone,
        @password,
        @isVerified,
        @isAdmin,
        @forgotPasswordToken,
        @forgotPasswordTokenExpiry,
        @verifyToken,
        @verifyTokenExpiry
      );

      SELECT SCOPE_IDENTITY() AS id;
    `);

  return result.recordset[0];
};

// UPDATE USER
export const updateUser = async (id, user) => {
  const pool = await connectDB();

  await pool
    .request()
    .input("id", sql.Int, id)
    .input("name", sql.VarChar, user.name)
    .input("username", sql.VarChar, user.username)
    .input("email", sql.VarChar, user.email)
    .input("phone", sql.VarChar, user.phone)
    .input("isVerified", sql.Bit, user.isVerified)
    .input("isAdmin", sql.Bit, user.isAdmin)
    .input("updated_at", sql.DateTime, new Date()).query(`
      UPDATE Users SET
        name = @name,
        username = @username,
        email = @email,
        phone = @phone,
        isVerified = @isVerified,
        isAdmin = @isAdmin,
        updated_at = @updated_at
      WHERE id = @id
    `);

  return true;
};

export const deleteUser = async (id) => {
  const pool = await connectDB();

  const result = await pool.request().input("id", sql.Int, id).query("DELETE FROM users WHERE id = @id");

  console.log("Rows affected:", result.rowsAffected);

  return result.rowsAffected[0];
};
