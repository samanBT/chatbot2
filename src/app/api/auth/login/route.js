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
    const ALL = await usersCollection.find({}).toArray();
    console.log(ALL);

    // Find the user
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password." }),
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password." }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Login successful.", userId: user._id }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
    });
  }
}
