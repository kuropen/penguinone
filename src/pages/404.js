/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import * as React from "react"
import Layout from "../components/layout"

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="prose mx-auto">
        <h1>404 Not found</h1>
        <p>
          We couldn’t find what you were looking for.
          <br />
          指定されたページは見つかりません。
        </p>
      </div>
    </Layout>
  )
}

export default NotFoundPage
