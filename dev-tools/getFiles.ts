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
