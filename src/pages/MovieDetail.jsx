import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaImdb } from "react-icons/fa";

export default function MovieDetail() {
  const [Data, setData] = useState('')
  const { id } = useParams();
  const [Genre, setGenre] = useState("")
  const IMG_URL = `https://image.tmdb.org/t/p/w500${Data.poster_path}`
  const IMDB_URL = `https://www.imdb.com/title/${Data.imdb_id}/`


  useEffect(() => {
    async function fetchData() {
      const promise = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=***REMOVED***&language=en-US`)
      const data = await promise.json()
      // console.log(data)
      setData(data)

      for (let i = 0; i < data.genres.length; i++) {
        if (i === data.genres.length - 1) {
          setGenre(prevState => prevState + ` ${data.genres[i].name}`)
        }
        else {
          setGenre(prevState => prevState + ` ${data.genres[i].name},`)
        }
      }
    }
    fetchData()
  }, [])

  return (
    <div className="row">
      <div className="container MovieDetail__container">
        <Link to={'/movie-search-react'}>
          <span className='btn--back'> <AiOutlineArrowLeft /> Back</span>
        </Link>
        <div className="MovieDetail--wrapper">
          <img className='MovieDetail__img' src={IMG_URL} />
          <div className="MovieDetail__details">
            <h1 className="MovieDetail__title">{Data.original_title}</h1>
            <div className="MovieDetail__release-date">Release Date: {Data.release_date}</div>
            <div className="MovieDetail__runtime">Runtime: {Data.runtime}min</div>
            <div className="MovieDetail__vote">Vote Average: {Data.vote_average}</div>
            <div className="MovieDetail__genre">Genre: {Genre}</div>
            <div className='MovieDetail__summary__title'>Summary</div>
            <p className='MovieDetail__summary__para'>{Data.overview}</p>
            <a className="MovieDetail__imdb-logo" href={IMDB_URL} target='_blank'><FaImdb /></a>
          </div>
        </div>
      </div>
    </div>
  )
}
