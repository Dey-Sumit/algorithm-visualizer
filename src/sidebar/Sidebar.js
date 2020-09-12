import React from 'react';
import './sidebar.css'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
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
                        <i class="fa fa-bomb"></i>
                    </li>
                </Link>

                <li><i class="fa fa-rocket"></i>
                </li>

            </ul>

            <div className="sidebar__social">
                <i class="fa fa-github"></i>
            </div>
        </div>
    );
};

export default Sidebar;