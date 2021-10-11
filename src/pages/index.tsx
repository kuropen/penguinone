/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from 'gatsby'
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-react-intl"
import styled from "styled-components"
import tw from "tailwind-styled-components"

// markup
const IndexPage: React.FC<PageProps<GatsbyTypes.IndexQuery>> = ({data}) => {
  const Hero = tw(styled.section`
    min-height: calc(100vh - 9em)
  `)`hero rounded-lg bg-gradient-to-br from-green-400 to-indigo-400 dark:from-green-700 dark:to-indigo-800`

  const HeroContent = tw.div`flex-col hero-content lg:flex-row`
  const HeroMessageBox = tw.div`lg:mr-20`
  const HeroHeader = tw.h2`mb-5 text-5xl font-bold`
  const HeroMessage = tw.p`mb-5`

  const HeroMenuBox = tw.nav`lg:w-1/4`
  const MenuBtn = tw(Link)`mb-2 pt-1 btn btn-block btn-outline`

  const menu = data.site?.siteMetadata?.menuContent?.map((content) => {
    if (content?.back) {
      return null
    }
    return (<MenuBtn key={content?.path} to={content?.path || ''}>{content?.caption}</MenuBtn>)
  })

  return (
    <Layout hideMenu={true}>
      <Hero>
        <HeroContent>
          <HeroMessageBox>
            <HeroHeader>
              <FormattedMessage id="welcome" />
            </HeroHeader> 
            <HeroMessage>
              <FormattedMessage id="frontMessage" />
            </HeroMessage> 
          </HeroMessageBox>
          <HeroMenuBox>
            {menu}
          </HeroMenuBox>
        </HeroContent>
      </Hero>
    </Layout>
  )
}

export const query = graphql`
query Index {
  site {
    siteMetadata {
      menuContent {
        caption
        path
        back
      }
    }
  }
}
`

export default IndexPage
