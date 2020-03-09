import React, { useEffect, useRef, useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import cloudinary from "cloudinary-core"
import classNames from 'classnames';

import "../assets/stylesheets/application.sass"

const cl = cloudinary.Cloudinary.new()
cl.config("cloud_name", "just-walking-me")

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const iso = useRef()
  const [sortingType, setSortingType] = useState(null);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      const Isotope = require("isotope-layout/js/isotope");
      iso.current = new Isotope(`.posts`, {
        itemSelector: `.single-post`,
        layoutMode: "masonry",
        masonry: {
          fitWidth: true
        },
        getSortData: {
          creationdate: '[date-creation]', // value of attribute
        },
        sortAscending: false,
      });
    }
  }, [])

  const setSorting = type => {
    setSortingType(type);
    iso.current.arrange({ sortBy: type })
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <div className="filters">
        <span onClick={() => setSorting(null)} className={classNames('filter', { 'filter--active': !sortingType })}>Sort by trip date</span>
        <span onClick={() => setSorting('creationdate')} className={classNames('filter', { 'filter--active': sortingType === 'creationdate' })}>Sort by creation date</span>
      </div>
      <div className="posts-wrapper">
        <div className="posts">
          {posts.map(({ node }) => {
            const fileName = node.fields.slug.toString().replace(/\//g, "")
            const url = cl.url(`${fileName}`, {
              width: 270,
              crop: "fill",
              height: 300,
              secure: true,
              effect: "saturation:40",
            })
            const title = node.frontmatter.title || node.fields.slug
            const { mnpm, creationDate, date } = node.frontmatter
            return (
              <Link className="single-post" date-creation={creationDate} style={{ boxShadow: `none` }} to={node.fields.slug}>
                <div key={node.fields.slug} className="post" >
                  <div className="post__header">
                    <small>{node.frontmatter.date}</small>
                  </div>
                  <img src={url} />
                  <div className="post__overlay" />
                  <div className="post__title">
                    <span className="post__title-main">{title}</span>
                    {mnpm && (
                      <span className="post__title-mnpm">{mnpm} mnpm</span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            creationDate(formatString: "YYYYMMDD")
            title
            type
            mnpm
          }
        }
      }
    }
  }
`
