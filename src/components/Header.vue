<template>
    <div class="header">
        <div class="logo header-item">
            <router-link :to="`/${navigation.nav_items[0].target_page_index}`">
                <img :src="navigation.logo.img" :alt="navigation.logo.alt_string">
            </router-link>
        </div>
        <div class="navigation header-item">
            <div class="nav-item" v-for="nav_item in navigation.nav_items" :key="nav_item.id"
                @mouseover="onNavItemHovered($event, nav_item)"
                @mouseleave="{ if(nav_item.has_sub_nav_items) hideNavPanel($event); }">
                <router-link :to="getPagePath(nav_item)" v-if="!nav_item.has_sub_nav_items">{{
                    getPageName(nav_item) }}</router-link>
                <a v-if="nav_item.has_sub_nav_items">{{ getPageName(nav_item) }}</a>

                <img src="../assets/down-arrow.png" alt="Down Arrow" v-if="nav_item.has_sub_nav_items">
            </div>
        </div>
        <div class="navigation-panel" :style="{ top: navPanelPosition.y + 'px', left: navPanelPosition.x + 'px' }"
            v-if="isNavPanelShowing" @mouseover="cancelHideNavPanel" @mouseleave="hideNavPanel">
            <div class="nav-panel-item nav-item"
                v-for="sub_nav_item in getSelectedSubNavItems(navigation.nav_items, selectedNavItemId)"
                :key="sub_nav_item.id">
                <router-link :to="getPagePath(sub_nav_item)">{{ getPageName(sub_nav_item) }}</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* div {
    box-shadow: 0 0 0 2px #f0f0f0;
}

img {
    box-shadow: 0 0 0 2px #f0f0f0;
} */

.header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    /* box-shadow: 0 0 0 2px #f0f0f0; */
    gap: 5%;
    background-color: rgb(236, 236, 236);
}

.header-item {
    align-self: flex-end;
}

@media (min-width: 768px) {

    .logo {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: fit-content;
    }
}

@media (max-width: 768px) {

    .logo {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: fit-content;
    }
}

.logo img {
    height: 100px;
    display: block;
}

.logo a {
    display: inline-block;
}

.navigation {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    /* gap: 30px; */
    /* width: 100%; */
    /* height: fit-content; */
    flex: 1;
}

.navigation-panel {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    width: 400px;
    max-width: 100%;

    z-index: 2;
    position: fixed;

    background-color: rgb(255, 230, 230);
}

.nav-item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    align-items: center;
    gap: 5px;
}

.nav-item a {
    font-size: large;
    text-decoration: none;
    color: inherit;
    /* pointer-events: none; */
}

.nav-item img {
    height: 15px;
    width: auto;

    pointer-events: none;
}

.nav-item:hover {
    color: rgb(255, 225, 183);
    transition: color 0.2s;
}

.nav-panel-item:hover {
    background-color: rgb(255, 206, 142);
    color: white;
}
</style>
<script>
import { objectToString } from '@vue/shared';
import { reactive, ref } from 'vue';
export default {
    data() {
        return this.$dataProvider.getData();
    },
    setup() {
        const selectedNavItemId = ref(0);
        const isNavPanelShowing = ref(false);
        const navPanelPosition = reactive({ x: 0, y: 0 });
        let hideTimeout;

        const showNavPanel = (event) => {
            cancelHideNavPanel();
            const itemRect = event.target.getBoundingClientRect();
            navPanelPosition.x = itemRect.left;
            navPanelPosition.y = itemRect.bottom;
            isNavPanelShowing.value = true;
        };
        const hideNavPanel = (event) => {
            cancelHideNavPanel();
            hideTimeout = setTimeout(() => {
                isNavPanelShowing.value = false;
            }, 300);
        };
        const cancelHideNavPanel = () => {
            clearTimeout(hideTimeout);
        };

        const onNavItemHovered = (event, nav_item) => {
            if (nav_item.has_sub_nav_items) {
                showNavPanel(event);
                setSelectedNavItem(nav_item);
            }
        }
        const setSelectedNavItem = (nav_item) => {
            selectedNavItemId.value = nav_item.id;
        };

        return {
            selectedNavItemId,
            isNavPanelShowing,
            navPanelPosition,
            showNavPanel,
            hideNavPanel,
            cancelHideNavPanel,
            onNavItemHovered,
            setSelectedNavItem,
        }
    },
    methods: {
        getSelectedSubNavItems(nav_items, selectedNavItemId) {
            var selectedNavItem = nav_items.find(i => i.id === selectedNavItemId);
            if (selectedNavItem == null) {
                return [];
            }
            if (!selectedNavItem.has_sub_nav_items) {

                return [];
            }
            return this.$dataProvider.getSubNavItems(selectedNavItem);
            // var subNavItems = [];
            // for (var i = 0; i < selectedNavItem.target_page_indices.length; i++) {
            //     subNavItems.push({
            //         id: i,
            //         has_sub_nav_items: false,
            //         target_page_index: selectedNavItem.target_page_indices[i],
            //     });
            // }
            // return subNavItems;
        },
        getPageName(nav_item) {
            if (nav_item.hasOwnProperty('has_sub_nav_items') && nav_item.has_sub_nav_items) {
                return nav_item.display_name;
            }
            var page = this.$dataProvider.getPage(nav_item.target_page_index);
            return page.name;
        },
        getPagePath(nav_item) {
            if (nav_item.hasOwnProperty('has_sub_nav_items') && nav_item.has_sub_nav_items) {
                return '/';
            }
            var page = this.$dataProvider.getPage(nav_item.target_page_index);
            return page.path;
        }
    }
}
</script>