import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import InstitutionsView from "@/screens/InstitutionsView";
import TeamDetailsView from "@/screens/TeamDetailsView";
import TeamsView from "@/screens/TeamsView";
import CompareTeamsProgress from "@/screens/CompareTeamsProgress";

const router = new VueRouter({
    routes: [
        {path: '/', component: TeamsView, name: 'teams'},
        {path: '/institutions', component: InstitutionsView, name: 'institutions'},
        {path: '/top5', component: CompareTeamsProgress, name: 'top5'},
        {path: '/team/:id', component: TeamDetailsView, name: 'team'},
    ]
});

export default router;
