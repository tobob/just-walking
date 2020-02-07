import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ pageContext, data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { key, name } = pageContext;
  const imageUrl = `http://${name}.s3.amazonaws.com/${key}`;


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
            <img src={imageUrl} />
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
