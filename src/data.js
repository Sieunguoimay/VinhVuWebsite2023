export default {
    data: {
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
                img: "../src/assets/socials/icon_facebook.png"
            }, {
                name: "Zalo",
                url: "https://web.zalo.com",
                img: "../src/assets/socials/icon_zalo.png"
            }, {
                name: "This Page",
                url: "/",
                img: "../src/assets/logo.png"
            }],
            logo: {
                img: "../src/assets/logo.png",
            },
        },
        navigation: {
            nav_items: [{
                    id: 0,
                    target_page_index: 0,
                    has_sub_nav_items: false,
                },
                {
                    id: 1,
                    display_name: "Services",
                    has_sub_nav_items: true,
                    target_page_indices: [1, 2, 3],
                },
                {
                    id: 3,
                    display_name: "Solutions",
                    has_sub_nav_items: true,
                    target_page_indices: [4, 5],
                }, {
                    id: 4,
                    display_name: "News",
                    has_sub_nav_items: true,
                    target_page_indices: [6, 7],
                }, {
                    id: 5,
                    target_page_index: 8,
                    has_sub_nav_items: false,
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
            path: "/service/0",
            name: "Page A",
            content: "Nothing A",
        }, {
            id: 2,
            path: "/service/1",
            name: "Page B",
            content: "Nothing B",
        }, {
            id: 3,
            path: "/service/2",
            name: "Page C",
            content: "Nothing C",
        }, {
            id: 4,
            path: "/solution/0",
            name: "Solutionn A",
            content: "Solutionn A",
        }, {
            id: 5,
            path: "/solution/1",
            name: "Solutionn B",
            content: "Solutionn B",
        }, {
            id: 6,
            path: "/news/0",
            name: "Tin tuc A",
            content: "Tin tuc A",
        }, {
            id: 7,
            path: "/news/1",
            name: "Tin tuc B",
            content: "Tin tuc B",
        }, {
            id: 8,
            path: "/contact",
            name: "Contact",
            content: "Contact",
        }, ]
    },
    getData() {
        this.data.info.logo.alt_string = "Website Name";
        return this.data;
    },
    getPage(pageId) {
        return this.data.pages[pageId];
    },
    getSubNavItems(subNavItemsGroup) {
        var subNavItems = [];
        for (var i = 0; i < subNavItemsGroup.target_page_indices.length; i++) {
            var pageId = subNavItemsGroup.target_page_indices[i];
            subNavItems.push({
                id: i,
                has_sub_nav_items: false,
                target_page_index: pageId,
                display_name: this.getPage(pageId).name
            });
        }
        return subNavItems;
    }
}