import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Sidebar.css";


export default function Sidebar() {

    const location = useLocation();

    const navigate = useNavigate();


    const mainMenu = [

        {
            path: "/dashboard",
            icon: "🏠",
            label: "Dashboard"
        },

        {
            path: "/upload",
            icon: "📄",
            label: "Upload Documents"
        },

        {
            path: "/library",
            icon: "📚",
            label: "Library"
        },

        {
            path: "/chat",
            icon: "🤖",
            label: "Ask AI"
        },

        {
            path: "/history",
            icon: "💬",
            label: "Chat History"
        },

        {
            path: "/notes",
            icon: "📝",
            label: "Notes & Summaries"
        },

        {
            path: "/quiz",
            icon: "🎓",
            label: "Quizzes"
        }

    ];


    function logout() {

        localStorage.removeItem("token");

        navigate("/");

    }


    return (

        <aside className="sidebar">


            {/* BRAND */}

            <div className="sidebar-brand">

                <div className="sidebar-logo">
                    📚
                </div>

                <div className="sidebar-brand-text">

                    <strong>
                        Engineering RAG
                    </strong>

                    <span>
                        Assistant
                    </span>

                </div>

            </div>


            {/* MAIN MENU */}

            <nav className="sidebar-menu">

                {mainMenu.map((item) => {

                    const active =
                        location.pathname === item.path;


                    return (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={
                                active
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >

                            <span className="sidebar-icon">
                                {item.icon}
                            </span>

                            <span>
                                {item.label}
                            </span>

                        </Link>

                    );

                })}

            </nav>


            {/* DIVIDER */}

            <div className="sidebar-divider"></div>


            {/* BOTTOM */}

            <div className="sidebar-bottom">

                <Link
                    to="/profile"
                    className={
                        location.pathname === "/profile"
                            ? "sidebar-link active"
                            : "sidebar-link"
                    }
                >

                    <span className="sidebar-icon">
                        👤
                    </span>

                    <span>
                        Profile
                    </span>

                </Link>


                <button
                    className="sidebar-logout"
                    onClick={logout}
                >

                    <span className="sidebar-icon">
                        🚪
                    </span>

                    <span>
                        Logout
                    </span>

                </button>

            </div>


        </aside>

    );
}