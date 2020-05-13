import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({query, inputChange, onSubmit}) => {
    return (<>
        <div className={styles.searchBox}>
        <input className={styles.searchInput} type="text" placeholder="Search" value={query} onChange={inputChange} onKeyPress={onSubmit}/>
            <button className={styles.searchButton} onClick={onSubmit}>
                <FontAwesomeIcon icon={faSearch}/>
            </button>
        </div>
    </>);
};

Searchbar.propTypes = {
    query: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inputChange: PropTypes.func,
    onSubmit: PropTypes.func,
}

export default Searchbar;