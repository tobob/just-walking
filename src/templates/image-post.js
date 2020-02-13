import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import cloudinary from 'cloudinary-core';

const BlogPostTemplate = ({ pageContext, data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { public_id } = pageContext;

  const cl = cloudinary.Cloudinary.new();
  cl.config("cloud_name", process.env.CLOUDINARY_CLOUD_NAME);
  const url = cl.url(public_id, { width: 300, crop: "fill", height: 300 })

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title='image'
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            Image
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            <img src={url} alt={'image'} />
          </p>
        </header>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>

      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ImagesFetch {
    site {
      siteMetadata {
        title
      }
    }
  }
`
