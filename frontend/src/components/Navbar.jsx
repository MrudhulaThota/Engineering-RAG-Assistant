import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
export default function Navbar() {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);

    function logout() {

        localStorage.removeItem("token");

        navigate("/");

    }

    function goToProfile() {

        setShowMenu(false);

        navigate("/profile");

    }

    return (

        <header className="top-navbar">

            {/* =========================
                LEFT - BRAND
            ========================== */}

            <div
                className="navbar-brand"
                onClick={() => navigate("/dashboard")}
            >

                <div className="navbar-logo">
                    📚
                </div>

                <div className="navbar-brand-text">

                    <strong>
                        Engineering RAG
                    </strong>

                    <span>
                        Assistant
                    </span>

                </div>

            </div>


            {/* =========================
                SEARCH
            ========================== */}

            <div className="navbar-search">

                <span className="search-icon">
                    🔍
                </span>

                <input
                    type="text"
                    placeholder="Search your documents..."
                />

            </div>


            {/* =========================
                RIGHT SIDE
            ========================== */}

            <div className="navbar-right">


                {/* Notification */}

                <button
                    className="notification-btn"
                    title="Notifications"
                >

                    🔔

                    <span className="notification-dot"></span>

                </button>


                {/* Profile */}

                <div className="profile-wrapper">

                    <button
                        className="profile-btn"
                        onClick={() =>
                            setShowMenu(!showMenu)
                        }
                    >

                        <div className="profile-avatar">
                            M
                        </div>

                        <div className="profile-info">

                            <strong>
                                Mrudhula Thota
                            </strong>

                            <span>
                                Student
                            </span>

                        </div>

                        <span className="profile-arrow">
                           ⌄
                        </span>

                    </button>


                    {/* Dropdown */}

                    {showMenu && (

                        <div className="profile-menu">

                            <button
                                onClick={goToProfile}
                            >
                                👤 Profile
                            </button>

                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    navigate("/dashboard");
                                }}
                            >
                                🏠 Dashboard
                            </button>

                            <hr />

                            <button
                                className="logout-menu"
                                onClick={logout}
                            >
                                🚪 Logout
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>

    );
}