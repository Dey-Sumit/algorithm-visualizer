import React from 'react';
import './sidebar.css'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar__wrapper">
            <div className="sidebar">
                <div className="home">
                    <Link to="/">
                        <i class="fa fa-home"></i>
                    </Link>
                </div>
                <ul>
                    <Link to="/sorting">
                        <li><i class="fa fa-signal"></i></li>
                    </Link>

                    <Link to="/path-finder">
                        <li className="sidebar__link-active">
                            <i class="fa fa-search-location"></i>
                        </li>
                    </Link>
                    <Link to="/algorithm-art">

                        <i class="fa fa-rocket"></i>
                    </Link>

                </ul>

                <div className="sidebar__social">
                    <a href="https://github.com/Dey-Sumit/algorithm-visualizer" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;