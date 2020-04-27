<script>
    import {Line} from 'vue-chartjs';

    export default {
        extends: Line,
        props: [
            'name',
            'data',
            'color',
            'type'
        ],
        mounted() {
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
        methods: {
            formatDate(date) {
                return date.getDate() + ". " +
                    (date.getMonth() + 1) + ". " +
                    date.getHours().toString().padStart(2, "0") + ":" +
                    date.getMinutes().toString().padStart(2, "0");
            },
            computeDataSets() {
                const topTeams = this.$store.state.teams.slice(0, 5);
                const topTeamsDetails = topTeams.map(team => this.$store.state.teamDetails[team.id]);

                const labels = topTeamsDetails[0].history.map(item => {
                    const date = new Date();
                    date.setTime(item.datetime * 1000)

                    return this.formatDate(date);
                });

                const data = topTeamsDetails.map(
                    (details, i) => ({
                        label: details.name,
                        data: details.history.map(record => record.score),
                        borderColor: 'hsl(' + i * (360/5) + ', 80%, 50%)',
                        fill: false,
                    })
                )

                return {data, labels};
            }
        }
    }
</script>
