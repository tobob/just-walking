import React, { useState, useMemo } from "react"
import { Link, graphql, navigate } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import Gallery from "react-grid-gallery"
import cloudinary from "cloudinary-core"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Carousel, { Modal, ModalGateway } from "react-images"
import ChevronLeft from "../assets/svg/ChevronLeft"
import ChevronRight from "../assets/svg/ChevronRight"
import ExternalLink from "../assets/svg/ExternalLink"
import MapPin from "../assets/svg/MapPin"
import Map from "../assets/svg/Map"
import Meh from "../assets/svg/Meh"
import Award from "../assets/svg/Avard"
import { times } from "lodash"

const cl = cloudinary.Cloudinary.new()
cl.config("cloud_name", "just-walking-me")

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [modal, setModal] = useState(false)
  const post = data.markdownRemark
  const {
    asphalt, //
    country, //
    difficulty,
    distance, //
    endTime, //
    highestMountain, //
    ferns,
    finishPoint, //
    map,
    mapaTurystyczna,
    creationDate, //
    mnpm, //
    mountainRange, //
    mountains, //
    parkingCords, //
    startTime, //
    startingPoint, //
    type, //
    wiki, //
  } = post.frontmatter
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
      width: 150,
    })

    const { width, height } = node
    const prop = height / width
    const thumbHeight = prop > 1 ? 150 : 150 * prop
    const thumbWidth = prop > 1 ? 150 / prop : 150

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

  const blogContent = () => {
    const imageScr = mappedImages[0].src

    return (
      <div className="simple-blogpost">
        <article className="blogpost">
          <header>
            <h1>{post.frontmatter.title}</h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>
          <section
            className="blogpost-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
        <img className="blogpost-hero" effect="blur" src={imageScr} />
      </div>
    )
  }

  const tourContent = () => (
    <>
      <div className="blogpost-page">
        <article className="blogpost">
          <header>
            <h1>{post.frontmatter.title}</h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>
          <div className="informations">
            {country && (
              <section>
                <summary>country</summary>
                <span>{country.join(", ")}</span>
                <div className="separator"></div>
              </section>
            )}
            {mountainRange && (
              <section>
                <summary>mountainRange</summary>
                <span>{mountainRange.join(", ")}</span>
                <div className="separator"></div>
              </section>
            )}
            {highestMountain && (
              <section>
                <summary>highestMountain</summary>
                <span>
                  {highestMountain}
                  {wiki && (
                    <a href={wiki} target="_blank">
                      <ExternalLink width={14} height={14} />
                    </a>
                  )}
                </span>
                <div className="separator"></div>
              </section>
            )}
            {mnpm && (
              <section>
                <summary>highestPoint</summary>
                <span>{mnpm} mnpm</span>
                <div className="separator"></div>
              </section>
            )}
            {mountains && (
              <section>
                <summary>visitedAlso</summary>
                <span>{mountains.join(", ")}</span>
                <div className="separator"></div>
              </section>
            )}
            <section>
              <summary>
                route <Map width={14} height={14} stroke={"white"} />
              </summary>
              <a href={`https://${mapaTurystyczna || map}`} target="_blank">
                {mapaTurystyczna || map}
                {`   `}
              </a>
              <div className="separator"></div>
            </section>
            {startingPoint && (
              <section>
                <summary>startingPoint - finishPoint</summary>
                <span>
                  {startingPoint} - {finishPoint ? finishPoint : startingPoint}
                </span>
                <div className="separator"></div>
              </section>
            )}
            {parkingCords && (
              <section>
                <summary>
                  parkingCoords{" "}
                  <MapPin width={14} height={14} stroke={"white"} />
                </summary>
                <a href={`https://${parkingCords}`} target="_blank">
                  {parkingCords}
                  {`   `}
                </a>
                <div className="separator"></div>
              </section>
            )}
            {distance && (
              <section>
                <summary>distance</summary>
                <span>{distance} km</span>
                <div className="separator"></div>
              </section>
            )}
            {startTime && endTime && (
              <section>
                <summary>startTime - endTime</summary>
                <span>
                  {startTime} - {endTime}
                </span>
                <div className="separator"></div>
              </section>
            )}
            {(asphalt || asphalt === 0) && (
              <section>
                <summary>howMuchAsphalt</summary>
                <span>
                  {times(asphalt, () => (
                    <Meh
                      stroke="white"
                      width={18}
                      height={18}
                      className="asphalt"
                    />
                  ))}
                  {times(5 - asphalt, () => (
                    <Meh
                      width={18}
                      height={18}
                      stroke="gray"
                      className="asphalt"
                    />
                  ))}
                </span>
                <div className="separator"></div>
              </section>
            )}
            <section>
              <summary>difficulty</summary>
              <span>
                {times(difficulty, () => (
                  <Award
                    stroke="white"
                    width={18}
                    height={18}
                    className="asphalt"
                  />
                ))}
                {times(5 - difficulty, () => (
                  <Award
                    width={18}
                    height={18}
                    stroke="gray"
                    className="asphalt"
                  />
                ))}
              </span>
              <div className="separator"></div>
            </section>
          </div>

          <section
            className="blogpost-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <footer className="date-footer">
            <hr />
            <span>created at {creationDate}</span>
          </footer>
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
    </>
  )

  return (
    <Layout withoutHero withGoBack location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={
          (post.frontmatter.mountainRange &&
            post.frontmatter.mountainRange.join(", ")) ||
          post.excerpt
        }
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
      {type === "tour" ? tourContent() : blogContent()}
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
        type
        asphalt
        country
        difficulty
        distance
        highestMountain
        endTime
        ferns
        finishPoint
        map
        mapaTurystyczna
        mnpm
        mountainRange
        mountains
        parkingCords
        startTime
        startingPoint
        type
        wiki
        creationDate(formatString: "MMMM DD, YYYY")
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
