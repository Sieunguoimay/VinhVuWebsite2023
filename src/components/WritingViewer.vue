<template>
    <div class="main-body" v-html="loadedContent"></div>
    <div id="dynamic-component">
        <!-- <iframe :src="pagePath" frameborder="0" ref="myFrame" @load="resizeIframe"></iframe> -->
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
import { createApp, defineComponent } from 'vue';
import { compile } from 'vue-template-compiler'
import axios from 'axios'
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
            var page = vm.getCurrentPage(to.path);
            if (page == null || page.content_path == undefined) return;
            // vm.loadContent(page.content_path);
            // vm.loadContent('/src/data/website-config.json');
            vm.fetchHtml(page.content_path);
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
        loadContent(path) {
            // if (page == null || page.content_path == undefined) return;
            axios.get(path).then(r => {
                this.loadedContent = this.fixRelativePath(r.data, this.getRelativePath(path));
            }).catch(error => {
                console.error(error);
            });
        },
        getRelativePath(filePath) {
            return filePath.substring(0, filePath.lastIndexOf('/'));
        },
        fixRelativePath(htmlContent, prefix) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            const images = doc.querySelectorAll('img');
            images.forEach(image => {
                const currentSrc = image.getAttribute('src');
                const modifiedSrc = prefix + '/' + currentSrc; // Modify the image path as desired
                image.setAttribute('src', modifiedSrc);
            });
            return doc.documentElement.innerHTML;
        },
        resizeIframe() {
            const iframe = this.$refs.myFrame;
            if (iframe) {
                iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
            }
        },
        fetchHtml(path) {
            axios.get(path)
                .then(response => {
                    // const rawHtml = response.data;
                    // const rawHtml = this.fixRelativePath(response.data, this.getRelativePath(path))

                    // Extract CSS styles from the raw HTML
                    // Template string for the dynamic component
                    const templateString = `<div>This is a dynamic component!</div>`;

                    // Compile the template string into a render function
                    const { render, staticRenderFns } = compile(templateString);

                    // Create a new Vue component using defineComponent
                    const DynamicComponent = defineComponent({
                        render: () => h(render, staticRenderFns)
                    });

                    // Mount the dynamic component to the placeholder element
                    createApp(DynamicComponent).mount('#dynamic-component');
                    // createApp(CustomComponent).mount('#dynamic-component');

                })
                .catch(error => {
                    console.error('Error fetching raw HTML:', error);
                });
        }
    }
}
</script>