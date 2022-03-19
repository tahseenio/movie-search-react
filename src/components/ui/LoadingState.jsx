import React from 'react';

export default function LoadingState() {
  return (
    <div className='movie'>
      <figure className='movie__img--wrapper'>
        <a>
          <div className='skeleton__img'></div>
        </a>
      </figure>
      <div className='movie__info'>
        <div className='skeleton__title'></div>
        <div className='skeleton__rating'></div>
      </div>
    </div>
  );
}
