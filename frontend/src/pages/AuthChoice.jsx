import { useNavigate } from "react-router-dom";
import "./AuthChoice.css";

export default function AuthChoice() {
    const navigate = useNavigate();

    return (
        <div className="auth-container">

            <div className="auth-card">

                <div className="logo">
                    📚
                </div>

                <h1>Engineering RAG Assistant</h1>

                <p className="subtitle">
                    Your intelligent offline engineering study companion
                </p>

                <div className="features">
                    <div>📄 Upload Engineering Books</div>
                    <div>🤖 Ask AI Questions</div>
                    <div>🔎 Semantic Search</div>
                    <div>📝 Generate Answers from Your Documents</div>
                </div>

                <div className="auth-buttons">

                    <button
                        className="login-btn"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                    <button
                        className="register-btn"
                        onClick={() => navigate("/register")}
                    >
                        Create Account
                    </button>

                </div>

                <p className="offline-text">
                    🔒 Powered by Local AI • Your documents stay private
                </p>

            </div>

        </div>
    );
}