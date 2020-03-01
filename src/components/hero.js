import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from "gatsby"
import _ from 'lodash';


const Hero = () => {
  const [opacity, setOpacity] = useState(1)
  const handleScroll = (e) => {
    const top = e.target.scrollTop;
    if (top < 101) {
      setOpacity(1 - (top / 200));
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
    <div className="hero-image-background" style={{ backgroundImage: `url(${url})`, opacity }}></div>
    <div className="hero-image-first" style={{ backgroundImage: `url(${url2})` }}></div>

    <div className='container'>
      <h1>Just Walking<span className="me">.me</span></h1>
    </div>
  </div>
}

export default Hero;
