/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import fs from "fs"

const getFiles = (directory: string, filesArray: string[] = []): string[] => {
    const files = fs.readdirSync(directory)

    files.forEach((file) => {
        if (fs.statSync(`${directory}/${file}`).isDirectory()) {
            filesArray = getFiles(`${directory}/${file}`, filesArray)
        } else {
            filesArray.push(`${directory}/${file}`)
        }
    })

    return filesArray
}

module.exports = getFiles
