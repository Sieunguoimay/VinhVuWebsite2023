<template>
    <div class="main-body">
        <div class="slider">
            <transition name="slide" mode="out-in">
                <img :key="currentSlide" class="slide" :src="slides[currentSlide]" alt="Slide">
            </transition>
        </div>
        <h1>Main content goes here.. {{ $route.params.index }}</h1>
    </div>
</template>
<style scoped>
.main-body {
    height: 1000px;
    /* padding-top: 2px; */
}

.slider {
    max-height: 50vh;
    min-height: 100px;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color:rgb(201, 201, 201);
}

.slide {
    /* position: absolute; */
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    object-fit: cover;
}

.slide-enter-active {
    animation: slide-in 1s;
}

.slide-leave-active {
    animation: slide-out 1s;
}

@keyframes slide-in {
    0% {
        transform: translateX(100%);
    }

    70% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slide-out {
    0% {
        transform: translateX(0);
        opacity: 1;
    }

    30% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
        opacity: 0;
    }
}
</style>
<script>
export default {
    data() {
        return {
            slides: [
                '/src/assets/cover/cover_image_1.jpg',
                '/src/assets/cover/cover_image_2.jpg',
            ],
            currentSlide: 0,
        };
    },
    created() {
        console.log(this.$route.params);
    }, mounted() {
        setInterval(this.nextSlide, 5000);
    }, methods: {
        nextSlide() {
            this.currentSlide++;
            if (this.currentSlide >= this.slides.length) {
                this.currentSlide = 0;
            }
        }
    }
}
</script>