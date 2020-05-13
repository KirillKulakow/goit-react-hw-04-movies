import React, { useState, useEffect } from 'react';
import './Home.css';
import { GetTrends } from '../../helpers/fetchAxios';
import MovieList from '../../components/MovieList/MovieList';
import MovieItem from '../../components/MovieItem/MovieItem';
import Loader from '../../components/Loader/Loader';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    const getList = () => {
        GetTrends(page)
        .then(res => setMovies(prev => [...prev, ...res.data.results])) 
        .catch(err => console.log(err))
        .finally(setIsLoading(false))
    };

    const nextPage = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        getList(page);
    },[page]);

    return (<>
            {isLoading ? 
            <Loader/>
             : 
            <MovieList>
                {movies.map((item) => (
                    <MovieItem key={item.id} id={item.id} poster_path={item.poster_path} title={item.title} name={item.name}/>
                ))}
                <button className='btn_more' onClick={nextPage}/>
            </MovieList>
        }
    </>
    );
};

export default Home;