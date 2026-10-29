import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { FaUserCog, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Settings = () => {
    const { admin, login } = useContext(AuthContext);
    const [email, setEmail] = useState(admin?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            const { data } = await api.put('/admin/profile', { email, password });
            login(data);
            setMessage('Profile updated successfully');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    return (
        <div className="container fade-in">
            <div style={styles.header}>
                <h1 style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <FaUserCog /> Account Settings
                </h1>
            </div>

            <motion.div
                className="card"
                style={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <form onSubmit={handleSubmit}>
                    {message && <div style={styles.success}>{message}</div>}
                    {error && <div style={styles.error}>{error}</div>}

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
                        <label style={styles.label}>New Password (leave blank to keep current)</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <FaSave /> Save Changes
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const styles = {
    header: {
        marginBottom: '2rem',
    },
    card: {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '2rem',
    },
    formGroup: {
        marginBottom: '1.5rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '1rem',
    },
    success: {
        background: '#d4edda',
        color: '#155724',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        textAlign: 'center',
    },
    error: {
        background: '#f8d7da',
        color: '#721c24',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        textAlign: 'center',
    }
};

export default Settings;
