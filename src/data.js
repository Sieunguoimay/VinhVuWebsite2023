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
}