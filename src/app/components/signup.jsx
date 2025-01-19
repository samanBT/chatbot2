"use client";

import Link from "next/link";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Sign up successful! You can log in now.");
      window.location.href = "/login";
    } else {
      const error = await res.json();
      alert(error.error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* Background */}
      <div className="flex flex-row w-full p-6">
        <div className="bg-transparent text-transparent px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2">
          <Link href={"#"}>signup</Link>
        </div>
      </div>

      <header className="relative z-10 mt-2 bg-white bg-opacity-40 backdrop-blur-md shadow-md rounded-full px-10 py-2 text-center">
        <h1 className="text-2xl font-bold text-blue-700">سفر آگاه</h1>
        <p className="text-sm text-gray-900">دستیار هوشمند شما</p>
      </header>

      {/* Chat Container */}
      <main
        style={{ direction: "rtl" }}
        className="relative z-10 mt-2 flex flex-col items-center w-full max-w-5xl bg-gray-50/30 backdrop-blur-md shadow-lg rounded-lg p-6"
      >
        <div className="flex flex-col gap-3 w-full h-[29rem] overflow-y-auto bg-gray-50/0 backdrop-blur-md p-4 rounded-lg border border-gray-300">
          <form className="p-6 rounded-lg " onSubmit={handleSubmit}>
            <h1 className="text-lg font-bold mb-4"> ایجاد حساب کاربری</h1>
            <input
              type="text"
              placeholder="نام کاربری"
              className="w-full p-2 border rounded mb-2"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="ایمیل"
              className="w-full p-2 border rounded mb-2"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="رمز عبور"
              className="w-full p-2 border rounded mb-2"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                ایجاد حساب کاربری
              </button>
              <Link className="mr-3 text-blue-600 underline" href={"/login"}>
                {" "}
                ورود
              </Link>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full mt-2 text-center text-white text-sm">
        <p>© 2024 SafarAgah Inc.</p>
      </footer>
    </div>
  );
};

export default Signup;
