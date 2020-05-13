import React from 'react';
import styles from './MovieItem.module.css';
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const MovieItem = ({id, poster_path, title, name }) => {
    const location = useLocation();
    return (
        <li className={styles.movie__item}>
            <Link className={styles.link} to={{pathname: `/movies/${id}`, state: {from: location}}}>
                <img className={styles.movie__img} src={!poster_path ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnHUvOZ0ahmo-ojDPo8Q3Z8LBDWn_cMc2lP7K-y1CO9lgAuA1GPA&s' : `https://image.tmdb.org/t/p/original${poster_path}`} alt={title}/>
                <p className={styles.movie__title}>{!title ? name : title}</p>
            </Link>
        </li>
    );
};

MovieItem.propTypes = {
    id: PropTypes.number,
    poster_path: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string
}

export default MovieItem;