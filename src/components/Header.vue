<template>
    <div class="header header-container">
        <div class="logo header-item" id="main-header">
            <router-link :to="`/${navigation.nav_items[0].target_page_index}`">
                <img :src="'/src/assets' + info.logo.img" :alt="info.logo.alt_string">
            </router-link>

        </div>
        <div class="nav-button" @click="toggleFullScreenNavigationPanel()">

        </div>
        <div class="header-right">
            <div class="header-top-right">
                <div class="header-handy-info">
                    <span>Hotline: 123</span>
                    <span>Email: ABC@abcd.com</span>
                    <span>Nothing</span>
                </div>
            </div>
            <!-- <div class="header-bottom-right">

            </div> -->
            <NavigationBar class="header-item header-bottom-right" />
        </div>
    </div>

    <div class="navigation-panel" :style="{ top: navPanelPosition.y + 'px', left: navPanelPosition.x + 'px' }"
        v-if="isNavPanelShowing" @mouseover="cancelHideNavPanel" @mouseleave="hideNavPanel">
        <div class="nav-panel-item nav-item"
            v-for="sub_nav_item in getSelectedSubNavItems(navigation.nav_items, selectedNavItemId)" :key="sub_nav_item.id">
            <router-link :to="getPagePath(sub_nav_item)">{{ getPageName(sub_nav_item) }}</router-link>
        </div>
    </div>

    <div class="navigation-panel-fullscreen sticky-header" v-if="isFullScreenNavPanelShowing">
        <div class="nav-item" v-for="nav_item in navigation.nav_items" :key="nav_item.id"
            @click="onFullscreenNavItemClicked(nav_item)">
            <router-link :to="getPagePath(nav_item)">{{ getPageName(nav_item) }}</router-link>
            <div class="nav-panel-item nav-item" v-if="selectedNavItemId == nav_item.id"
                v-for="sub_nav_item in getSelectedSubNavItems(navigation.nav_items, nav_item.id)" :key="sub_nav_item.id">
                <router-link :to="getPagePath(sub_nav_item)" @click="toggleFullScreenNavigationPanel()">{{
                    getPageName(sub_nav_item) }}</router-link>
            </div>
        </div>
    </div>

    <div class="header sticky-header" v-if="showScrollIndicator">
        <NavigationBar class="header-item" />
    </div>
</template>

<style scoped>
/* div {
    box-shadow: 0 0 0 2px #ff3131;
}

img {
    box-shadow: 0 0 0 2px #ff9898;
} */

.header {
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    align-items: stretch; */
    /* box-shadow: 0 0 0 2px #f0f0f0; */
    /* gap: 5%; */
    background-color: rgb(236, 236, 236);
    z-index: 3;
}

.header-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    /* align-items: stretch; */
    /* box-shadow: 0 0 0 2px #f0f0f0; */
    /* gap: 5%; */
    /* background-color: rgb(236, 236, 236); */
    /* z-index: 3; */
    height: 100px;
}

.header-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
}

.header-top-right {
    flex: 1;
    display: flex;
    justify-content: end;
}

.header-bottom-right {
    /* flex:1; */
}

.header-item {
    /* align-self: flex-end; */
}

.header-handy-info {
    color: rgb(127, 141, 152);
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    padding-top: 3px;
}

.header-handy-info span {
    flex-grow: 1;
    text-align: center;
}

.header-handy-info>*:not(:last-child) {
    /* border-right: 1px solid black; */
    /* padding-right: 10px; */
    /* Optional: Add some spacing between the elements */
}

.header-handy-info>*:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    height: 50%;
    border-right: 1px solid rgb(194, 194, 194);
}

@media (min-width: 768px) {

    .logo {
        /* height: 100px; */
        max-height: 100%;
        width: 20%;
        display: flex;
        justify-content: center;
        /* align-items: center; */
        /* min-width: fit-content; */
    }


    .sticky-header {
        position: sticky;
        top: 0;
        z-index: 2;
    }

    .header-handy-info {
        width: 70%;
        height: 30px;
    }

    .nav-button {
        display: none;
    }

    .navigation-panel-fullscreen {
        display: none;
    }
}

