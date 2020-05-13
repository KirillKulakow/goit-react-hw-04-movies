import React from 'react';
import styles from './Navbar.module.css'
import {NavLink} from 'react-router-dom';
import {routes} from '../../helpers/path';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbar_nav}>
                <li className={styles.navbar_item}>
                    <NavLink exact to={routes.HOME} className={styles.nav_link}>
                        Home
                    </NavLink>
                </li>
                <li className={styles.navbar_item}>
                    <NavLink to={routes.MOVIES} className={styles.nav_link}>
                        Movies
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;