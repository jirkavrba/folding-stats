<template>
    <div class="counter--group">
        <img :src="logo" alt="Logo" class="counter__logo">
        <h1 class="counter__name">{{ name }}</h1>
        <h2 class="counter__description">{{ description }}</h2>
        <div :style="'color:' + color" class="counter__count">
            {{ count.toLocaleString("en-US").replace(/,/g, " ") }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Counter",
        props: [
            "name",
            "logo",
            "color",
            "teams",
            "count",
        ],
        computed: {
            description() {
                const teams = this.teams.length;
                const word = teams === 1 ? "tým" : teams >= 5 ? "týmů" : "týmy";

                return teams + " " + word;
            }
        }
    }
</script>

<style>
    .counter--group {
        box-sizing: border-box;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        margin-bottom: 1rem;
        text-decoration: none;
    }

    .counter--group .counter__logo
    {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-bottom: 1rem;
    }

    .counter--group .counter__name {
        color: #000000;
        font-size: 2.5rem;
        text-transform: uppercase;
        text-align: center;
    }

    .counter--group .counter__description {
        color: #aaaaaa;
        margin: 0.5rem 0;
        font-size: 2rem;
        text-transform: uppercase;
        text-align: center;
    }

    .counter--group .counter__count {
        font-size: 3rem;
        font-weight: bold;
        margin-top: 1rem;
    }
</style>
