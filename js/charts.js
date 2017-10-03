/* global Highcharts, onLoad */

// eslint-disable-next-line func-names
(function initCharts() {
  'use strict';

  const FLOAT_REGEX = /^(?:[-+])?(?:[0-9]+)?(?:\.[0-9]*)?(?:[eE][+-]?(?:[0-9]+))?$/;
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

  function initCaffeineConsumptionChartBefore() {
    const data = getCaffeineConsumptionData().slice(0, 14);
    initCaffeineConsumptionChart('chart-caffeine-consumption', data);
  }

  function initCaffeineConsumptionChartAfter() {
    const data = getCaffeineConsumptionData();
    initCaffeineConsumptionChart('chart-caffeine-consumption-after', data);
  }

  function initCaffeineConsumptionChart(chartId, data) {
    const dates = getSeries(data, 'Date');
    const totalCaffeine = getSeries(data, 'Total Caffeine (mg)');
    const cupsOfCoffee = totalCaffeine.map(caffeine =>
      Math.round((caffeine * 100) / CAFFEINE_PER_CUP) / 100
    );
    const sleep = getSeries(data, 'Sleep (hours)');
    const energy = getSeries(data, 'Energy');

    Highcharts.chart(chartId, {
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

  function getCaffeineConsumptionData() {
    // TODO: Fill in last day of data
    /* eslint-disable no-tabs */
    return parseSeparatedValues(`
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
      2017-09-20	3	7.73	14
      2017-09-21	4	5.70	0
      2017-09-22	5	7.63	0
      2017-09-23	6	10.03	0
      2017-09-24	6	5.92	0
      2017-09-25	5	1.75	0
      2017-09-26	7	7.68	14
      2017-09-27	7	7.42	0
      2017-09-28	7	7.32	0
      2017-09-29	7	6.67	0
      2017-09-30	8	9.98	0
      2017-10-01	7	5.82	0
      2017-10-02	8	5.28	14
      2017-10-03	6	4.68	0
      2017-10-04			0
    `);
    /* eslint-enable no-tabs */
  }

  function initPullRequestChart() {
    /* eslint-disable no-tabs */
    const data = parseSeparatedValues(`
      Date	Language	# PRs
      2012Q2	JavaScript	16411
      2012Q2	CoffeeScript	793
      2012Q3	JavaScript	20283
      2012Q3	CoffeeScript	1029
      2012Q4	JavaScript	22485
      2012Q4	CoffeeScript	1133
      2013Q1	JavaScript	33897
      2013Q1	CoffeeScript	1939
      2013Q2	JavaScript	39445
      2013Q2	CoffeeScript	1877
      2013Q3	JavaScript	48213
      2013Q3	CoffeeScript	2510
      2013Q4	JavaScript	61846
      2013Q4	CoffeeScript	4156
      2014Q1	JavaScript	84127
      2014Q1	CoffeeScript	6171
      2014Q2	JavaScript	97564
      2014Q2	CoffeeScript	7376
      2014Q3	JavaScript	115824
      2014Q3	CoffeeScript	8098
      2014Q4	JavaScript	129554
      2014Q4	CoffeeScript	7624
      2015Q1	JavaScript	171489
      2015Q1	CoffeeScript	9467
      2015Q2	JavaScript	198108
      2015Q2	CoffeeScript	10596
      2015Q3	JavaScript	236531
      2015Q3	CoffeeScript	11484
      2015Q4	JavaScript	299806
      2015Q4	CoffeeScript	11647
      2016Q1	JavaScript	382098
      2016Q1	CoffeeScript	12394
      2016Q2	JavaScript	409880
      2016Q2	CoffeeScript	12444
      2016Q3	JavaScript	406803
      2016Q3	CoffeeScript	10328
      2016Q4	JavaScript	419758
      2016Q4	CoffeeScript	12013
      2017Q1	JavaScript	383738
      2017Q1	CoffeeScript	11273
      2017Q2	JavaScript	422653
      2017Q2	CoffeeScript	8910
    `);
    /* eslint-enable no-tabs */
    const jsRows = data.filter(row => row.Language === 'JavaScript');
    const jsCount = getSeries(jsRows, '# PRs');
    const csRows = data.filter(row => row.Language === 'CoffeeScript');
    const csCount = getSeries(csRows, '# PRs');
    const dates = getSeries(jsRows, 'Date');

    Highcharts.chart('chart-pull-requests', {
      chart: {
        type: 'xy',
      },
      title: { style: { display: 'none' } },
      xAxis: {
        categories: dates,
        crosshair: true,
      },
      yAxis: {
        title: {
          text: 'Pull Requests (log)',
        },
        type: 'logarithmic',
      },
      tooltip: {
        shared: true,
      },
      series: [
        {
          name: 'CoffeeScript',
          data: csCount,
          type: 'spline',
        },
        {
          name: 'JavaScript',
          data: jsCount,
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
    if (!FLOAT_REGEX.test(value)) return value;
    const floatValue = parseFloat(value);
    return Number.isNaN(floatValue)
      ? null
      : floatValue;
  }

  function getSeries(data, seriesName) {
    return data.map(row => row[seriesName]);
  }

  function initBulkDecaffeinateDemo() {
    const script = document.createElement('script');
    script.src = 'https://asciinema.org/a/NJRer9YOAOiuKZPZG6TY2uuS3.js';
    script.id = 'asciicast-NJRer9YOAOiuKZPZG6TY2uuS3';
    script.async = true;
    document.getElementById('bulk-decaffeinate-demo').appendChild(script);
  }

  onLoad(() => useTheme(HC_ELEMENTARY_THEME));
  onLoad(initCaffeineConsumptionChartBefore);
  onLoad(initPullRequestChart);
  onLoad(initCaffeineConsumptionChartAfter);
  onLoad(initBulkDecaffeinateDemo);
}());
