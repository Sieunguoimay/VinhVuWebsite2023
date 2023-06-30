const axios = require('axios');
const prefixer = require('postcss-prefix-selector');
const postcss = require('postcss');
const cheerio = require('cheerio');
const fs = require('fs');

var obj = {
    getResponseFilename(response) {
        const disposition = response.headers['content-disposition'];
        var fileName = "Page Untitled";
        const utfPattern = /filename\*=UTF-8''/
        const fileNamePattern = /filename=/;

        disposition.split(';').forEach(sm => {
            if (sm.match(utfPattern)) {
                fileName = decodeURIComponent(sm.split(utfPattern)[1]);
                return;
            } else if (sm.match(fileNamePattern)) {
                fileName = this.removeDoubleQuote(sm.split(fileNamePattern)[1]);
                return;
            }
        })
        const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
        return fileNameWithoutExtension;
    },
    removeDoubleQuote(str) {
        return str.replace(/^"(.*)"$/, '$1');
    },
    getGoogleDocExportURL(shareUrl) {
        const regex = /\/[^/]*\?/;
        return shareUrl.replace(regex, '/export/html?');
    },
    getHtmlRenderedText(htmlContent) {
        const $ = cheerio.load(htmlContent);
        return $('body').text().match(/("(\\.|[^"])*"|\[|\]|,|\d+|\{|\}|\:|[a-zA-Z0-9_]+)/g).join('');
    },
    simplifyString(str) {

        return str
            .normalize("NFD") // Normalize to decomposed form
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/gi, "d")
            .toLowerCase() // Convert to lowercase
            .replace(/\s+/g, "-");
    },
    getRelativePath(path) {
        const segments = path.split(/\/+/); // Split the path by slashes
        segments.pop(); // Remove the last segment
        return segments.join("/");
    },
    bakeGoogleDocPages(remote_config, output) {
        const pages = remote_config.pages.filter(p => p.content_path != null);
        var requests = pages.map(p => {
            return axios.get(this.getGoogleDocExportURL(p.content_path))
        });

        Promise.all(requests).then(responses => {

            const home_cards = [];
            for (var i = 0; i < responses.length; i++) {

                const response = responses[i];
                const p = pages[i];

                // const firstImageSrc = this.getFirstImage(response.data);

                this.enrichPageData(p, response);

                if (remote_config.settings.optimize_for_speed) {
                    p.content_path = '/src/data/pages/' + p.simplified_name + '.html';
                }

                // var home_card = {};
                // home_card.page_path = p.path;
                // home_card.title = p.name;
                // home_card.img = firstImageSrc;
                // home_card.preview_content = this.getPreviewContent(response.data);

                home_cards.push(this.createCardData(p, response.data));

                response.simplified_name = p.simplified_name;
            }
            output(home_cards, remote_config, responses.map(r => ({
                simplified_name: r.simplified_name,
                content: this.optimizeHtml(r.data)
            })));
        }).catch(error => {
            console.log(error);
        });
    },
    getFirstImage(html) {
        if (html == undefined) return null;
        const $ = cheerio.load(html);
        const found = $('body').find('img').first(i => i.attr('src') != undefined);
        return found != null ? found.attr('src') : null;
    },
    enrichPageData(page, response) {
        page.name = this.getResponseFilename(response);
        page.simplified_name = this.simplifyString(page.name);
        page.path = this.getRelativePath(page.path) + "/" + page.simplified_name;
        page.img = this.getFirstImage(page.content);
    },
    optimizeHtml(html) {

        const $ = cheerio.load(html);
        const className = 'some-selector';
        // var relativePath = this.getRelativePath(path);
        // $('img').each((index, element) => {
        //     const src = $(element).attr('src');
        //     $(element).attr('src', relativePath + '/' + src);
        // });
        $('body').addClass(className);

        $('style').each((_, styleTag) => {
            const $styleTag = $(styleTag);
            const styleContent = $styleTag.html();
            const modifiedStyleContent = this.addLocalSelector(styleContent, className);
            $styleTag.html(modifiedStyleContent);
        });

        const bodyAttributes = $('body').get(0).attribs;
        const divTag = $('<div>').attr(bodyAttributes).html($('body').html());
        $('body').replaceWith(divTag);

        return $.html();
    },
    addLocalSelector(stylesheet, custom_selector) {
        return postcss().use(prefixer({
            prefix: '.' + custom_selector,
            // exclude: ['.c'],

            // Optional transform callback for case-by-case overrides
            transform: function(prefix, selector, prefixedSelector, filePath, rule) {
                if (selector === 'body') {
                    return 'body' + prefix;
                } else {
                    return prefixedSelector;
                }
            }
        })).process(stylesheet).css
    },
    getPreviewContent(html) {
        const $ = cheerio.load(html);
        return this.getFirst20Words($('body').text(), 30) + "..";
    },
    getFirst20Words(str, count) {
        const words = str.split(' ');
        const first20Words = words.slice(0, count);
        const result = first20Words.join(' ');
        return result;
    },
    createCardData(page, html) {
        const firstImageSrc = this.getFirstImage(html);
        return {
            page_path: page.path,
            title: page.name,
            img: firstImageSrc == null ? '/src/assets/placeholder.png' : firstImageSrc,
            preview_content: this.getPreviewContent(html)
        };
    }
}

function writeFile(path, content) {
    fs.writeFileSync(path, content);
    console.log(path);
}
fs.readFile('./src/data/website-config.json', 'utf8', (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    var json = JSON.parse(data);
    axios.get(obj.getGoogleDocExportURL(json.settings.website_config_url))
        .then(response => {
            var jsonString = obj.getHtmlRenderedText(response.data);
            var data = JSON.parse(jsonString);

            obj.bakeGoogleDocPages(data, (home_cards, website_config, pages) => {
                writeFile('./src/data/home-cards.json', JSON.stringify(home_cards, null, 2));
                writeFile('./src/data/website-config.json', JSON.stringify(website_config, null, 2));
                for (const page of pages) {
                    writeFile('./src/data/pages/' + page.simplified_name + '.html', page.content);
                }
            });
        }).catch(error => {

        });
});