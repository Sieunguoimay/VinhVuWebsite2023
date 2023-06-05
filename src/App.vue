<script setup>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
</script>

<template>
  <main>
    <Header />
    <router-view />
    <Footer />
  </main>
</template>

<style scoped>
main {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
