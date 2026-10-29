import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaTruck, FaUserShield, FaSignOutAlt, FaCog, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { admin, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav style={styles.nav}>
            <div className="container" style={styles.container}>
                <Link to="/" style={styles.logo} onClick={closeMobileMenu}>
                    <FaTruck style={{ marginRight: '10px' }} />
                    <span style={{ display: 'none' }} className="mobile-hide">TurboCourier</span>
                    <span className="mobile-show">TC</span>
                </Link>
                
                <button 
                    style={styles.mobileToggle}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="mobile-menu-toggle"
                >
                    {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                <div style={{ ...styles.links, ...(mobileMenuOpen ? styles.linksOpen : {}) }}>
                    <Link to="/" style={styles.link} onClick={closeMobileMenu}>Track</Link>
                    {admin ? (
                        <>
                            <Link to="/admin/dashboard" style={styles.link} onClick={closeMobileMenu}>Dashboard</Link>
                            <Link to="/admin/settings" style={styles.link} onClick={closeMobileMenu}>
                                <FaCog style={{ marginRight: '5px' }} color="var(--primary-color)" /> Settings
                            </Link>
                            <button onClick={handleLogout} style={styles.btn}>
                                <FaSignOutAlt style={{ marginRight: '5px' }} /> Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/admin/login" style={styles.link} onClick={closeMobileMenu}>
                            <FaUserShield style={{ marginRight: '5px' }} /> Admin
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        background: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '1rem 0',
        marginBottom: '2rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--primary-color)',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
    },
    mobileToggle: {
        display: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--primary-color)',
        fontSize: '1.5rem',
        zIndex: 1001,
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        transition: 'all 0.3s ease',
    },
    linksOpen: {
        position: 'absolute',
        top: '60px',
        left: 0,
        right: 0,
        background: '#fff',
        flexDirection: 'column',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        gap: '15px',
        alignItems: 'flex-start',
    },
    link: {
        color: 'var(--text-dark)',
        fontWeight: '500',
        transition: 'color 0.3s',
        display: 'flex',
        alignItems: 'center',
    },
    btn: {
        background: 'none',
        border: 'none',
        color: 'var(--text-dark)',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
    }
};

// Mobile menu button styling via CSS
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .mobile-menu-toggle {
      display: block !important;
    }
    .mobile-hide {
      display: none !important;
    }
    .mobile-show {
      display: inline !important;
    }
  }
  @media (min-width: 769px) {
    .mobile-menu-toggle {
      display: none !important;
    }
    .mobile-hide {
      display: inline !important;
    }
    .mobile-show {
      display: none !important;
    }
  }
`;
if (!document.head.querySelector('style[data-navbar]')) {
  style.setAttribute('data-navbar', 'true');
  document.head.appendChild(style);
}

export default Navbar;
