<template>
    <div class="switch">
        <div class="switch__box" tabindex="1">
            <div v-for="(lang, i) in $i18n.availableLocales" class="switch__value" :key="`LangCurrent${i}`">
                <input class="switch__input" type="radio" v-model="$i18n.locale" :id="i" :value="lang" name="language" :checked="`${$i18n.locale === lang} ? checked : ''`">
                <p class="switch__input-text">{{ mapLang(lang.toUpperCase()) }}</p>
            </div>
            <img class="switch__arrow" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiPjxkZWZzLz48cGF0aCBkPSJNNTAwIDc3NUwxMCAyODdsNjQtNjIgNDI2IDQyNSA0MjYtNDI1IDY0IDYyLTQ5MCA0ODh6Ii8+PC9zdmc+" alt="" aria-hidden="true">
        </div>
        <ul class="switch__list">
            <li v-for="(lang, i) in $i18n.availableLocales" :key="`LangSelect${i}`" v-on:click="saveLanguage(lang)">
                <label class="switch__option" :for="i" aria-hidden="true">{{ mapLang(lang.toUpperCase()) }}</label>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        methods: {
            saveLanguage(lang) {
                localStorage.lang = lang;
            },
            mapLang(lang) {
                switch (lang) {
                    case "SC":
                        return "CZ 2.0";                
                    default:
                        return lang;
                }
            }
        }
    }
</script>

<style>
    .switch {
        position: fixed;
        top: 1rem;
        right: 1rem;
        width: calc(2em + 50px);
        font-size: 1.25rem;
        color: #999;
    }

    .switch__box {
        position: relative;
        cursor: pointer;
        outline: none;
        box-shadow: 0 10px 15px -2px rgba(0, 0, 0, 0.15);
    }

    .switch__box:focus .switch__arrow {
        transform: translateY(-50%) rotate(180deg);
        top: calc(50%);
    }

    .switch__value {
        display: flex;
    }

    .switch__input {
        display: none;
    }

    .switch__input-text {
        display: none;
        width: 100%;
        margin: 0;
        padding: 10px;
        background: #fff;
    }

    .switch__input:checked + .switch__input-text {
        display: block;
    }

    .switch__arrow {
        position: absolute;
        top: calc(50% - 8px);
        right: 10px;
        width: 16px;
        height: 16px;
        opacity: 0.5;
        transition: all 0.25s ease;
    }

    .switch__list {
        position: absolute;
        width: 100%;
        padding: 0;
        list-style: none;
        opacity: 0;
        box-shadow: 0 10px 15px -2px rgba(0, 0, 0, 0.15);
    }
    .switch__box:focus + .switch__list {
        opacity: 1;
        animation-name: none;
    }

    .switch__option {
        display: block;
        padding: 10px;
        background-color: #fff;
    }

    .switch__option:hover {
        color: #f00;
        cursor: pointer;
    }
</style>
