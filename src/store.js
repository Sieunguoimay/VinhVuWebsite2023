import { createStore } from 'vuex'
import $dataProvider from "./data"

const store = createStore({
    state() {
        return {
            data: $dataProvider.getData()
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
        }
    }, actions: {
        updateNavigationItemCurrent(state, currentPath) {
            this.commit('updateNavigationItemCurrent', currentPath)
        },
    }, getters: {

    }, modules: {

    }
});

export default store;