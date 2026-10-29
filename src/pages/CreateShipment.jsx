import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FaPaperPlane } from 'react-icons/fa';

const CreateShipment = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        sender: { name: '', address: '', contact: '' },
        receiver: { name: '', address: '', contact: '' },
        origin: '',
        destination: '',
        expectedDeliveryDate: ''
    });

    const handleChange = (section, field, value) => {
        if (section) {
            setFormData(prev => ({
                ...prev,
                [section]: { ...prev[section], [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/create-shipment', formData);
            alert('Shipment Created Successfully!');
            navigate('/admin/dashboard');
        } catch (error) {
            alert('Failed to create shipment');
        }
    };

    return (
        <div className="container fade-in" style={{ paddingBottom: '3rem' }}>
            <h2 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>Create New Shipment</h2>
            <form onSubmit={handleSubmit} className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* Sender Details */}
                <h3 style={styles.sectionTitle}>Sender Details</h3>
                <div style={styles.row}>
                    <div style={styles.col}>
                        <label style={styles.label}>Name</label>
                        <input type="text" style={styles.input} required
                            onChange={(e) => handleChange('sender', 'name', e.target.value)} />
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Contact</label>
                        <input type="text" style={styles.input} required
                            onChange={(e) => handleChange('sender', 'contact', e.target.value)} />
                    </div>
                </div>
                <div style={styles.col}>
                    <label style={styles.label}>Address</label>
                    <input type="text" style={styles.input} required
                        onChange={(e) => handleChange('sender', 'address', e.target.value)} />
                </div>

                <hr style={styles.divider} />

                {/* Receiver Details */}
                <h3 style={styles.sectionTitle}>Receiver Details</h3>
                <div style={styles.row}>
                    <div style={styles.col}>
                        <label style={styles.label}>Name</label>
                        <input type="text" style={styles.input} required
                            onChange={(e) => handleChange('receiver', 'name', e.target.value)} />
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Contact</label>
                        <input type="text" style={styles.input} required
                            onChange={(e) => handleChange('receiver', 'contact', e.target.value)} />
                    </div>
                </div>
                <div style={styles.col}>
                    <label style={styles.label}>Address</label>
                    <input type="text" style={styles.input} required
                        onChange={(e) => handleChange('receiver', 'address', e.target.value)} />
                </div>

                <hr style={styles.divider} />

                {/* Shipment Details */}
                <h3 style={styles.sectionTitle}>Shipment Route</h3>
                <div style={styles.row}>
                    <div style={styles.col}>
                        <label style={styles.label}>Origin (City/Hub)</label>
                        <input type="text" style={styles.input} required
                            onChange={(e) => handleChange(null, 'origin', e.target.value)} />
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Destination</label>
                        <input type="text" style={styles.input} required
                            onChange={(e) => handleChange(null, 'destination', e.target.value)} />
                    </div>
                </div>

                <div style={styles.col}>
                    <label style={styles.label}>Expected Delivery Date</label>
                    <input type="date" style={styles.input} required
                        value={formData.expectedDeliveryDate}
                        onChange={(e) => handleChange(null, 'expectedDeliveryDate', e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }}>
                    <FaPaperPlane style={{ marginRight: '8px' }} /> Create Shipment
                </button>
            </form>
        </div>
    );
};

const styles = {
    sectionTitle: {
        color: 'var(--secondary-color)',
        marginBottom: '1rem',
        fontSize: '1.1rem',
    },
    row: {
        display: 'flex',
        gap: '20px',
        marginBottom: '1rem',
        flexWrap: 'wrap',
    },
    col: {
        flex: 1,
        minWidth: '200px',
        marginBottom: '1rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '500',
        fontSize: '0.9rem',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ddd',
        fontSize: '1rem',
    },
    divider: {
        margin: '2rem 0',
        border: 'none',
        borderTop: '1px solid #eee',
    }
};

// Mobile responsive styles
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .form-row {
      flex-direction: column !important;
      gap: 0 !important;
    }
    .form-col {
      flex: 1 !important;
      min-width: 100% !important;
    }
  }
`;
if (!document.head.querySelector('style[data-create-shipment]')) {
    style.setAttribute('data-create-shipment', 'true');
    document.head.appendChild(style);
}

export default CreateShipment;
