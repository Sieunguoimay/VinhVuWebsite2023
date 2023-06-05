<template>
    <div class="footer">
        <div class="upper">
            <div class="footer-content left info">
                <p>{{ info.texts.find(t => t.key == "website_full_name").value.toUpperCase() }}</p>
                <p>{{ info.texts.find(t => t.key == "address").value }}</p>
                <p>{{ info.texts.find(t => t.key == "phone").value }}</p>
                <p>{{ info.texts.find(t => t.key == "email").value }}</p>
            </div>
            <div class="middle">
            </div>
            <div class="right footer-content">
                <a v-for="social in info.socials" :href="social.url" :key="social.name" class="social" target="_blank">
                    <img :src="social.img" :alt="social.name">
                </a>
            </div>
        </div>
        <div class="lower">
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
    min-height: 200px;

    background-color: rgb(68, 80, 90);
    padding-top: 20px;
}

.upper {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: wrap;
    justify-content: space-evenly;
    height: 80%;
}

.upper div {
    /* flex: 1; */
    min-width: 300px;
}

.social img {
    width: 50px;
    height: auto;
}

.footer-content {
    color:aliceblue;
}
.info{

}
</style>
<script>
export default {
    data() {
        return this.$dataProvider.getData();
    }
}
</script>