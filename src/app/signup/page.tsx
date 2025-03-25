"use client";
import { useState } from "react";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:5000/api/v1/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role,phone }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Sign-up failed");

            setSuccess("User registered successfully!");
        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSignup} className="flex flex-col gap-3">
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded" required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded" required />
                <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="p-2 border rounded" required />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)} // Update role on change
                    className="block w-full p-2 mb-2 border rounded"
                    >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded" required />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Sign Up</button>
            </form>
        </div>
    );
}
