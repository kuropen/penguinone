/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import * as React from "react"
import { FormattedMessage } from "gatsby-plugin-react-intl"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(r => r.json())

const PrivacyNotice: React.FC = () => {
    const {data} = useSWR('https://penguinone.kuropen.org/api/country', fetcher)

    const isShown = data && data.isEUCountry ? data.isEUCountry : false

    return (
        <section className={isShown ? '' : 'hidden'}>
            <div className="bg-yellow-600 text-black mt-2 mb-10 rounded-md shadow-md p-2">
                <FormattedMessage id="privacyNotice" />
            </div>
        </section>
    )
}

export default PrivacyNotice
