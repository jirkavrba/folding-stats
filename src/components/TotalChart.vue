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
            this.render()
        },
        watch: {
            type: function () {
                this.render()
            }
        },
        methods: {
            render() {
                const set = this.computeDataSet();

                this.renderChart(
                    {
                        labels: set.labels,
                        datasets: [
                            {
                                label: this.name,
                                data: set.data,
                                fill: false,
                                borderColor: this.color,
                                backgroundColor: this.color,
                            }
                        ]
                    },
                    {
                        legend: {
                            display: false,
                        },
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        callback: function (label) {
                                            if (label > 1000000)
                                            {
                                                return label/1000000 + "M";
                                            }

                                            if (label > 1000)
                                            {
                                                return label/1000 + "k";
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
                    date.getMinutes().toString().padStart(2, "0")
            }
            ,
            computeDataSet() {
                const labels = this.data.map(item => {
                    const date = new Date();
                    date.setTime(item.datetime * 1000)

                    return this.formatDate(date);
                });

                const data = this.data.map(item => item.score);

                return {data, labels};
            }
        }
    }
</script>
