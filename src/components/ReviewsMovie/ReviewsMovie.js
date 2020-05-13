import React, { useState, useEffect } from 'react';
import { GetMovieReviews } from '../../helpers/fetchAxios';
import styles from './ReviewsMovie.module.css';
import Loader from '../../components/Loader/Loader';
import PropTypes from 'prop-types';

const ReviewsMovie = ({movieName}) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetMovieReviews(movieName)
          .then((response) => setReviews(response.data.results))
          .catch(err => console.log(err))
          .finally(() => setLoading(false));
    }, []);

    return (
        loading ?
        <Loader/>
        :
        !reviews ? 
        <p>Not Found</p> 
        :  
        <ul className={styles.container}>
            {reviews.map((item) => (
                <li className={styles.item} key={item.id}>
                    <h4>Author: {item.author}</h4>
                    <p>{item.content}</p>
                </li>
            ))}
            
        </ul>
    );
};

ReviewsMovie.propTypes = {
    movieName: PropTypes.string,
}

export default ReviewsMovie;