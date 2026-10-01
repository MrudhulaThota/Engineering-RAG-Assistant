import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AuthChoice.css";

export default function Register() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function register() {

        if (!fullName || !email || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post("/register", {
                full_name: fullName,
                email: email,
                password: password
            });

            console.log(response.data);

            alert("Registration Successful! Please login.");

            navigate("/login");

        } catch (err) {

            console.log(err);

            if (err.response) {
                alert(
                    err.response.data?.detail ||
                    "Registration failed"
                );
            } else {
                alert("Unable to connect to server");
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register-page">

            <div className="register-card">

                <div className="register-logo">
                    📚
                </div>

                <h1>Create Account</h1>

                <p className="register-subtitle">
                    Create your Engineering RAG Assistant account
                </p>

                <div className="register-group">
                    <label>Full Name</label>

                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) =>
                            setFullName(e.target.value)
                        }
                    />
                </div>

                <div className="register-group">
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

                <div className="register-group">
                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                </div>

                <div className="register-group">
                    <label>Confirm Password</label>

                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />
                </div>

                <button
                    className="register-submit"
                    onClick={register}
                    disabled={loading}
                >
                    {loading
                        ? "Creating Account..."
                        : "Create Account"}
                </button>

                <p className="register-switch">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>

                <button
                    className="register-back"
                    onClick={() => navigate("/")}
                >
                    ← Back
                </button>

                <p className="register-security">
                    🔒 Your documents stay private with local AI
                </p>

            </div>

        </div>
    );
}