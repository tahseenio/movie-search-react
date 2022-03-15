import React, { useState, useEffect } from 'react';
import MovieBoiler from './ui/MovieBoiler'

import movieBanner from '../assets/movie_banner.jpg'

export default function Search() {

  const [Movie, setMovie] = useState('')
  const [data, setData] = useState([])
  // const [optionDefault, setoptionDefault] = useState('DEFAULT')

  const API_KEY = '***REMOVED***'
  const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
  const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  const SEARCHED_URL = `https://api.themoviedb.org/3/search/movie?api_key=***REMOVED***&language=en-US&query=${Movie}&page=1&include_adult=false`
  
  const [searchUrl, setSearchUrl] = useState('')
  // console.log(searchUrl)

  function handleChange(event) {
    setMovie(event.target.value)
  }

  useEffect(async() => {
    if (searchUrl !== '') {
      const promise = await fetch(searchUrl)
      const { results } = await promise.json()
      setData(results)
      console.log(results)
    }

  }, [searchUrl])

  useEffect(async() => {
    if (Movie !== '') {
      const promise = await fetch(SEARCHED_URL)
      const { results } = await promise.json()
      setData(results)
      console.log(results)
    }
  }, [Movie])

  function setSearch(value) {
    console.log(value)
    setSearchUrl(value)
  }

  function filterMovies(filter) {
    if (filter === "HIGH_TO_LOW") {
      setData(data.slice().sort((a, b) => (b.vote_average - a.vote_average)))
    }
    if (filter === "LOW_TO_HIGH") {
      setData(data.slice().sort((a, b) => (a.vote_average - b.vote_average)))
    }
  }

  return (
    <>
      <header>
        <img src={movieBanner} alt="movie banner" className='header__img'/>
        <div className="row">
          <div className="container header__container">
            <h1 className='header__title'>The best place to search for your favourite <span className='text--blue'>movie</span></h1>
            <p className='header__para'>Find your <span className='text--blue'>movie</span> now!</p>
            <p>SEARCH URL IS {searchUrl}</p>
            <input className='search-bar' type="text" placeholder='Search for a movie...' onKeyUp={(event) => event.key === 'Enter' && handleChange(event)} />
            <a onClick={() => setSearch(POPULAR_URL)}>Popular</a>
            <a onClick={() => setSearch(TRENDING_URL)}>Trending</a>
            <a onClick={() => setSearch(TOP_RATED_URL)}>Top Rated</a>

          </div>
        </div>
      </header>
      <section id="movie-page">
        <div className="row">
            <div className="container">
                <div className="movie__header">
                    <h2 className="movie__header-title">Search Results: {Movie}</h2>
                    <select name="" defaultValue="DEFAULT" id="movie-selector" onChange={(e) => filterMovies(e.target.value)}>
                        <option value="DEFAULT" disabled>Sort</option>
                        <option value="HIGH_TO_LOW">Rating, High to Low</option>
                        <option value="LOW_TO_HIGH">Rating, Low to High</option>
                    </select>
                </div>
                <div className="movies">
                  {
                  data
                    .map(elem => <MovieBoiler info={elem} key={elem.id}/>)
                  }
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
