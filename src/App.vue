<template>
    <div class="app">
        <h1 class="title">Folding<span class="at">@</span>Home</h1>

        <div class="menu">
            <button class="menu_item" @click="ungroup">Jednotlivé teamy</button>
            <button class="menu_item" @click="group">Univerzity</button>
        </div>

        <div class="container">
            <div class="row counters" v-if="grouped">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" v-for="(group, index) in groups" :key="index">
                    <GroupCounter
                            :name="group.name"
                            :logo="group.logo"
                            :color="group.color"
                            :teams="group.teams"
                    />
                </div>
            </div>
            <div class="row counters" v-else>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" v-for="(university, index) in universities" :key="index">
                    <Counter
                            :id="university.id"
                            :name="university.name"
                            :logo="university.logo"
                            :color="university.color"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Counter from './components/Counter.vue'
    import universities from "./universities";

    export default {
        name: 'App',
        components: {
            Counter
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
            universities,
        }),
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
        margin: 3rem 0;
    }

    .app .title .at {
        color: #ff0000;
    }

    .app .counters {
        display: flex;
        flex-flow: row wrap;
    }
</style>
