import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaGlobeAmericas, FaBoxOpen, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Home = () => {
    const [trackingId, setTrackingId] = useState('');
    const navigate = useNavigate();

    const handleTrack = (e) => {
        e.preventDefault();
        if (trackingId.trim()) {
            navigate(`/track/${trackingId}`);
        }
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={styles.heroTitle}
                    >
                        Fast, Secure & <span style={{ color: 'var(--secondary-color)' }}>Reliable</span> Delivery
                    </motion.h1>
                    <p style={styles.heroSubtitle}>Global logistics partner you can trust.</p>

                    <motion.form
                        onSubmit={handleTrack}
                        style={styles.searchForm}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <input
                            type="text"
                            placeholder="Enter Tracking ID (e.g. CRS-2026...)"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                            style={styles.searchInput}
                        />
                        <button type="submit" className="btn btn-primary" style={styles.searchBtn}>
                            <FaSearch /> Track
                        </button>
                    </motion.form>
                </div>
            </section>

            {/* Stats Section */}
            <section style={styles.statsSection}>
                <div className="container" style={styles.statsContainer}>
                    <StatCard number="1M+" label="Deliveries" />
                    <StatCard number="150+" label="Countries" />
                    <StatCard number="99%" label="Satisfaction" />
                </div>
            </section>

            {/* Services Section */}
            <section className="container" style={{ padding: '4rem 0' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>Our Services</h2>
                <div style={styles.servicesGrid}>
                    <ServiceCard
                        icon={<FaBoxOpen size={40} color="var(--primary-color)" />}
                        title="Express Delivery"
                        desc="Same-day delivery for urgent parcels."
                    />
                    <ServiceCard
                        icon={<FaGlobeAmericas size={40} color="var(--secondary-color)" />}
                        title="International Shipping"
                        desc="Reliable shipping to over 150 countries."
                    />
                    <ServiceCard
                        icon={<FaShieldAlt size={40} color="#28a745" />}
                        title="Secure Handling"
                        desc="Insured and secure handling for valuable goods."
                    />
                </div>
            </section>
        </div>
    );
};

const StatCard = ({ number, label }) => (
    <div style={styles.statCard}>
        <div style={styles.statNumber}>{number}</div>
        <div style={styles.statLabel}>{label}</div>
    </div>
);

const ServiceCard = ({ icon, title, desc }) => (
    <motion.div
        className="card"
        whileHover={{ y: -10 }}
        style={styles.serviceCard}
    >
        <div style={{ marginBottom: '1rem' }}>{icon}</div>
        <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: '#666' }}>{desc}</p>
    </motion.div>
);

const styles = {
    hero: {
        background: 'linear-gradient(rgba(0,45,114,0.9), rgba(0,45,114,0.7)), url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        padding: '6rem 20px',
        textAlign: 'center',
        borderRadius: '12px',
        marginBottom: '2rem',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
    },
    heroContent: {
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
    },
    heroTitle: {
        fontSize: '3rem',
        marginBottom: '1rem',
        fontWeight: '800',
        lineHeight: '1.2',
    },
    heroSubtitle: {
        fontSize: '1.2rem',
        marginBottom: '2rem',
        opacity: 0.9,
    },
    searchForm: {
        display: 'flex',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        borderRadius: '8px',
        overflow: 'hidden',
        flexWrap: 'wrap',
    },
    searchInput: {
        flex: 1,
        minWidth: '200px',
        padding: '1.2rem',
        border: 'none',
        fontSize: '1rem',
        outline: 'none',
    },
    searchBtn: {
        borderRadius: '0',
        padding: '0 2rem',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        whiteSpace: 'nowrap',
    },
    statsSection: {
        background: '#fff',
        padding: '3rem 20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        marginBottom: '2rem',
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '20px',
    },
    statCard: {
        textAlign: 'center',
        flex: 1,
        minWidth: '150px',
    },
    statNumber: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: 'var(--primary-color)',
    },
    statLabel: {
        color: '#666',
        fontWeight: '500',
        marginTop: '0.5rem',
        fontSize: '0.95rem',
    },
    servicesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
    },
    serviceCard: {
        textAlign: 'center',
        padding: '2rem',
    }
};

// Mobile responsive styles
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .home-page {
      overflow-x: hidden;
    }
  }
  @media (max-width: 480px) {
    .hero-title {
      font-size: 2rem !important;
    }
    .hero-subtitle {
      font-size: 1rem !important;
    }
    .search-form {
      flex-direction: column !important;
    }
    .search-input {
      border-radius: 8px 8px 0 0;
    }
    .search-btn {
      border-radius: 0 0 8px 8px;
      width: 100% !important;
    }
    .stat-number {
      font-size: 2rem !important;
    }
  }
`;
if (!document.head.querySelector('style[data-home]')) {
  style.setAttribute('data-home', 'true');
  document.head.appendChild(style);
}

export default Home;
