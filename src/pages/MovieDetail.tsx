import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FaImdb } from 'react-icons/fa';
import { dataProps } from '../types/Types';

export default function MovieDetail() {
  const [Data, setData] = useState<dataProps | null>(null);
  const { id } = useParams();
  const [Genre, setGenre] = useState<string>('');
  const [Loading, setLoading] = useState<boolean>(true);
  const IMG_URL = `https://image.tmdb.org/t/p/w500${Data?.poster_path}`;
  const IMDB_URL = `https://www.imdb.com/title/${Data?.imdb_id}/`;

  useEffect(() => {
    async function fetchData() {
      const promise = await fetch(
        `https://still-depths-10330.herokuapp.com/banner?id=${id}`
      );
      const data = await promise.json();
      // console.log(data);
      setData(data);

      for (let i = 0; i < data.genres.length; i++) {
        if (i === data.genres.length - 1) {
          setGenre((prevState) => prevState + ` ${data.genres[i].name}`);
        } else {
          setGenre((prevState) => prevState + ` ${data.genres[i].name},`);
        }
      }
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PIC_NULL = 'https://image.tmdb.org/t/p/w500null';

  return (
    <div className='row'>
      <div className='container MovieDetail__container'>
        <Link to={'/'}>
          <span className='btn--back'>
            {' '}
            <AiOutlineArrowLeft /> Back
          </span>
        </Link>
        {!Loading ? (
          <div className='MovieDetail--wrapper'>
            {IMG_URL === PIC_NULL ? (
              <div className='MovieDetail__img--skeleton no-img'>
                Cannot get Image
              </div>
            ) : (
              <img className='MovieDetail__img' src={IMG_URL} alt='' />
            )}

            <div className='MovieDetail__details'>
              <h1 className='MovieDetail__title'>{Data?.original_title}</h1>
              <div className='MovieDetail__release-date'>
                Release Date: {Data?.release_date}
              </div>
              <div className='MovieDetail__runtime'>
                Runtime: {Data?.runtime}min
              </div>
              <div className='MovieDetail__vote'>
                Vote Average: {Data?.vote_average}
              </div>
              <div className='MovieDetail__genre'>Genre: {Genre}</div>
              <div className='MovieDetail__summary__title'>Summary</div>
              <p className='MovieDetail__summary__para'>{Data?.overview}</p>
              <a href={IMDB_URL} target='_blank' rel='noreferrer'>
                <FaImdb className='MovieDetail__imdb-logo' />
              </a>
            </div>
          </div>
        ) : (
          <div className='MovieDetail--wrapper'>
            <div className='MovieDetail__img--skeleton'></div>
            <div className='MovieDetail__details'>
              <div className='MovieDetail__title--skeleton'></div>
              <div className='MovieDetail__release-date--skeleton'></div>
              <div className='MovieDetail__runtime--skeleton'></div>
              <div className='MovieDetail__vote--skeleton'></div>
              <div className='MovieDetail__genre--skeleton'></div>
              <div className='MovieDetail__summary__title--skeleton'></div>
              <div className='MovieDetail__summary__para--skeleton'></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
