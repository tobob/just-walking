import React from "react"
import { Link, graphql, navigate } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import Gallery from 'react-grid-gallery';
import cloudinary from 'cloudinary-core';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const cl = cloudinary.Cloudinary.new();
cl.config("cloud_name", 'just-walking-me');

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  const images = data.allCloudinaryMedia;
  const mappedImages = images.edges.map(({ node }) => {
    const src = cl.url(node.public_id, { secure: true, effect: 'saturation:50', quality: 'auto:good', angle: 'exif', crop: 'limit', height: 1280 })
    const thumbnail = cl.url(node.public_id, { secure: true, crop: 'thumb', effect: 'saturation:50', quality: 'auto:good' })
    const { width, height } = node;
    const prop = height / width;
    const thumbHeight = prop > 1 ? 300 : 300 * prop;
    const thumbWidth = prop > 1 ? 300 / prop : 300;

    console.log(prop, thumbHeight, thumbWidth)

    return {
      src,
      thumbnail,
      caption: node.public_id,
      alt: node.id,
      height,
      width,
      thumbHeight,
      thumbWidth,
    }
  })

  const mappedImagesAsComponents = mappedImages.map((image) => <LazyLoadImage
    alt={image.alt}
    height={image.thumbHeight}
    effect="blur"
    className="post-gallery__image"
    wrapperClassName="post-gallery__image-wrapper"
    src={image.thumbnail}
    width={image.thumbWidth} />)

  const navigateToImage = (event) => {
    window.open(`/photography/${event.currentTarget.alt}`, '_blank');
    window.focus();
  }

  return (
    <Layout withoutHero withGoBack location={location} title={siteTitle}>
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
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <hr />
        {mappedImagesAsComponents}
        <div className="separator-40"></div>
      </article>

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
    allCloudinaryMedia(filter: {public_id: {regex: $slug}}, sort: {fields: created_at}) {
      edges {
        node {
          public_id
          height
          width
          id
        }
      }
    }
  }
`
