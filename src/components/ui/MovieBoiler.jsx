import React from 'react';
import { Link } from 'react-router-dom';




export default function MovieBoiler({ info }) {
  const IMG_URL = `https://image.tmdb.org/t/p/w500${info.backdrop_path}`
  const PIC_NULL = 'https://image.tmdb.org/t/p/w500null'

  

  return (
    <div to={'/movie-search-react/'} className="movie">
      <figure className="movie__img--wrapper">
      {/* <a href=""><img className="movie__img" src={IMG_URL} alt=""/></a> */}
        {(IMG_URL === PIC_NULL)
          ? (<a><div className='skeleton__img no-img'>Cannot get Image</div></a>)
          : (<a href=""><img className="movie__img" src={IMG_URL} alt=""/></a>)
        }
      </figure>
      <div className="movie__info">
        <div>{info.original_title || info.original_name}</div>
        <div>Rating: {info.vote_average}</div>
      </div>
    </div>
  )
}
