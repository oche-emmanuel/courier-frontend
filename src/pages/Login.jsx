import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            const { data } = await api.post('/admin/login', { email, password }, { timeout: 15000 });
            if (!data || typeof data !== 'object' || !data.token) {
                throw new Error('The server did not return a valid login response. Check the API URL and backend configuration.');
            }
            login(data);
            navigate('/admin/dashboard');
        } catch (err) {
            if (err.response?.status === 401) {
                setError('Invalid email or password');
            } else if (err.code === 'ECONNABORTED') {
                setError('The login request timed out. Check that the backend is running and the API URL is correct.');
            } else if (err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
                setError('Cannot reach the login server. Check that the backend is running and the API URL is correct.');
            } else if (err.message.includes('CORS')) {
                setError('CORS error. Server CORS configuration issue.');
            } else {
                setError(err.response?.data?.message || err.message || 'Login failed. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.container}>
            <motion.div
                className="card"
                style={styles.card}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-color)' }}>Admin Login</h2>
                {error && <div style={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.passwordContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.toggleButton}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px' }} disabled={isSubmitting}>
                        {isSubmitting ? 'Signing in...' : 'Login'}
                    </button>
                    {/* <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                        Default: admin@example.com / password123
                    </p> */}
                </form>
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        padding: '20px',
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        padding: '2.5rem',
    },
    formGroup: {
        marginBottom: '1.5rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '500',
        color: '#333',
        fontSize: '0.95rem',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        transition: 'border-color 0.3s',
    },
    passwordContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    toggleButton: {
        position: 'absolute',
        right: '10px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.2s',
    },
    error: {
        background: '#ffebee',
        color: 'var(--error)',
        padding: '12px',
        borderRadius: '5px',
        marginBottom: '1rem',
        textAlign: 'center',
        fontSize: '0.9rem',
    }
};

// Mobile responsive styles
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 480px) {
    .card {
      padding: 1.5rem !important;
    }
  }
`;
if (!document.head.querySelector('style[data-login]')) {
    style.setAttribute('data-login', 'true');
    document.head.appendChild(style);
}

export default Login;
