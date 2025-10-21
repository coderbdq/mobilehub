const styles = {
    adminWrapper: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' },
    sidebar: { width: '260px', backgroundColor: '#212529', color: 'white', position: 'relative' },
    sidebarHeader: { padding: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', borderBottom: '1px solid #495057' },
    navList: { listStyle: 'none', padding: '1rem 0' },
    navLink: { display: 'flex', alignItems: 'center', gap: '1rem', color: 'rgba(255, 255, 255, 0.7)', padding: '0.9rem 1.5rem', textDecoration: 'none', transition: 'background-color 0.2s, color 0.2s' },
    navLinkActive: { backgroundColor: '#0d6efd', color: 'white' },
    content: { flexGrow: 1, padding: '2.5rem' },
    logoutButton: { position: 'absolute', bottom: '20px', left: '20px', width: 'calc(260px - 40px)' },
    productImage: { width: '60px', height: '60px', objectFit: 'cover', borderRadius: '0.25rem' }
};

export default styles;
