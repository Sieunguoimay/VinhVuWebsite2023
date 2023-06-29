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
                $dataUtils.fetchPages(pagesOfGroup, errors => {
                    if (errors == null) {
                        params.output();
                    }
                })
            } else {
                pg.pages = [];
                for (const page of this.state.data.pages.filter(p => p.page_group_id == pg.id)) {
                    pg.pages.push(page);
                }
                // params.output(pg);
                params.output();
            }
        },
        tryLoadExploreMoreData(state, params) {
            if (this.state.data.explore_more_data.cards == undefined) {
                var pagesToLoad = [];
                for (const p of this.state.data.pages) {
                    if (p.content_path != undefined && p.content_loaded == undefined || p.content_loaded == false) {
                        pagesToLoad.push(p);
                    }
                }
                if (pagesToLoad.length == 0) {
                    this.state.data.explore_more_data.cards = $dataUtils.generateExploreMoreData(this.state.data.pages);
                    params.output();
                } else {
                    $dataUtils.fetchPages(pagesToLoad, errors => {
                        if (errors == null) {
                            this.state.data.explore_more_data.cards = $dataUtils.generateExploreMoreData(this.state.data.pages);
                            params.output();
                        }
                    })
                }
            } else {
                params.output();
            }
        }
    },

    getters: {},
    modules: {

    },

});

export default store;