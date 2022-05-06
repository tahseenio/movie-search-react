import React from 'react';
import navLogo from '../assets/tmdb_logo.svg';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <div className='nav__container'>
        <Link to={'/movie-search-react'}>
          <figure className='nav__img--wrapper'>
            <img className='nav__img' src={navLogo} alt='' />
          </figure>
        </Link>
        <ul className='nav__links'>
          <Link to={'/movie-search-react'} className='nav__link'>
            <li
              className='
              nav__link--anchor
              link__hover-effect
              link__hover-effect--white
              '
            >
              Home
            </li>
          </Link>
          <Link to={'/movie-search-react'} className='nav__link'>
            <li
              className='
              nav__link--anchor
              btn-contact
              no-cursor
              '
            >
              Contact
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
