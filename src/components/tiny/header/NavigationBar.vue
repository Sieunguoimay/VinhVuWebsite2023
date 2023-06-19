<template>
    <div class="navigation header-item">
        <div v-for="nav_item in navigation.nav_items" :key="nav_item.id" class="nav-item"
            @mouseover="onNavItemHovered($event, nav_item)"
            @mouseleave="{ if(nav_item.has_sub_nav_items) onNavItemUnhovered($event); }"
            :class="{ 'nav-item-is-current': nav_item.is_current, 'nav-item-is-not-current': !nav_item.is_current }">

            <router-link :to="nav_item.path" v-if="!nav_item.has_sub_nav_items">{{
                nav_item.display_name.toUpperCase() }}</router-link>
            <a v-if="nav_item.has_sub_nav_items">{{ nav_item.display_name.toUpperCase() }}
                <img src="/src/assets/down-arrow.png" alt="Down Arrow" v-if="nav_item.has_sub_nav_items">
            </a>
        </div>
    </div>
</template>
<style scoped>
@media (min-width: 768px) {
    .navigation {
        display: flex;
    }
}

@media (max-width: 768px) {
    .navigation {
        display: none;
    }
}

.navigation {
    flex-direction: row;
    flex-wrap: wrap;
    /* justify-content: end; */
    gap:40px;
    /* justify-content: space-evenly; */
    /* flex: 1; */
}

.nav-item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    align-items: center;
    gap: 5px;
    margin-top: 2px;
    margin-bottom: 2px;
}

.nav-item a {
    text-decoration: none;
    font-size: small;
    font-weight: bold;
    padding-top: 3px;

    /* pointer-events: none; */
    /* color: gray; */
    cursor:pointer;
}

.nav-item img {
    height: 10px;
    width: auto;

    pointer-events: none;
}

.nav-item-is-not-current a:not(:hover) {
    color: gray;
    transition: color 0.2s;
}

.nav-item-is-not-current a:hover {
    /* color: #dd3333; */
    color: #379237;
    transition: color 0.2s;
}

.nav-item:not(:hover) {}

.nav-item:hover {
    position: relative;
}

.nav-item:hover::after,
.nav-item-is-current:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: #379237;
    transform: translateX(-50%);
    transform-origin: center;
    animation: underline 0.3s forwards;
}

.nav-item-is-current a {
    color: #379237;
}

@keyframes underline {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}

.nav-item:not(:hover) {
    color: inherit;
    transition: color 0.2s;
}
</style>
<script>
import { ref } from 'vue';

export default {
    computed: {
        navigation() {
            return this.$store.state.data.navigation;
        },
        info() {
            return this.$store.state.data.info;
        }
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
        onNavItemHovered(event, nav_item) {
            var params = { event: event, nav_item_index: this.navigation.nav_items.indexOf(nav_item), nav_item: nav_item };
            this.$eventBus.$emit("navigation_bar_nav_item_hovered", params);
            // nav_item.is_current = !nav_item.is_current;
        },
        onNavItemUnhovered(event) {
            var params = { event: event };
            this.$eventBus.$emit("navigation_bar_nav_item_unhovered", params);
        }
    }
}
</script>