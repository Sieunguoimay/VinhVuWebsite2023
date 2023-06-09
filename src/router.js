import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue';
import Contact from './components/Contact.vue';
import WritingViewer from './components/WritingViewer.vue';
import WritingListViewer from './components/WritingListViewer.vue';
import store from './store'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/contact', component: Contact },
        { path: '/services/:page?', component: WritingViewer },
        { path: '/solutions/:page?', component: WritingViewer },
        { path: '/news/:page', component: WritingViewer },
        { path: '/newsfeed/:section?', component: WritingListViewer },
        { path: '/solutions/business', component: WritingListViewer },
        { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' },
        { path: '/:pathMatch(.*)', name: 'bad-not-found', redirect: '/' },
    ]
});

router.beforeEach((to, from, next) => {
    store.dispatch('updateNavigationItemCurrent', to.path);
    next();
});

export default router;