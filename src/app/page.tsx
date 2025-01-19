import Chatbot from "./components/input";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function ChatbotPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signup");
  }

  return (
    <div>
      <Chatbot props={session} />
    </div>
  );
}
