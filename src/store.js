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
            //($dataUtils.getGoogleDocExportURL('https://docs.google.com/document/d/1H68sdFH5AP76Cbd-yRzpKKJGuD8-OH3piu1U00N31qM/edit?usp=sharing')) //
            axios.get('/src/data/website-config.json')
                .then(response => {
                    // var jsonString = $dataUtils.getHtmlRenderedText(response.data);
                    // var data = JSON.parse(jsonString);
                    const data = response.data;
                    this.commit('setData', $dataUtils.setupStatefulData(data));
                    done();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getPageContent(state, params) {
            console.log(this.state.data);
            var found = this.state.data.pages.find(p => p.path == params.path);
            if (found == null) return "";
            if (found.content_loaded == undefined || found.content_loaded == false) {
                $dataUtils.fetchHtml(found.content_path, result => {
                    found.content = result;
                    found.content_loaded = true;
                    console.log(result);
                    params.resultCallback(found.content);
                });
            } else {
                params.resultCallback(found.content);
            }
        }
    },
    getters: {

    },
    modules: {

    }
});

export default store;