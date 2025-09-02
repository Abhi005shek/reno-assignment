import pool from "@/lib/db";
import path from "path";
import fs from "fs/promises";

interface SchoolData {
  name: string;
  address: string;
  email: string;
  city: string;
  state: string;
  contact: string;
  image?: File;
}

export async function POST(req: Request) {
  try {
    let image: string;
    const formData = await req.formData();
    const body: SchoolData = {
      name: formData.get("name") as string,
      email: formData.get("email_id") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      contact: formData.get("contact") as string,
      image: formData.get("image") as File,
    };

    if (
      !body.name ||
      !body.email ||
      !body.address ||
      !body.contact ||
      !body.city ||
      !body.state
    ) {
      return Response.json(
        {
          success: false,
          message: "Required fields are missing!!",
        },
        { status: 400 }
      );
    }

    if (body.image) {
      const buffer = Buffer.from(await body.image.arrayBuffer());
      const filename = Date.now() + "_" + body.image.name.replaceAll(" ", "_");

      const uploadPath = path.join(
        process.cwd(),
        "public",
        "schoolImages",
        filename
      );
      await fs.writeFile(uploadPath, buffer);
      image = "/schoolImages/" + filename;
    } else {
      image = "/schoolImages/" + "bg.jpg";
    }

    const sql =
      "INSERT INTO Schools (name, email, address, contact, city, state, image) VALUES($1, $2, $3, $4, $5, $6, $7)";
    await pool.query(sql, [
      body.name,
      body.email,
      body.address,
      body.contact,
      body.city,
      body.state,
      image,
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        message: "School created successfully!!",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.log("ERROR 💥 : ", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: err?.message,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
