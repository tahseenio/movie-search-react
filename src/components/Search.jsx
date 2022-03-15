import React from 'react';
import movieBanner from '../assets/movie_banner.jpg'

export default function Search() {
  return (
    <header>
      <figure className="header__img--wrapper">
        <img className="header__img" src={movieBanner} alt=""/>
      </figure>
      <div className="row">
        <div className="container header__container">
          <h1 className="title"> Australia's <span className="title-color">best</span> place to find movies</h1>
          <p className="header__para">Find your <span className="title-color">favourite</span> movie now!</p>
          <div className="search-bar">
            <input type="text" name="" placeholder="Search for a movie..."/>
          </div>
        </div>
      </div>
    </header>
  )
}
