<template>
    <div class="card-container">
        <div v-for="(card, index) in cards" :key="index" class="card" @click="navigateTo(card.page_path)">
            <img :src="card.img" alt="Card Image" class="card-image" />
            <div class="card-title">{{ card.title.toUpperCase() }}</div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            cards: [],
            // loadedContent: null,
        };
    },
    mounted() {
        axios.get('/src/data/home-cards.json').then(response => {
            this.cards = response.data.slice(0, 3);
            this.useDefaultImageIfRequire();
        }).catch(error => {

        });
        // this.$store.dispatch('getPageContent', {
        //     path: to.path,
        //     resultCallback: result => {
        //         this.loadedContent = result;
        //     }
        // });
    },
    methods: {
        navigateTo(link) {
            // Logic to navigate to another page using the provided link
            // Example:
            this.$router.push(link);
        },
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
.card-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 1;
    min-width: 200px;
    display: flex;
    flex-direction: column;

    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.card-image {
    width: 100%;
    height: 70%;
    object-fit: cover;
}

.card-title {
    padding: 10px;
    text-align: center;
    font-size: large;
    height: 100px;

    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    white-space: pre-wrap;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
}

.card:not(:last-child) {
    /* margin-right: 20px; */
}
</style>