import React from 'react';
import { Link } from 'react-router-dom';




export default function MovieBoiler({ info }) {
  const IMG_URL = `https://image.tmdb.org/t/p/w500${info.backdrop_path}`
  const PIC_NULL = 'https://image.tmdb.org/t/p/w500null'
  
  

  return (
    <Link to={`/movie-search-react/${info.id}`} className="movie">
      <figure className="movie__img--wrapper">
        {(IMG_URL === PIC_NULL)
          ? (<div className='skeleton__img no-img'>Cannot get Image</div>)
          : (<img className="movie__img" src={IMG_URL} alt=""/>)
        }
      </figure>
      <div className="movie__info">
        <div>{info.original_title || info.original_name}</div>
        <div>Rating: {info.vote_average}</div>
      </div>
    </Link>
  )
}
