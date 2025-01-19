import bcrypt from "bcrypt";
import { connectToDatabase } from "../../../../lib/mongodb";

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email and password are required." }),
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists." }), {
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword,
    });

    return new Response(
      JSON.stringify({
        message: "User created successfully.",
        userId: result.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
    });
  }
}
