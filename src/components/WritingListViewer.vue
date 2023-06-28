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
        <!-- <div class="log">
            <div>
                {{ this.group_data }}
            </div>
        </div> -->
    </div>
</template>
<style scoped>
.layout {
    display: flex;
    flex-direction: row;
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
}

.right {
    margin-left: 10px;
    margin-right: 10px;
}

.pages-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2%;
}

.grid-cell {
    margin-bottom: 40px;
}

@media (min-width: 1200px) {
    .grid-cell {
        width: 30%;
    }
}

@media (min-width:768px) and (max-width: 1200px) {
    .left {
        display: none;
    }

    .grid-cell {
        width: 30%;
    }
}

@media (max-width: 768px) {
    .left {
        display: none;
    }

    .grid-cell {
        width: 49%;
    }
}
</style>
<script>
import Card2 from './tiny/Card2.vue';
import $dataUtils from '../data_utils'
export default {
    components: {
        Card2
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
        groups() { return this.$store.state.data.page_groups; },
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
            console.log(this.cards);
        },
    }
}
</script>