<template>
    <div>
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
    </div>
</template>
<style scoped>
.container {
    background-color: #82CD47;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: auto;
    padding-right: auto;
}

.label {
    font-size: large;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.contact-media {
    width: fit-content;
    display: flex;
    flex-direction: row;
}

.contact-media-item {
    width: 50px;
    height: 40px;
    /* background-color: aqua; */
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #82CD47;
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
                    img: "./src/assets/socials/messenger.png"
                }, {
                    url: "#",
                    img: "./src/assets/headset.png"
                }, {
                    url: "#",
                    img: "./src/assets/email.png"
                }
            ]
        }
    }
}
</script>