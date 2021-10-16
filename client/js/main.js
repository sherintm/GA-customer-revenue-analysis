const createTrafficChart =  async (traffic) =>
{
  console.log(traffic)
  let trafficData;
  if (traffic==="source")
  {
    trafficData = await d3.json(TRAFFIC_SOURCE_API);
  }else if (traffic==="medium")
  {
    trafficData = await d3.json(TRAFFIC_MEDIUM_API);
  }else
  {
    trafficData = await d3.json(TRAFFIC_CAMPAIGN_API);
  }

  trafficData = trafficData.sort((a, b) => b.total_revenue - a.total_revenue);
  // .slice(0, 10);
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
  title:'Revenue Distribution based on Traffic Source Attributes'
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
    x: deviceData.map((data) => data.device_category),
    y: deviceData.map((data) => data.no_of_users),
    type: 'bar',
    name: 'Total Users',
    marker: {
      color: 'rgb(49,130,189)',
      opacity: 0.7,
    },
  };
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

  // const trace1 = {
  //   // x: dateData.map((day) => parseInt(day.date)),
  //   x: foo,
  //   y: dateData.map((day) => day.no_of_users),
  //   name: 'Visits',
  //   mode: 'lines',
  //   line: {
  //     shape: 'spline',
  //     smoothing: 1.3,
  //   },
  // };

  // const trace2 = {
  //   // x: dateData.map((day) => parseInt(day.date)),
  //   x: foo,
  //   y: dateData.map((day) => day.total_revenue),
  //   name: 'Revenue',
  //   mode: 'lines',
  //   line: {
  //     shape: 'spline',
  //     smoothing: 1.3,
  //   },
  // };

  // const data1 = [trace1];
  // const layout1 = {
  //   title: 'Visits per day',
  //   xaxis: {
  //     tickangle: -45,
  //   },
  //   barmode: 'group',
  // };

  // const data2 = [trace2];
  // const layout2 = {
  //   title: 'Revenue per day',
  //   xaxis: {
  //     tickangle: -45,
  //   },
  //   barmode: 'group',
  // };
  function parseJsonDate(date)
  {
    const year = JSON.stringify(date.date).slice(0, 4);
    const month = JSON.stringify(date.date).slice(4, 6);
    const day = JSON.stringify(date.date).slice(6, 8);
    const newdate = new Date(year, month, day)
    return newdate;
  }

  const trace1 = {
    x: dateData.map(parseJsonDate),
    //x: foo,
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
    x: dateData.map(parseJsonDate),
    //x: foo,
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

  // const data1 = [trace1];
  // const layout1 = {
  //   title: 'Visits per day',
  //   xaxis: {
  //     tickangle: -45,
  //   },
  //   barmode: 'group',
  // };

  // const data2 = [trace2];
  // const layout2 = {
  //   title: 'Revenue per day',
  //   xaxis: {
  //     tickangle: -45,
  //   },
  //   barmode: 'group',
  // };
   const data = [trace1, trace2];
  
  const layout = {
  grid: {
      rows: 2,
      columns: 1,
      pattern: 'independent',
      roworder: 'bottom to top'}
  };
  // var layout = {
  //   title: 'Time Series with Rangeslider',
  //   xaxis: {
  //     autorange: true,
  //     range: [new Date(Math.min.apply(null,trace1.x)), new Date(Math.max.apply(null,trace1.x))],
  //     rangeselector: {buttons: [
  //         {
  //           count: 1,
  //           label: '1m',
  //           step: 'month',
  //           stepmode: 'backward'
  //         },
  //         {
  //           count: 6,
  //           label: '6m',
  //           step: 'month',
  //           stepmode: 'backward'
  //         },
  //         {step: 'all'}
  //       ]},
  //     rangeslider: {range: [new Date(Math.min.apply(null,trace1.x)), new Date(Math.max.apply(null,trace1.x))]},
  //     type: 'date'
  //   },
  //   yaxis: {
  //     autorange: true,
  //     //range: [86.8700008333, 138.870004167],
  //     type: 'linear'
  //   },
  //   grid: {
  //     rows: 2,
  //     columns: 1,
  //     pattern: 'independent',
  //     roworder: 'bottom to top'},
  // };

  
  Plotly.newPlot('victims', data, layout, { responsive: true });
  //Plotly.newPlot('offence_type', data1, layout1, { responsive: true });
  //Plotly.newPlot('incidents_by_year', data2, layout2, { responsive: true });
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

  // const channelData = await d3.json(CHANNEL_GROUP_API);
  // const weekdayData = await d3.json(WEEKDAY_API);
  // const dayData = await d3.json(DAY_API);
  // const monthData = await d3.json(MONTH_API);
  // const yearData = await d3.json(YEAR_API);

  createDeviceChart(deviceData);
  createOSChart(OSData);
  createBrowserChart(browserData);
  createDateChart(dateData);
  //createCountryChart(countryData);
  createContinentChart(continentData);
  createSubcontinentChart(subcontinentData);
  // createChannelChart(channelData);
  // createMediumChart(mediumData);
  // createWeekdayChart(weekdayData);
  // createMonthChart(monthData);
  // createYearChart(yearData);

}

const onYearChange = async () => {
  const traffic = document.querySelector('#year-select').value;
  showLoader();
  await createTrafficChart(traffic);
  hideLoader();
};


const init = async () => {
  showLoader();
  await renderCharts();
  hideLoader();
};

init();
