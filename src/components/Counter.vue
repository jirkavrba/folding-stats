<template>
    <a :href="'https://stats.foldingathome.org/' + type + '/' + id" target="_blank" class="counter" :style="'outline-color:' + color">
        <img :src="logo" alt="Logo" class="counter__logo">
        <h1 class="counter__name">{{ name }}</h1>
        <div :style="'color:' + color + ';' + (loading ? 'opacity: 0.2' : '')" class="counter__count">
            {{ count.toLocaleString("en-US").replace(/,/g, " ") }}
        </div>
    </a>
</template>

<script>
    export default {
        name: "Counter",
        props: [
            "id",
            "name",
            "logo",
            "count",
            "color",
            "loading",
            "type"
        ]
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
        font-size: 1.5rem;
        text-transform: uppercase;
        text-align: center;
    }

    .counter:hover, .counter:focus {
        /*background: #eeeeee;*/
        outline-style: solid;
        outline-width: 5px;
    }

    .counter .counter__count {
        font-size: 3rem;
        font-weight: bold;
        margin-top: 1rem;
    }
</style>
