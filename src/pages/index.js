import React, { useEffect, useRef, useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import cloudinary from "cloudinary-core"
import classNames from "classnames"
import { LazyLoadImage } from "react-lazy-load-image-component"

import "../assets/stylesheets/application.sass"

const cl = cloudinary.Cloudinary.new()
cl.config("cloud_name", "just-walking-me")

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="JustWalking.me"
        description={
          "This is my place on the internet where I gather and write up all my mountains trips. The Beskids, Tatra mountains, Fatra. All the polish, Slovakia and Czech mountains, and more! "
        }
      />
      <div className="posts-wrapper">
        <div className="posts">
          {posts.map(({ node }) => {
            const fileName = node.fields.slug.toString().replace(/\//g, "")
            const url = cl.url(fileName, {
              width: 270,
              crop: "fill",
              height: 300,
              secure: true,
              effect: "saturation:40",
            })
            const title = node.frontmatter.title || node.fields.slug
            const { mnpm, creationDate, date } = node.frontmatter
            return (
              <Link
                className="single-post"
                date-creation={creationDate}
                style={{ boxShadow: `none` }}
                to={node.fields.slug}
              >
                <div key={node.fields.slug} className="post">
                  <div className="post__header">
                    <small>{node.frontmatter.date}</small>
                  </div>
                  <LazyLoadImage src={url} />
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
