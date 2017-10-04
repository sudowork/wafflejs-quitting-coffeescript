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
      2017-10-04	7	5.63	0
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

  function initLinesOfCodeChart() {
    /* eslint-disable no-tabs */
    const data = parseSeparatedValues(`
      Date	Language	files	blank	comment	code
      2017-03-28	JavaScript	220	3693	3445	27062
      2017-03-28	CoffeeScript	1393	26627	11287	184499
      2017-03-29	JavaScript	220	3693	3445	27062
      2017-03-29	CoffeeScript	1394	26642	11287	184568
      2017-03-30	JavaScript	233	3976	3528	28930
      2017-03-30	CoffeeScript	1383	26406	11242	183071
      2017-03-31	JavaScript	231	3919	3387	28693
      2017-03-31	CoffeeScript	1382	26475	11242	183071
      2017-04-01	JavaScript	231	3919	3387	28693
      2017-04-01	CoffeeScript	1384	26518	11253	183282
      2017-04-02	JavaScript	231	3919	3387	28693
      2017-04-02	CoffeeScript	1384	26518	11253	183282
      2017-04-03	JavaScript	231	3919	3388	28694
      2017-04-03	CoffeeScript	1385	26618	11272	183401
      2017-04-04	JavaScript	232	3937	3391	28799
      2017-04-04	CoffeeScript	1386	26693	11289	183816
      2017-04-05	JavaScript	232	3937	3394	28800
      2017-04-05	CoffeeScript	1389	26751	11300	184033
      2017-04-06	JavaScript	232	3937	3394	28800
      2017-04-06	CoffeeScript	1390	26769	11288	184109
      2017-04-07	JavaScript	232	3939	3394	28811
      2017-04-07	CoffeeScript	1393	26829	11309	184457
      2017-04-08	JavaScript	232	3939	3394	28811
      2017-04-08	CoffeeScript	1394	26855	11312	184597
      2017-04-09	JavaScript	232	3939	3394	28811
      2017-04-09	CoffeeScript	1396	26889	11326	184666
      2017-04-10	JavaScript	232	3939	3394	28811
      2017-04-10	CoffeeScript	1396	26889	11326	184666
      2017-04-11	JavaScript	232	3939	3394	28811
      2017-04-11	CoffeeScript	1396	26903	11328	184666
      2017-04-12	JavaScript	232	3939	3394	28811
      2017-04-12	CoffeeScript	1397	26943	11336	185443
      2017-04-13	JavaScript	232	3939	3394	28812
      2017-04-13	CoffeeScript	1406	27160	11350	185839
      2017-04-14	JavaScript	232	3939	3394	28812
      2017-04-14	CoffeeScript	1412	27318	11364	186368
      2017-04-15	JavaScript	232	3939	3394	28812
      2017-04-15	CoffeeScript	1414	27421	11367	186679
      2017-04-16	JavaScript	232	3939	3394	28812
      2017-04-16	CoffeeScript	1414	27421	11367	186679
      2017-04-17	JavaScript	232	3939	3394	28812
      2017-04-17	CoffeeScript	1414	27421	11366	186674
      2017-04-18	JavaScript	232	3939	3394	28812
      2017-04-18	CoffeeScript	1415	27444	11367	186789
      2017-04-19	JavaScript	232	3939	3394	28812
      2017-04-19	CoffeeScript	1416	27504	11381	187089
      2017-04-20	JavaScript	232	3939	3394	28812
      2017-04-20	CoffeeScript	1421	27693	11396	188033
      2017-04-21	JavaScript	232	3939	3394	28812
      2017-04-21	CoffeeScript	1421	27807	11403	188144
      2017-04-22	JavaScript	232	3939	3394	28812
      2017-04-22	CoffeeScript	1425	27841	11418	188432
      2017-04-23	JavaScript	232	3939	3394	28812
      2017-04-23	CoffeeScript	1427	27984	11434	188955
      2017-04-24	JavaScript	232	3939	3394	28812
      2017-04-24	CoffeeScript	1427	27984	11434	188955
      2017-04-25	JavaScript	212	2152	1793	19318
      2017-04-25	CoffeeScript	1412	27929	11339	188066
      2017-04-26	JavaScript	212	2152	1793	19318
      2017-04-26	CoffeeScript	1413	27982	11354	188253
      2017-04-27	JavaScript	212	2152	1793	19318
      2017-04-27	CoffeeScript	1419	28097	11365	188604
      2017-04-28	JavaScript	213	2155	1794	19339
      2017-04-28	CoffeeScript	1424	28495	11413	189181
      2017-04-29	JavaScript	213	2155	1794	19339
      2017-04-29	CoffeeScript	1424	28502	11413	189182
      2017-04-30	JavaScript	213	2155	1794	19339
      2017-04-30	CoffeeScript	1424	28502	11413	189182
      2017-05-01	JavaScript	213	2155	1794	19339
      2017-05-01	CoffeeScript	1424	28502	11413	189182
      2017-05-02	JavaScript	214	2161	1795	19392
      2017-05-02	CoffeeScript	1436	28744	11443	189682
      2017-05-03	JavaScript	214	2161	1795	19392
      2017-05-03	CoffeeScript	1438	28837	11449	189956
      2017-05-04	JavaScript	214	2161	1795	19392
      2017-05-04	CoffeeScript	1441	28862	11454	190005
      2017-05-05	JavaScript	214	2161	1795	19392
      2017-05-05	CoffeeScript	1444	28931	11450	190348
      2017-05-06	JavaScript	215	2173	1795	19461
      2017-05-06	CoffeeScript	1444	28977	11445	190597
      2017-05-07	JavaScript	215	2173	1795	19461
      2017-05-07	CoffeeScript	1444	28977	11445	190597
      2017-05-08	JavaScript	215	2173	1795	19461
      2017-05-08	CoffeeScript	1448	29049	11461	190804
      2017-05-09	JavaScript	215	2179	1795	19487
      2017-05-09	CoffeeScript	1449	29056	11457	190811
      2017-05-10	JavaScript	215	2199	1797	19583
      2017-05-10	CoffeeScript	1452	29180	11461	191159
      2017-05-11	JavaScript	215	2199	1797	19583
      2017-05-11	CoffeeScript	1455	29390	11476	191623
      2017-05-12	JavaScript	234	2251	1840	19808
      2017-05-12	CoffeeScript	1459	29469	11483	191889
      2017-05-13	JavaScript	234	2253	1840	19815
      2017-05-13	CoffeeScript	1462	29533	11483	191968
      2017-05-14	JavaScript	234	2253	1840	19815
      2017-05-14	CoffeeScript	1462	29533	11483	191968
      2017-05-15	JavaScript	234	2253	1840	19815
      2017-05-15	CoffeeScript	1461	29549	11481	192015
      2017-05-16	JavaScript	234	2253	1845	19816
      2017-05-16	CoffeeScript	1463	29682	11482	192459
      2017-05-17	JavaScript	230	2246	1847	19772
      2017-05-17	CoffeeScript	1463	29685	11483	192479
      2017-05-18	JavaScript	248	2286	1861	20063
      2017-05-18	CoffeeScript	1460	29731	11393	192347
      2017-05-19	JavaScript	254	2359	1882	20393
      2017-05-19	CoffeeScript	1461	29790	11398	192701
      2017-05-20	JavaScript	254	2368	1896	20496
      2017-05-20	CoffeeScript	1462	29828	11406	192829
      2017-05-21	JavaScript	254	2368	1896	20496
      2017-05-21	CoffeeScript	1462	29828	11406	192829
      2017-05-22	JavaScript	254	2368	1896	20496
      2017-05-22	CoffeeScript	1462	29828	11406	192829
      2017-05-23	JavaScript	258	2383	1903	20558
      2017-05-23	CoffeeScript	1462	29836	11407	192840
      2017-05-24	JavaScript	262	2409	1909	20656
      2017-05-24	CoffeeScript	1467	29963	11440	193421
      2017-05-25	JavaScript	265	2402	1891	20708
      2017-05-25	CoffeeScript	1471	30121	11460	194018
      2017-05-26	JavaScript	354	3521	2855	28333
      2017-05-26	CoffeeScript	1382	29029	11170	187129
      2017-05-27	JavaScript	354	3519	2855	28320
      2017-05-27	CoffeeScript	1386	29087	11182	187293
      2017-05-28	JavaScript	354	3519	2855	28320
      2017-05-28	CoffeeScript	1386	29087	11182	187293
      2017-05-29	JavaScript	354	3519	2855	28320
      2017-05-29	CoffeeScript	1386	29097	11182	187338
      2017-05-30	JavaScript	354	3519	2855	28320
      2017-05-30	CoffeeScript	1386	29099	11182	187341
      2017-05-31	JavaScript	357	3526	2848	28370
      2017-05-31	CoffeeScript	1392	29180	11200	187582
      2017-06-01	JavaScript	358	3527	2849	28375
      2017-06-01	CoffeeScript	1392	29180	11200	187582
      2017-06-02	JavaScript	368	3568	2852	28607
      2017-06-02	CoffeeScript	1401	29385	11245	188523
      2017-06-03	JavaScript	368	3568	2852	28607
      2017-06-03	CoffeeScript	1401	29385	11245	188523
      2017-06-04	JavaScript	368	3568	2852	28607
      2017-06-04	CoffeeScript	1401	29385	11245	188523
      2017-06-05	JavaScript	368	3568	2852	28607
      2017-06-05	CoffeeScript	1401	29385	11245	188523
      2017-06-06	JavaScript	366	3534	2747	26992
      2017-06-06	CoffeeScript	1404	29466	11261	188876
      2017-06-07	JavaScript	366	3534	2747	26992
      2017-06-07	CoffeeScript	1407	29613	11281	189340
      2017-06-08	JavaScript	369	3546	2747	27061
      2017-06-08	CoffeeScript	1410	29706	11291	189812
      2017-06-09	JavaScript	502	6118	4001	74509
      2017-06-09	CoffeeScript	1287	27216	10548	143021
      2017-06-10	JavaScript	505	6222	3405	74707
      2017-06-10	CoffeeScript	1288	27258	10550	143136
      2017-06-11	JavaScript	505	6222	3405	74707
      2017-06-11	CoffeeScript	1288	27258	10550	143136
      2017-06-12	JavaScript	505	6222	3394	74696
      2017-06-12	CoffeeScript	1289	27271	10553	143155
      2017-06-13	JavaScript	551	7297	3701	78637
      2017-06-13	CoffeeScript	1243	25932	10371	135730
      2017-06-14	JavaScript	565	7650	3818	80999
      2017-06-14	CoffeeScript	1165	24871	10172	129382
      2017-06-15	JavaScript	797	11635	6579	104503
      2017-06-15	CoffeeScript	934	21154	9286	109733
      2017-06-16	JavaScript	797	12004	6572	104690
      2017-06-16	CoffeeScript	933	21194	9291	109852
      2017-06-17	JavaScript	835	12756	7070	108481
      2017-06-17	CoffeeScript	897	20561	9067	106873
      2017-06-18	JavaScript	835	12756	7070	108481
      2017-06-18	CoffeeScript	897	20561	9067	106873
      2017-06-19	JavaScript	836	12794	7070	108643
      2017-06-19	CoffeeScript	897	20561	9067	106873
      2017-06-20	JavaScript	837	12800	7074	108797
      2017-06-20	CoffeeScript	896	20591	9072	106948
      2017-06-21	JavaScript	853	12867	6930	109237
      2017-06-21	CoffeeScript	896	20583	9091	106718
      2017-06-22	JavaScript	856	12933	6935	109423
      2017-06-22	CoffeeScript	896	20610	9093	106793
      2017-06-23	JavaScript	860	12960	6935	109578
      2017-06-23	CoffeeScript	897	20654	9095	106885
      2017-06-24	JavaScript	967	15651	9791	122178
      2017-06-24	CoffeeScript	802	18366	8286	96113
      2017-06-25	JavaScript	967	15651	9791	122178
      2017-06-25	CoffeeScript	802	18366	8286	96113
      2017-06-26	JavaScript	967	15610	9724	121881
      2017-06-26	CoffeeScript	802	18366	8286	96113
      2017-06-27	JavaScript	969	15698	9735	122557
      2017-06-27	CoffeeScript	799	18397	8314	96002
      2017-06-28	JavaScript	964	15694	9651	122865
      2017-06-28	CoffeeScript	798	18423	8314	96291
      2017-06-29	JavaScript	970	15817	9654	123622
      2017-06-29	CoffeeScript	798	18494	8317	96545
      2017-06-30	JavaScript	1367	21600	14936	147801
      2017-06-30	CoffeeScript	411	13348	5726	74603
      2017-07-01	JavaScript	1777	35692	25505	232136
      2017-07-01	CoffeeScript	5	44	38	279
      2017-07-02	JavaScript	1781	35728	25592	232349
      2017-07-02	CoffeeScript	0	0	0	0
    `);
    /* eslint-enable no-tabs */

    const jsRows = data.filter(row => row.Language === 'JavaScript');
    const jsCount = getSeries(jsRows, 'code');
    const csRows = data.filter(row => row.Language === 'CoffeeScript');
    const csCount = getSeries(csRows, 'code');
    const dates = getSeries(jsRows, 'Date');

    Highcharts.chart('chart-lines-of-code', {
      chart: {
        type: 'area',
      },
      title: { style: { display: 'none' } },
      plotOptions: {
        area: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
      },
      xAxis: {
        categories: dates,
        crosshair: true,
      },
      yAxis: {
        title: {
          text: 'Real Lines of Code',
        },
      },
      tooltip: {
        shared: true,
      },
      series: [
        {
          name: 'CoffeeScript',
          data: csCount,
          type: 'area',
        },
        {
          name: 'JavaScript',
          data: jsCount,
          type: 'area',
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

  onLoad(() => useTheme(HC_ELEMENTARY_THEME));
  onLoad(initCaffeineConsumptionChartBefore);
  onLoad(initPullRequestChart);
  onLoad(initLinesOfCodeChart);
  onLoad(initCaffeineConsumptionChartAfter);
}());
