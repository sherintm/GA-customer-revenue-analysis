
const createTrafficChart =  async (traffic) =>
{
  console.log(traffic)
  let trafficData;
  let traffic_title;
  if (traffic==="source")
  {
    trafficData = await d3.json(TRAFFIC_SOURCE_API);
    traffic_title = 'Revenue Distribution based on Traffic Source'
  }else if (traffic==="medium")
  {
    trafficData = await d3.json(TRAFFIC_MEDIUM_API);
    traffic_title = 'Revenue Distribution based on Traffic Source Medium'

  }else
  {
    trafficData = await d3.json(TRAFFIC_CAMPAIGN_API);
    traffic_title = 'Revenue Distribution based on Traffic Source Campaign'
  }

  if (traffic==="campaign") {
    trafficData = trafficData.sort((a, b) => b.total_revenue - a.total_revenue)
    .slice(1, 10);
  }
  else{
    trafficData = trafficData.sort((a, b) => b.total_revenue - a.total_revenue)
    .slice(0, 10);
  }
  const trace1 = {
    x: trafficData.map((data) => data.traffic_source),
    y: trafficData.map((data) => data.no_of_users),
    type: 'bar',
    name: 'Total Visits',
    // marker: {
    //   color: 'rgb(49,130,189)',
    //   opacity: 0.7,
    // },
  };


  const trace2 = {
    x: trafficData.map((data) => data.traffic_source),
    y: trafficData.map((data) => data.total_revenue),
    type: 'bar',
    name: 'Total Revenue',
    xaxis: 'x2',
    yaxis: 'y2',
    // marker: {
    //   color: 'rgb(49,130,189)',
    //   opacity: 0.7,
    // },
  };
  
  const data = [trace1, trace2];
  
  const layout = {
  grid: {
      rows: 2,
      columns: 1,
      pattern: 'independent',
      roworder: 'bottom to top'},
      title: traffic_title
  };
  
  Plotly.newPlot('traffic', data, layout, { responsive: true });

}
function createCountryChart(countryData)
{
    var data = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: countryData.map((data) => data.country),
        z: countryData.map((data) => data.no_of_users),
        text: countryData.map((data) => data.country),
        autocolorscale: true
    }];

    var layout = {
      title: 'Total Visits Distribution by Country',
      geo: {
          projection: {
              type: 'robinson'
          }
      }
    };

    var data2 = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations: countryData.map((data) => data.country),
      z: countryData.map((data) => data.total_revenue),
      text: countryData.map((data) => data.country),
      autocolorscale: true
  }];

  var layout2 = {
    title: 'Total Revenue Distribution by Country',
    geo: {
        projection: {
            type: 'robinson'
        }
    }
  };

    Plotly.newPlot("map", data, layout,  { responsive: true });
    Plotly.newPlot("map2", data2, layout2, { responsive: true });
}

function createDeviceChart(deviceData) {
  const trace1 = {
    labels: deviceData.map((data) => data.device_category),
    values: deviceData.map((data) => data.total_revenue),
    type: 'pie',
    hole: .5,
    title: 'Total Revenue',
    domain: {row: 0},
    // marker: {
    //   color: 'rgb(112,204,204)',
    //   opacity: 0.7,
    // },
  };


  const trace2 = {
    labels: deviceData.map((data) => data.device_category),
    values: deviceData.map((data) => data.no_of_users),
    type: 'pie',
    hole: .5,
    title: 'Total Visits',
    domain: {row: 1},
    // marker: {
    //   color: 'rgb(49,130,189)',
    //   opacity: 0.7,
    // },
  };


  const data = [trace1, trace2];

  const layout = {
    title: 'Distribution by Device Category',
    // xaxis: {
    //   tickangle: -45,
    // },
    // annotations: [
    //   {
    //     // font: {
    //     //   size: 20
    //     // },
    //     // showarrow: false,
    //     text: 'GHG',
    //     // x: 0.17,
    //     // y: 0.5
    //   },
    //   {
    //     // font: {
    //     //   size: 20
    //     // },
    //     // showarrow: false,
    //     text: 'CO2',
    //     // x: 0.82,
    //     // y: 0.5
    //   }
    // ],
    grid: {rows: 2, columns: 1}
  };

  Plotly.newPlot('device_users', data, layout, { responsive: true });
}

