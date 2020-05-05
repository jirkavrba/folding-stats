<template>
    <div>
        <div class="row">
            <div class="col-xs-12">
                <span class="toggle" @click="this.toggleDailyIncrease">{{ $t('toggle_chart_increase') }}</span>
            </div>
        </div>
        <TeamCompare :daily-increase="dailyIncrease" />
    </div>
</template>
<script>
    import TeamCompare from "../components/TeamCompare";

    export default {
        components: {
            TeamCompare
        },
        data: () => ({
            dailyIncrease: true,
        }),
        methods: {
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
