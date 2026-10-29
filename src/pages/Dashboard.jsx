import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaPlus, FaBox, FaEdit } from 'react-icons/fa';

const Dashboard = () => {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchShipments = async () => {
        try {
            const response = await api.get('/admin/all-shipments');
            setShipments(response.data);
        } catch (error) {
            console.error('Failed to fetch shipments:', error);
            alert('Failed to load shipments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this shipment?')) {
            try {
                await api.delete(`/admin/shipment/${id}`);
                fetchShipments();
            } catch (error) {
                alert('Failed to delete shipment');
            }
        }
    };

    if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

    return (
        <div className="container fade-in">
            <div style={styles.header}>
                <h1 style={{ color: 'var(--primary-color)' }}>Admin Dashboard</h1>
                <Link to="/admin/create" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaPlus /> Create Shipment
                </Link>
            </div>

            <div style={styles.grid}>
                {shipments.map((shipment) => (
                    <div key={shipment._id} className="card" style={styles.card}>
                        <div style={styles.cardHeader}>
                            <h3 style={{ color: 'var(--primary-color)' }}>{shipment.trackingId}</h3>
                            <span style={styles.badge(shipment.currentStatus)}>{shipment.currentStatus}</span>
                        </div>
                        <div style={styles.cardBody}>
                            <p><strong>From:</strong> {shipment.sender.name} ({shipment.history[0].location})</p>
                            <p><strong>To:</strong> {shipment.receiver.name} ({shipment.receiver.address})</p>
                            <p><strong>Loc:</strong> {shipment.currentLocation}</p>
                            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '10px' }}>
                                Updated: {new Date(shipment.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div style={styles.cardActions}>
                            <Link to={`/admin/edit/${shipment.trackingId}`} className="btn" style={styles.editBtn}>
                                <FaEdit /> Edit
                            </Link>
                            <Link to={`/admin/update-status/${shipment.trackingId}`} className="btn" style={styles.statusBtn}>
                                Update Status
                            </Link>
                            <button onClick={() => handleDelete(shipment._id)} className="btn" style={styles.deleteBtn}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {shipments.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                    <FaBox size={50} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>No shipments found. Create one to get started.</p>
                </div>
            )}
        </div>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        borderBottom: '1px solid #eee',
        paddingBottom: '0.5rem',
        flexWrap: 'wrap',
        gap: '0.5rem',
    },
    cardBody: {
        fontSize: '0.95rem',
        lineHeight: '1.6',
        wordBreak: 'break-word',
    },
    badge: (status) => ({
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        backgroundColor: status === 'Delivered' ? '#d4edda' : '#cce5ff',
        color: status === 'Delivered' ? '#155724' : '#004085',
        whiteSpace: 'nowrap',
    }),
    cardActions: {
        display: 'flex',
        gap: '8px',
        marginTop: 'auto',
        paddingTop: '1rem',
        borderTop: '1px solid #eee',
        flexWrap: 'wrap',
    },
    editBtn: {
        flex: 1,
        minWidth: '80px',
        padding: '8px',
        fontSize: '0.85rem',
        background: '#f0f0f0',
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
    },
    statusBtn: {
        flex: 1,
        minWidth: '100px',
        padding: '8px',
        fontSize: '0.85rem',
        background: 'var(--primary-color)',
        color: '#fff',
        textAlign: 'center',
    },
    deleteBtn: {
        padding: '8px 12px',
        fontSize: '0.85rem',
        background: '#fff',
        color: 'var(--error)',
        border: '1px solid var(--error)',
        whiteSpace: 'nowrap',
    }
};

// Mobile responsive styles
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .card-grid {
      grid-template-columns: 1fr !important;
    }
  }
  @media (max-width: 480px) {
    .card-actions {
      flex-direction: column !important;
    }
    .card-actions button {
      width: 100% !important;
      min-width: unset !important;
    }
  }
`;
if (!document.head.querySelector('style[data-dashboard]')) {
  style.setAttribute('data-dashboard', 'true');
  document.head.appendChild(style);
}

export default Dashboard;
