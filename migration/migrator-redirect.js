const axios = require('axios').default
const fs = require('fs')

let dic = {}

axios.get('https://penguinone-cms.kuropen.org/notes?prismic_id_null=false').then((response) => {
    response.data.forEach(element => {
        const { prismic_id, slug, text } = element
        if (!text) {
            return
        }
        dic[prismic_id] = slug
    });
    fs.writeFileSync('../static/prismic-id.json', JSON.stringify(dic))
})
