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
  console.log(data);

  return <div><img src={data.cloudinaryMedia.url} /></div>
}

export default Hero;
