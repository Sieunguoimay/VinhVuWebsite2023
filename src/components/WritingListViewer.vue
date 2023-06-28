<template>
    <!-- HEY HEY {{ $route.params.section }} -->
    <div>
        {{ this.group_data }}
    </div>
    <div>
        {{ this.groups }}
    </div>
</template>
<style scoped></style>
<script>
export default {
    data() {
        return {
            group_data: {},
        }
    },
    mounted() {
    },
    beforeDestroy() {
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.reload(vm, to.path);
        });
    },
    beforeRouteUpdate(to, from, next) {
        this.reload(this, to.path);
        next();
    },
    computed: {
        currentGroupPath() {
            return this.$route.path;
        },
        groups() { return this.$store.state.data.page_groups; },
    }, methods: {
        reload($this, path) {
            $this.$store.dispatch('getPageGroupData', {
                pageGroupPath: path,
                output: (data) => {
                    $this.group_data = data;
                }
            });
        },
    }
}
</script>