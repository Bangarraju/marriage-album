// Wedding Gift React App - with Congratulations Screen for Winner

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  '/images/wed1.jpg',
  '/images/wed2.jpg',
  '/images/wed3.jpg',
  '/images/wed4.jpg'
];

export default function App() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('friend@okaxis');
  const [message, setMessage] = useState('Best wishes for your married life!');
  const [showWinner, setShowWinner] = useState(false);
  const [winnerName, setWinnerName] = useState('');

  function makeUpiLink({ pa, pn, am, tn }) {
    const params = new URLSearchParams({ pa, pn, am: am || '', tn: tn || '', cu: 'INR' });
    return `upi://pay?${params.toString()}`;
  }

  function openUpiApp() {
    if (!upiId) return alert('Please enter a UPI ID (e.g., friend@okaxis)');
    if (!amount || isNaN(amount) || Number(amount) <= 0) return alert('Enter a valid amount');
    const link = makeUpiLink({ pa: upiId, pn: name || 'Friend', am: amount, tn: message });
    window.location.href = link;
  }

  // Example function to pick a random winner
  function pickWinner() {
    const sampleNames = ['Rahul', 'Sneha', 'Amit', 'Neha', 'Kiran', 'Arjun'];
    const lucky = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    setWinnerName(lucky);
    setShowWinner(true);
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
          🌸 Wedding Gift Portal
        </motion.h1>
        <p style={styles.subtitle}>Send your love & wishes with a fun gallery ✨</p>
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
            <h2 style={{ textAlign: 'center' }}>Send a Gift 🎁</h2>

            <label style={styles.label}>Your name (optional)</label>
            <input style={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />

            <label style={styles.label}>Amount (INR)</label>
            <input style={styles.input} type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" />

            <label style={styles.label}>Recipient UPI ID</label>
            <input style={styles.input} value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="e.g. friend@okaxis" />

            <label style={styles.label}>Message</label>
            <input style={styles.input} value={message} onChange={e => setMessage(e.target.value)} placeholder="Your wishes" />

            <div style={styles.actions}>
              <button style={styles.primaryButton} onClick={openUpiApp}>Open UPI app</button>
              <button style={styles.ghostButton} onClick={() => {
                const link = makeUpiLink({ pa: upiId, pn: name || 'Friend', am: amount, tn: message });
                navigator.clipboard.writeText(link).then(() => alert('UPI link copied to clipboard'));
              }}>Copy Link</button>
              <button style={styles.luckyButton} onClick={pickWinner}>🎉 Pick Lucky Draw Winner</button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>Made with ❤️ for your special day. Replace images in <code>/public/images</code>.</p>
      </footer>

      <AnimatePresence>
        {showWinner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.overlay}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120 }}
              style={styles.winnerCard}
            >
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🎊 Congratulations! 🎊</h2>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{winnerName}</p>
              <p style={{ color: '#666', marginBottom: '1rem' }}>is the Lucky Draw Winner!</p>
              <button style={styles.primaryButton} onClick={() => setShowWinner(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  page: { fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', background: 'linear-gradient(180deg,#fffaf0,#fff)', color: '#111', display: 'flex', flexDirection: 'column' },
  header: { textAlign: 'center', padding: '2rem 1rem' },
  title: { margin: 0, fontSize: '1.8rem' },
  subtitle: { marginTop: 8, color: '#666', fontSize: '0.95rem' },
  main: { display: 'grid', gridTemplateColumns: '1fr', gap: 24, padding: '1rem', maxWidth: 1100, margin: '0 auto', width: '100%' },
  gallery: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 },
  card: { height: 180, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' },
  formSection: { display: 'flex', justifyContent: 'center' },
  formCard: { width: '100%', maxWidth: 420, padding: 18, borderRadius: 12, background: 'rgba(255,255,255,0.95)', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' },
  label: { display: 'block', marginTop: 10, color: '#444', fontSize: '0.9rem' },
  input: { width: '100%', padding: '10px 12px', marginTop: 6, borderRadius: 8, border: '1px solid #e6e6e6', fontSize: 15, boxSizing: 'border-box' },
  actions: { display: 'flex', gap: 8, marginTop: 12, flexDirection: 'column' },
  primaryButton: { padding: '12px 14px', borderRadius: 10, border: 'none', background: 'linear-gradient(90deg,#ff7a7a,#ffb47a)', color: '#fff', cursor: 'pointer', fontSize: '1rem' },
  ghostButton: { padding: '12px 14px', borderRadius: 10, border: '1px solid #ddd', background: 'transparent', cursor: 'pointer', fontSize: '1rem' },
  luckyButton: { padding: '12px 14px', borderRadius: 10, background: 'linear-gradient(90deg,#7aff9b,#7ac7ff)', border: 'none', cursor: 'pointer', fontSize: '1rem', color: '#111', fontWeight: 600 },
  footer: { textAlign: 'center', padding: '2rem 1rem', color: '#666', fontSize: '0.85rem' },
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 },
  winnerCard: { background: '#fff', padding: '2rem', borderRadius: 16, textAlign: 'center', maxWidth: 340, width: '90%', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }
};
