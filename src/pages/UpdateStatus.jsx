import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FaHistory, FaArrowLeft } from 'react-icons/fa';

const UpdateStatus = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShipment = async () => {
            try {
                const { data } = await api.get(`/track/${id}`);
                setStatus(data.currentStatus);
                setLocation(data.currentLocation);
            } catch (err) {
                setError('Failed to fetch shipment details');
            } finally {
                setLoading(false);
            }
        };
        fetchShipment();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/update-tracking', {
                trackingId: id,
                status,
                location,
                message
            });
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update status');
        }
    };

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div className="container fade-in">
            <button onClick={() => navigate(-1)} className="btn" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaArrowLeft /> Back
            </button>

            <motion.div
                className="card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ maxWidth: '500px', margin: '0 auto', padding: '2.5rem' }}
            >
                <h2 style={{ marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaHistory /> Update Status
                </h2>
                <p style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>ID: {id}</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>New Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={styles.input}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Picked Up">Picked Up</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Returned">Returned</option>
                        </select>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Current Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Update Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{ ...styles.input, height: '100px' }}
                            placeholder="e.g., Arrived at sorting facility"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>
                        Update Tracking History
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const styles = {
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
    error: {
        background: '#ffebee',
        color: 'var(--error)',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        textAlign: 'center',
    }
};

export default UpdateStatus;
