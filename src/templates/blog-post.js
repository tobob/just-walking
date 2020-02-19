import React, { useState } from "react"
import { Link, graphql, navigate } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import Gallery from "react-grid-gallery"
import cloudinary from "cloudinary-core"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Carousel, { Modal, ModalGateway } from "react-images"
import ChevronLeft from '../assets/svg/ChevronLeft';
import ChevronRight from '../assets/svg/ChevronRight';

const cl = cloudinary.Cloudinary.new()
cl.config("cloud_name", "just-walking-me")

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [modal, setModal] = useState(false)
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  const images = data.allCloudinaryMedia
  const mappedImages = images.edges.map(({ node }) => {
    const src = cl.url(node.public_id, {
      secure: true,
      effect: "saturation:50",
      quality: "auto:good",
      angle: "exif",
      crop: "limit",
      height: 1280,
    })
    const thumbnail = cl.url(node.public_id, {
      secure: true,
      crop: "thumb",
      effect: "saturation:50",
      quality: "auto:eco",
      width: 450,
    })


    const { width, height } = node
    const prop = height / width
    const thumbHeight = prop > 1 ? 300 : 300 * prop
    const thumbWidth = prop > 1 ? 300 / prop : 300

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

  const imagesList = mappedImages.map(image => ({ src: image.src }))

  const mappedImagesAsComponents = mappedImages.map((image, index) => (
    <LazyLoadImage
      onClick={() => {
        setSelectedImage(index)
        setModal(true)
      }}
      alt={image.alt}
      height={image.thumbHeight}
      effect="blur"
      className="post-gallery__image"
      wrapperClassName="post-gallery__image-wrapper"
      src={image.thumbnail}
      width={image.thumbWidth}
    />
  ))

  const navigateToImage = event => {
    window.open(`/photography/${event.currentTarget.alt}`, "_blank")
    window.focus()
  }

  return (
    <Layout withoutHero withGoBack location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <nav className="subnav">
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <ChevronLeft /> {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} <ChevronRight />
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <div style={{ display: 'flex', padding: '20px' }}>
        <article className="blogpost">
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
        </article>
        <div className="gallery">
          {mappedImagesAsComponents}
          <div className="separator-40"></div>
        </div>
      </div>
      <ModalGateway>
        {modal ? (
          <Modal onClose={() => setModal(false)}>
            <Carousel
              currentIndex={selectedImage}
              views={imagesList}
              frameProps={{ autoSize: "height" }}
              styles={{
                view: base => ({
                  ...base,

                  "& > img": {
                    display: "inline-block",
                    marginBottom: "20px",
                    marginTop: "20px",
                  },
                }),
              }}
            />
          </Modal>
        ) : null}
      </ModalGateway>
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
    allCloudinaryMedia(
      filter: { public_id: { regex: $slug } }
      sort: { fields: created_at }
    ) {
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
