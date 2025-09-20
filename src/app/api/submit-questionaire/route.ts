import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/superbaseClient";

export async function POST(req: Request) {
  console.log("Received request:", req);
  try {
    const body = await req.json();

    // Insert into Supabase table `questionnaires`
    const { data, error } = await supabase
      .from("questionnaires") // 👈 make sure this table exists
      .insert([{ responses: body }]); // store as JSON

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
