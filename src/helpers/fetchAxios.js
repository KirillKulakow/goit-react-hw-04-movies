import axios from 'axios';

const BASEURL = 'https://api.themoviedb.org/3';
const TrendsTask = '/trending/movie/day';
const SearchTask = '/search/movie';
const AllInfo = '/movie/'
const LangContext = '&language=ru';
const LangImage = '&include_image_language=ru';
const KEY = '?api_key=4560354d169f694c24eefdb5253cf74b';


const GetTrends = (page) => {
    return axios.get(`${BASEURL}${TrendsTask}${KEY}${LangContext}${LangImage}&page=${page}`)
};
const SearchMovie = (query, page) => {
    return axios.get(`${BASEURL}${SearchTask}${KEY}${LangContext}${LangImage}&query=${query}&page=${page}`)
};
const GetAllInfoMovie = (id) => {
    return axios.get(`${BASEURL}${AllInfo}${id}${KEY}${LangContext}${LangImage}`)
};
const GetMovieCredits = (id) => {
    return axios.get(`${BASEURL}${AllInfo}${id}/credits${KEY}${LangContext}${LangImage}`)
};
const GetMovieReviews = (id) => {
    return axios.get(`${BASEURL}${AllInfo}${id}/reviews${KEY}`)
};

export {GetTrends, SearchMovie, GetAllInfoMovie, GetMovieCredits, GetMovieReviews};
