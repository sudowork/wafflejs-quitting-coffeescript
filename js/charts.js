/* global Highcharts, onLoad */

// eslint-disable-next-line func-names
(function initCharts() {
  'use strict';

  const DATE_REGEX = /\d{4}-\d{2}-\d{2}/;
  const CAFFEINE_PER_CUP = 95;
  const HC_ELEMENTARY_THEME = {
    colors: [
      '#FA8832',
      '#41B5E9',
      '#34393C',
      '#E46151',
    ],
    chart: {
      style: {
        color: '#333',
        fontFamily: 'Open Sans',
      },
    },
    title: {
      style: {
        fontFamily: 'Raleway',
        fontWeight: '100',
      },
    },
    subtitle: {
      style: {
        fontFamily: 'Raleway',
        fontWeight: '100',
      },
    },
    legend: {
      align: 'right',
      verticalAlign: 'bottom',
    },
    xAxis: {
      gridLineWidth: 1,
      gridLineColor: '#F3F3F3',
      lineColor: '#F3F3F3',
      minorGridLineColor: '#F3F3F3',
      tickColor: '#F3F3F3',
      tickWidth: 1,
    },
    yAxis: {
      gridLineColor: '#F3F3F3',
      lineColor: '#F3F3F3',
      minorGridLineColor: '#F3F3F3',
      tickColor: '#F3F3F3',
      tickWidth: 1,
    },
  };

  function useTheme(theme) {
    Highcharts.theme = theme;
    Highcharts.setOptions(Highcharts.theme);
  }

  function initCaffeineConsumptionChart() {
    /* eslint-disable no-tabs */
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
    /* eslint-enable no-tabs */
    const dates = getSeries(data, 'Date');
    const totalCaffeine = getSeries(data, 'Total Caffeine (mg)');
    const cupsOfCoffee = totalCaffeine.map(caffeine =>
      Math.round((caffeine * 100) / CAFFEINE_PER_CUP) / 100
    );
    const sleep = getSeries(data, 'Sleep (hours)');
    const energy = getSeries(data, 'Energy');

    Highcharts.chart('chart-caffeine-consumption', {
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
            text: 'Caffeine Consumption',
          },
          labels: {
            format: '{value} ☕️',
          },
        },
        {
          title: {
            text: 'Energy',
          },
          opposite: true,
          max: 10,
        },
        {
          title: {
            text: 'Sleep (hours)',
          },
          opposite: true,
          max: 12,
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
          name: 'Energy',
          data: energy,
          yAxis: 1,
          type: 'spline',
        },
        {
          name: 'Sleep',
          data: sleep,
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
    const getRowFromLine = (line) => {
      const values = line.split(delimiter);
      return headers.reduce(
        (row, header, i) => {
          // eslint-disable-next-line no-param-reassign
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
    return Number.isNaN(floatValue)
      ? null
      : floatValue;
  }

  function getSeries(data, seriesName) {
    return data.map(row => row[seriesName]);
  }

  onLoad(() => useTheme(HC_ELEMENTARY_THEME));
  onLoad(initCaffeineConsumptionChart);
}());