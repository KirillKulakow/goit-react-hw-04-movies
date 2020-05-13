import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation, Switch, Route } from "react-router-dom";
import styles from './OpenedMovie.module.css';
import { GetAllInfoMovie } from '../../helpers/fetchAxios';
import Loader from '../../components/Loader/Loader';
import CastMovie from '../CastMovie/CastMovie';
import ReviewsMovie from '../ReviewsMovie/ReviewsMovie';
import { routes } from '../../helpers/path';

const OpenedMovie = () => {
    const [singleMovie, setSingleMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [locateFrom, setLocateFrom] = useState({});

    const movieName = useParams().id;
    const history = useHistory();
    const locationState = useLocation();

    useEffect(() => {
        const item = locationState;
        if(!item.state){
            return
        }
        console.log(item.state.from);
        setLocateFrom(item.state.from);
    },[]);

    useEffect(() => {
        GetAllInfoMovie(movieName)
          .then((response) => setSingleMovie(response.data))
          .catch(err => console.log(err))
          .finally(() => setLoading(false));
    }, [movieName]);

    const goBack = () => {
        if(!locateFrom){
            return
        }
        history.push({...locateFrom})
    };

    const showCast = () => {
        history.push(`${routes.MOVIES}/${movieName}${routes.MOVIE_CAST}`);
    };

    const showReviews = () => {
        history.push(`${routes.MOVIES}/${movieName}${routes.MOVIE_REVIEWS}`);
    };

    const {
        title,
        poster_path,
        vote_average,
        overview,
        genres, 
    } = singleMovie;

    return (
        loading ?
        <Loader/>
         : 
        <>
        <div className={styles.container}>
            <button className={styles.btn_goback} onClick={goBack}>Назад</button>
            <div className={styles.info__container}>
                <img className={styles.poster_img} src={!poster_path ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnHUvOZ0ahmo-ojDPo8Q3Z8LBDWn_cMc2lP7K-y1CO9lgAuA1GPA&s' : `https://image.tmdb.org/t/p/original${poster_path}`} alt={title}/>
                <div className={styles.info_content}>
                    <h3 className={styles.title_movie}>{title}</h3>
                    <p className={styles.user_rate}>Пользовательский рейтинг: {vote_average}%</p>
                    <h4 className={styles.title}>Краткий обзор:</h4>
                    <p className={styles.overview_txt}>{overview}</p>
                    <h4 className={styles.title}>Жанры:</h4>
                    <ul className={styles.list}>
                        {genres.map((item) => (<li className={styles.genres_item} key={item.id}>{item.name}</li>))}
                    </ul>
                </div>
            </div>
            <div className={styles.other_container}>
                <h4>Дополнительная информация:</h4>
                <ul className={styles.list}>
                    <li>
                        <p onClick={showCast}>Актерский состав</p>
                    </li>
                    <li>
                        <p onClick={showReviews}>Обзоры</p>
                    </li>
                </ul>
            </div>
        </div>
        <Switch>
            <Route path={`${routes.MOVIES}/${movieName}${routes.MOVIE_CAST}`} 
            render={((props) => <CastMovie {...props} movieName={movieName}/>)}/>
            <Route path={`${routes.MOVIES}/${movieName}${routes.MOVIE_REVIEWS}`}
            render={((props) => <ReviewsMovie {...props} movieName={movieName}/>)}/>
        </Switch>
      </>
    );
};

export default OpenedMovie;