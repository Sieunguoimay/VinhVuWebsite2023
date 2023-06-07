<script setup>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import PagePathBar from "./components/tiny/PagePathBar.vue"
</script>

<template>
  <main>
    <Header />
    <PagePathBar />
    <router-view />
    <Footer />
    <!-- <PriceConsultantBar /> -->
  </main>
</template>

<style scoped>
main {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
