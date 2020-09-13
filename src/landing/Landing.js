import React from 'react';
import './landing.css'
import { motion } from 'framer-motion'
import visualData from './../assets/15.png'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
        <motion.Container
            className="landing"
            variants={landing_variants}
            initial="hidden"
            animate="visible"
            exit="exit">
            <Row>
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
        </motion.Container>


    );
};

export default Landing;