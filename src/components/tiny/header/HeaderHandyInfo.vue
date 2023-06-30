<template>
    <div class="header-handy-info">
        <span>Hotline: {{ phone }}</span><span>|</span>
        <span>Email: {{ mail }}</span><span>|</span>
        <span>Website: {{ website }}</span>
    </div>
</template>
<style scoped>
.header-handy-info {
    color: rgb(127, 141, 152);
    display: flex;
    flex-direction: row;
    /* justify-content: end; */
    align-items: center;
    /* padding-top: 2px; */
    gap: 10px;
    font-size: small;
}

.header-handy-info span {
    /* flex-grow: 1;
    text-align: center; */
}

/* .header-handy-info>*:not(:last-child) { */
/* border-right: 1px solid black; */
/* padding-right: 10px; */
/* Optional: Add some spacing between the elements */
/* } */

/* .header-handy-info>*:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-80%);
    height: 50%;
    border-right: 1px solid rgb(194, 194, 194);
} */
</style>

<script>
export default {
    computed: {
        info() {
            return this.$store.state.data.info;
        },
        phone() {
            return this.info.texts.find(t => t.key == "phone").value;
        }, mail() {
            return this.info.texts.find(t => t.key == "email").value;
        },
        website() {
            return this.info.website_url.label;
        }
    }
}
</script>