import { createStore } from 'vuex'
import $dataProvider from "./data"
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
        loadData(state,done) {
            axios.get('/src/data/website-config.json')
                .then(response => {
                    this.commit('setData', $dataProvider.setupStatefulData(response.data));
                    done();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    getters: {

    },
    modules: {

    }
});

export default store;