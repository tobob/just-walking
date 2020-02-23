/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import Instagram from '../assets/svg/Instagram';

import { rhythm } from "../utils/typography"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <footer
      className="footer"
    >
      <div className="footer-separator"></div>
      <div className="footer-right">
        <a href="https://www.instagram.com/justwalkingme/" target="_blank" className="instagram-icon">
          <Instagram />
        </a>
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
          style={{
            marginBottom: 0,
            borderRadius: `100%`,
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
        <div className="footer-right__text">
          <span>Written by <span style={{ fontWeight: '600', color: 'white' }}>{author}</span></span>
          <span>
            © {new Date().getFullYear()}, Built with {' '}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
