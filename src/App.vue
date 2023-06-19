<script setup>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import PagePathBar from "./components/tiny/PagePathBar.vue"
</script>

<template>
  <main v-if="$store.state.data!=null">
    <Header />
    <PagePathBar class="clamped-content-width-center" />
    <router-view class="clamped-content-width-center" />
    <Footer />
    <!-- <PriceConsultantBar /> -->
  </main>
</template>

<style scoped>
main {
  /* max-width: 1200px;
  margin: 0 auto; */
  /* background-color: aliceblue; */
}

@font-face {
  font-family: "Roboto Condensed";
  src: url("./fonts/RobotoCondensed-Regular.ttf") format("truetype");
}
</style>
<script>
export default {
  mounted() {
  }
}
</script>