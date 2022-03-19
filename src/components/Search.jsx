import React, { useState, useEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import MovieBoiler from './ui/MovieBoiler';

import LoadingState from './ui/LoadingState';
import NoResult from '../assets/noresult.svg';
import axios from 'axios';

export default function Search() {
  const [Movie, setMovie] = useState('');
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);

  const SearchBarInput = useRef('');

  const API_KEY = '***REMOVED***';
  const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
  const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

  const [searchUrl, setSearchUrl] = useState('');

  function handleChange(event) {
    if (event.replace(/\s/g, '') === '') return;
    if (event) {
      setMovie(event);
      setsearchResult(`Search Result: ${event}`);
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (searchUrl !== '') {
        setLoading(true);
        setMovie('');
        const { data } = await axios.get(searchUrl);
        setData(data.results);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    }
    fetchData();
  }, [searchUrl]);

  useEffect(() => {
    const SEARCHED_URL = `https://api.themoviedb.org/3/search/movie?api_key=***REMOVED***&language=en-US&query=${Movie}&page=1&include_adult=false`;

    async function fetchData() {
      if (Movie !== '') {
        setLoading(true);
        setSearch('');
        const { data } = await axios.get(SEARCHED_URL);
        setData(data.results);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Movie]);

  useEffect(() => {
    if (data.length > 0) {
      document.getElementById('movie-filter').value = 'DEFAULT';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Movie, searchUrl]);

  function setSearch(value) {
    setSearchUrl(value);
    changeResult(value);
  }

  function filterMovies(filter) {
    if (filter === 'HIGH_TO_LOW') {
      setData(data.slice().sort((a, b) => b.vote_average - a.vote_average));
    }
    if (filter === 'LOW_TO_HIGH') {
      setData(data.slice().sort((a, b) => a.vote_average - b.vote_average));
    }
  }

  function changeResult(searchUrl) {
    if (searchUrl === POPULAR_URL) {
      setsearchResult('Showing Popular Movies');
    } else if (searchUrl === TRENDING_URL) {
      setsearchResult('Showing Trending Movies');
    } else if (searchUrl === TOP_RATED_URL) {
      setsearchResult('Showing Top Rated Movies');
    }
  }

  const [searchResult, setsearchResult] = useState('');

  function currentSearch(event) {
    SearchBarInput.current = event;
  }

  return (
    <>
      <main>
        <header>
          <div className='row'>
            <div className='container header__container'>
              <h1 className='header__title'>
                The best place to search for your favourite{' '}
                <span className='text--blue'>movie</span>
              </h1>
              <p className='header__para'>
                Find your <span className='text--blue'>movie</span> now!
              </p>
              <div className='search-bar--wrapper'>
                <input
                  className='search-bar'
                  type='text'
                  placeholder='Search for a movie...'
                  onChange={(e) => currentSearch(e.target.value)}
                  onKeyUp={(event) =>
                    event.key === 'Enter' && handleChange(event.target.value)
                  }
                />
                <span
                  className='search-bar__btn'
                  onClick={() => handleChange(SearchBarInput.current)}
                >
                  <BsSearch />
                </span>
              </div>
              <ul className='header__search-options'>
                <li
                  className='search-option__link'
                  onClick={() => setSearch(POPULAR_URL)}
                >
                  Popular
                </li>
                <li
                  className='search-option__link'
                  onClick={() => setSearch(TRENDING_URL)}
                >
                  Trending
                </li>
                <li
                  className='search-option__link'
                  onClick={() => setSearch(TOP_RATED_URL)}
                >
                  Top Rated
                </li>
              </ul>
            </div>
          </div>
        </header>
        <section id='movie-page'>
          <div className='row'>
            <div className='movie__container'>
              <div className='movie__header'>
                <h2 className='movie__header-title'>{searchResult}</h2>
                {data.length > 0 && (
                  <select
                    name=''
                    defaultValue='DEFAULT'
                    id='movie-filter'
                    onChange={(e) => filterMovies(e.target.value)}
                  >
                    <option value='DEFAULT' disabled>
                      Sort
                    </option>
                    <option value='HIGH_TO_LOW'>Rating, High to Low</option>
                    <option value='LOW_TO_HIGH'>Rating, Low to High</option>
                  </select>
                )}
              </div>
              <div className='movies'>
                {data.length !== 0 //if data exists
                  ? Loading
                    ? new Array(20)
                      .fill(0)
                      .map((element, index) => <LoadingState key={index} />)
                    : data.map((elem) => (
                      <MovieBoiler info={elem} key={elem.id} />
                    ))
                  : data.length === 0 &&
                  !Loading && (
                    <div className='no-result'>
                      <p className='no-result__para'>
                        There are no movies based on your search result
                      </p>
                      <img className='no-result__img' src={NoResult} alt='' />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
