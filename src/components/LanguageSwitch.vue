<template>
    <div class="language-switch">
        <select v-model="$i18n.locale">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
        </select>
    </div>
</template>

<script>
    export default {
        data () {
            return { langs: ['cz', 'en'] }
        }
    }
</script>

<style>
    .language-switch {
        position: fixed;
        top: 1rem;
        right: 1rem;
    }
</style>
