import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AuthChoice.css";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function login() {

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        const form = new URLSearchParams();

        form.append("username", email);
        form.append("password", password);

        try {

            setLoading(true);

            const response = await api.post(
                "/login",
                form,
                {
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    }
                }
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            alert("Login Successful");

            navigate("/dashboard");

        } catch (err) {

            console.log(err);

            if (err.response) {
                alert(
                    err.response.data?.detail ||
                    "Invalid Login"
                );
            } else {
                alert("Unable to connect to server");
            }

        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="auth-container">

            <div className="auth-card">

                {/* Logo */}
                <div className="logo">
                    📚
                </div>

                <h1>Welcome Back</h1>

                <p className="subtitle">
                    Login to your Engineering RAG Assistant
                </p>

                {/* Email */}
                <div className="input-group">

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                </div>

                {/* Password */}
                <div className="input-group">

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                </div>

                {/* Login Button */}
                <button
                    className="login-btn full-btn"
                    onClick={login}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* Register */}
                <p className="switch-auth">

                    Don't have an account?{" "}

                    <span
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Create Account
                    </span>

                </p>

                {/* Back */}
                <button
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    ← Back
                </button>

                <p className="offline-text">
                    🔒 Your documents stay private with local AI
                </p>

            </div>

        </div>
    );
}