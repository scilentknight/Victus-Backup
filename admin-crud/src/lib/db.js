import sql from "mssql";

const config = {
  user: "sa",
  password: "StrongPassword",
  server: "localhost",
  database: "admincrud",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool;

export async function connectDB() {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}

export default sql;
