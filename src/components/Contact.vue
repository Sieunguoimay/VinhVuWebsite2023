<template>
    <div class="container">
        <h1 class="head-text">{{ content.head }}</h1>
        <div class="contact-info">
            <h1 class="company-name">{{ website_full_name }}</h1>
            <p class="contact-detail">{{ website_detail }}</p>
        </div>
        <div class="map">

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12527.891197777884!2d105.76640295155774!3d21.01009389112345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134535973cbeb5d%3A0xc4ded5eeb4c63a!2zbMOgbmcgUGjDuiDEkMO0LCBQaHUgRG8sIFThu6sgTGnDqm0sIEhhbm9pLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1688095616834!5m2!1sen!2s"
                width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        content() {
            return this.$store.state.data.pages.find(p => p.path == '/contact').content;
        },
        info() {
            return this.$store.state.data.info;
        },
        website_full_name() {
            return this.info.texts.find(t => t.key == 'website_full_name').value;
        },
        website_detail() {
            var phoneNumber = this.info.texts.find(t => t.key == 'phone');
            var email = this.info.texts.find(t => t.key == 'email');
            var arr = [phoneNumber, email];
            return arr.map(s => s.label + ": " + s.value).join(" | ").toUpperCase();
        }
    }
}
</script>
<style scoped>
.container {
    margin-top: 30px;
    margin-bottom: 100px;
}

.head-text {
    color: #364d6a;
    font-size: 1.8rem;
    font-weight: bold;
}

.company-name {
    font-size: 2.1rem;
    font-weight: bold;
}

.contact-info {
    background-color: #364d6a;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    padding-bottom: 5px;
}

.contact-detail {
    font-weight: bold;
    color: rgb(232, 232, 232);
    font-size: 1.2rem;
}
.map{
    display:flex;
    justify-content: center;
    margin-top:30px;
}
</style>