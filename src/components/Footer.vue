<template>
    <PriceConsultantBar class="clamped-content-width-center" />
    <div class="footer  clamped-content-width-center">
        <div class="upper">
            <div class="footer-content left info">
                <p>{{ info.texts.find(t => t.key == "website_full_name").value.toUpperCase() }}</p>
                <p>{{ info.texts.find(t => t.key == "address").value }}</p>
                <p>{{ info.texts.find(t => t.key == "phone").value }}</p>
                <p>{{ info.texts.find(t => t.key == "email").value }}</p>
            </div>
            <div class="middle footer-content navigation">
                <div class="nav-items-group" v-for="nav_item in navigation.nav_items.filter(i => i.has_sub_nav_items).sort((a,b)=>b.display_name.localeCompare(a.display_name))">
                    <div class="group-name">
                        <p>{{ nav_item.display_name.toUpperCase() }}</p>
                    </div>
                    <div class="sub-nav-item" v-for="item in nav_item.sub_nav_items">
                        <router-link :to="item.path">{{
                            item.display_name
                        }}</router-link>
                    </div>
                </div>
            </div>
            <div class="right footer-content">
                <div class="social-title">
                    <p>SOCIAL MEDIA</p>
                </div>
                <div class="social">
                    <a v-for="social in info.socials" :href="social.url" :key="social.name" target="_blank">
                        <img :src="'/src/assets' + social.img" :alt="social.name">
                    </a>
                </div>
            </div>
        </div>

    </div>
    <div class="footer-lower clamped-content-width-center">
        <a :href="info.website_url.url">{{ info.website_url.label }}</a>
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

    background-color: #ffffff;
}

.upper {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: wrap;
    /* justify-content: space-evenly; */
    height: 80%;
    margin-top: 20px;

}

.footer-lower {
    /* border-top: 1px solid rgb(56, 65, 80); */
    min-height: 50px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgb(235, 235, 235);
}

.footer-lower a {
    color: #313b31;
}
.footer-content {

    color: gray;
    margin-bottom: 20px;
}

.left,
.right {
    flex: 1;
    min-width: 200px;
}
.middle {
    flex: 2;
    min-width: 400px;
}

.navigation {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap:10px;
}

.nav-items-group {
    flex: 1;
}

.group-name p {
    font-weight: bold;
}

.info {
    font-style: italic;
}

.sub-nav-item {
    font-style: italic;
}

/* .sub-nav-item { */
/* font-size: small; */
/* } */

.sub-nav-item a {
    text-decoration: none;
    color: inherit;
}

.right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.social-title p {
    font-style: italic;
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
import PriceConsultantBar from "./tiny/PriceConsultantBar.vue"

export default {
    components: { PriceConsultantBar },
    computed: {
        navigation() {
            return this.$store.state.data.navigation;
        },
        info() {
            return this.$store.state.data.info;
        }
    }
}
</script>