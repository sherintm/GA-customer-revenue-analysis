
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

  trafficData = trafficData.sort((a, b) => b.total_revenue - a.total_revenue)
  .slice(0, 10);
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
  
  Plotly.newPlot('incidents_by_year', data, layout, { responsive: true });

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
      title: 'Total visits',
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
    title: 'Total Revenue',
    geo: {
        projection: {
            type: 'robinson'
        }
    }
  };

    Plotly.newPlot("map", data, layout, {showLink: false});
    Plotly.newPlot("map2", data2, layout2, {showLink: false});
}

function createCountryChart_old(countryData)
{
  var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 8
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // // Load in geojson data
  var geoData = "../data/countries.geojson";
  
  var geojson;
  // Grab data with d3
  d3.json(geoData).then(function(data) {
  // Create a new choropleth layer
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    //valueProperty: "",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      // layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Median Household Income:<br>" +
      //   "$" + feature.properties.MHI2016);
    }
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Median Income</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

  });
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
    // xaxis: {
    //   tickangle: -45,
    // },
    //barmode: 'group',
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
      roworder: 'bottom to top'}
  };

  Plotly.newPlot('victims', data, layout, { responsive: true });
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
    name: 'Mean Revenue',
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
      roworder: 'bottom to top'}
      
  };
  Plotly.newPlot('continents', data, layout, { responsive: true });
}

function createSubcontinentChart(subcontinentData)
{
  const highVisitsData = subcontinentData
  .sort((a, b) => a.no_of_users - b.no_of_users);
  // .slice(0, 10);

  const trace1 = {
    y: highVisitsData.map((data) => data.subcontinent),
    x: highVisitsData.map((data) => data.no_of_users),
    type: 'bar',
    name: 'Total Visits',
    orientation: 'h',
    text: highVisitsData.map((data) => data.no_of_users),
    textposition: 'auto',
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
    yaxis: 'y2'
    // marker: {
    //   color: 'rgb(49,130,189)',
    //   opacity: 0.7,
    // },
  };

  const trace3 = {
    x: subcontinentData.map((data) => data.subcontinent),
    y: subcontinentData.map((data) => data.total_revenue),
    type: 'bar',
    name: 'Mean Revenue',
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
      rows: 1,
      columns: 3,
      pattern: 'independent',
      roworder: 'bottom to top'}
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
  createSubcontinentChart(subcontinentData);
  createChannelChart(channelData);
  // createMediumChart(mediumData);
  // createWeekdayChart(weekdayData);
  // createMonthChart(monthData);
  // createYearChart(yearData);
}

const onTrafficChange = async () => {
  const traffic = document.querySelector('#year-select').value;
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
