
function createDeviceChart(deviceData) {

  const trace1 = {
    x: deviceData.map((data) => data.device_category),
    y: deviceData.map((data) => data.no_of_users),
    type: 'bar',
    name: 'Total Users',
    marker: {
      color: 'rgb(49,130,189)',
      opacity: 0.7,
    },
  };
  console.log(deviceData)
  console.log(trace1)
  const trace2 = {
    x: deviceData.map((data) => data.device_category),
    y: deviceData.map((data) => data.mean_revenue),
    type: 'bar',
    name: 'Mean Revenue',
    marker: {
      color: 'rgb(204,204,204)',
      opacity: 0.7,
    },
  };

  const trace3 = {
    x: deviceData.map((data) => data.device_category),
    y: deviceData.map((data) => data.total_revenue),
    type: 'bar',
    name: 'Total Revenue',
    marker: {
      color: 'rgb(112,204,204)',
      opacity: 0.7,
    },
  };

  const userData = [trace1];
  const meanRevData = [trace2];
  const totalRevData = [trace3];
  // const data = [trace1, trace2, trace3];

  const layout1 = {
    title: 'Users by Device Category',
    xaxis: {
      tickangle: -45,
    },
  };

  const layout2 = {
    title: 'Mean Revenue by Device Category',
    xaxis: {
      tickangle: -45,
    },
  };

  const layout3 = {
    title: 'Total Revenue by Device Category',
    xaxis: {
      tickangle: -45,
    },
  };

  Plotly.newPlot('device_users', userData, layout1, { responsive: true });
  Plotly.newPlot('device_mean_rev', meanRevData, layout2, { responsive: true });
  Plotly.newPlot('device_total_rev', totalRevData, layout3, { responsive: true });
}

function createOSChart(OSData) {

  const trace1 = {
    x: OSData.map((data) => data.OS),
    y: OSData.map((data) => data.no_of_users),
    type: 'bar',
    name: 'Total Users',
    marker: {
      color: 'rgb(49,130,189)',
      opacity: 0.7,
    },
  };

  const data = [trace1];
  //const data = [trace1, trace2, trace3];

  const layout = {
    title: 'Total users and revenue by OS Category',
    xaxis: {
      tickangle: -45,
    },
    //barmode: 'group',
  };

  Plotly.newPlot('os', data, layout, { responsive: true });
}

function createBrowserChart(browserData) {

  const trace1 = {
    x: browserData.map((data) => data.browser),
    y: browserData.map((data) => data.no_of_users),
    type: 'bar',
    name: 'Total Users',
    marker: {
      color: 'rgb(49,130,189)',
      opacity: 0.7,
    },
  };

  const data = [trace1];
  //const data = [trace1, trace2, trace3];

  const layout = {
    title: 'Total users and revenue by Browser Category',
    xaxis: {
      tickangle: -45,
    },
    //barmode: 'group',
  };

  Plotly.newPlot('browser', data, layout, { responsive: true });
}

function createDateChart(dateData) {

  var foo = [];

  for (var i = 1; i <= Object.keys(dateData).length; i++) {
    foo.push(i);
  }
  console.log(Object.keys(dateData).length)
  const trace1 = {
    // x: dateData.map((day) => parseInt(day.date)),
    x: foo,
    y: dateData.map((day) => day.no_of_users),
    name: 'Visits',
    mode: 'lines',
    line: {
      shape: 'spline',
      smoothing: 1.3,
    },
  };

  const trace2 = {
    // x: dateData.map((day) => parseInt(day.date)),
    x: foo,
    y: dateData.map((day) => day.total_revenue),
    name: 'Revenue',
    mode: 'lines',
    line: {
      shape: 'spline',
      smoothing: 1.3,
    },
  };

  const data1 = [trace1];
  console.log(trace1)
  const layout1 = {
    title: 'Visits per day',
    xaxis: {
      tickangle: -45,
    },
    barmode: 'group',
  };

  const data2 = [trace2];
  const layout2 = {
    title: 'Revenue per day',
    xaxis: {
      tickangle: -45,
    },
    barmode: 'group',
  };

  Plotly.newPlot('offence_type', data1, layout1, { responsive: true });
  Plotly.newPlot('incidents_by_year', data2, layout2, { responsive: true });
}


const renderCharts = async () => {
  
  const deviceData = await d3.json(DEVICE_CATEGORY_API);
  const OSData = await d3.json(OS_CATEGORY_API);
  const browserData = await d3.json(BROWSER_CATEGORY_API);
  const dateData = await d3.json(DATE_API);

  // const continentData = await d3.json(CONTINENT_API);
  // const subcontinentData = await d3.json(SUBCONTINENT_API);
  // const countryData = await d3.json(COUNTRY_API);
  // const channelData = await d3.json(CHANNEL_GROUP_API);
  // const mediumData = await d3.json(MEDIUM_CATEGORY_API);
  // const weekdayData = await d3.json(WEEKDAY_API);
  // const dayData = await d3.json(DAY_API);
  // const monthData = await d3.json(MONTH_API);
  // const yearData = await d3.json(YEAR_API);

  createDeviceChart(deviceData);
  createOSChart(OSData);
  createBrowserChart(browserData);
  createDateChart(dateData);

  // createContinetChart(continentData)
  // createSubcontinetChart(subcontinentData)
  // createCountryChart(countryData)
  // createChannelChart(channelData);
  // createMediumChart(mediumData);
  // createWeekdayChart(weekdayData);
  // createMonthChart(monthData);
  // createYearChart(yearData);

}

const init = async () => {
  showLoader();
  await renderCharts();
  hideLoader();
};

init();
