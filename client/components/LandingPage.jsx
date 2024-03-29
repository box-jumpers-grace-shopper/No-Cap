import React from 'react';
import './styles/LandingPage.css';
import { Link } from 'react-router-dom';
import CreateAnonUser from './CreateAnonUser';
import { Box, Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const LandingPage = () => {
  return (
    <div id="LandingPage">
      <CreateAnonUser />
      <Link to="/products">
        <section className="carousel" aria-label="Gallery">
          <ol className="carousel__viewport">
            <li id="carousel__slide1" className="carousel__slide">
              <div className="carousel__snapper" />
            </li>
            <li id='carousel__slide2' className='carousel__slide'>
              <div className='carousel__snapper' />
            </li>
            <li id='carousel__slide3' className='carousel__slide'>
              <div className='carousel__snapper' />
            </li>
            <li id='carousel__slide4' className='carousel__slide'>
              <div className='carousel__snapper' />
            </li>
          </ol>
        </section>
      </Link>
    </div>
  );
};

export default LandingPage;
