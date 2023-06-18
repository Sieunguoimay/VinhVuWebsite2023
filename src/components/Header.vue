<template>
    <div class="header ">
        <div class="header-container clamped-content-width-center">
            <div class="logo header-item" id="main-header">
                <router-link :to="`${navigation.nav_items[0].target_page_index}`">
                    <img :src="'/src/assets' + info.logo.img" :alt="info.logo.alt_string">
                </router-link>

            </div>
            <div class="nav-button" @click="toggleFullScreenNavigationPanel()">

            </div>
            <div class="header-right">
                <div class="header-top-right">
                    <HeaderHandyInfo />
                </div>
                <NavigationBar class="header-item header-bottom-right" />
            </div>
        </div>
    </div>

    <div class="navigation-panel" :style="{ top: navPanelPosition.y + 'px', left: navPanelPosition.x + 'px' }"
        v-if="isNavPanelShowing" @mouseover="cancelHideNavPanel" @mouseleave="hideNavPanel">
        <div class="nav-item" v-for="sub_nav_item in getSelectedSubNavItems(selectedNavItemIndex)" :key="sub_nav_item.path"
            :class="{ 'sub-nav-item-is-current': sub_nav_item.is_current, 'nav-panel-item': !sub_nav_item.is_current }">
            <router-link :to="sub_nav_item.path">{{ sub_nav_item.display_name }}</router-link>
        </div>
    </div>

    <div class="navigation-panel-fullscreen" v-if="isFullScreenNavPanelShowing">
        <div class="nav-item" v-for="nav_item in navigation.nav_items" :key="nav_item.path"
            @click="onFullscreenNavItemClicked(nav_item)">

            <router-link :to="nav_item.path">{{ nav_item.display_name }}</router-link>

            <div class="nav-panel-item nav-item" v-if="selectedNavItemIndex == navigation.nav_items.indexOf(nav_item)"
                v-for="sub_nav_item in (nav_item.sub_nav_items)" :key="sub_nav_item.path">
                <router-link :to="sub_nav_item.path" @click="toggleFullScreenNavigationPanel()">{{
                    sub_nav_item.display_name }}</router-link>
            </div>
        </div>
    </div>

    <div class="header sticky-header" v-if="showScrollIndicator">
        <div class="sticky-header-content clamped-content-width-center">
            <NavigationBar />
            <HeaderHandyInfo />
        </div>
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
    /* background-color: rgb(236, 236, 236); */
    background-color: white;
    z-index: 3;
    margin-bottom: 10px;
}

.header-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    height: 70px;
    border-bottom: 1px solid rgb(235, 235, 235);
}

.header-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.header-top-right {
    display: flex;
    justify-content: end;
}

.header-bottom-right {}

.header-item {}

.sticky-header {
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
}
.sticky-header-content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.sticky-header NavigationBar {}

.sticky-header HeaderHandyInfo {}

@media (min-width: 768px) {

    .logo {
        max-height: 100%;
        width: 20%;
        display: flex;
        justify-content: center;
    }


    .sticky-header {
        position: sticky;
        top: 0;
        z-index: 2;
    }

    /* .header-handy-info {
        width: 70%;
        height: 30px;
    } */

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
    }

    /* .header-handy-info {
        width: 100%;
        height: 30px;
    } */

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

    padding-top: 5px;
    padding-bottom: 5px;

    width: 400px;
    max-width: 100%;

    z-index: 2;
    position: fixed;
    background-color: white;
    /* background-color: rgb(255, 230, 230); */
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
}

.nav-panel-item {
    padding-left: 10px;
    padding-right: 10px;
}

.nav-panel-item a,
.sub-nav-item-is-current a {
    font-size: 16px;
    text-decoration: none;
    color: inherit;
}

.nav-panel-item:hover {
    background-color: rgb(255, 206, 142);
    color: white;
}

.sub-nav-item-is-current {
    color: #dd3333;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
<script>
import { objectToString } from '@vue/shared';
import { reactive, ref } from 'vue';
import NavigationBar from './tiny/header/NavigationBar.vue'
import HeaderHandyInfo from './tiny/header/HeaderHandyInfo.vue'

export default {
    components: {
        NavigationBar,
        HeaderHandyInfo
    },
    computed: {
        navigation() {
            return this.$store.state.data.navigation;
        },
        info() {
            return this.$store.state.data.info;
        }
    }
    ,
    data() {
        return {
            showScrollIndicator: false,
        }
    },
    setup() {
        const isFullScreenNavPanelShowing = ref(false);
        const selectedNavItemIndex = ref(0);
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

        const onNavItemHovered = (event, nav_item_index, nav_item) => {
            if (nav_item.has_sub_nav_items) {
                showNavPanel(event);
                setSelectedNavItem(nav_item_index);
            }
        }
        const setSelectedNavItem = (nav_item_index) => {
            selectedNavItemIndex.value = nav_item_index;
        };

        return {
            selectedNavItemIndex,
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
            this.onNavItemHovered(data.event, data.nav_item_index, data.nav_item);
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
        getSelectedSubNavItems(selectedNavItemIndex) {
            var selectedNavItem = this.navigation.nav_items[selectedNavItemIndex];
            if (selectedNavItem == null) {
                return [];
            }
            if (!selectedNavItem.has_sub_nav_items) {

                return [];
            }
            return selectedNavItem.sub_nav_items;
        },
        toggleFullScreenNavigationPanel() {
            this.isFullScreenNavPanelShowing = !this.isFullScreenNavPanelShowing;
            this.selectedNavItemIndex = -1;
        },
        onFullscreenNavItemClicked(nav_item) {
            var nav_item_index = this.navigation.nav_items.indexOf(nav_item);
            if (nav_item.has_sub_nav_items) {
                if (this.selectedNavItemIndex == -1 || this.selectedNavItemIndex != nav_item_index)
                    this.selectedNavItemIndex = nav_item_index;
                else this.selectedNavItemIndex = -1;
            } else {
                this.toggleFullScreenNavigationPanel();
            }
        }
    }
}
</script>