/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import React from "react";
import { useIntl, changeLocale } from "gatsby-plugin-react-intl"

const LocaleButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const currentLocale = useIntl().locale
    const nextLocale = (currentLocale === 'ja') ? 'en' : 'ja'

    return (
        <button {...props} onClick={() => changeLocale(nextLocale)} />
    )
}

export default LocaleButton
