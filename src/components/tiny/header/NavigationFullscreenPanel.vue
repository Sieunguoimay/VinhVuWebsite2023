<template>
    <div class="navigation-panel-fullscreen" v-if="isFullScreenNavPanelShowing">
        <div class="nav-item" v-for="nav_item in navigation.nav_items" :key="nav_item.path"
            @click="onFullscreenNavItemClicked(nav_item)">

            <router-link :to="nav_item.path"
                :class="{ 'is-current': nav_item.is_current, 'is-not-current': !nav_item.is_current }"
                v-if="!nav_item.has_sub_nav_items">{{ nav_item.display_name
                }}</router-link>
            <a :to="nav_item.path" :class="{
                'is-current': nav_item.is_current,
                'is-not-current': !nav_item.is_current,
                'expanded': selectedNavItemIndex == navigation.nav_items.indexOf(nav_item)
            }"
                v-if="nav_item.has_sub_nav_items">{{
                    nav_item.display_name
                }}
                <img src="/src/assets/down-arrow.png" alt="Down Arrow">
            </a>

            <div class="nav-panel-item nav-item sub-nav-item"
                v-if="selectedNavItemIndex == navigation.nav_items.indexOf(nav_item)"
                v-for="sub_nav_item in (nav_item.sub_nav_items)" :key="sub_nav_item.path">
                <router-link :to="sub_nav_item.path" @click="toggleFullScreenNavigationPanel()"
                    :class="{ 'is-current': sub_nav_item.is_current, 'is-not-current': !sub_nav_item.is_current }">{{
                        sub_nav_item.display_name }}</router-link>
            </div>
        </div>
    </div>
</template>
<style scoped>
@media (min-width: 768px) {

    .navigation-panel-fullscreen {
        display: none;
    }
}

@media (max-width: 768px) {

    .navigation-panel-fullscreen {
        position: absolute;
        z-index: 4;
        /* background-color: white; */
        width: 100%;
        box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
    }

    .navigation-panel-fullscreen a {
        background-color: white;

        padding-left: 10px;
        display: block;
        text-decoration: none;
        cursor: pointer;
    }

    .navigation-panel-fullscreen a img {
        height: 10px;
        width: auto;
    }

    .navigation-panel-fullscreen .nav-panel-item a {
        background-color: #82CD47;
    }

    .navigation-panel-fullscreen .nav-panel-item {
        background-color: #82CD47;
        padding-left: 10px;
    }

    .is-current {
        color: #379237;
    }

    .expanded img {
        transform: rotate(180deg);
    }

    .is-not-current {
        color: inherit;
    }
}
</style>
<script>
import { ref } from 'vue'
export default {
    computed: {
        navigation() {
            return this.$store.state.data.navigation;
        },
        info() {
            return this.$store.state.data.info;
        }
    },
    setup() {
        const isFullScreenNavPanelShowing = ref(false);
        const selectedNavItemIndex = ref(0);
        return {
            isFullScreenNavPanelShowing,
            selectedNavItemIndex,
        }
    },
    mounted() {
        this.$eventBus.$on("toggleFullScreenNavigationPanel", (data) => {
            this.toggleFullScreenNavigationPanel();
            var found = this.navigation.nav_items.find(i => i.is_current && i.has_sub_nav_items);
            if (found != null) {
                this.onFullscreenNavItemClicked(found);
            }
        });
    },
    beforeDestroy() {
        this.$eventBus.$off("onFullscreenNavItemClicked");
    },
    methods: {
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
        },
    }
}
</script>