@media (max-width: 768px) {

    .logo {
        height: 70px;
        width: 100%;
        display: flex;
        justify-content: center;
        /* max-height: 100%; */
    }

    .header-handy-info {
        width: 100%;
        height: 30px;
    }

    .nav-button {
        display: block;
    }

    .navigation-panel-fullscreen {
        position: absolute;
        z-index: 4;
        background-color: aliceblue;
        width: 100%;
    }

    .navigation-panel-fullscreen a {
        padding-left: 10px;
    }

    .navigation-panel-fullscreen .nav-panel-item {
        background-color: aqua;
        padding-left: 10px;
    }
}

.logo img {
    max-height: 100%;
    display: block;
    object-fit: cover;
    padding: 5px;
}

.nav-button {
    width: 35px;
    height: 35px;
    position: absolute;
    z-index: 4;
    right: 10px;
    bottom: 10px;
}

.nav-button:hover {
    background-color: rgb(255, 175, 106);
    transition: background-color 0.3s ease;
}

.nav-button:not(:hover) {
    background-color: rgb(153, 153, 153);
    transition: background-color 0.3s ease;
}

.logo a {
    display: inline-block;
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

.nav-item a {
    font-size: large;
    text-decoration: none;
    color: inherit;
}

.nav-panel-item:hover {
    background-color: rgb(255, 206, 142);
    color: white;
}
</style>
<script>
import { objectToString } from '@vue/shared';
import { reactive, ref } from 'vue';
import NavigationBar from './NavigationBar.vue'

export default {
    components: {
        NavigationBar
    },
    data() {
        var d = this.$dataProvider.getData();
        d.showScrollIndicator = false;
        return d;
    },
    setup() {
        const isFullScreenNavPanelShowing = ref(false);
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
            isFullScreenNavPanelShowing,
            navPanelPosition,
            showNavPanel,
            hideNavPanel,
            cancelHideNavPanel,
            onNavItemHovered,
            setSelectedNavItem,
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
        this.$eventBus.$on("navigation_bar_nav_item_hovered", (data) => {
            this.onNavItemHovered(data.event, data.nav_item);
        });
        this.$eventBus.$on("navigation_bar_nav_item_unhovered", (data) => {
            this.hideNavPanel(data.event);
        });
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
        this.$eventBus.$off("navigation_bar_nav_item_hovered");
        this.$eventBus.$off("navigation_bar_nav_item_unhovered");
    },
    methods: {
        handleScroll() {
            const scrollIndicator = document.querySelector("#main-header");
            const scrollPosition = window.scrollY;

            if (scrollPosition > scrollIndicator.getBoundingClientRect().height) {
                this.showScrollIndicator = true;
            } else {
                this.showScrollIndicator = false;
            }
        },
        getSelectedSubNavItems(nav_items, selectedNavItemId) {
            var selectedNavItem = nav_items.find(i => i.id === selectedNavItemId);
            if (selectedNavItem == null) {
                return [];
            }
            if (!selectedNavItem.has_sub_nav_items) {

                return [];
            }
            return this.$dataProvider.getSubNavItems(selectedNavItem);
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
        },
        toggleFullScreenNavigationPanel() {
            this.isFullScreenNavPanelShowing = !this.isFullScreenNavPanelShowing;
            this.selectedNavItemId = -1;
        },
        onFullscreenNavItemClicked(nav_item) {
            if (nav_item.has_sub_nav_items) {
                if (this.selectedNavItemId == -1 || this.selectedNavItemId != nav_item.id)
                    this.selectedNavItemId = nav_item.id;
                else this.selectedNavItemId = -1;
            } else {
                this.toggleFullScreenNavigationPanel();
            }
        }
    }
}
</script>