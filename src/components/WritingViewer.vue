<template>
    <!-- <div class="main-body" v-html="loadedContent"></div> -->
    <div>
        <iframe :src="pagePath" frameborder="0" ref="myFrame" @load="resizeIframe"></iframe>
    </div>
</template>
<style scoped>
.main-body {
    height: 1000px;
}

iframe {
    width: 100%;
    height: auto;
}
</style>
<script>
// import axios from 'axios'
export default {
    data() {
        return {
            // loadedContent: null,
            pagePath: null
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.pagePath = vm.getCurrentPage(to.path).content_path;
            // vm.loadContent(vm.getCurrentPage(to.path));
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
        // loadContent(page) {
        //     if (page == null || page.content_path == undefined) return;
        //     axios.get(page.content_path).then(r => {
        //         this.loadedContent = this.fixRelativePath(r.data, this.getRelativePath(page.content_path));
        //     }).catch(error => {
        //         console.error(error);
        //     });
        // },
        // getRelativePath(filePath) {
        //     return filePath.substring(0, filePath.lastIndexOf('/'));
        // },
        // fixRelativePath(htmlContent, prefix) {
        //     const parser = new DOMParser();
        //     const doc = parser.parseFromString(htmlContent, 'text/html');
        //     const images = doc.querySelectorAll('img');
        //     images.forEach(image => {
        //         const currentSrc = image.getAttribute('src');
        //         const modifiedSrc = prefix + '/' + currentSrc; // Modify the image path as desired
        //         image.setAttribute('src', modifiedSrc);
        //     });
        //     return doc.documentElement.innerHTML;
        // },
         resizeIframe() {
            const iframe = this.$refs.myFrame;
            if (iframe) {
                iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
            }
        },
    }
}
</script>