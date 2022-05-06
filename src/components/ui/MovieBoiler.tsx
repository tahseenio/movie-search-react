import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { infoProps } from '../../types/Types';

export default function MovieBoiler({ info }: { info: infoProps }) {
  const IMG_URL = `https://image.tmdb.org/t/p/w500${info.backdrop_path}`;
  const PIC_NULL = 'https://image.tmdb.org/t/p/w500null';
  const [img, setImg] = useState<HTMLImageElement>();

  useEffect(() => {
    const image = new Image();
    image.src = IMG_URL;
    // if image url is valid run below otherwise just setImg
    image.onload = () => {
      setImg(image);
      // console.log("able to load")
    };
    image.onerror = () => {
      setImg(image);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {img ? (
        <>
          <Link to={`/movie-search-react/${info.id}`} className='movie'>
            <figure className='movie__img--wrapper'>
              {img.src === PIC_NULL ? (
                <div className='skeleton__img no-img'>Cannot get Image</div>
              ) : (
                <img className='movie__img' src={img.src} alt='' />
              )}
            </figure>
            <div className='movie__info'>
              <div>{info.original_title || info.original_name}</div>
              <div>Rating: {info.vote_average}</div>
            </div>
          </Link>
        </>
      ) : (
        <>
          <div className='movie'>
            <figure className='movie__img--wrapper'>
              <div className='skeleton__img'></div>
            </figure>
            <div className='movie__info'>
              <div className='skeleton__title'></div>
              <div className='skeleton__rating'></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
