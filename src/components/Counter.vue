<template>
    <div :class=" team ? 'counter counter--clickable' : 'counter'" :style="'outline-color:' + color">
        <img :src="logo" :alt="name" class="counter__logo">
        <div class="counter__name">{{ name }}</div>
        <div class="counter__count" :style="'color:' + color">
            {{ loading ? $t('loading') : $n(count) }}
        </div>
        <div class="counter__increment" :style="'color:' + color"
             v-if="typeof details !== 'undefined' && details !== null">
            <span v-if="details.increment > 0">
                + {{ $n(details.increment) }}
            </span>
            <span v-else>&mdash;</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Counter",
        props: [
            "name",
            "team",
            "count",
            "logo",
            "color",
            "details",
            "loading",
        ],
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

    .counter.counter--clickable:hover, .counter.counter--clickable:focus {
        outline-style: solid;
        outline-width: 2px;
    }

    .counter .counter__count {
        font-size: 3rem;
        font-weight: bold;
        margin-top: 1rem;
        text-transform: uppercase;
    }

    .counter .counter__increment {
        font-size: 1.5rem;
        margin-top: 0.5rem;
        font-weight: bold;
    }
</style>
