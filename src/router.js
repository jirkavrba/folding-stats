import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import InstitutionsView from "@/screens/InstitutionsView";
import TeamDetailsView from "@/screens/TeamDetailsView";
import TeamsView from "@/screens/TeamsView";

const router = new VueRouter({
    routes: [
        {path: '/teams', component: TeamsView},
        {path: '/institutions', component: InstitutionsView},
        {path: '/team/:id', component: TeamDetailsView},
    ]
});

export default router;
