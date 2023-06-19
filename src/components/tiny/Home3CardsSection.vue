<template>
    <div class="card-container">
        <div v-for="(card, index) in cards" :key="index" class="card" @click="navigateTo(card.link)">
            <img :src="card.imageSrc" alt="Card Image" class="card-image" />
            <div class="card-title">{{ card.title.toUpperCase() }}</div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            cards: [
                {
                    imageSrc: '/src/assets/cover/cover_image_1.jpg',
                    title: "Solution 1",
                    link: "/page1"
                },
                {
                    imageSrc: '/src/assets/cover/cover_image_1.jpg',
                    title: "Solution 2",
                    link: "/page2"
                },
                {
                    imageSrc: '/src/assets/cover/cover_image_2.jpg',
                    title: "Solution 3",
                    link: "/page3"
                }
            ]
        };
    },
    methods: {
        navigateTo(link) {
            // Logic to navigate to another page using the provided link
            // Example:
            this.$router.push(link);
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
    gap:20px;
}

.card {
    flex: 1;
    /* max-width: 300px; */
    /* height: 400px; */
    min-width: 200px;
    /* background-color: #f1f1f1; */
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
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
}

.card:not(:last-child) {
    /* margin-right: 20px; */
}
</style>