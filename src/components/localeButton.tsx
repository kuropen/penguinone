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
