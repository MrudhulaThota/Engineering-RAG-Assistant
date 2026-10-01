import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Library from "./pages/Library";
import Chat from "./pages/Chat";
import Quiz from "./pages/Quiz";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import History from "./History";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                ========================== */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =========================
                    PROTECTED ROUTES
                ========================== */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/upload"
                    element={
                        <ProtectedRoute>
                            <Upload />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/library"
                    element={
                        <ProtectedRoute>
                            <Library />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/chat"
                    element={
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/quiz"
                    element={
                        <ProtectedRoute>
                            <Quiz />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/notes"
                    element={
                        <ProtectedRoute>
                            <Notes />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <History />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );
}