import React from 'react';
import { useStaticQuery, graphql } from "gatsby"

const Hero = () => {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      cloudinaryMedia(public_id: {eq:"hero"}) {
        id
        url
      }
    }
  `)
  const { url } = data.cloudinaryMedia;
  return <div className="hero-image" style={{ backgroundImage: `url(${url})` }}>
    <div className='container'>
      <h1>Just Walking<span className="me">.me</span></h1>
    </div>
  </div>
}

export default Hero;
