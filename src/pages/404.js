import * as React from "react"
import Layout from "../components/layout"

// styles
const pageStyles = {
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}

// markup
const NotFoundPage = () => {
  return (
    <Layout style={pageStyles}>
      <div className="prose mx-auto">
        <h1 style={headingStyles}>404 Not found</h1>
        <p style={paragraphStyles}>
          We couldn’t find what you were looking for.
          <br />
          指定されたページは見つかりません。
        </p>
      </div>
    </Layout>
  )
}

export default NotFoundPage
