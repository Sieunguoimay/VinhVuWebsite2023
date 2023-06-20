import axios from 'axios'
import prefixer from 'postcss-prefix-selector'
import postcss from 'postcss'
import * as cheerio from 'cheerio';
export default {
    setupStatefulData(data) {
        data.info.logo.alt_string = "Website Name";
        data.navigation.nav_items = this.createNavItems(data);
        return data;
    },
    createNavItems(data) {
        var nav_items = [];
        for (var pageIndex = 0; pageIndex < data.pages.length; pageIndex++) {
            var page = data.pages[pageIndex];
            var navGroup = this.findNavGroup(data, page.path);
            if (navGroup != null) {
                var foundNavGroupItem = nav_items.find(i => i.path == navGroup.path);
                if (foundNavGroupItem == null) {
                    foundNavGroupItem = this.createNavGroupItem(navGroup);
                    nav_items.push(foundNavGroupItem);
                }
                foundNavGroupItem.sub_nav_items.push({
                    display_name: page.name,
                    path: page.path,
                    is_current: false,
                });
            } else {
                nav_items.push({
                    has_sub_nav_items: false,
                    path: page.path,
                    display_name: page.name,
                    is_current: false,
                });
            }
        }
        return nav_items;
    },
    findPageByPath(data, path) {
        return data.pages.find(p => p.path == path);
    },
    findNavGroup(data, path) {
        return data.navigation.nav_groups.find(g => this.containsString(path, g.path))
    },

    containsString(mainString, subString) {
        return new RegExp(subString).test(mainString);
    },
    createNavGroupItem(nav_group) {
        return {
            display_name: nav_group.display_name,
            path: nav_group.path,
            has_sub_nav_items: true,
            sub_nav_items: [],
        };
    },
    getPageDisplayPath(data, path) {
        var page = this.findPageByPath(data, path);
        var navGroup = this.findNavGroup(data, path);
        if (navGroup == null) {
            return [page.name];
        }
        return [navGroup.display_name, page.name]
    },

    fetchHtml(url, resultCallback) {
        var exportUrl = this.getGoogleDocExportURL(url);
        axios.get(exportUrl)
            .then(response => {
                const $ = cheerio.load(response.data);
                // var relativePath = this.getRelativePath(path);
                // $('img').each((index, element) => {
                //     const src = $(element).attr('src');
                //     $(element).attr('src', relativePath + '/' + src);
                // });
                this.getResponseFilename(response);
                $('body').addClass('some-selector');
                $('style').each((_, styleTag) => {
                    const $styleTag = $(styleTag);
                    const styleContent = $styleTag.html();
                    const modifiedStyleContent = this.addLocalSelector(styleContent);
                    $styleTag.html(modifiedStyleContent);
                });

                const bodyAttributes = $('body').get(0).attribs;
                const divTag = $('<div>').attr(bodyAttributes).html($('body').html());
                $('body').replaceWith(divTag);

                resultCallback($.html());
            })
            .catch(error => {
                console.error('Error fetching raw HTML:', error);
                resultCallback("");
            });
    },
    getGoogleDocExportURL(shareUrl) {
        const regex = /\/[^/]*\?/;
        return shareUrl.replace(regex, '/export/html?');
    },
    addLocalSelector(stylesheet) {
        return postcss().use(prefixer({
            prefix: '.some-selector',
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
        return fileName;
    },
    removeDoubleQuote(str) {
        return str.replace(/^"(.*)"$/, '$1');
    },
    getHtmlRenderedText(htmlContent) {
        const $ = cheerio.load(htmlContent);
        return $('body').text().match(/("(\\.|[^"])*"|\[|\]|,|\d+|\{|\}|\:|[a-zA-Z0-9_]+)/g).join('');
    }
}