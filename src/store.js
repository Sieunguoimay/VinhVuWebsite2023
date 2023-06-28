import { createStore } from 'vuex'
import $dataUtils from "./data_utils"
import axios from 'axios';

const store = createStore({
    state() {
        return {
            data: null
        }
    },
    mutations: {
        updateNavigationItemCurrent(state, currentPath) {
            state.data.navigation.nav_items.forEach(i => {
                if (i.has_sub_nav_items) {
                    i.sub_nav_items.forEach(ni => {
                        ni.is_current = currentPath == ni.path;
                    });
                    i.is_current = i.sub_nav_items.find(ni => ni.is_current) != null;
                } else {
                    i.is_current = currentPath == i.path;
                }
            });
            state.data.page_groups.forEach(i => {
                i.is_current = currentPath == i.path;
            });
        },
        setData(state, data) {
            state.data = data;
        }
    },
    actions: {
        updateNavigationItemCurrent(state, currentPath) {
            if (this.state.data != null) {
                this.commit('updateNavigationItemCurrent', currentPath)
            }
        },
        loadData(state, done) {
            axios.get('/src/data/website-config.json')
                .then(response => {
                    // var jsonString = $dataUtils.getHtmlRenderedText(response.data);
                    // var data = JSON.parse(jsonString);
                    const website_config = response.data;
                    if (website_config.settings.optimize_for_speed) {
                        this.commit('setData', $dataUtils.setupStatefulDataForOptimize(website_config));
                        done();
                    } else {
                        axios.get($dataUtils.getGoogleDocExportURL(website_config.settings.website_config_url)).then(res => {
                            var jsonString = $dataUtils.getHtmlRenderedText(res.data);
                            var d = JSON.parse(jsonString);
                            $dataUtils.setupStatefulData(d, (dd) => {
                                this.commit('setData', dd);
                                done();
                            });
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        },

        getPageContent(state, params) {
            var data = this.state.data;
            var page = data.pages.find(p => p.path == params.path);
            if (page == null) return "";
            $dataUtils.loadPageContentIfRequire(page, params.resultCallback, !data.settings.optimize_for_speed);
        },
        tryLoadPageGroupData(state, params) {
            var pg = this.state.data.page_groups.find(g => g.path == params.pageGroupPath);
            var pagesOfGroup = this.state.data.pages.filter(p => p.page_group_id == pg.id && (p.content_loaded == undefined || p.content_loaded == false));
            if (pagesOfGroup.length > 0) {
                $dataUtils.sendGetRequests(pagesOfGroup.map(g => $dataUtils.getGoogleDocExportURL(g.content_path)), (responses, errors) => {
                    if (errors == null) {
                        pg.pages = [];
                        for (var i = 0; i < pagesOfGroup.length; i++) {
                            const response = responses[i];
                            const page = pagesOfGroup[i];

                            page.content = $dataUtils.optimizeHtml(response.data);
                            page.content_loaded = true;
                            $dataUtils.enrichPageData(page, response);

                            pg.pages.push(page);
                        }
                        params.output();
                    } else {

                    }
                });
            } else {
                pg.pages = [];
                for (const page of this.state.data.pages.filter(p => p.page_group_id == pg.id)) {
                    pg.pages.push(page);
                }
                // params.output(pg);
                params.output();
            }
        }
    },

    getters: {},
    modules: {

    },

});

export default store;