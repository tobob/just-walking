import React from "react"
import { graphql, StaticQuery } from "gatsby"
export default function About({ data }) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => (
        <>
          <h1>{data.site.siteMetadata.title}</h1>
          <p>{data.site.siteMetadata.description}</p>
        </>
      )}
    />
  )
}
