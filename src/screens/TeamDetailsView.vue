<template>
    <div>
        <div class="links">
            <router-link to="/teams" class="link">
                &leftarrow; {{ $t('back') }}
            </router-link>
            <a :href="'https://stats.foldingathome.org/' + this.details.type + '/' + this.details.id" target="_blank"
               class="link">
                {{ $t('view_at_folding') }}
            </a>
        </div>

        <div v-if="!loading" class="row">
            <div class="col-xs-12">
                <div class="logo__wrapper">
                    <img :src="this.details.logo" :alt="this.details.name" class="logo">
                </div>
                <h1 class="title">{{ this.details.name }}</h1>
            </div>
            <div class="col-xs-12">
                <span class="toggle" @click="this.toggleDailyIncrease">{{ $t('toggle_chart') }}</span>
            </div>
            <div class="col-xs-12">
                <Chart :data="this.details.history" :color="this.details.color" :name="this.details.name" :type="this.dailyIncrease ? 'increase' : 'total'"/>
            </div>
        </div>

    </div>
</template>
<script>
    import Chart from '@/components/Chart';

    export default {
        components: {
            Chart
        },
        data: () => ({
            details: null,
            loading: true,
            dailyIncrease: false,
        }),
        methods: {
            async updateInfo() {
                const loaded = await this.$store.dispatch('loadTeamDetails', this.$route.params.id)

                if (!loaded) {
                    await this.$router.replace("/teams");
                }

                this.loading = false;
                this.details = this.$store.state.teamDetails[this.$route.params.id];
            },
            toggleDailyIncrease() {
                this.dailyIncrease = !this.dailyIncrease
            }
        },
        watch: {
            $route() {
                this.updateInfo()
            }
        },
        mounted() {
            this.updateInfo()
        }
    }
</script>
<style>
    .logo {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin: 0.25rem auto;
    }

    .logo__wrapper {
        text-align: center;
    }

    .links {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }

    .links .link {
        display: block;
        text-align: center;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #000000;
    }

    .links .link:hover, .links .link:focus {
        color: #ff0000;
    }

    @media (max-width: 770px) {
        .links {
            flex-flow: column nowrap;
        }
    }

    .toggle {
        display: block;
        text-align: center;
        margin: 1rem auto;
        padding-bottom: 1rem;
        cursor: pointer;
        text-transform: uppercase;
        color: #ff0000;
    }
</style>
