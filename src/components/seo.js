/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import cloudinary from "cloudinary-core"

const cl = cloudinary.Cloudinary.new()
cl.config("cloud_name", "just-walking-me")

const SEO = ({ description, lang, meta, title, image }) => {
  const { site, mainImage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        mainImage: cloudinaryMedia(public_id: { eq: "hero" }) {
          id
          url
          secure_url
          public_id
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  const imageToProcess = image || mainImage

  const seoImage = cl.url(imageToProcess.public_id, {
    secure: true,
    effect: "saturation:50",
    quality: "auto:good",
    angle: "exif",
    crop: "limit",
    height: 1280,
  })

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: "og:image",
          content: seoImage,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: "twitter:image",
          content: seoImage,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  type: ``,
}

SEO.propTypes = {
  type: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
