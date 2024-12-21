import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Venue from "./pages/Venue";
import Matches from "./pages/Matches";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Players from "./pages/Players";
import CreatePlayer from "./pages/CreatePlayer";
import CreateMatch from "./pages/CreateMatch";
import CreateVenue from "./pages/CreateVenue";
import CreateTeam from "./pages/CreateTeam";
import EditTeam from "./pages/EditTeam";
import EditPlayer from "./pages/EditPlayer";
import Logout from "./components/Logout"
import EditMatch from "./pages/EditMatch";
import EditVenue from "./pages/EditVenue";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import MemberRoute from "./components/MemberRoute";
import GuestRoute from "./components/GuestRoute"; // This should be a new route to allow guests to view everything
import AdminDashboard from "./pages/AdminDashboard";
import Favorites from "./pages/Favorites";
import IconExample from './components/IconExample';
import "./Content.css";

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Admin Dashboard */}
                    <Route
                        path="/admin-dashboard"
                        element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        }
                    />
                    {/* Teams Routes */}
                    <Route
                        path="/teams"
                        element={
                            <GuestRoute>
                                <Teams />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/create-team"
                        element={
                            <AdminRoute>
                                <CreateTeam />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/edit-team/:teamId"
                        element={
                            <AdminRoute>
                                <EditTeam />
                            </AdminRoute>
                        }
                    />

                    {/* Players Routes */}
                    <Route
                        path="/create-player"
                        element={
                            <MemberRoute>
                                <CreatePlayer />
                            </MemberRoute>
                        }
                    />
                    <Route
                        path="/teams/:teamId/players"
                        element={
                            <GuestRoute>
                                <Players />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/edit-player/:playerId"
                        element={
                            <AdminRoute>
                                <EditPlayer />
                            </AdminRoute>
                        }
                    />

                    {/* Venue Routes */}
                    <Route
                        path="/venues"
                        element={
                            <GuestRoute>
                                <Venue />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/create-venue"
                        element={
                            <AdminRoute>
                                <CreateVenue />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/edit-venue/:venueId"
                        element={
                            <AdminRoute>
                                <EditVenue />
                            </AdminRoute>
                        }
                    />

                    {/* Matches Routes */}
                    <Route
                        path="/matches"
                        element={
                            <GuestRoute>
                                <Matches />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/create-match"
                        element={
                            <AdminRoute>
                                <CreateMatch />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/edit-match/:matchId"
                        element={
                            <AdminRoute>
                                <EditMatch />
                            </AdminRoute>
                        }
                    />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
