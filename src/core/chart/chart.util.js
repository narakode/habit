export function getChartColor(color, transparent = 1) {
  return {
    red: `rgb(255, 99, 132, ${transparent})`,
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: `rgb(54, 162, 235, ${transparent})`,
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
  }[color];
}
