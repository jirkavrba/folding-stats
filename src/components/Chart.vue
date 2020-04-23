<script>
    import {Line} from 'vue-chartjs'

    export default {
        extends: Line,
        props: [
            'name',
            'data',
            'color'
        ],
        mounted() {

            const labels = this.data.map(item => {
                const date = new Date();
                date.setTime(item.datetime * 1000)

                return date.getDate() + ". " +
                    date.getMonth() + ". " +
                    date.getHours().toString().padStart(2, "0") + ":" +
                    date.getMinutes().toString().padStart(2, "0")
            })

            this.renderChart(
                {
                    labels: labels,
                    datasets: [
                        {
                            label: this.name,
                            data: this.data.map(item => item.score),
                            fill: false,
                            fillColor: this.color,
                            borderColor: this.color,
                        }
                    ]
                },
                {
                    elements: {
                        line: {
                            tension: 0.2
                        }
                    },
                    legend: {
                        display: false,
                    },
                    maintainAspectRatio: false,
                }
            )
        }
    }
</script>