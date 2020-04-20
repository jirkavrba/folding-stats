<template>
    <div class="app">
        <h1 class="title">Folding<span class="at">@</span>Home</h1>

        <div class="menu">
            <button class="menu__item" @click="ungroup">Jednotlivé teamy</button>
            <button class="menu__item" @click="group">Univerzity</button>
        </div>

        <div class="container">
            <div class="row counters" v-if="grouped">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" v-for="(university, index) in universities"
                     :key="index">
                    <GroupCounter
                            :name="university.name"
                            :logo="university.logo"
                            :color="university.color"
                            :teams="university.teams"
                    />
                </div>
            </div>
            <div class="row counters" v-else>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" v-for="(team, index) in teams" :key="index">
                    <Counter
                            :id="team.id"
                            :name="team.name"
                            :logo="team.logo"
                            :color="team.color"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Counter from './components/Counter.vue'
    import GroupCounter from './components/GroupCounter.vue'

    import universities from "./universities";

    export default {
        name: 'App',
        components: {
            Counter,
            GroupCounter
        },
        methods: {
            group() {
                this.grouped = true;
            },
            ungroup() {
                this.grouped = false;
            }
        },
        data: () => ({
                grouped: false,
                universities: universities,
                teams: universities.map(university => university.teams.map(team => ({
                    id: team.id,
                    name: team.name,
                    color: university.color,
                    logo: university.logo
                }))).flat()
            }
        ),
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Unica+One&display=swap');

    .app {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        font-family: 'Unica One', monospace;
    }

    .app .menu {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
    }

    .app .menu__item {
        color: #ffffff;
        background: #000000;
        border: 3px solid #000000;
        margin: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 1.5rem;
        font-family: 'Unica One', monospace;
        text-transform: uppercase;
        cursor: pointer;
    }

    .app .menu__item:focus, .app .menu__item:hover {
        background: #ffffff;
        color: #000000;
    }

    .app .counters {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }

    .app .title {
        font-size: 3rem;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        margin: 3rem 0 1rem;
    }

    .app .title .at {
        color: #ff0000;
    }

    .app .counters {
        display: flex;
        flex-flow: row wrap;
    }
</style>
