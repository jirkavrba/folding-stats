import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const api = "https://folding.vrba.dev/api";
const proxy = "https://corsanywhere.herokuapp.com/";
const folding = proxy + "https://stats.foldingathome.org/api";

const store = new Vuex.Store({
    state: {
        total: 0,

        loading: false,
        loadingProgress: 0,

        teams: null,
        institutions: null,
        teamDetails: {},
    },
    mutations: {
        updateTotal(state, value) {
            state.total = value;
        },
        updateInstitutions(state, institutions) {
            state.institutions = institutions;
        },
        updateTeams(state, teams) {
            state.teams = teams;
        },
        updateTeamDetails(state, payload) {
            state.teamDetails[payload.id] = payload.value;
        },
        startLoading(state) {
            state.loading = true;
            state.loadingProgress = 0;
        },
        stopLoading(state) {
            state.loading = false;
        },
        setLoadingProgress(state, progress) {
            state.loadingProgress = progress;
        },
    },
    actions: {
        async loadTeams(context, force = false) {
            // Only load teams when necessary
            if (!force && context.state.teams !== null) {
                return
            }

            context.commit('startLoading');

            const response = await fetch(api + "/teams").then(response => response.json())

            context.commit('updateTeams', response.teams.map(team => ({...team, count: 0, loaded: false})));
            context.commit('stopLoading');

            await context.dispatch("loadTeamsScore")
        },
        async loadTeamsScore(context, force = false) {
            context.commit("startLoading")

            let loaded = 0;
            let needsLoad = context.state.teams.length;
            let total = 0;

            for (let team of context.state.teams) {
                if (force || !team.loaded) {
                    fetch(folding + "/" + team.type + "/" + team.id)
                        .then(response => response.json())
                        .then(data => {
                            const count = data.credit;

                            total += count;

                            team.count = count;
                            team.loaded = true;

                            const progress = (++loaded / Math.max(needsLoad, 1)) * 100;

                            context.commit('startLoading');
                            context.commit('setLoadingProgress', progress);
                            context.commit("updateTotal", total);

                            if (loaded === needsLoad) {
                                const sorted = context.state.teams.sort((a, b) => b.count - a.count);

                                context.commit("updateTeams", sorted);
                                context.commit("stopLoading");

                                context.dispatch("loadInstitutions");
                            }
                        });

                    context.dispatch("loadTeamDetails", { id: team.id, stopLoading: false})
                }
            }
        },
        async loadInstitutionsScore(context) {
            context.commit("startLoading")

            for (let institution of context.state.institutions) {

                let sum = 0;
                let increment = 0;

                for (let sourceTeam of institution.teams) {
                    let team = context.state.teams.find(team => team.id === sourceTeam.id);

                    sum += team.count;
                    increment += context.state.teamDetails[team.id]?.increment ?? 0;
                }

                institution.count = sum;
                institution.details = {
                    increment: increment
                };
                institution.loaded = true;
            }

            const sorted = context.state.institutions.sort((a, b) => b.count - a.count);

            context.commit("updateInstitutions", sorted);

            context.commit("stopLoading")
        },
        async loadInstitutions(context) {
            // Only load teams when necessary
            if (context.state.institutions !== null) {
                return
            }

            if (context.state.teams === null) {
                console.log("before")
                await context.dispatch("loadTeams");
                console.log("after")

            }

            context.commit('startLoading')

            const response = await fetch(api + "/institutions").then(response => response.json())

            context.commit('updateInstitutions', response.institutions.map(institution => ({
                ...institution,
                count: 0,
                loaded: false
            })));

            context.commit('stopLoading')

            await context.dispatch("loadInstitutionsScore")
        },
        async loadTeamDetails(context, payload) {
            const id = payload.id;
            const stopLoading = payload.stopLoading && true;

                // Only load teams when necessary
            if (typeof context.state.teamDetails[id] !== "undefined") {
                return true;
            }

            context.commit('startLoading')

            try {
                const response = await fetch(api + "/team/" + id).then(response => response.json())

                context.commit('updateTeamDetails', {id: id, value: response})

                if (stopLoading)
                {
                    context.commit('stopLoading')
                }

                return true;
            }
            catch (error) {
                context.commit('updateTeamDetails', {id: id, value: null})

                if (stopLoading)
                {
                    context.commit('stopLoading')
                }

                return false;
            }
        }
    }
})

export default store;

