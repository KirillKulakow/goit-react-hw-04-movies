import React, { useState, useEffect } from 'react';
import './Movies.css';
import { SearchMovie } from '../../helpers/fetchAxios';
import MovieList from '../../components/MovieList/MovieList';
import MovieItem from '../../components/MovieItem/MovieItem';
import Loader from '../../components/Loader/Loader';
import Searchbar from '../../components/Searchbar/Searchbar';
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { routes } from '../../helpers/path';
import queryString from "query-string";
import OpenedMovie from '../../components/OpenedMovie/OpenedMovie';

const Movies = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');

    const history = useHistory();
    const location = useLocation();

    const getList = async (search, bool) => {
        setIsLoading(true);
        await SearchMovie(search, page)
        .then(res => setMovies(prev => {
            if(bool){
                return res.data.results
            }
            return [...prev, ...res.data.results]
        })) 
        .catch(err => console.log(err))
        .finally(setIsLoading(false))
    };

    const inputChange = (e) => {
        if (!e.target.value) {
            setMovies([]);
        }
        setQuery(e.target.value);
    };

    const nextPage = () => {
        setPage(page + 1);
    };

    const onSubmit = (e) => {
        if (e.key === "Enter" || e.nativeEvent.type === 'click') {
            history.push({...location, search: `?query=${query}`});
            setQuery('');
        }
    };

    useEffect(() => {
        const movie = queryString.parse(location.search).query;
        if(!movie){
            return
        }
        getList(movie, true);
    },[location.search]);

    useEffect(() => {
        const movie = queryString.parse(location.search).query;
        if(page !== 1){
            getList(movie, false);
        }
    },[page]);

    return (
        <>
        {props.match.isExact && <Searchbar query={query} inputChange={inputChange} onSubmit={onSubmit}/>}
        {isLoading ? <Loader/> : !movies[0] || !props.match.isExact ? <></> : <MovieList>
                {movies.map((item) => (
                    <MovieItem key={item.id} {...item}/>
                ))}
                <button className='btn_more' onClick={nextPage}/>
            </MovieList>
        }
        <Switch>
            <Route path={routes.MOVIE_DETAILS} component={OpenedMovie}/>
        </Switch>
        </>
    );
};

export default Movies;