import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { FaBox, FaMapMarkerAlt, FaClock, FaCheckCircle, FaTruck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TrackResult = () => {
    const { id } = useParams();
    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShipment = async () => {
            try {
                const { data } = await api.get(`/track/${id}`);
                setShipment(data);
            } catch (err) {
                setError('Tracking ID not found. Please check your ID and try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchShipment();
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Loading...</div>;
    if (error) return (
        <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--error)' }}>{error}</h2>
            <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>Go Back</Link>
        </div>
    );

    return (
        <div className="container fade-in" style={{ padding: '2rem 0' }}>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={styles.header}>
                    <div>
                        <h2 style={{ color: 'var(--primary-color)' }}>Tracking: {shipment.trackingId}</h2>
                        <p style={{ color: '#666' }}>Status: <strong>{shipment.currentStatus}</strong></p>
                    </div>
                </div>

                <div style={styles.timeline}>
                    {shipment.history.slice().reverse().map((event, index) => (
                        <motion.div
                            key={index}
                            style={styles.timelineItem}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div style={styles.timelineIcon}>
                                {index === 0 ? <FaTruck size={14} /> : <FaCheckCircle size={14} />}
                            </div>
                            <div style={styles.timelineContent}>
                                <div style={styles.date}>
                                    {new Date(event.timestamp).toLocaleString()}
                                </div>
                                <h4>{event.status}</h4>
                                <p style={{ color: '#555' }}>{event.message}</p>
                                <div style={styles.location}>
                                    <FaMapMarkerAlt size={12} style={{ marginRight: '5px' }} /> {event.location}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div style={styles.infoGrid}>
                    <div style={styles.infoBox}>
                        <h4>Sender</h4>
                        <p>{shipment.sender.name}</p>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>{shipment.sender.address}</p>
                    </div>
                    <div style={styles.infoBox}>
                        <h4>Receiver</h4>
                        <p>{shipment.receiver.name}</p>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>{shipment.receiver.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    header: {
        borderBottom: '1px solid #eee',
        paddingBottom: '1.5rem',
        marginBottom: '2rem',
    },
    timeline: {
        position: 'relative',
        paddingLeft: '30px',
        borderLeft: '2px solid #eee',
        marginLeft: '20px',
        marginBottom: '2rem',
    },
    timelineItem: {
        position: 'relative',
        marginBottom: '2rem',
    },
    timelineIcon: {
        position: 'absolute',
        left: '-39px',
        top: '0',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: 'var(--primary-color)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        flexShrink: 0,
    },
    timelineContent: {
        background: '#f9f9f9',
        padding: '1rem',
        borderRadius: '8px',
        wordBreak: 'break-word',
    },
    date: {
        fontSize: '0.85rem',
        color: '#999',
        marginBottom: '0.5rem',
    },
    location: {
        marginTop: '0.5rem',
        fontSize: '0.9rem',
        color: 'var(--secondary-color)',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
    },
    infoBox: {
        wordBreak: 'break-word',
    }
};

// Mobile responsive styles
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .timeline {
      margin-left: 10px !important;
      padding-left: 25px !important;
    }
    .timeline-icon {
      left: -35px !important;
      width: 25px !important;
      height: 25px !important;
      font-size: 0.8rem !important;
    }
    .info-grid {
      grid-template-columns: 1fr !important;
    }
  }
  @media (max-width: 480px) {
    .timeline {
      margin-left: 0 !important;
      padding-left: 20px !important;
    }
    .timeline-icon {
      left: -30px !important;
      width: 20px !important;
      height: 20px !important;
    }
    .timeline-content {
      padding: 0.75rem !important;
    }
  }
`;
if (!document.head.querySelector('style[data-track-result]')) {
  style.setAttribute('data-track-result', 'true');
  document.head.appendChild(style);
}

export default TrackResult;
