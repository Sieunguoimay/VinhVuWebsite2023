<template>
    <div class="container">
        <div class="label">
            <p>{{ label }}</p>
        </div>
        <div class="contact-media">
            <a href="#" class="contact-media-item" v-for="item in contact_items" :key="item.url">
                <img :src="item.img" :alt="item.img" />
            </a>
        </div>
    </div>
</template>
<style scoped>
.container {
    background-color: orange;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
}

.label {
    font-size: large;
    color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
}

.contact-media {
    width: fit-content;
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.contact-media-item {
    width: 50px;
    height: 40px;
    /* background-color: aqua; */
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: bisque;
}

.contact-media-item img {
    height: 80%;
    width: auto;
    object-fit: cover;
}
</style>
<script>
export default {
    data() {
        return {
            label: "Nhan tu van bao gia truc tiep:",
            contact_items: [
                {
                    url: "#",
                    img: "./src/assets/socials/icon_zalo.png"
                }, {
                    url: "#",
                    img: "./src/assets/socials/icon_zalo.png"
                }, {
                    url: "#",
                    img: "./src/assets/socials/icon_zalo.png"
                }
            ]
        }
    }
}
</script>