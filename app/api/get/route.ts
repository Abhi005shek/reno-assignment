import pool from "@/lib/db";

export async function GET() {
  try {
    const sql = "SELECT * FROM schools";
    const res = await pool.query(sql);

    return new Response(
      JSON.stringify({
        success: true,
        data: res.rows,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.log("ERROR 💥 : ", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: err?.message ?? "No record found.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
