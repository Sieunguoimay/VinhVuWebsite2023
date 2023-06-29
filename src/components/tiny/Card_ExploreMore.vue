<template>
    <div class="card" @click="navigateTo(card.page_path)">
        <!-- < figure > -->
        <div class="frame">
            <img :src="card.img" alt="">
        </div>
        <!-- </figure> -->
        <h2 class="title">{{ title }} </h2>
    </div>
</template>
<script>
import $dataUtils from '../../data_utils'
export default {
    props: {
        card: {
            page_path: "",
            title: "",
            img: "",
            preview_content: "",
        },
    },
    methods: {
        navigateTo(link) {
            this.$router.push(link);
        },
    },
    computed: {
        title() {
            var title = this.card.title;
            var clamped = $dataUtils.getFirstNWords(title, 10);
            if (title.length > clamped) {
                return clamped + "..";
            } return clamped;
        }
    }
}
</script>

<style scoped>
.card {
    flex: 1;
    min-width: 200px;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid rgb(245, 245, 245);
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    gap: 5px;
    padding-bottom: 5px;
}

.card .frame {
    display: flex;
    flex-direction: column;
    height: 150px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform-origin: center;
    transform: scale(var(--img-scale));
    transition: transform 0.4s ease-in-out;
}

.card .title {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 1rem;
    --title-color: inherit;
    color: var(--title-color);
}

.card:hover,
.card:focus {
    --img-scale: 1.05;
    --title-color: #379237;
    --link-icon-translate: 0;
    --link-icon-opacity: 1;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 5px 0px;
}
</style>