<template>
    <div class="app">
        <LanguageSwitch />
        <div :class="loading ? 'loading' : ''">
            <a class="bugs" href="https://github.com/jirkavrba/folding-stats/issues/new" target="_blank">
                {{ $t('issues') }}
            </a>

            <h1 class="title">Folding<span class="at">@</span>Home</h1>
            <div class="menu">
                <button class="menu__item" @click="ungroup">{{ $t('teams') }}</button>
                <button class="menu__item" @click="group">{{ $t('institutions') }}</button>
            </div>
            <div class="container">
                <div class="row counters">
                    <div class="col-xs-12">
                        <div class="total__intro">{{ $t('total') }}</div>
                        <h1 class="total">{{ total.toLocaleString('en-US').replace(/,/g, " ") }}</h1>
                        <div class="total__intro">{{ $t('points') }}</div>
                    </div>
                </div>
            </div>
            <hr class="divider">
            <div class="container">
                <div class="row counters" v-if="grouped">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" v-for="(university, index) in $data._universities"
                         :key="index">
                        <GroupCounter
                                :name="university.name"
                                :logo="university.logo"
                                :color="university.color"
                                :teams="university.teams"
                                :count="university.count || 0"
                                :loading="loading"
                        />
                    </div>
                </div>
                <div class="row counters" v-else>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" v-for="(team, index) in $data._teams" :key="index">
                        <Counter
                                :id="team.id"
                                :name="team.name"
                                :logo="team.logo"
                                :color="team.color"
                                :count="team.count || 0"
                                :type="team.type || 'team'"
                                :loading="loading"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="container" v-if="loading">
            <Loading :progress="(this.loaded / this.teams.length) * 100"/>
        </div>
        <footer>
            &copy; 2020 <b>Jiří Vrba</b>, Jan Pokorný, Jakub Meinlschmidt, Antonín Kříž<br>
            Vytvořili studenti <b>FIT ČVUT</b>
        </footer>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueI18n from 'vue-i18n';

    Vue.use(VueI18n)

    import Loading from './components/Loading.vue';
    import Counter from './components/Counter.vue';
    import GroupCounter from './components/GroupCounter.vue';
    import LanguageSwitch from "./components/LanguageSwitch";

    import messages from "./messages";
    import universities from "./universities";

    const userLang = localStorage.lang
        || (navigator.languages
            ? navigator.languages[0]
            : (navigator.language || navigator.userLanguage));

    const i18n = new VueI18n({
        locale: userLang?.substring(0, 2),
        fallbackLocale: "en",
        messages: messages
    })

    export default {
        name: 'App',
        i18n: i18n,
        components: {
            Loading,
            Counter,
            GroupCounter,
            LanguageSwitch,
        },
        methods: {
            group() {
                this.grouped = true;
                this.loading = false;
                this.update()
            },
            ungroup() {
                this.grouped = false;
                this.loading = false;
                this.update()
            },
            async update() {
                this.loading = true;
                this.loaded = 0;
                this.total = 0;

                const proxy = "https://corsanywhere.herokuapp.com/";
                let url = proxy + "https://stats.foldingathome.org/api/team/";

                if (this.grouped) {
                    for (let key in this.universities) {
                        universities[key].count = 0;

                        for (let i = 0; i < universities[key].teams.length; i++) {

                            // Allow "teams" to be a single donor with the type property
                            if (
                                typeof universities[key].teams[i].type !== "undefined" &&
                                universities[key].teams[i].type === 'donor'
                            ) {
                                url = url.replace('/team/', '/donor/')
                            }

                            fetch(url + universities[key].teams[i].id)
                                .then(response => response.json())
                                .then(response => {
                                    const score = Number(response.credit);
                                    this.universities[key].count += score;
                                    this.total += score;
                                    this.loaded++;

                                    if (this.loaded === this.teams.length)
                                    {
                                        // Sort the universities by their score
                                        this.$data._universities = this.universities.slice();
                                        this.$data._universities.sort((a, b) => b.count - a.count);

                                        this.loading = false
                                    }
                                });
                        }
                    }

                } else {
                    for (let i = 0; i < this.teams.length; i++) {
                        // Allow "teams" to be a single donor with the type property
                        if (
                            typeof this.teams[i].type !== "undefined" &&
                            this.teams[i].type === "donor"
                        ) {
                            url = url.replace('/team/', '/donor/')
                        }

                        fetch(url + this.teams[i].id)
                            .then(response => response.json())
                            .then(response => {
                                const score = Number(response.credit);
                                this.teams[i].count = score;
                                this.total += score;
                                this.loaded++;

                                if (this.loaded === this.teams.length)
                                {
                                    // Sort the teams by their score
                                    this.$data._teams = this.teams.slice()
                                    this.$data._teams.sort((a, b) => b.count - a.count);

                                    this.loading = false;
                                }
                            });
                    }
                }
            }
        },
        data: () => ({
                grouped: false,
                loading: true,
                loaded: 0,
                total: 0,
                _universities: [],
                _teams: [],
                universities: universities,
                teams: universities.map(university => university.teams.map(team => ({
                    id: team.id,
                    name: team.name,
                    color: university.color,
                    logo: university.logo,
                    count: 0,
                    type: typeof team.type !== "undefined" ? team.type : "team"
                }))).flat(),
            }
        ),
        mounted() {
            this.update()
            window.setInterval(() => this.update(), 5 * 60 * 1000);
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

    .app .bugs {
        display: block;
        text-align: center;
        font-size: 1.25rem;
        margin: 1rem;
        text-transform: uppercase;
        text-decoration: none;
        font-weight: bold;
        color: #000000;
    }

    .app .divider {
        color: #dddddd;
        margin: 2rem 0;
    }

    .app .total__intro {
        text-align: center;
        margin: 1rem auto;
        font-size: 2rem;
        text-transform: uppercase;
        color: #999999;
    }

    .app .total {
        text-align: center;
        margin: 1rem auto;
        font-size: 4rem;
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
        margin: 3rem 0 1rem;
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
</style>
