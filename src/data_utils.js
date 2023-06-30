import axios from 'axios'
import prefixer from 'postcss-prefix-selector'
import postcss from 'postcss'
import * as cheerio from 'cheerio';

var data_utils = {
    setupStatefulDataForOptimize(data) {
        data.info.logo.alt_string = "Website Name";
        data.navigation.nav_items = this.createNavItems(data);
        return data;
    },
    setupStatefulData(data, done) {
        data.info.logo.alt_string = "Website Name";
        var pages = data.pages;
        var count = pages.length;
        for (const p of pages) {
            this.loadPageContentIfRequire(p, result => {
                count--;
                if (count == 0) {
                    data.navigation.nav_items = this.createNavItems(data);
                    done(data);
                }
            }, !data.settings.optimize_for_speed);
        }
        return data;
    },
    createNavItems(data) {
        var nav_items = [];
        for (const navGroup of data.navigation.nav_groups) {
            nav_items.push(this.createNavGroupItem(navGroup));
        }
        for (const page of data.pages) {
            if (page.show_on_nav_bar) {
                this.createNavItem(data, page, nav_items);
            }
        }
        for (const pageGroup of data.page_groups) {
            this.createNavItem(data, pageGroup, nav_items);
        }
        this.swapToFirst(nav_items, nav_items.find(i => i.path == '/'));
        return nav_items;
    },
    swapToFirst(arr, element) {
        const index = arr.indexOf(element);
        if (index > -1) {
            arr.splice(index, 1);
            arr.unshift(element);
        }
        return arr;
    },

    createNavItem(data, page, nav_items) {
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
    },
    findPageByPath(data, path) {
        return data.pages.find(p => p.path == path);
    },
    findNavGroup(data, path) {
        return data.navigation.nav_groups.find(g => this.containsString(path, g.path))
    },
    findPageGroup(data, path) {
        return data.page_groups.find(g => path == g.path)
    },
    containsString(mainString, subString) {
        return new RegExp(subString).test(mainString);
    },
    createNavGroupItem(nav_group) {
        var subNavItems = [];
        if (nav_group.sub_nav_items != undefined) {
            subNavItems = nav_group.sub_nav_items;
            for (var i of subNavItems) {
                i.is_current = false;
            }
        }
        return {
            display_name: nav_group.display_name,
            path: nav_group.path,
            has_sub_nav_items: true,
            sub_nav_items: subNavItems,
        };
    },
    getPageDisplayPath(data, path) {
        var pageGroup = this.findPageGroup(data, path);
        if (pageGroup != null) {
            var navGroup = this.findNavGroup(data, path);
            if (navGroup == null) {
                return [pageGroup.name];
            }
            return [navGroup.display_name, pageGroup.name]
        } else {
            var page = this.findPageByPath(data, path);
            if (page == null) {
                return null;
            }

            var navGroup = this.findNavGroup(data, path);
            if (navGroup == null) {
                return [page.name];
            }
            return [navGroup.display_name, page.name]
        }
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
    fetchHtml(exportUrl, resultCallback) {
        console.log(exportUrl);
        axios.get(exportUrl)
            .then(response => {
                resultCallback(this.optimizeHtml(response.data), response);
            })
            .catch(error => {
                console.error('Error fetching raw HTML:', error);
                resultCallback("", error);
            });
    },
    sendGetRequests(urls, resultCallback) {

        var requests = urls.map(p => {
            return axios.get(p)
        });

        Promise.all(requests).then(responses => {
            resultCallback(responses, null);
        }).catch(errors => {
            resultCallback(null, errors);
        });
    },
    fetchPages(optimize_for_speed, pages, done) {
        var urls = optimize_for_speed ? pages.map(g => g.content_path) : pages.map(g => this.getGoogleDocExportURL(g.content_path));
        this.sendGetRequests(urls, (responses, errors) => {
            console.log(errors);
            if (errors == null) {
                //pg.pages = [];
                for (var i = 0; i < pages.length; i++) {
                    const response = responses[i];
                    const page = pages[i];

                    page.content = this.optimizeHtml(response.data);
                    page.content_loaded = true;
                    if (!optimize_for_speed) {
                        this.enrichPageData(page, response);
                    }
                    //pg.pages.push(page);
                }
                done(null);
            } else {
                done(errors);
            }
        });

    },
    generateExploreMoreData(allPages) {
        var cards = [];
        for (const p of allPages) {
            if (p.content_loaded) {
                cards.push(this.createCardData(p, p.content));
            }
        }
        return cards;
    },
    getGoogleDocExportURL(shareUrl) {
        const regex = /\/[^/]*\?/;
        return shareUrl.replace(regex, '/export/html?');
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
        const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
        return fileNameWithoutExtension;
    },
    removeDoubleQuote(str) {
        return str.replace(/^"(.*)"$/, '$1');
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
    getDocumentTitle(data) {
        for (const ni of data.navigation.nav_items) {
            if (ni.has_sub_nav_items) {
                for (const sni of ni.sub_nav_items) {
                    if (sni.is_current) {
                        return sni.display_name;
                    }
                }
            } else {
                if (ni.is_current) {
                    return ni.display_name;
                }
            }
        }
        for (const pg of data.page_groups) {
            if (pg.is_current) {
                return pg.name;
            }
        }
        return null;
    },
    getFirstImage(html) {
        const $ = cheerio.load(html);
        const found = $('body').find('img').first(i => i.attr('src') != undefined);
        const img = found.attr('src');
        return img != null ? img : '/src/assets/placeholder.png';
    },
    loadPageContentIfRequire(page, callback, isFromGoogleDoc) {
        if (page.content_loaded == undefined || page.content_loaded == false) {
            if (page.content_path != undefined) {

                var exportUrl = isFromGoogleDoc ? this.getGoogleDocExportURL(page.content_path) : page.content_path;

                this.fetchHtml(exportUrl, (result, response) => {
                    page.content = result;
                    page.content_loaded = true;

                    if (isFromGoogleDoc) {
                        this.enrichPageData(page, response);
                    }
                    callback(page);
                });
                return;
            }
        }
        callback(page);
    },
    enrichPageData(page, response) {
        page.name = this.getResponseFilename(response);
        page.simplified_name = this.simplifyString(page.name);
        page.path = this.getRelativePath(page.path) + "/" + page.simplified_name;
        page.img = this.getFirstImage(page.content);
    },
    getRelativePath(path) {
        const segments = path.split(/\/+/); // Split the path by slashes
        segments.pop(); // Remove the last segment
        return segments.join("/");
    },
    getPreviewContent(html) {
        const $ = cheerio.load(html);
        return this.getFirstNWords($('body').text(), 30) + "..";
    },
    getFirstNWords(str, count) {
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
export default data_utils;