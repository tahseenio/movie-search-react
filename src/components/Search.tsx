import React, { useState, useEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import MovieBoiler from './ui/MovieBoiler';

import NoResult from '../assets/noresult.svg';
import axios from 'axios';

export default function Search() {
  // TODO: make code cleaner
  const [Movie, setMovie] = useState<string>('');
  const [data, setData] = useState<any>([]);
  const [Loading, setLoading] = useState(true);

  const SearchBarInput = useRef('');

  const API_KEY = process.env.REACT_APP_API_KEY;
  const POPULAR_URL = `https://movie-search-server.vercel.app/popular`;
  const TRENDING_URL = `https://movie-search-server.vercel.app/trending`;
  const TOP_RATED_URL = `https://movie-search-server.vercel.app/toprated`;

  const [searchUrl, setSearchUrl] = useState(POPULAR_URL);

  function handleChange(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.currentTarget.value === '') {
      setSearch(POPULAR_URL);
    }
    if (event.currentTarget.value.replace(/\s/g, '') === '') return;
    if (event.currentTarget.value) {
      setMovie(event.currentTarget.value);
      setsearchResult(`Search Result: ${event.currentTarget.value}`);
    }
  }

  const handleChange2 = (event: string) => {
    if (event === '') {
      setSearch(POPULAR_URL);
    }
    if (event.replace(/\s/g, '') === '') return;
    if (event) {
      setMovie(event);
      setsearchResult(`Search Result: ${event}`);
    }
  };

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
    const SEARCHED_URL = `https://movie-search-server.vercel.app/searched?movie=${Movie}`;

    async function fetchData() {
      if (Movie !== '') {
        setLoading(true);
        setSearch('');
        const { data } = await axios.get(SEARCHED_URL);
        setData(data.results);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Movie]);

  useEffect(() => {
    if (data.length > 0) {
      (document.getElementById('movie-filter') as HTMLInputElement).value =
        'DEFAULT';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Movie, searchUrl]);

  function setSearch(value: string) {
    setSearchUrl(value);
    changeResult(value);
  }

  function filterMovies(filter: string) {
    if (filter === 'HIGH_TO_LOW') {
      setData(
        data.slice().sort((a: any, b: any) => b.vote_average - a.vote_average)
      );
    }
    if (filter === 'LOW_TO_HIGH') {
      setData(
        data.slice().sort((a: any, b: any) => a.vote_average - b.vote_average)
      );
    }
  }

  function changeResult(searchUrl: string) {
    if (searchUrl === POPULAR_URL) {
      setsearchResult('Showing Popular Movies');
    } else if (searchUrl === TRENDING_URL) {
      setsearchResult('Showing Trending Movies');
    } else if (searchUrl === TOP_RATED_URL) {
      setsearchResult('Showing Top Rated Movies');
    }
  }

  const [searchResult, setsearchResult] = useState('Showing Popular Movies');

  function currentSearch(event: React.ChangeEvent<HTMLInputElement>) {
    SearchBarInput.current = event.target.value;
  }

  return (
    <>
      <main>
        <header>
          <div className='row'>
            <div className='container header__container'>
              <h1 className='header__title'>
                The best place to search for your favourite {'  '}
                <span className='text--blue'>movie</span>
              </h1>
              <p className='header__para'>
                Find your <span className='text--blue'>movie</span> now!
              </p>
              <div className='search-bar--wrapper'>
                <input
                  className='search-bar'
                  type='text'
                  name='searchbar'
                  placeholder='Search for a movie...'
                  onChange={(e) => currentSearch(e)}
                  onKeyUp={(event) =>
                    event.key === 'Enter' && handleChange(event)
                  }
                />
                <span
                  className='search-bar__btn'
                  onClick={() => handleChange2(SearchBarInput.current)}
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
                {data.length !== 0
                  ? data.map((elem: any) => (
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