function createOSChart(OSData) {
  OSData = OSData.sort((a, b) => b.total_revenue - a.total_revenue).slice(0,15);

  const trace1 = {
    x: OSData.map((data) => data.total_revenue),
    y: OSData.map((data) => data.OS),
    type: 'bar',
    name: 'Total Revenue',
    orientation: 'h',
    // marker: {
    //   color: 'rgb(49,130,189)',
    //   opacity: 0.7,
    // },
  };

  const data = [trace1];
  //const data = [trace1, trace2, trace3];

  const layout = {
    title: 'Total Revenue distribution by OS',
    // xaxis: {
    //   tickangle: -45,
    // },
    yaxis: {
      autorange: 'reversed',
    },
    //barmode: 'group',
  };

  Plotly.newPlot('os', data, layout, { responsive: true });
}

function createBrowserChart(browserData) {
  browserData = browserData.sort((a, b) => b.total_revenue - a.total_revenue).slice(0,9);

  const trace1 = {
    x: browserData.map((data) => data.total_revenue),
    y: browserData.map((data) => data.browser),
    type: 'bar',
    name: 'Total Revenue',
    // marker: {
    //   color: 'rgb(49,130,189)',
    //   opacity: 0.7,
    // },
    orientation: 'h',
  };

  const data = [trace1];
  //const data = [trace1, trace2, trace3];

  const layout = {
    title: 'Total Revenue Distribution by Browser',
    yaxis: {
      tickangle: -45,
    },
  };

  Plotly.newPlot('browser', data, layout, { responsive: true });
}

function createChannelChart(channelData) {
  var ultimateColors = [
    ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'],
    ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)'],
    ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)'],
    ['rgb(146, 123, 21)', 'rgb(177, 180, 34)', 'rgb(206, 206, 40)', 'rgb(175, 51, 21)', 'rgb(35, 36, 21)']
  ];

  const trace1 = {
    values: channelData.map((data) => data.no_of_users),
    labels: channelData.map((data) => data.channel_group),
    type: 'pie',
    title: 'Total Visits',
    marker: {
  //  colors: ultimateColors[0]
    },
    domain: {
    row: 0,
    column: 0
    },
    hoverinfo: 'label+percent+name',
  };

  const trace2 = {
    values: channelData.map((data) => data.total_revenue),
    labels: channelData.map((data) => data.channel_group),
    type: 'pie',
    title: 'Total Revenue',
    marker: {
  // colors: ultimateColors[1]
    },
    domain: {
    row: 0,
    column: 1
    },
    hoverinfo: 'label+percent+name',
  };

  var data = [trace1, trace2];

  var layout = {
  // height: 100%,
  // width: 500,
  grid: {rows: 1, columns: 2},
  title:'Distribution by Channel Group'
  };

  Plotly.newPlot('channel_group', data, layout, { responsive: true });

}

function parseJsonDate(date)
{
  //console.log(Object.values(date.date));
  let strdate = Object.values(date.date);
  const newdate = new Date(strdate[0]);
  return newdate;
}

function createDateChart(dateData) {

  // console.log(dateData)
  date_array =  dateData.map(parseJsonDate);
  //console.log(date_array);
  const trace1 = {
    x: date_array,
    y: dateData.map((day) => day.no_of_users),
    name: 'Visits',
    mode: 'lines',
    line: {
      shape: 'spline',
      smoothing: 1.3,
    },
    xaxis: 'x1',
    yaxis: 'y1',
  };
  const trace2 = {
    x: date_array,
    y: dateData.map((day) => day.total_revenue),
    name: 'Revenue',
    mode: 'lines',
    line: {
      shape: 'spline',
      smoothing: 1.3,
    },
    xaxis: 'x2',
    yaxis: 'y2',
  };

  const data = [trace1, trace2];
  
  const layout = {
    grid: {
      rows: 2,
      columns: 1,
      pattern: 'independent',
      roworder: 'bottom to top'},
    title: 'Time Series of Visits and Revenue'
  };

  Plotly.newPlot('timeseries', data, layout, { responsive: true });
}

