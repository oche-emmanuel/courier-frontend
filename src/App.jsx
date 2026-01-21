import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateShipment from './pages/CreateShipment';
import EditShipment from './pages/EditShipment';
import UpdateStatus from './pages/UpdateStatus';
import TrackResult from './pages/TrackResult';
import Settings from './pages/Settings';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/track/:id" element={<TrackResult />} />
                        <Route path="/admin/login" element={<Login />} />

                        {/* Protected Routes */}
                        <Route path="/admin/dashboard" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/settings" element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/edit/:id" element={
                            <ProtectedRoute>
                                <EditShipment />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/update-status/:id" element={
                            <ProtectedRoute>
                                <UpdateStatus />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/create" element={
                            <ProtectedRoute>
                                <CreateShipment />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
