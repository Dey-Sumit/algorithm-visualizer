import React from 'react';
import './landing.css'
import { motion } from 'framer-motion'

const Landing = () => {
    const landing_variants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.2, duration: 0.6,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                ease: 'easeInOut'
            }
        }
    }
    return (
        <motion.div className="landing"
            variants={landing_variants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, in, dolorem et, eos fugit earum mollitia minima
                nesciunt offi</h4>
            <h2>Landing page</h2>
        </motion.div>
    );
};

export default Landing;