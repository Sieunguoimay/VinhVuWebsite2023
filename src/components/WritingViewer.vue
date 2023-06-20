<template>
    <div class="main-body" v-html="loadedContent"></div>
</template>
<style scoped>
.main-body {
    /* height: 1000px; */
    /* display: flex;
    flex-direction: column; */
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
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // vm.pagePath = vm.getCurrentPage(to.path).content_path;
            // var page = vm.getCurrentPage(to.path);
            // if (page == null || page.content_path == undefined) return;
            vm.$store.dispatch('getPageContent', {
                path: to.path,
                resultCallback: result => {
                    vm.loadedContent = result;
                }
            });
        });
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


    }
}
</script>