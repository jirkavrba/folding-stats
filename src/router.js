import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import InstitutionsView from "@/screens/InstitutionsView";
import TeamDetailsView from "@/screens/TeamDetailsView";
import TeamsView from "@/screens/TeamsView";

const router = new VueRouter({
    routes: [
        {path: '/teams', component: TeamsView, name: 'teams'},
        {path: '/institutions', component: InstitutionsView, name: 'institutions'},
        {path: '/team/:id', component: TeamDetailsView, name: 'team'},
    ]
});

if (router.currentRoute.fullPath === "/")
{
    router.replace("/teams");
}

export default router;
