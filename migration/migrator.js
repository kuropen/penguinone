const axios = require('axios').default
const fs = require('fs')

let promises = []

axios.get('https://penguinone-cms.kuropen.org/notes').then((response) => {
    response.data.forEach(element => {
        const { slug, title, published, text, cover_image, categories } = element
        if (!text) {
            return
        }
        console.log(`BEGIN writing ${slug}`)
        let coverImageInfo = ''
        let coverImage = ''
        let imageDownloadPromise = null
        if (cover_image) {
            const imageFileUrl = new URL(cover_image.url)
            const pathNameSplit = imageFileUrl.pathname.split('/')
            const lastElement = pathNameSplit[pathNameSplit.length - 1];
            console.log(`BEGIN downloading ${lastElement}`)
            axios.get(imageFileUrl.href, { responseType: 'arraybuffer' }).then((response) => {
                imageDownloadPromise = new Promise((resolve, reject) => {
                    fs.writeFile(`../content/posts/images/${lastElement}`, response.data, (err) => {
                        if (err) {
                            reject(err)
                        }
                        console.log(`SUCCESS downloading ${lastElement}`)
                        resolve(lastElement)
                    })
                })
            })
            coverImageInfo = `
images:
    - /posts/images/${lastElement}`
            coverImage = "\n" + `![Cover Image](/posts/images/${lastElement})`
        }
        let categoriesFlatten = []
        if (categories.length > 0) {
            categories.forEach(category => categoriesFlatten.push(category.slug))
        }
        const tags = JSON.stringify(categoriesFlatten)

        const converted = `---
title: "${title}"
date: ${published}T00:00:00+09:00
showDate: true
draft: false
tags: ${tags}${coverImageInfo}
---${coverImage}
${text}`
        // console.log(converted)
        if (imageDownloadPromise) {
            promises.push(imageDownloadPromise)
        }
        promises.push(new Promise((resolve, reject) => {
            fs.writeFile(`../content/posts/${slug}.md`, converted, (err) => {
                if (err) {
                    reject(err)
                }
                console.log(`SUCCESS writing ${slug}`)
                resolve(slug)
            })
        }))
    });
})

Promise.all(promises).then(() => console.log('FINISH')).catch(err => console.log(`FAIL ${err}`))