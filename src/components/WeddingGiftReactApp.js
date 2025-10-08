// Wedding Gift React App (single-file preview component)
// Default export: App component

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { styles } from './styles';

// Replace these images in /public/images with your own high-res wedding photos
const IMAGES = [
    '/images/image1.jpeg',
    '/images/image2.jpeg',
    '/images/image3.jpeg',
    '/images/image4.jpeg',
    '/images/image5.jpeg',
    '/images/image6.jpeg',
];

export default function WeddingGiftReactApp() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('friend@okaxis');
  const [message, setMessage] = useState('Best wishes for your married life!');
  

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

        {/* <section style={styles.formSection}>
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
            </div>
          </motion.div>
        </section> */}
      </main>

      <footer style={styles.footer}>
        <p>Made with ❤️ for your special delay.</p>
      </footer>

    </div>
  );
}

