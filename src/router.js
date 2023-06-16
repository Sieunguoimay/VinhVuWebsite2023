import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue';
import Contact from './components/Contact.vue';
import WritingViewer from './components/WritingViewer.vue';
import $dataProvider from "./data"

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
    $dataProvider.updateNavigationItemCurrent(to.path);
    next();
});

export default router;