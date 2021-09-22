import fs from "fs"
import frontmatter, { FrontMatterResult } from "front-matter"
import DocumentFrontmatterAttributes from "../dev-tools/frontmatterAttributes"
import { exit } from "process"

const main = () => {
    const getFiles = require('../dev-tools/getFiles')
    let exitCode = 0

    const mdFiles: string[] = getFiles(`${__dirname}/../content`).filter((fileName: string) => {
        return fileName.substr(fileName.lastIndexOf('.')) === '.md'
    })

    mdFiles.forEach((file) => {
        const data = fs.readFileSync(file, {encoding: 'utf-8'})
        const mdContent: FrontMatterResult<DocumentFrontmatterAttributes> = frontmatter(data)
        let slashPosition = file.lastIndexOf('/')
        if (slashPosition < 0) {
            slashPosition = 0
        } else {
            // slash is to be removed by substring
            slashPosition++
        }
        const fileRealName = file.substring(slashPosition, file.lastIndexOf('.'))
        if (fileRealName === 'index') {
            // "index.md" is not subject of check
            return
        }
        const {slug} = mdContent.attributes
        if (fileRealName !== slug) {
            console.log(`File with wrong slug: ${slug} in ${fileRealName}`)
            exitCode = 100
        }
    })

    exit(exitCode)
}

main()
