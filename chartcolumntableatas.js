$(document).ready(function () {
  // Create DataTable
  var table = $("#table-atas").DataTable({
    retrieve: true,
    dom: "Pfrtip",
  });

  // Create the chart with initial data
  var container = $(".chartcolumntableatas");

  var chart = Highcharts.chart(container[0], {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    series: [
      {
        data: chartData(table),
      },
    ],
  });

  // On each draw, update the data in the chart
  table.on("draw", function () {
    chart.series[0].setData(chartData(table));
  });
});

function chartData(table) {
  var counts = {};

  // Count the number of entries for each position
  table
    .column(3, { search: "applied" })
    .data()
    .each(function (val) {
      if (counts[val]) {
        counts[val] += 1;
      } else {
        counts[val] = 1;
      }
    });

  // And map it to the format highcharts uses
  return $.map(counts, function (val, key) {
    return {
      name: key,
      y: val,
    };
  });
}
