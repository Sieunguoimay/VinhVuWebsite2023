<template>
    <div class="articles">
        <Card v-for="(card, index) in cards" :key="index" :card="card"/>
    </div>
</template>
  
<script>
import $dataUtils from '../../data_utils';
import axios from 'axios';
import Card from './Card.vue';

export default {
    components: {
        Card
    },
    data() {
        return {
            cards: [],
        };
    },
    computed: {
        website_config() {
            return this.$store.state.data;
        }
    },
    mounted() {
        if (this.website_config.settings.optimize_for_speed) {
            axios.get('/src/data/home-cards.json').then(response => {
                this.cards = response.data.slice(0, 3);
                this.useDefaultImageIfRequire();
            }).catch(error => {

            });
        } else {
            var pages = this.website_config.pages.filter(p => p.path.startsWith('/services')).slice(0, 3);
            for (var p of pages) {
                this.$store.dispatch('getPageContent', {
                    path: p.path,
                    resultCallback: resultPage => {
                        this.cards.push($dataUtils.createCardData(resultPage, resultPage.content));
                    }
                });
            }
        }
    },
    methods: {
        useDefaultImageIfRequire() {
            this.cards.forEach(c => {
                if (c.img == undefined) {
                    c.img = '/src/assets/cover/cover_image_1.jpg';
                }
            })
        }
    }
};
</script>
  
<style>
.articles {
    display: grid;
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: 24px;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
}
</style>