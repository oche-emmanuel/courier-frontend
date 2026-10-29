import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

const EditShipment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        sender: { name: '', contact: '' },
        receiver: { name: '', address: '', contact: '' },
        currentStatus: '',
        currentLocation: '',
        expectedDeliveryDate: ''
    });

    useEffect(() => {
        const fetchShipment = async () => {
            try {
                // We use the public track endpoint to get data by tracking ID or internal ID
                // Our backend GET /track/:trackingId works for public, but for editing we might needs IDs
                // However, since we have the internal _id from the dashboard link, we should use that
                // Let's ensure we have a backend endpoint to get by ID or just use trackingId

                // For now, let's assume we pass the trackingId in the URL
                const { data } = await api.get(`/track/${id}`);
                setFormData({
                    sender: data.sender,
                    receiver: data.receiver,
                    currentStatus: data.currentStatus,
                    currentLocation: data.currentLocation,
                    expectedDeliveryDate: data.expectedDeliveryDate ? data.expectedDeliveryDate.split('T')[0] : ''
                });
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
            await api.put(`/admin/shipment/${id}`, formData);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update shipment');
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}
            >
                <h2 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>Edit Shipment: {id}</h2>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.section}>
                        <h3>Sender Details</h3>
                        <div style={styles.row}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Sender Name</label>
                                <input
                                    type="text"
                                    value={formData.sender.name}
                                    onChange={(e) => setFormData({ ...formData, sender: { ...formData.sender, name: e.target.value } })}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Sender Contact</label>
                                <input
                                    type="text"
                                    value={formData.sender.contact}
                                    onChange={(e) => setFormData({ ...formData, sender: { ...formData.sender, contact: e.target.value } })}
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <h3>Receiver Details</h3>
                        <div style={styles.row}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Receiver Name</label>
                                <input
                                    type="text"
                                    value={formData.receiver.name}
                                    onChange={(e) => setFormData({ ...formData, receiver: { ...formData.receiver, name: e.target.value } })}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Receiver Contact</label>
                                <input
                                    type="text"
                                    value={formData.receiver.contact}
                                    onChange={(e) => setFormData({ ...formData, receiver: { ...formData.receiver, contact: e.target.value } })}
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Delivery Address</label>
                            <input
                                type="text"
                                value={formData.receiver.address}
                                onChange={(e) => setFormData({ ...formData, receiver: { ...formData.receiver, address: e.target.value } })}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.section}>
                        <h3>Current Status</h3>
                        <div style={styles.row}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Status</label>
                                <select
                                    value={formData.currentStatus}
                                    onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
                                    style={styles.input}
                                >
                                    <option value="Shipment Created">Shipment Created</option>
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
                                    value={formData.currentLocation}
                                    onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Expected Delivery Date</label>
                            <input
                                type="date"
                                value={formData.expectedDeliveryDate}
                                onChange={(e) => setFormData({ ...formData, expectedDeliveryDate: e.target.value })}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <FaSave /> Save Changes
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const styles = {
    section: {
        marginBottom: '2rem',
        padding: '1.5rem',
        background: '#f8f9fa',
        borderRadius: '8px',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
    },
    formGroup: {
        marginBottom: '1rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '6px',
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

// Mobile responsive styles
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .edit-form-row {
      grid-template-columns: 1fr !important;
    }
  }
`;
if (!document.head.querySelector('style[data-edit-shipment]')) {
    style.setAttribute('data-edit-shipment', 'true');
    document.head.appendChild(style);
}

export default EditShipment;
