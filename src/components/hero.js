import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from "gatsby"
import _ from 'lodash';


const Hero = () => {
  const [opacity, setOpacity] = useState(1)
  const [top, setTop] = useState(0);
  const handleScroll = (e) => {
    const newTop = e.target.scrollTop;
    if (newTop < 101) {
      setOpacity(1 - (newTop / 200));
    }
    if (newTop > 40) {
      setTop(newTop - 40)
    }
    if (newTop <= 40) {
      setTop(0)
    }
  };

  useEffect(() => {
    console.log('dodaje')
    document.querySelector('.parallax__stage').addEventListener('scroll', handleScroll);

    return () => {
      console.log('uwuam')
      document.querySelector('.parallax__stage').removeEventListener('scroll', handleScroll)
    }
  }, [])

  const data = useStaticQuery(graphql`
    query HeroQuery {
      main: cloudinaryMedia(public_id: {eq:"hero-first"}) {
        id
        url
      },
      background: cloudinaryMedia(public_id: {eq:"hero"}) {
        id
        url
      },
    }
  `)
  const { url } = data.background;
  const url2 = data.main.url;
  return <div className="hero-image">
    <div className="hero-image-background" style={{ backgroundImage: `url(${url})`, opacity, top: `${top}px` }}></div>
    <div className="hero-image-first" style={{ backgroundImage: `url(${url2})` }}></div>

    <div className='container'>
      <h1>Just Walking<span className="me">.me</span></h1>
    </div>
  </div>
}

export default Hero;
