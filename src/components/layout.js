import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Hero from './hero';
import SimpleNav from './SimpleNav';
import Footer from './footer';

const Layout = ({ location, title, children, withoutHero = false, withGoBack = false }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div className="parallax__stage">
      {withoutHero ? <SimpleNav withGoBack={withGoBack} /> : <Hero />}
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
