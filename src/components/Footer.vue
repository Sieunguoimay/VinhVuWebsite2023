<template>
    <div class="footer">
        <div class="upper">
            <div class="footer-content left info">
                <p>{{ info.texts.find(t => t.key == "website_full_name").value.toUpperCase() }}</p>
                <p>{{ info.texts.find(t => t.key == "address").value }}</p>
                <p>{{ info.texts.find(t => t.key == "phone").value }}</p>
                <p>{{ info.texts.find(t => t.key == "email").value }}</p>
            </div>
            <div class="middle footer-content navigation">
                <div class="nav-items-group" v-for="group in navigation.nav_items.filter(i => i.has_sub_nav_items)">
                    <div class="group-name">
                        <p>{{ group.display_name.toUpperCase() }}</p>
                    </div>
                    <div class="sub-nav-item" v-for="item in this.$dataProvider.getSubNavItems(group)">
                        <router-link :to="this.$dataProvider.getPage(item.target_page_index).path">{{
                            item.display_name
                        }}</router-link>
                    </div>
                </div>
            </div>
            <div class="right footer-content social">
                <a v-for="social in info.socials" :href="social.url" :key="social.name" target="_blank">
                    <img :src="'/src/assets' + social.img" :alt="social.name">
                </a>
            </div>
        </div>
        <div class="footer-lower">
            <a :href="info.texts.find(t => t.key == 'website_url').value">{{ info.texts.find(t => t.key ==
                "website_url").label }}</a>
        </div>
    </div>
</template>
<style scoped>
/* div {
    box-shadow: 0 0 0 1px #ff0000;
}

img {
    box-shadow: 0 0 0 1px #ff0000;
} */

.footer {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    /* min-height: 200px; */

    background-color: rgb(152, 161, 168);
}

.upper {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: wrap;
    justify-content: space-evenly;
    height: 80%;
    margin-top: 20px;
}

.footer-lower {
    /* border-top: 1px solid rgb(56, 65, 80); */
    min-height: 50px;
    background-color: rgb(46, 79, 128);
    display: flex;
    justify-content: center;
    align-items: center;
}

.footer-lower a {
    color: inherit;
}

.footer-content {
    color: aliceblue;
    max-width: 100%;
    min-width: 350px;
    margin-bottom: 20px;
}

.navigation {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.nav-items-group {
    flex: 1;
}

/* .sub-nav-item { */
/* font-size: small; */
/* } */

.sub-nav-item a {
    text-decoration: none;
    color: inherit;
}

.social {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.social a {
    display: inline-block;
}

.social img {
    height: 40px;
    width: auto;
    display: block;
}

.info {}
</style>
<script>
export default {
    data() {
        return this.$dataProvider.getData();
    }
}
</script>