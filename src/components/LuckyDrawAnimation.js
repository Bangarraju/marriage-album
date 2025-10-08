import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { styles } from './styles';


export default function LuckyDrawAnimation({onClose}) {

    const [showWinner, setShowWinner] = useState(false);
    const [winnerName, setWinnerName] = useState('');

    // Example function to pick a random winner
    function pickWinner() {
        setWinnerName("Prasad");
        setShowWinner(true);
    }

    useEffect(() => {
        pickWinner();
    }, [])

    return (
        <div>
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
                            <p style={{ color: '#666', marginBottom: '1rem' }}>You Won ₹ 1 Crore!</p>
                            <p style={{ color: '#666', marginBottom: '1rem' }}>Ekkuva alochinchakunda close cheii 😜!</p>
                            <button style={styles.primaryButton} onClick={() => {setShowWinner(false); onClose()}}>Close</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

}