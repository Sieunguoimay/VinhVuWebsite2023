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

const getHtmlRenderedText = (htmlContent) => {
    const $ = cheerio.load(htmlContent);
    return $('body').text().match(/("(\\.|[^"])*"|\[|\]|,|\d+|\{|\}|\:|[a-zA-Z0-9_]+)/g).join('');
}
function simplifyString(str) {
    return str
        .normalize("NFD") // Normalize to decomposed form
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/gi, "d")
        .toLowerCase() // Convert to lowercase
        .replace(/\s+/g, "-");
    return encodeURIComponent(str)
        .replace(/%20/g, "-")
    return str
        .replace(/[^\w\s]/gi, "") // Remove special characters
        .toLowerCase() // Convert to lowercase
        .replace(/\s+/g, "-");
}
function getRelativePath(path) {
    const segments = path.split(/\/+/); // Split the path by slashes
    segments.pop(); // Remove the last segment
    return segments.join("/");
}
// const filePath = './src/data/website-config.json';
// const websiteConfig = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function bakeGoogleDocPages(websiteConfig) {
    const pages = websiteConfig.pages.filter(p => p.content_path != null);
    var requests = pages.map(p => {
        return axios.get(getGoogleDocExportURL(p.content_path))
    });
    Promise.all(requests).then(results => {
        const home_cards = [];
        for (var i = 0; i < results.length; i++) {

            const response = results[i];
            const p = pages[i];

            p.name = getResponseFilename(response);
            p.path = getRelativePath(p.path) + "/" + simplifyString(p.name);

            const $ = cheerio.load(response.data);
            const found = $('body').find('img').first(i => i.attr('src') != undefined);
            const firstImageSrc = found != null ? found.attr('src') : null;

            var home_card = {};
            home_card.page_path = p.path;
            home_card.title = p.name;
            home_card.img = firstImageSrc;
            home_cards.push(home_card);
        }
        fs.writeFileSync('./src/data/home-cards.json', JSON.stringify(home_cards, null, 2));
        fs.writeFileSync('./src/data/website-config.json', JSON.stringify(websiteConfig, null, 2));
    }).catch(error => {

    });
}

axios.get(getGoogleDocExportURL('https://docs.google.com/document/d/1H68sdFH5AP76Cbd-yRzpKKJGuD8-OH3piu1U00N31qM/edit?usp=sharing'))
    .then(response => {
        var jsonString = getHtmlRenderedText(response.data);
        var data = JSON.parse(jsonString);

        bakeGoogleDocPages(data);
    }).catch(error => {

    });