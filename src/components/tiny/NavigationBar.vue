<template>
    <div class="navigation header-item">
        <div class="nav-item" v-for="nav_item in navigation.nav_items" :key="nav_item.id"
            @mouseover="onNavItemHovered($event, nav_item)"
            @mouseleave="{ if(nav_item.has_sub_nav_items) onNavItemUnhovered($event); }">
            <router-link :to="nav_item.path" v-if="!nav_item.has_sub_nav_items">{{
                nav_item.display_name }}</router-link>
            <a v-if="nav_item.has_sub_nav_items">{{ nav_item.display_name }}</a>

            <img src="/src/assets/down-arrow.png" alt="Down Arrow" v-if="nav_item.has_sub_nav_items">
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
    justify-content: space-evenly;
    /* flex: 1; */
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

.nav-item:not(:hover) {
    color: inherit;
    transition: color 0.2s;
}
</style>
<script>
export default {
    data() {
        return this.$dataProvider.getData();
    },
    methods: {
        onNavItemHovered(event, nav_item) {
            this.$eventBus.$emit("navigation_bar_nav_item_hovered", { event: event, nav_item_index: this.navigation.nav_items.indexOf(nav_item), nav_item: nav_item });
        },
        onNavItemUnhovered(event) {
            this.$eventBus.$emit("navigation_bar_nav_item_unhovered", { event: event })
        }
    }
}
</script>