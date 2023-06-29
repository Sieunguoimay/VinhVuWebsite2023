<template>
    <div class="explore-container">
        <h2 class="section-title clamped-content-width-center">{{ this.website_config.explore_more_data.title }}</h2>
        <div class="articles">
            <Card_ExploreMore v-for="(card, index) in cards" :key="index" :card="card" />
        </div>
    </div>
</template>
  
<script>
import Card_ExploreMore from './Card_ExploreMore.vue';

export default {
    components: {
        Card_ExploreMore
    },
    data() {
        return {
            // cards: [],
        };
    },
    computed: {
        website_config() {
            return this.$store.state.data;
        },
        cards() {
            if (this.website_config.explore_more_data.cards == null) return [];
            return this.getRandomElements(this.website_config.explore_more_data.cards, 5);
        }
    },
    methods: {
        getRandomElements(array, numElements) {
            const shuffledArray = array.sort(() => 0.5 - Math.random());
            return shuffledArray.slice(0, numElements);
        }
    }
};
</script>
  
<style scoped>
.explore-container{
    margin-top: 50px;
}
.articles {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: stretch;
    margin-top: 20px;
    margin-bottom: 50px;
}

.section-title {
    color: gray;
    font-size: medium;
    font-weight: bold;
}
</style>