export default {
    getData() {
        var data = {
            info: {
                texts: [{
                    key: "website_url",
                    label: "www.abc.com",
                    value: "https://abc.com"
                }, {
                    key: "website_full_name",
                    label: "",
                    value: "Full website name"
                }, {
                    key: "address",
                    label: "Dia chi",
                    value: "Address ABC"
                }, {
                    key: "phone",
                    label: "Phone number",
                    value: "0123456789"
                }, {
                    key: "email",
                    label: "Email",
                    value: "Email@email.com"
                }, ],
                socials: [{
                    name: "Facebook",
                    url: "https://facebook.com",
                    img: "/socials/icon_facebook.png"
                }, {
                    name: "Zalo",
                    url: "https://web.zalo.com",
                    img: "/socials/icon_zalo.png"
                }, {
                    name: "This Page",
                    url: "/",
                    img: "/logo.png"
                }],
                logo: {
                    img: "/logo.png",
                },
            },

            navigation: {
                nav_groups: [{
                        display_name: "Services",
                        path: "/services",
                    },
                    {
                        display_name: "Solutions",
                        path: "/solutions",
                    },
                    {
                        display_name: "News",
                        path: "/news",
                    },
                ],
            },
            pages: [{
                id: 0,
                path: "/",
                name: "Home",
                content: "Nothing",
            }, {
                id: 1,
                path: "/services/service_a",
                name: "Page A",
                content: "Nothing A",
            }, {
                id: 2,
                path: "/services/service_b",
                name: "Page B",
                content: "Nothing B",
            }, {
                id: 3,
                path: "/services/service_c",
                name: "Page C",
                content: "Nothing C",
            }, {
                id: 4,
                path: "/solutions/solution_a",
                name: "Solutionn A",
                content: "Solutionn A",
            }, {
                id: 5,
                path: "/solutions/solution_b",
                name: "Solutionn B",
                content: "Solutionn B",
            }, {
                id: 6,
                path: "/news/news_a",
                name: "Tin tuc A",
                content: "Tin tuc A",
            }, {
                id: 7,
                path: "/news/news_b",
                name: "Tin tuc B",
                content: "Tin tuc B",
            }, {
                id: 8,
                path: "/contact",
                name: "Contact",
                content: "Contact",
            }, ]
        };
        data.info.logo.alt_string = "Website Name";
        data.navigation.nav_items = this.createNavItems(data);
        console.log(data.navigation.nav_items);
        return data;
    },
    createNavItems(data) {
        var nav_items = [];
        for (var pageIndex = 0; pageIndex < data.pages.length; pageIndex++) {
            var page = data.pages[pageIndex];
            var navGroup = this.findNavGroup(data, page.path);
            if (navGroup != null) {
                var foundNavGroupItem = nav_items.find(i => i.path == navGroup.path);
                if (foundNavGroupItem != null) {
                    foundNavGroupItem.sub_nav_items.push({
                        display_name: page.name,
                        path: page.path
                    });
                } else {
                    var subNavItemsGroup = this.createNavGroupItem(navGroup);
                    subNavItemsGroup.sub_nav_items.push({
                        display_name: page.name,
                        path: page.path
                    });
                    nav_items.push(subNavItemsGroup);
                }
            } else {
                nav_items.push({
                    has_sub_nav_items: false,
                    path: page.path,
                    display_name: page.name
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
    }
}