<template>
    <div class="main-body" v-html="loadedContent"></div>
</template>
<style scoped>
.main-body {
    margin-bottom: 20px;
}
</style>
<script>

export default {
    data() {
        return {
            loadedContent: null,
            pagePath: null
        }
    }, beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.fetchContent(vm, to);
        });
    },
    beforeRouteUpdate(to, from, next) {
        this.fetchContent(this, to);
        next();
    },
    computed: {
        pages() {
            return this.$store.state.data.pages;
        },
    },
    methods: {
        getCurrentPage(routePath) {
            return this.pages.find(p => p.path == routePath);
        },
        getRelativePath(filePath) {
            return filePath.substring(0, filePath.lastIndexOf('/'));
        },
        fetchContent(target, to) {
            target.$store.dispatch('getPageContent', {
                path: to.path,
                resultCallback: (page) => {
                    console.log(page);
                    target.loadedContent = page.content;
                }
            });
        }

    }
}
</script>