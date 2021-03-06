<script>
    import {Line} from 'vue-chartjs';

    export default {
        extends: Line,
        props: [
            'name',
            'data',
            'color',
            'type',
            'dailyIncrease'
        ],
        computed: {
            teams() {
                return this.$store.state.teams
            }
        },
        mounted() {
            this.render();
        },
        watch: {
            teams() {
                this.render()
            },
            dailyIncrease() {
                this.render()
            }
        },
        methods: {
            render() {
                if (this.teams === null || this.teams === undefined) {
                    return;
                }
                const sets = this.computeDataSets();

                this.renderChart(
                    {
                        labels: sets.labels,
                        datasets: sets.data
                    },
                    {
                        legend: {
                            display: true,
                        },
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem, data) {
                                    const formatter = new Intl.NumberFormat(localStorage.lang);
                                    const teamName = data.datasets[tooltipItem.datasetIndex].label;
                                    const number = formatter.format(parseInt(tooltipItem.yLabel));
                                    return `${teamName}: ${number}`;
                                }
                            }
                        },
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [
                                {
                                    type: 'logarithmic',
                                    ticks: {
                                        callback: function (label) {
                                            if (label > 1000000) {
                                                return label / 1000000 + "M";
                                            }

                                            if (label > 1000) {
                                                return label / 1000 + "k";
                                            }

                                            return label;
                                        }
                                    },
                                }
                            ]
                        }

                    }
                )
            },
            formatDate(date) {
                return date.getDate() + ". " +
                    (date.getMonth() + 1) + ". " +
                    date.getHours().toString().padStart(2, "0") + ":" +
                    date.getMinutes().toString().padStart(2, "0");
            },
            computeDataSets() {
                const topTeams = this.$store.state.teams.slice(0, 5);
                const topTeamsDetails = topTeams.map(team => this.$store.state.teamDetails[team.id]);

                let labels = topTeamsDetails[0].history.map(item => {
                    const date = new Date();
                    date.setTime(item.datetime * 1000)

                    return this.formatDate(date);
                });

                let data = topTeamsDetails.map(
                    (details, i) => ({
                        label: details.name,
                        data: details.history.map(record => record.score),
                        borderColor: 'hsl(' + i * (360 / 5) + ', 80%, 50%)',
                        fill: false,
                    })
                )
                if (!this.dailyIncrease)
                    return {data, labels};

                const groupBy = (list, keyGetter) => {
                    const map = new Map();
                    list.forEach((item) => {
                        const key = keyGetter(item);
                        const collection = map.get(key);
                        if (!collection) {
                            map.set(key, [item]);
                        } else {
                            collection.push(item);
                        }
                    });
                    return map;
                }

                if (!Array.prototype.last){
                    Array.prototype.last = function(){
                        return this[this.length - 1];
                    };
                }

                labels = topTeamsDetails[0].history.map(item => {
                    const date = new Date();
                    date.setTime(item.datetime * 1000)

                    return date.getDate() + ". " +
                        (date.getMonth() + 1) + ".";
                });

                labels = [...groupBy(labels, x => x)].map(x => x[0]);

                data = topTeamsDetails.map(
                    (details, i) => {
                        const groupedData = [...groupBy(details.history, record => {
                            const date= new Date(record.datetime * 1000);
                            return date.getDate() + ". " +
                                (date.getMonth() + 1) + ".";
                        })].map(x => (x[1].map(y => y.score).last()));
                        return ({
                            label: details.name,
                            data: groupedData,
                            borderColor: 'hsl(' + i * (360 / 5) + ', 80%, 50%)',
                            fill: false,
                        })
                    }
                )
                return {data, labels};
            }
        }
    }
</script>
