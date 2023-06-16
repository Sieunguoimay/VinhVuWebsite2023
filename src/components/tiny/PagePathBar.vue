<template>
    <div class="container">
        <p class="path">
        <span v-for="segment in getDisplayPath()" class="path-segment">
            <span>{{ segment }}</span>
            <img src="/src/assets/down-arrow.png" alt="Down Arrow">
        </span>
        </p>
    </div>
</template>
<style scoped>
.container {
    padding-left: 10px;
    padding-right: 10px;
    /* background-color: rgb(210, 210, 210); */
    font-size: .7em;/*1.2svb;*/
    margin-bottom: 15px;
}

.path {
    display: flex;
    flex-direction: row;
    gap: 5px;
}
.path-segment{
    display: flex;
    flex-direction: row;
    gap: 5px;
}
.path span {
    /* padding-left:10px;
    padding-right:10px; */
}

.path img {
    height: 8px;
    width: auto;
    object-fit: cover;
    transform: rotate(-90deg);
    align-self: center;
}
</style>
<script>
import { useRouter } from 'vue-router';
export default {
    data() {
        return this.$dataProvider.getData();
    },
    methods: {
        getDisplayPath() {
            return this.$dataProvider.getPageDisplayPath(this, this.$route.path);
        }
    }
}
</script>