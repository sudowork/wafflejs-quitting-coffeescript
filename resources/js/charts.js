const DATE_REGEX = /\d{4}-\d{2}-\d{2}/;
const CAFFEINE_PER_CUP = 95;

function initCaffeineConsumptionChart() {
  const data = parseSeparatedValues(`
    Date	Energy	Sleep (hours)	Total Caffeine (mg)
    2017-09-06		5.43
    2017-09-07	6	6.00	663
    2017-09-08	7	5.90	807
    2017-09-09	5		403.75
    2017-09-10	4		290
    2017-09-11	6		520
    2017-09-12	4	3.78	622.5
    2017-09-13	5	6.27	617
    2017-09-14	6	5.58	715
    2017-09-15	3	6.85	424
    2017-09-16	6	11.43	190
    2017-09-17	6	10.67	0
    2017-09-18	6	6.33	552
    2017-09-19	5	5.43	841
  `);
  const dates = getSeries(data, 'Date');
  const caffeine = getSeries(data, 'Total Caffeine (mg)');
  const cupsOfCoffee = caffeine.map(caffeine => Math.round(caffeine * 100 / CAFFEINE_PER_CUP) / 100);
  const sleep = getSeries(data, 'Sleep (hours)');
  const energy = getSeries(data, 'Energy');

  const myChart = Highcharts.chart('chart-caffeine-consumption', {
    chart: {
      type: 'xy',
    },
    title: { style: { display: 'none' } },
    xAxis: {
      categories: dates,
      crosshair: true,
    },
    yAxis: [
      {
        title: {
          text: 'Caffeine Consumption'
        },
        labels: {
          format: '{value} ☕️',
        },
      },
      {
        title: {
          text: 'Sleep (hours)'
        },
        opposite: true,
        max: 12,
      },
      {
        title: {
          text: 'Energy'
        },
        opposite: true,
        max: 10,
      },
    ],
    tooltip: {
      shared: true,
    },
    series: [
      {
        name: 'Caffeine',
        data: cupsOfCoffee,
        yAxis: 0,
        type: 'column',
      },
      {
        name: 'Sleep',
        data: sleep,
        yAxis: 1,
        type: 'spline',
      },
      {
        name: 'Energy',
        data: energy,
        yAxis: 2,
        type: 'spline',
      },
    ],
  });
}

// Not a fully fledged out parser
function parseSeparatedValues(data, delimiter = '\t') {
  const lines = data
    .split('\n')
    // Allow lines to be indented using spaces for readability
    .map(line => line.replace(/^ +/, ''))
    // Remove blank lines
    .filter(line => line.length > 0);
  const [headerLine, ...dataLines] = lines;
  const headers = headerLine.split(delimiter);
  const getRowFromLine = line => {
    const values = line.split(delimiter);
    return headers.reduce(
      (row, header, i) => {
        row[headers[i]] = parseValue(values[i]);
        return row;
      },
      {}
    );
  };
  const rows = dataLines.map(getRowFromLine);
  return rows;
}

function parseValue(value) {
  if (!value) return null;
  // special case for dates :(
  if (DATE_REGEX.test(value)) return value;
  const floatValue = parseFloat(value);
  return isNaN(floatValue)
    ? null
    : floatValue;
}

function getSeries(data, seriesName) {
  return data.map(row => row[seriesName]);
}

onLoad(initCaffeineConsumptionChart);
