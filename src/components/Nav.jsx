import React from 'react';
import navLogo from '../assets/tmdb_logo.svg';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <div className="nav__container">
        <figure className="nav__img--wrapper">
          <img className="nav__img" src={navLogo} alt="" />
        </figure>
        <ul className="nav__links">
          <Link to={'/movie-search-react'} className="nav__link">
            <a className="
              nav__link--anchor
              link__hover-effect
              link__hover-effect--white
              " href="">Home</a>
          </Link>
          <Link to={'/movie-search-react/movies'} className="nav__link">
            <a className="
              nav__link--anchor
              link__hover-effect
              link__hover-effect--white
              " href="">Movies</a>
          </Link>
          <Link to={'/movie-search-react/tv-shows'} className="nav__link">
            <a className="
              nav__link--anchor
              link__hover-effect
              link__hover-effect--white
              " href="">TV Shows</a>
          </Link>
          <Link to={'/movie-search-react/contact'} className='nav__link'>
            <a className="
              nav__link--anchor
              btn-contact
              " href="">Contact</a>
          </Link>
        </ul>
      </div>
    </nav>
  )
}
