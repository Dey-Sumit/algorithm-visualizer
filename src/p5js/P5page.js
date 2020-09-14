import React, { useEffect, useState } from 'react';
import './p5page.css'
import { motion } from 'framer-motion'
import Feedback from '../feedback/Feedback';
import ReportsList from '../reports_list/ReportsList';
import { variants } from '../framer motion/variants';

const P5page = () => {

    return (
        <motion.div className="p5page"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit">

            <div className="todo text-center">
                <h4 className="todo__title">  🚀 In the next update  🚀</h4>
                <h5>Ever tried making art with algorithm !! No? </h5>
                <h5>P5 js implementations coming soon :)</h5>
                <h5>Full Screen Mode</h5>
                <h5>Art with recursion</h5>
                <h5>Add 🎵 during the sorting </h5>
                <h5>implement other Sorting and Searching algorithms</h5>
                <h5>About me 👦 and this project</h5>
                <h5>Populate Articles section with something more interesting 🚀</h5>
            </div>
            <Feedback />
            <ReportsList />

        </motion.div>
    );
};

export default P5page;