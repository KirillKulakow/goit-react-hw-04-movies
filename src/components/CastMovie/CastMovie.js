import React, { useState, useEffect } from 'react';
import { GetMovieCredits } from '../../helpers/fetchAxios';
import styles from './CastMovie.module.css';
import Loader from '../../components/Loader/Loader';
import PropTypes from 'prop-types';

const CastMovie = ({movieName}) => {
    const [credits, setCredits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetMovieCredits(movieName)
          .then((response) => setCredits(response.data.cast))
          .catch(err => console.log(err))
          .finally(() => setLoading(false));
    }, []);
    
    return (
        loading ?
        <Loader/>
        :
        <div className={styles.container}>
            <ul className={styles.list}>
                {credits.map((item) => (
                    <li key={item.cast_id} className={styles.item}>
                        <img className={styles.img_actor} src={!item.profile_path ? 'https://novi-vorota.com.ua/catalog/view/theme/novivorota/images/notfound.png' : `https://image.tmdb.org/t/p/original${item.profile_path}`} alt={item.name}/>
                        <h4 className={styles.title}>Актёр:</h4>
                        <p className={styles.info}>{item.name}</p>
                        <h4 className={styles.title}>Роль:</h4>
                        <p className={styles.info}>{item.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

CastMovie.propTypes = {
    movieName: PropTypes.string,
};

export default CastMovie;