import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import Gallery from 'react-grid-gallery';
import cloudinary from 'cloudinary-core';

const cl = cloudinary.Cloudinary.new();
cl.config("cloud_name", 'just-walking-me');

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  const images = data.allCloudinaryMedia;
  const mappedImages = images.edges.map(({ node }) => {
    const imageIsHorizontal = node.width > node.height;
    const src = cl.url(node.public_id, { quality: 'auto:eco', angle: 'exif' })
    const thumbnail = cl.url(node.public_id, { crop: 'thumb' })

    return {
      src,
      thumbnail,
      // thumbnailWidth: imageIsHorizontal ? 320 : 174,
      // thumbnailHeight: !imageIsHorizontal ? 320 : 174,
      caption: node.public_id,
    }
  })
  console.log(mappedImages);
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
        <hr />
        <Gallery images={mappedImages} />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    allCloudinaryMedia(filter: {public_id: {regex: $slug}}) {
      edges {
        node {
          public_id
          height
          width
        }
      }
    }
  }
`
