// Wedding Gift React App (single-file preview component)
// Default export: App component

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Replace these images in /public/images with your own high-res wedding photos
const IMAGES = [
    '/images/image1.jpeg',
    '/images/image2.jpeg',
    '/images/image3.jpeg',
    '/images/image4.jpeg',
    '/images/image5.jpeg',
    '/images/image6.jpeg',
];

export default function WeddingGifftReactApp() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [upiId, setUpiId] = useState('friend@okaxis'); // default sample
    const [message, setMessage] = useState('Best wishes for your married life!');

    function makeUpiLink({ pa, pn, am, tn }) {
        // Construct a UPI deep link that opens GPay/UPI apps on mobile.
        // Note: on desktop, this will do nothing or prompt to open an app.
        const params = new URLSearchParams({
            pa, // payee address (UPI ID)
            pn, // payee name
            am: am || '',
            tn: tn || '',
            cu: 'INR'
        });
        return `upi://pay?${params.toString()}`;
    }

    function openUpiApp() {
        if (!upiId) return alert('Please enter a UPI ID (e.g., friend@okaxis)');
        if (!amount || isNaN(amount) || Number(amount) <= 0) return alert('Enter a valid amount');
        const link = makeUpiLink({ pa: upiId, pn: name || 'Friend', am: amount, tn: message });
        // Attempt to open the UPI link (on mobile this will open Google Pay / other UPI app)
        window.location.href = link;
    }

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <motion.h1
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 80 }}
                    style={styles.title}
                >
                    🌸 Send Wedding Wishes & Gift
                </motion.h1>
                <p style={styles.subtitle}>A fun animated gallery + simple UPI request link for gifts</p>
            </header>

            <main style={styles.main}>
                <section style={styles.gallery}>
                    {IMAGES.map((src, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.06 }}
                            transition={{ duration: 0.4 }}
                            style={{ ...styles.card, backgroundImage: `url(${src})` }}
                        />
                    ))}
                </section>

                <section style={styles.formSection}>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        style={styles.formCard}
                    >
                        <h2>Send a gift (opens UPI app)</h2>

                        <label style={styles.label}>Your name (optional)</label>
                        <input style={styles.input} value={name} onChange={e => setName(e.target.value)} />

                        <label style={styles.label}>Amount (INR)</label>
                        <input style={styles.input} value={amount} onChange={e => setAmount(e.target.value)} />

                        <label style={styles.label}>Recipient UPI ID (GPay / UPI)</label>
                        <input style={styles.input} value={upiId} onChange={e => setUpiId(e.target.value)} />

                        <label style={styles.label}>Message</label>
                        <input style={styles.input} value={message} onChange={e => setMessage(e.target.value)} />

                        <div style={styles.actions}>
                            <button style={styles.primaryButton} onClick={openUpiApp}>Open UPI app to Pay</button>
                            <button style={styles.ghostButton} onClick={() => {
                                // Copy a prebuilt UPI link to clipboard
                                const link = makeUpiLink({ pa: upiId, pn: name || 'Friend', am: amount, tn: message });
                                navigator.clipboard.writeText(link).then(() => alert('UPI link copied to clipboard'));
                            }}>Copy UPI link</button>
                        </div>

                        <small style={{ color: '#666' }}>
                            Note: On desktop the UPI link may not open. Use a phone or scan the QR.
                        </small>
                    </motion.div>
                </section>
            </main>

            <footer style={styles.footer}>
                <p>Made with ❤️ — replace images in <code>/public/images</code> with your wedding photos.</p>
            </footer>
        </div>
    );
}

const styles = {
  page: {
    fontFamily: 'Inter, system-ui, sans-serif',
    minHeight: '100vh',
    background: 'linear-gradient(180deg,#fffaf0,#fff)',
    color: '#111',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    textAlign: 'center',
    padding: '2rem 1rem',
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
  },
  subtitle: {
    marginTop: 8,
    color: '#666',
    fontSize: '0.95rem',
  },
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 24,
    padding: '1rem',
    maxWidth: 1100,
    margin: '0 auto',
    width: '100%'
  },
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
    gap: 12
  },
  card: {
    height: 180,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
  },
  formSection: {
    display: 'flex',
    justifyContent: 'center',
  },
  formCard: {
    width: '100%',
    maxWidth: 420,
    padding: 18,
    borderRadius: 12,
    background: 'rgba(255,255,255,0.95)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
  },
  label: {
    display: 'block',
    marginTop: 10,
    color: '#444',
    fontSize: '0.9rem'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    marginTop: 6,
    borderRadius: 8,
    border: '1px solid #e6e6e6',
    fontSize: 15,
    boxSizing: 'border-box'
  },
  actions: {
    display: 'flex',
    gap: 8,
    marginTop: 12,
    flexDirection: 'column'
  },
  primaryButton: {
    padding: '12px 14px',
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(90deg,#ff7a7a,#ffb47a)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  ghostButton: {
    padding: '12px 14px',
    borderRadius: 10,
    border: '1px solid #ddd',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  footer: {
    textAlign: 'center',
    padding: '2rem 1rem',
    color: '#666',
    fontSize: '0.85rem'
  }
};
