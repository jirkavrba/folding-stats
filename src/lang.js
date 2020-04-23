import Vue from 'vue';
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
    cs: {
        issues: "Návrhy a chyby",
        teams: "Jednotlivé týmy",
        institutions: "Akademické instituce",
        total: "České akademické instituce přispěly celkem",
        points: "body",
        attribution: "Vytvořili studenti <b>FIT ČVUT</b>",
        start_folding: "Zapojte se s námi i Vy!<br> <a href='https://foldingathome.org/start-folding/' target='_blank'>Více info zde</a>",
        addition_request: "Pokud zde nevidíte váš tým/insitutici, a chtěli byste ho přidat do databáze, " +
            "vytvořte prosím issue na <a href='https://www.github.com/jirkavrba/folding-stats/issues/new'>githubu</a>",
        loading: "Načítání...",
        back: "Zpět na výpis",
        view_at_folding: "Zobrazit na folding@home"
},
    en: {
        issues: "Bugs and suggestions",
        teams: "Individual teams",
        institutions: "Academic institutions",
        total: "Czech academic institutions have contributed a total of",
        points: "points",
        attribution: "Project created by students of the <b>FIT CTU</b>",
        start_folding: "Start folding with us today!<br> <a href='https://foldingathome.org/start-folding/' target='_blank'>More info</a>",
        addition_request: "If you would like to add your institution/team to the database, " +
            "please create an issue on <a href='https://www.github.com/jirkavrba/folding-stats/issues/new'>githubu</a>",
        loading: "Loading...",
        back: "Return ",
        view_at_folding: "view at folding@home"
    }
}

const userLang = localStorage.lang
    || (navigator.languages
        ? navigator.languages[0]
        : (navigator.language || navigator.userLanguage));

const i18n = new VueI18n({
    locale: userLang?.substring(0, 2),
    fallbackLocale: "en",
    messages: messages
})

export default i18n;
