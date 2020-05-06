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
        attribution: "Vytvořili studenti <a href='https://fit.cvut.cz'><b>FIT ČVUT</b></a>",
        start_folding: "Zapojte se s námi i Vy!<br> <a href='https://foldingathome.org/start-folding/' target='_blank'>Více info zde</a>",
        addition_request: "Pokud zde nevidíte váš tým/insitutici, a chtěli byste ho přidat do databáze, " +
            "vytvořte prosím issue na <a href='https://www.github.com/jirkavrba/folding-stats/issues/new'>githubu</a>",
        loading: "Načítání...",
        back: "Zpět na výpis",
        view_at_folding: "Zobrazit na folding@home",
        toggle_chart: "Přepnout graf (celkové skore / přírůstek za časový interval)",
        toggle_chart_increase: "Přepnout graf (denní přirůstek / 6h přírustek)"
    },
    sc: {
        issues: "N8vrhy a chyby",
        teams: "Jednotliv0 t7my",
        institutions: "Akademick0 instituce",
        total: "4esk0 akademick0 instituce p5isp2ly celkem",
        points: "body",
        attribution: "Vytvo5ili studenti <a href='https://fit.cvut.cz'><b>FIT 4VUT</b></a>",
        start_folding: "Zapojte se s n8mi i Vy!<br> <a href='https://foldingathome.org/start-folding/' target='_blank'>V9ce info zde</a>",
        addition_request: "Pokud zde nevid9te váš t7m/insitutici, a cht2li byste ho p5idat do datab8ze, " +
            "vytvo5te pros9m issue na <a href='https://www.github.com/jirkavrba/folding-stats/issues/new'>githubu</a>",
        loading: "Na49t8n9...",
        back: "Zp2t na v7pis",
        view_at_folding: "Zobrazit na folding@home",
        toggle_chart: "P5epnout graf (celkov0 skore / p5ír;stek za 4asov7 interval)",
        toggle_chart_increase: "P5epnout graf (denn9 p59r;stek / 6h p59rustek)"
    },
    en: {
        issues: "Bugs and suggestions",
        teams: "Individual teams",
        institutions: "Academic institutions",
        total: "Czech academic institutions have contributed a total of",
        points: "points",
        attribution: "Project created by students of the <a href='https://old.fit.cvut.cz/en'><b>FIT CTU</b></a>",
        start_folding: "Start folding with us today!<br> <a href='https://foldingathome.org/start-folding/' target='_blank'>More info</a>",
        addition_request: "If you would like to add your institution/team to the database, " +
            "please create an issue on <a href='https://www.github.com/jirkavrba/folding-stats/issues/new'>github</a>",
        loading: "Loading...",
        back: "Return ",
        view_at_folding: "view at folding@home",
        toggle_chart: "Toggle the chart type (total score / increase within time interval)",
        toggle_chart_increase: "Toggle the chart type (daily increase / 6h increase)"
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
