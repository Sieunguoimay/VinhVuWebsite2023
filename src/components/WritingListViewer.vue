<template>
    <div class="container clamped-content-width-center">
        <div class="layout">
            <div class="left">
                <div class="group-buttons">
                    <router-link v-for="g in groups" :to="g.path">
                        {{ g.name }}
                    </router-link>
                </div>

            </div>
            <div class="right">
                <div class="pages-list">
                    <Card2 v-for="card in cards" :card="card" class="grid-cell" :key="card.page_path" />
                </div>
            </div>
        </div>
        <ExploreMoreSection/>
        <!-- <div class="log">
            <div>
                {{ this.group_data }}
            </div>
        </div> -->
    </div>
</template>
<style scoped>
.container{
    margin-top:50px;
}
.layout {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
}

.left {
    min-width: 20%;
    background-color: rgb(241, 241, 241);
    display: flex;
    flex-direction: column;
}

.left .group-buttons {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}

.group-buttons a {
    padding: 10px;
    text-decoration: none;
    margin-bottom: 5px;
}

.group-buttons a:not(.router-link-active) {
    --group-button-text-color: gray;
    color: var(--group-button-text-color);
}

.group-buttons a:not(.router-link-active)::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    border-bottom: 2px solid #364d6a;
}

.group-buttons a:hover:not(.router-link-active) {
    --group-button-text-color: #364d6a;
}

.router-link-active {
    background-color: #364d6a;
    --group-button-text-color: white;
    color: var(--group-button-text-color);
}

.right {
    margin-left: 10px;
    margin-right: 10px;
}

.pages-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: stretch;
    gap: 20px;
}

.grid-cell {
    /* margin-bottom: 40px; */
}

@media (min-width: 1200px) {
    /* .grid-cell {
        width: 30%;
    } */
}

@media (min-width:768px) and (max-width: 1200px) {
    .left {
        display: none;
    }

    /* .grid-cell {
        width: 30%;
    } */
}

@media (max-width: 768px) {
    .left {
        display: none;
    }

    /* .grid-cell {
        width: 49%;
    } */
}
</style>
<script>
import Card2 from './tiny/Card2.vue';
import ExploreMoreSection from './tiny/ExploreMoreSection.vue';
import $dataUtils from '../data_utils'
export default {
    components: {
        Card2,
        ExploreMoreSection
    },
    data() {
        return {
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
        nav_group() {
            if (this.$store.state.data.navigation.nav_groups == undefined) return null;
            return this.$store.state.data.navigation.nav_groups.find(ng => this.$route.path.startsWith(ng.path));
        },
        groups() {
            if (this.nav_group == null) {
                return this.$store.state.data.page_groups;
            }
            return this.$store.state.data.page_groups.filter(pg => pg.path.startsWith(this.nav_group.path));
        },
        group_data() { return this.groups.find(g => g.path == this.$route.path) },
        cards() {
            if (this.group_data.pages != undefined) {
                return this.group_data.pages.map(p => {
                    return $dataUtils.createCardData(p, p.content);
                });
            }
            return [];
        }
    }, methods: {
        reload($this, path) {
            $this.$store.dispatch('tryLoadPageGroupData', {
                pageGroupPath: path,
                output: (data) => {
                    // console.log(data);
                }
            });
            $this.$store.dispatch('tryLoadExploreMoreData', {
                output: (data) => {
                    console.log($this.$store.state.data.explore_more_data);
                }
            });
        },
    }
}
</script>