<template>
    <div class="main-body">
        <h1>Main content goes here.. {{ $route.params.index }}</h1>
    </div>
</template>
<style scoped>
.main-body {
    height: 1000px;
}
</style>
<script>
export default{
    created(){
        console.log(this.$route.params);
    }
}
</script>