import React from 'react';
import './landing.css'
import { motion } from 'framer-motion'
import visualData from './../assets/15.png'
import coder from './../assets/blogging 1.png'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { variants } from '../framer motion/variants';
const Landing = () => {
    return (
        <motion.div
            className="landing"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit">
            <Row className="landing__first">
                <Col xs={12} md={6} className="landing__left">

                    <div className="landing__text">
                        <h6 className="landing__text-top"> Get bored of algorithms :( It's actually entertaining  </h6>
                        Welcome to <span className="landing__text-title">Algorithm Playground</span>
                        <span className="landing__text-sub__title"> where we will make them dance :)</span>
                    </div>

                    <div className="landing__buttons">
                        <Link to="/sorting">
                            <button>Sort the <span className="strikeout"> career</span> list</button>
                        </Link>
                        <Link to="/path-finder">
                            <button className="landing__buttons-path">Find my
                             <span className="strikeout"> girlfriend</span> path</button>
                        </Link>
                    </div>
                </Col>
                <Col xs={12} md={6} className="landing__right">
                    <img src={visualData} alt="" className="landing__image" />
                </Col>
            </Row>
            <h1 className="landing__second-header">Who am I?</h1>
            <Row className="landing__second">

                <Col xs={12} md={6} className="landing__left">
                    <img src={coder} alt="" className="landing__image" />

                </Col>
                <Col xs={12} md={6} className="landing__right">
                    <a href="https://sumitdey.netlify.app/" target="_blank" rel="noopener noreferrer">
                        <button className="landing__buttons-portfolio">

                            Check out my portfolio here</button>
                    </a>
                </Col>
            </Row>

        </motion.div>


    );
};

export default Landing;