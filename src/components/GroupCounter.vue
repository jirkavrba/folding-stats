<template>
    <a :href="'https://stats.foldingathome.org/team/' + id" target="_blank" class="counter" :style="'outline-color:' + color">
        <img :src="logo" alt="Logo" class="counter__logo">
        <h1 class="counter__name">{{ name }}</h1>
        <h2 class="counter__description">{{ description }}</h2>
        <div :style="'color:' + color + ';' + (loading ? 'opacity: 0.2' : '')" class="counter__count">{{ count }}</div>
    </a>
</template>

<script>
    export default {
        name: "Counter",
        data: () => ({
            loading: true,
            count: 0
        }),
        props: [
            "name",
            "logo",
            "color",
            "teams"
        ],
        mounted() {
            this.update()
            // Update each 5 minutes
            window.setInterval(this.update.bind(this), 300 * 1000)
        },
        computed: {
            description() {
                const teams = this.teams.length;
                const word = teams === 1 ? "tým" : teams >= 5 ? "týmů" : "týmy";

                return teams + " " + word;
            }
        },
        methods: {
            async update() {
                this.loading = true;
                this.count = 0;

                for (const team of this.teams) {
                    const proxy = "https://corsanywhere.herokuapp.com/";
                    const url = proxy + "https://stats.foldingathome.org/api/team/" + team.id

                    await fetch(url)
                        .then(response => response.json())
                        .then(response => {
                            this.count += response.credit
                        })
                }

                this.loading = false
                this.count = this.count.toLocaleString().replace(/,/g, " ")
            }
        }
    }
</script>

<style>
    .counter {
        box-sizing: border-box;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        margin-bottom: 1rem;
        text-decoration: none;
    }

    .counter .counter__logo
    {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-bottom: 1rem;
    }

    .counter .counter__name {
        color: #000000;
        font-size: 2.5rem;
        text-transform: uppercase;
        text-align: center;
    }

    .counter .counter__description {
        color: #aaaaaa;
        margin: 0.5rem 0;
        font-size: 2rem;
        text-transform: uppercase;
        text-align: center;
    }

    .counter .counter__count {
        font-size: 4rem;
        font-weight: bold;
        margin-top: 1rem;
    }
</style>
