<template>
    <div class="app" >
        <LanguageSwitch/>
        <a class="bugs" href="https://github.com/jirkavrba/folding-stats/issues/new" target="_blank">{{ $t('issues') }}</a>

        <h1 class="title">Folding<span class="at">@</span>Home</h1>
        <div class="start" v-html="$t('start_folding')"></div>
        <div class="menu">
            <router-link to="/top5">
                <button class="menu__item">Top 5</button>
            </router-link>
            <router-link to="/">
                <button class="menu__item">{{ $t('teams') }}</button>
            </router-link>
            <router-link to="/institutions">
                <button class="menu__item">{{ $t('institutions') }}</button>
            </router-link>
        </div>
        <div class="container">
            <div class="row counters">
                <div class="col-xs-12">
                    <div class="total__intro">{{ $t('total') }}</div>
                    <h1 class="total">{{ $n($store.state.total) }}</h1>
                    <div class="total__intro">{{ $t('points') }}</div>
                </div>
            </div>
        </div>
        <hr class="divider">
        <div class="container">
            <router-view></router-view>
        </div>
        <hr class="divider">
        <footer>
            <div class="join">
                <span v-html="$t('addition_request')"></span>
            </div>
            &copy; 2020 <b>Jiří Vrba</b>, Jan Pokorný, Jakub Meinlschmidt, Antonín Kříž, Ondřej Štorc<br>
            <span class="no-decoration" v-html="$t('attribution')"></span>
        </footer>
        <LoadingOverlay v-if="this.$store.state.loading" :progress="this.$store.state.loadingProgress"/>
    </div>
</template>

<script>
    import i18n from "@/lang";
    import router from '@/router';
    import store from '@/store';

    import LanguageSwitch from "@/components/LanguageSwitch";
    import LoadingOverlay from '@/components/LoadingOverlay.vue';

    export default {
        name: 'App',
        i18n: i18n,
        store: store,
        router: router,
        components: {
            LanguageSwitch,
            LoadingOverlay,
        },
        methods: {},
        async mounted() {
            await this.$store.dispatch("loadTeams")

            window.setInterval(() => this.$store.dispatch("loadTeams", true), 5 * 60 * 1000);
        }
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

    .app > div.loading {
        filter: grayscale(100%)
    }

    .app .menu {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
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

    .app .bugs {
        display: block;
        text-align: center;
        font-size: 1rem;
        margin: 0.5rem;
        text-transform: uppercase;
        text-decoration: none;
        font-weight: bold;
        color: #000000;
    }

    .app .divider {
        border: none;
        border-top: 1px solid #aaaaaa;
        margin: 2rem 0;
    }

    .app .total__intro {
        text-align: center;
        margin: 0.75rem auto;
        font-size: 1.5rem;
        text-transform: uppercase;
        color: #999999;
    }

    .app .total {
        text-align: center;
        margin: 1rem auto;
        font-size: 3rem;
        text-transform: uppercase;
    }

    .app .bugs:hover, .app .bugs:focus {
        color: #0099ff;
    }

    .app .title {
        font-size: 3rem;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        margin: 1rem 0 1rem;
    }

    .app .title .at {
        color: #ff0000;
    }

    .app .counters {
        display: flex;
        flex-flow: row wrap;
    }

    .app footer {
        text-align: center;
        text-transform: uppercase;
        font-size: 1.25rem;
        color: #aaaaaa;
        padding: 1rem 0;
    }

    .app footer b {
        color: #666666;
    }

    .app .join {
        color: #888888;
        margin-bottom: 1rem;
    }

    .app .join a {
        color: #000000;
        text-decoration: none;
    }

    .app .no-decoration a {
        text-decoration: none;
    }

    .app .start {
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 1rem;
    }

    .app .start a {
        display: inline-block;
        margin-top: 0.4rem;
        color: #ff0000;
        text-decoration: none;
    }
</style>
