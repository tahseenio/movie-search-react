import React, { useState, useEffect, useRef } from 'react';
import { BsSearch } from "react-icons/bs";
import MovieBoiler from './ui/MovieBoiler'

import movieBanner from '../assets/movie_banner.jpg'
import LoadingState from './ui/LoadingState';

export default function Search() {
  const [Movie, setMovie] = useState('')
  const [data, setData] = useState(undefined)
  const [Loading, setLoading] = useState(true)

  const SearchBarInput = useRef('')

  const API_KEY = '***REMOVED***'
  const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
  const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  const SEARCHED_URL = `https://api.themoviedb.org/3/search/movie?api_key=***REMOVED***&language=en-US&query=${Movie}&page=1&include_adult=false`

  const [searchUrl, setSearchUrl] = useState('')

  function handleChange(event) {
    if (event) {
      setMovie(event)
      setsearchResult(`Search Result: ${event}`)
    }
  }

  useEffect(async () => {
    if (searchUrl !== '') {
      setLoading(true)
      setMovie('')
      const promise = await fetch(searchUrl)
      const { results } = await promise.json()
      setData(results)
      console.log(results)
      setTimeout(() => {
        setLoading(false)
      }, 300);
    }

  }, [searchUrl])

  useEffect(async () => {
    if (Movie !== '') {
      setLoading(true)
      setSearch('')
      const promise = await fetch(SEARCHED_URL)
      const { results } = await promise.json()
      setData(results)
      console.log(results)
      setTimeout(() => {
        setLoading(false)
      }, 300);
    }
  }, [Movie])

  useEffect(() => {
    if (data) {
      document.getElementById('movie-filter').value = 'DEFAULT'
    }
  }, [Movie, searchUrl])

  function setSearch(value) {
    setSearchUrl(value)
    changeResult(value)
  }

  function filterMovies(filter) {
    if (filter === "HIGH_TO_LOW") {
      setData(data.slice().sort((a, b) => (b.vote_average - a.vote_average)))
    }
    if (filter === "LOW_TO_HIGH") {
      setData(data.slice().sort((a, b) => (a.vote_average - b.vote_average)))
    }
  }

  function changeResult(searchUrl) {
    if (searchUrl === POPULAR_URL) {
      setsearchResult("Showing Popular Movies")
    }
    else if (searchUrl === TRENDING_URL) {
      setsearchResult("Showing Trending Movies")
    }
    else if (searchUrl === TOP_RATED_URL) {
      setsearchResult("Showing Top Rated Movies")
    }
  }

  const [searchResult, setsearchResult] = useState(undefined)

  function currentSearch(event) {
    SearchBarInput.current = event
  }

  return (
    <>
      <header>
        <img src={movieBanner} alt="movie banner" className='header__img' />
        <div className="row">
          <div className="container header__container">
            <h1 className='header__title'>The best place to search for your favourite <span className='text--blue'>movie</span></h1>
            <p className='header__para'>Find your <span className='text--blue'>movie</span> now!</p>
            <div className="search-bar--wrapper">
              <input className='search-bar' type="text" placeholder='Search for a movie...' onChange={(e) => currentSearch(e.target.value)} onKeyUp={(event) => event.key === 'Enter' && handleChange(event.target.value)} />
              <a className='search-bar__btn' onClick={() => handleChange(SearchBarInput.current)}><BsSearch /></a>
            </div>
            <ul className='header__search-options'>
              <li><a className='search-option__link' onClick={() => setSearch(POPULAR_URL)}>Popular</a></li>
              <li><a className='search-option__link' onClick={() => setSearch(TRENDING_URL)}>Trending</a></li>
              <li><a className='search-option__link' onClick={() => setSearch(TOP_RATED_URL)}>Top Rated</a></li>
            </ul>
          </div>
        </div>
      </header>
      <section id="movie-page">
        <div className="row">
          <div className="container">
            <div className="movie__header">
              <h2 className="movie__header-title">{searchResult}</h2>
              {data
                ?
                <select name="" defaultValue="DEFAULT" id='movie-filter' onChange={(e) => filterMovies(e.target.value)}>
                  <option value="DEFAULT" disabled>Sort</option>
                  <option value="HIGH_TO_LOW">Rating, High to Low</option>
                  <option value="LOW_TO_HIGH">Rating, Low to High</option>
                </select>
                : null
              }

            </div>
            <div className="movies">
              {(data !== undefined)
                ? (Loading  
                    ? (
                      new Array(10).fill(0).map((element, index) => (
                        <LoadingState key={index}/>
                      ))
                    )
                    : data.map(elem => <MovieBoiler info={elem} key={elem.id} />)
                  )
                : null
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
