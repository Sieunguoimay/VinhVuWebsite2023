const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

const getResponseFilename = (response) => {
    const disposition = response.headers['content-disposition'];
    var fileName = "Page Untitled";
    const utfPattern = /filename\*=UTF-8''/
    const fileNamePattern = /filename=/;
    console.log(disposition);

    disposition.split(';').forEach(sm => {
        if (sm.match(utfPattern)) {
            fileName = decodeURIComponent(sm.split(utfPattern)[1]);
            return;
        } else if (sm.match(fileNamePattern)) {
            fileName = removeDoubleQuote(sm.split(fileNamePattern)[1]);
            return;
        }
    })
    const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
    return fileNameWithoutExtension;
}
const removeDoubleQuote = (str) => {
    return str.replace(/^"(.*)"$/, '$1');
}
const getGoogleDocExportURL = (shareUrl) => {
    const regex = /\/[^/]*\?/;
    return shareUrl.replace(regex, '/export/html?');
}
const filePath = './src/data/website-config.json';
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const pages = jsonData.pages.filter(p => p.content_path != null);
var requests = pages.map(p => {
    return axios.get(getGoogleDocExportURL(p.content_path))
});
Promise.all(requests).then(results => {
    const home_cards = [];
    for (var i = 0; i < results.length; i++) {

        const response = results[i];
        const p = pages[i];

        p.display_name = getResponseFilename(response);
        const $ = cheerio.load(response.data);
        const found = $('body').find('img').first(i => i.attr('src') != undefined);
        const firstImageSrc = found != null ? found.attr('src') : null;

        var home_card = {};
        home_card.page_path = p.path;
        home_card.title = p.display_name;
        home_card.img = firstImageSrc;
        home_cards.push(home_card);
    }
    // console.log(home_cards);
    // Write the modified JSON back to the file
    fs.writeFileSync('./src/data/home-cards.json', JSON.stringify(home_cards, null, 2));
}).catch(error => {

});
// for (const p of jsonData.pages) {
//     if (p.content_path == undefined) continue;
//     if (cardCount++ >= 3) {
//         break;
//     }
//     console.log(p.content_path);

//     axios.get(getGoogleDocExportURL(p.content_path)).then(response => {
//         // console.log(response);
//         // p.display_name = getResponseFilename(response);

//         const $ = cheerio.load(response.data);
//         const found = $('body').find('img').first(i => i.attr('src') != undefined);
//         const firstImageSrc = found != null ? found.attr('src') : null;

//         var home_card = {};
//         home_card.page_path = p.path;
//         home_card.title = p.display_name;
//         home_card.img_url = firstImageSrc;
//         jsonData.home_cards.push(home_card);
//         // console.log(home_card);
//     }).catch(error => {

//     });
// }