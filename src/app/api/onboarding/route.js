import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const USERNAME_REGEX = /^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");


  if (!username || !USERNAME_REGEX.test(username)) {
    return NextResponse.json(
      { isAvailable: false, error: "Invalid username format" },
      { status: 400 }
    );
  }
  console.log(username)

  const supabase = await createClient();

  try {

    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({ isAvailable: !data });

  } catch (error) {
    console.error("Availability check error :(", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const supabase = await createClient(); 


    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { username } = body;


    if (!username || !USERNAME_REGEX.test(username)) {
      return NextResponse.json({ error: "Invalid username format" }, { status: 400 });
    }


    const { error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        username: username,
      });

    if (insertError) {

      if (insertError.code === "23505") {
        return NextResponse.json({ error: "Username already taken" }, { status: 409 });
      }
      throw insertError;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Submission error:", err);
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
  }
}