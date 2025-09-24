<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script>
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'ActivityChart',
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
          datasets: [{
            label: 'Accesos Permitidos',
            data: [25, 32, 18, 27, 35, 12, 8],
            borderColor: '#00c853',
            backgroundColor: 'rgba(0, 200, 83, 0.1)',
            tension: 0.3,
            fill: true
          }, {
            label: 'Accesos Denegados',
            data: [3, 5, 2, 4, 6, 1, 2],
            borderColor: '#ff1744',
            backgroundColor: 'rgba(255, 23, 68, 0.1)',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: '#fff'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#fff'
              }
            },
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#fff'
              }
            }
          }
        }
      })
    }
  }
}
</script>