import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import cloudinary from "cloudinary-core"

import "../assets/stylesheets/application.sass"

const cl = cloudinary.Cloudinary.new()
cl.config("cloud_name", "just-walking-me")

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />

      <div className="posts">
        {posts.map(({ node }) => {
          const fileName = node.fields.slug.toString().replace(/\//g, "")
          const url = cl.url(fileName, {
            width: 300,
            crop: "fill",
            height: 400,
            secure: true,
          })
          const title = node.frontmatter.title || node.fields.slug
          const { mnpm } = node.frontmatter
          return (
            <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
              <div key={node.fields.slug} className="post">
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
            title
            description
            mnpm
          }
        }
      }
    }
  }
`
