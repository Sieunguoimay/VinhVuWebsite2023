<template>
    <div>
        <div class="container">
            <div class="label">
                <p>{{ label }}:</p>
            </div>
            <div class="contact-media">
                <a :href="messenger.value" class="contact-media-item"><img src="/src/assets/socials/messenger.png"
                        alt="/src/assets/socials/messenger.png"></a>
                <a :href="'tel:' + phone.value" class="contact-media-item"><img src="/src/assets/headset.png"
                        alt="/src/assets/headset.png"></a>
                <a :href="'mailto:' + mail.value" class="contact-media-item"><img src="/src/assets/email.png"
                        alt="/src/assets/email.png"></a>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    background-color: #364d6a;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    padding-left: auto;
    padding-right: auto;
}

.label {
    font-size: medium;
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

    background-color: #364d6a;
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
            label: "Nhận tư vấn báo giá trực tiếp",
        }
    },
    computed: {
        messenger() {
            return this.$store.state.data.info.texts.find(t => t.key == 'messenger');
        },
        phone() {
            return this.$store.state.data.info.texts.find(t => t.key == 'phone');
        }, mail() {
            return this.$store.state.data.info.texts.find(t => t.key == 'email');
        }
    }
}
</script>