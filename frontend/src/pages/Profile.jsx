import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://127.0.0.1:8000/profile/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("PROFILE DATA:", response.data);

            setProfile(response.data);

        } catch (err) {

            console.error("PROFILE ERROR:", err);

            setError(
                err.response?.data?.detail ||
                "Failed to load profile"
            );

        } finally {

            setLoading(false);

        }
    }

    return (
        <>
            <Navbar />

            <div
                style={{
                    display: "flex",
                    minHeight: "calc(100vh - 80px)"
                }}
            >

                <Sidebar />

                <div
                    style={{
                        flex: 1,
                        padding: "40px",
                        background: "#f5f6f8"
                    }}
                >

                    <h1>User Profile</h1>

                    {loading && (
                        <h3>Loading profile...</h3>
                    )}

                    {error && (
                        <div
                            style={{
                                color: "red",
                                background: "#ffe5e5",
                                padding: "15px",
                                borderRadius: "8px"
                            }}
                        >
                            {error}
                        </div>
                    )}

                    {profile && !loading && !error && (

                        <div
                            style={{
                                background: "white",
                                padding: "30px",
                                borderRadius: "12px",
                                maxWidth: "700px",
                                boxShadow:
                                    "0 2px 10px rgba(0,0,0,0.08)"
                            }}
                        >

                            <h2>👤 Account Information</h2>

                            <hr />

                            <p>
                                <strong>Name:</strong>{" "}
                                {profile.name}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {profile.email}
                            </p>

                            <p>
                                <strong>Books Uploaded:</strong>{" "}
                                {profile.books}
                            </p>

                            <p>
                                <strong>Questions Asked:</strong>{" "}
                                {profile.questions}
                            </p>

                            <p>
                                <strong>Notes Generated:</strong>{" "}
                                {profile.notes}
                            </p>

                            <p>
                                <strong>Quizzes Generated:</strong>{" "}
                                {profile.quizzes}
                            </p>

                            <hr />

                            <h3>Account Status</h3>

                            <p
                                style={{
                                    color: "green",
                                    fontWeight: "bold"
                                }}
                            >
                                ● Active
                            </p>

                        </div>

                    )}

                </div>

            </div>
        </>
    );
}