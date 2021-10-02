import { Canvas, createCanvas, registerFont, loadImage } from "canvas"
import * as path from "path"
import fs from "fs"
import fsPromises from "fs/promises"
import frontmatter, { FrontMatterResult } from "front-matter"
import DocumentFrontmatterAttributes from "../dev-tools/frontmatterAttributes"

interface SplitText {
    line: string,
    remaining: string,
}

const createTextLine = (canvas: Canvas, text: string): SplitText => {
    const context = canvas.getContext('2d')
    const MAX_WIDTH = 1000 as const

    for (let i = 0; i < text.length; i++) {
        const line = text.substring(0, i + 1)
        if (context.measureText(line).width > MAX_WIDTH) {
            return {
                line: line,
                remaining: text.substring(i + 1),
            }
        }
    }

    return {
        line: text,
        remaining: "",
    }
}

const createTextLines = (canvas: Canvas, text: string): string[] => {
    const lines: string[] = []
    let currentText = text

    while (currentText !== "") {
        const splitText = createTextLine(canvas, currentText)
        lines.push(splitText.line)
        currentText = splitText.remaining
    }

    return lines
}

const createOgImage = async (meta: DocumentFrontmatterAttributes) => {
    const WIDTH = 1200 as const
    const HEIGHT = 630 as const
    const OUT_DIR = `${__dirname}/out` as const

    const { title, slug, lang } = meta

    registerFont(path.resolve(`${__dirname}/font/Orbitron-VariableFont_wght.ttf`), {
        family: 'Orbitron'
    })
    registerFont(path.resolve(`${__dirname}/font/IBMPlexSansJP-Regular.ttf`), {
        family: 'Plex'
    })

    const canvas = createCanvas(WIDTH, HEIGHT)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#374151'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let noImage = true
    if (meta.image) {
        try {
            const img = await loadImage(path.resolve(`${__dirname}/../content/posts/${slug}/${meta.image}`))

            // fitting image to center using aspect ratio
            let dx: number, dy: number, dw: number, dh: number
            const aspectRatio = img.width / img.height
            if (aspectRatio > 1) {
                dw = WIDTH
                dh = WIDTH / img.width * img.height
            } else {
                dh = HEIGHT
                dw = HEIGHT / img.height * img.width
            }
            dx = (WIDTH - dw) / 2
            dy = (HEIGHT - dh) / 2
            ctx.drawImage(img, dx, dy, dw, dh)

            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.fillStyle = 'black'

            noImage = false
        } catch (e) {}
    }
    if (noImage) {
        ctx.fillStyle = 'white'
    }

    ctx.font = '100px Orbitron'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText('Penguinone', 600, 15)

    ctx.textBaseline = 'middle'
    ctx.font = '60px Plex'

    const lines = createTextLines(canvas, title)
    lines.forEach((line, index) => {
        const y = 314 + 80 * (index - (lines.length - 1) / 2)
        ctx.fillText(line, 600, y)
    })

    const buffer = canvas.toBuffer()

    if (fs.existsSync(OUT_DIR) === false) {
        fs.mkdirSync(OUT_DIR)
    }
    fs.writeFileSync(path.resolve(`${OUT_DIR}/${slug}_${lang}.png`), buffer)
    console.log(`${slug}_${lang}.png written`)
}

const main = () => {
    const getFiles = require('../dev-tools/getFiles')
    const promises: Promise<void>[] = []

    const mdFiles: string[] = getFiles(`${__dirname}/../content`).filter((fileName: string) => {
        return fileName.substr(fileName.lastIndexOf('.')) === '.md'
    })

    mdFiles.forEach((file) => {
        fsPromises.readFile(file, {
            encoding: 'utf-8'
        }).then((data) => {
            const mdContent: FrontMatterResult<DocumentFrontmatterAttributes> = frontmatter(data)
            promises.push(createOgImage(mdContent.attributes))
        })
    })

    Promise.all(promises).then(() => {
        console.log('All images generated.')
    })
}

main()
