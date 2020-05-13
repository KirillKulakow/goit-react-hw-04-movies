import React from 'react';
import styles from './MovieList.module.css';

const MovieList = ({children}) => {
    return (
        <ul className={styles.movies_list}>
            {children}
        </ul>
    );
};

export default MovieList;