function createContinentChart(continentData)
{
  continentData = continentData
  .sort((a, b) => b.no_of_users - a.no_of_users);
  // .slice(0, 10);
  const trace1 = {
    x: continentData.map((data) => data.continent),
    y: continentData.map((data) => data.no_of_users),
    type: 'bar',
    name: 'Total Visits',
    // marker: {
    //   color: 'rgb(49,130,189)',
    //   opacity: 0.7,
    // },
  };

  const trace2 = {
    x: continentData.map((data) => data.continent),
    y: continentData.map((data) => data.mean_revenue),
    type: 'bar',
    name: 'Mean Revenue',
    xaxis: 'x2',
    yaxis: 'y2',
    // marker: {
    //   color: 'rgb(49,130,189)',
    //   opacity: 0.7,
    // },
  };

  const trace3 = {
    x: continentData.map((data) => data.continent),
    y: continentData.map((data) => data.total_revenue),
    type: 'bar',
    name: 'Total Revenue',
    xaxis: 'x3',
    yaxis: 'y3',
    // marker: {
    //   color: 'rgb(49,130,189)',
    //   opacity: 0.7,
    // },
  };
  
  const data = [trace1, trace2, trace3];
  
  const layout = {
  grid: {
      rows: 3,
      columns: 1,
      pattern: 'independent',
      roworder: 'bottom to top'},
  title: 'Distribution by Continent'
  };
  Plotly.newPlot('continents', data, layout, { responsive: true });
}

function createSubcontinentChart(subcontinentData)
{
  const highVisitsData = subcontinentData
  .sort((a, b) => b.no_of_users - a.no_of_users);
  // .slice(0, 10);

  const trace1 = {
    x: highVisitsData.map((data) => data.subcontinent),
    y: highVisitsData.map((data) => data.no_of_users),
    type: 'bar',
    name: 'Total Visits',
    // orientation: 'h',
    // text: highVisitsData.map((data) => data.no_of_users),
    // textposition: 'auto',
    // marker: {
    //   color: 'rgb(49,130,189)',
    //   opacity: 0.7,
    // },
  };

  const trace2 = {
    x: subcontinentData.map((data) => data.subcontinent),
    y: subcontinentData.map((data) => data.mean_revenue),
    type: 'bar',
    name: 'Mean Revenue',
    xaxis: 'x2',
    yaxis: 'y2',
    tickangle: 45,
    // marker: {
    //   color: 'rgb(49,130,189)',
    //   opacity: 0.7,
    // },
  };

  const trace3 = {
    x: subcontinentData.map((data) => data.subcontinent),
    y: subcontinentData.map((data) => data.total_revenue),
    type: 'bar',
    name: 'Total Revenue',
    xaxis: 'x3',
    yaxis: 'y3',
    ticklabel:false
    // marker: {
    //   color: 'rgb(49,130,189)',
    //   opacity: 0.7,
    // },
  };

  
  const data = [trace1, trace2, trace3];
  
  const layout = {
  grid: {
      rows: 3,
      columns: 1,
      pattern: 'independent',
      roworder: 'bottom to top'},
      xaxis: {
      tickangle: 45,
    },
  };
  
  Plotly.newPlot('subcontinents', data, layout, { responsive: true });
}

const renderCharts = async () => {
  
  const deviceData = await d3.json(DEVICE_CATEGORY_API);
  const OSData = await d3.json(OS_CATEGORY_API);
  const browserData = await d3.json(BROWSER_CATEGORY_API);
  const dateData = await d3.json(DATE_API);
  const countryData = await d3.json(COUNTRY_API);
  const continentData = await d3.json(CONTINENT_API);
  const subcontinentData = await d3.json(SUBCONTINENT_API);
  const channelData = await d3.json(CHANNEL_GROUP_API);
  const weekdayData = await d3.json(WEEKDAY_API);
  const dayData = await d3.json(DAY_API);
  const monthData = await d3.json(MONTH_API);
  const yearData = await d3.json(YEAR_API);

  createDeviceChart(deviceData);
  createOSChart(OSData);
  createBrowserChart(browserData);
  createDateChart(dateData);
  createCountryChart(countryData);
  createContinentChart(continentData);
  //createSubcontinentChart(subcontinentData);
  createChannelChart(channelData);
  // createMediumChart(mediumData);
  // createWeekdayChart(weekdayData);
  // createMonthChart(monthData);
  // createYearChart(yearData);
}

const onTrafficChange = async () => {
  const traffic = document.querySelector('#traffic-select').value;
  showLoader();
  await createTrafficChart(traffic);
  hideLoader();
};


const init = async () => {
  showLoader();
  await renderCharts();
  await onTrafficChange();
  hideLoader();
};

init();
