import React from 'react'
import { Link } from 'react-router-dom'

const IMG_URL = 'https://image.tmdb.org/t/p/w500'

export default function MovieBoiler( {info} ) {
  return (
    <div to={'/movie-search-react/'} className="movie">
        <figure className="movie__img--wrapper">
          <a href=""><img className="movie__img" src={IMG_URL + info.backdrop_path} alt=""/></a>
        </figure>
        <div className="movie__info">
          <div>{info.original_title}</div>
          <div>Rating: {info.vote_average}</div>
        </div>
    </div>
  )
}
