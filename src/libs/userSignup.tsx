export default async function userSignup(
    userName: string, 
    userEmail: string, 
    userPassword: string, 
    userTel: string, 
    userRole: string
) {
    const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            tel: userTel,       // ✅ Added telephone number
            role: userRole,     // ✅ Added role
            password: userPassword,
            createdAt: new Date().toISOString().split("T")[0]  // ✅ Auto-generate today's date (YYYY-MM-DD)
        }),
    });

    if (!response.ok) {
        const errorText = await response.text(); // Get full error response
        throw new Error(`Sign-up failed: ${errorText}`);
    }

    return await response.json();
}
