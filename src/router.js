import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue';
import Contact from './components/Contact.vue';
import WritingViewer from './components/WritingViewer.vue';
import store from './store'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/contact', component: Contact },
        { path: '/services/:page?', component: WritingViewer },
        { path: '/solutions/:page?', component: WritingViewer },
        { path: '/news/:page?', component: WritingViewer },
    ]
});
router.beforeEach((to, from, next) => {
    store.dispatch('updateNavigationItemCurrent',to.path);
    next();
});

export default router;