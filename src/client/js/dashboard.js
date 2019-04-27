var business_id, business_info;

function dashboard_load(biz_id, biz_info, competitor_array) {
  var competitor_bizID = competitor_array.slice(1, 5);
  for (var i = 1; i < 5; i++) {
    competitor_bizID.push(
      competitor_array[i].split("<br />")[0].split(": ")[1]
    );
  }
  business_id = biz_id;
  business_info = biz_info;
  document.getElementById("biz_info").innerHTML = business_info;
  avg_rating_chart(biz_id, competitor_bizID);
  document.getElementById('dashboard').scrollIntoView()
  $('#avg-rating-chart-title').html('Average weighted ragtings over the years')
  $('#sentiment-chart-title').html('Sentiment scores over the years')
  //bubble(biz_id);
  //frequent_cloud(biz_id);
}

function getBusinessName(data, bID) {
  for (i = 0; i < data.length; i++) {
    if (data[i].businessID == bID) {
      var name = data[i].businessName;
      name.length > 10 ? name.substring(0, 15) : name;
      break;
    }
  }
  return name;
}

function calculateAverage(data, bID, yr) {
  var i,
    avg = 0.0,
    count = 0;
  for (i = 0; i < data.length; i++) {
    if (data[i].businessID == bID && parseInt(data[i].year, 10) == yr) {
      count++;
      avg = avg + parseFloat(data[i].rating); //parseFloat(data[i].impactScore)*
    }
  }
  if (count == 0) count = 1;

  return avg / count;
}

function getAverageRating(data, keys) {
  var formattedData = [];
  var years = [
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018
  ]; //*** Change this to include all the years
  var avgRating, i;
  for (bID of keys) {
    for (i = 0; i < years.length; i++) {
      avgRating = calculateAverage(data, bID, years[i]);
      var obj = {};
      obj.year = years[i];
      obj.businessName = getBusinessName(data, bID);
      obj.businessID = bID;
      obj.wRating = avgRating;
      formattedData.push(obj);
    }
  }
  return formattedData;
}

function calculateAverageSentiment(data, bID) {
  var averagedData = [];
  var years = [
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018
  ]; // Change this to include all the years
  var i = 0,
    sum = 0,
    count = 0,
    value = 0;
  for (year of years) {
    var obj = {};
    avgScore = getAverageSentinmentForYear(data, bID, year);
    obj.businessID = bID;
    obj.year = year;
    obj.value = avgScore;
    averagedData.push(obj);
  }

  return averagedData;
}

function getAverageSentinmentForYear(data, bID, yr) {
  var i,
    avg = 0.0,
    count = 0;
  for (i = 0; i < data.length; i++) {
    if (data[i].businessID == bID && parseInt(data[i].year, 10) == yr) {
      count++;
      avg = avg + parseFloat(data[i].score);
    }
  }
  if (count == 0) count = 1;

  return avg / count;
}

function avg_rating_chart(myBizID, uniqueBizIds) {
  //*** This variable should ideally be passed to get the 2 graphs, ideally via  funcion.
  // Wrap the entire script tag in a function

  // set the dimensions and margins of the graph
  d3.selectAll(".rating").remove();

  var margin = {
      top: 100,
      right: 100,
      bottom: 50,
      left: 60
    },
    width = 1600 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  // Tooltip function
  var tooltip = d3
    .select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("width", "200px")
    .style("height", "150px")
    .style("position", "absolute")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white");

  var svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("class", "rating")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Add title to graph
  // svg
  //   .append("text")
  //   .attr("x", 20)
  //   .attr("y", -60)
  //   .attr("text-anchor", "left")
  //   .style("font-size", "20px")
  //   .text("Weighted-Average Ratings Across Years")
  //   .style("fill", function (d) {
  //     return "#fff";
  //   });

  // Add subtitle to graph
  svg
    .append("text")
    .attr("x", 0)
    .attr("y", -35)
    .attr("text-anchor", "left")
    .style("font-size", "20px")
    .style("fill", "grey")
    .style("max-width", 400)
    .style("font-weight", "bold")
    .text("Comparing ratings with other businesses in the area")
    .style("fill", function (d) {
      return "#247BA0";
    });

  //Read the data
  //Replace with d3.json(URL?Param1=value1, function(data){) ***
  //d3.csv("SampleWeightedRating.csv", function(data) {

  // *** Change this array to include all the years
  var data = [];
  var data2 = [];
  var data3 = [];
  uniqueBizIds.push(myBizID);

  for (var d in uniqueBizIds) {
    for (var i = 2005; i <= 2018; i++) {
      $.ajax({
        async: false,
        type: "GET",
        global: false,
        url: "http://runge.la.asu.edu:4000/ratings/" + uniqueBizIds[d] + "/" + i,
        success: function (e) {
          data2.push(e);
        }
      });
    }
  }

  for (var d in data2)
    if (data2[d].length != null) {
      for (var d2 in data2[d]) data.push(data2[d][d2]);
    }

  for (e of data) {
    e["businessID"] = e.business_id;
    e["businessName"] = e.business_name;
    e["impactScore"] = e.impact_score;
    e["businessID"] = e.business_id;
  }

  var yearsArr = [
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018"
  ];

  var formattedLineData = getAverageRating(data, uniqueBizIds); // Calculate weighted average for each year

  var bizKeys = d3
    .nest()
    .key(function (d) {
      return d.businessID;
    })
    .entries(formattedLineData);

  // Add X axis
  var x = d3
    .scaleLinear()
    .domain([2005, 2018]) //*** Method 1 Change 2012 to include the entire range //Methd2: d3.extent(data, function(d) { return d.year; })
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(7));

  //X-axis label
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 35)
    .text("Year")
    .style("font-weight", "Bold")
    .style("font-size", "12px")
    .style("fill", function (d) {
      return "#247BA0";
    });

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([0, 5]) //0, d3.max(data, function(d) { return +d.n; })
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y).ticks(5));

  // Y-axis label:
  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", -40)
    .attr("y", -10)
    .text("Avg Weighted Rating")
    .style("font-size", "15px")
    // .style("font-weight", "Bold")
    .attr("text-anchor", "start")
    .style("fill", function (d) {
      return "#247BA0";
    });

  // Adding dashed lines across Y-axis

  function make_y_gridlines() {
    return d3.axisLeft(y).ticks(5);
  }

  svg
    .append("g")
    .attr("class", "grid")
    .attr("stroke", "#777")
    .attr("stroke-dasharray", "2,2")
    .call(
      make_y_gridlines()
      .tickSize(-width * 1)
      .tickFormat("")
    );

  var defaultBizColor = "#dd661f";

  // color palette
  var res = bizKeys.map(function (d) {
    return d.key;
  }); // list of group names
  var color = d3
    .scaleOrdinal()
    .domain(res)
    .range(["#0098cd"]);
  var otherBizDot = "#0098cd";
  var myBizDot = "#dd661f";

  // Draw the line
  var business = svg
    .selectAll(".line")
    .data(bizKeys)
    .enter();

  business
    .append("path")
    .attr("fill", "none")
    .attr("stroke", function (d) {
      if (!(d.key == myBizID)) return color(d.key);
      else return defaultBizColor;
    })
    .attr("stroke-width", 2.5)
    .attr("d", function (d) {
      return d3
        .line()
        .x(function (d) {
          return x(d.year);
        })
        .y(function (d) {
          return y(d.wRating);
        })(d.values);
    })
    .on("mouseover", function (d) {
      d3.select(this)
        .style("opacity", 0.1)
        .attr("stroke", "blue");
    })
    .on("mouseleave", function (d) {
      d3.select(this)
        .style("opacity", 1)
        .attr("stroke", function (d) {
          if (!(d.key == myBizID)) return color(d.key);
          else return defaultBizColor;
        });
    });

  business
    .append("text")
    .datum(function (d) {
      return {
        key: d.businessID,
        values: d.values[d.values.length - 1]
      };
    })
    .attr("transform", function (d) {
      return "translate(" + x(d.values.year) + "," + y(d.values.wRating) + ")";
    })
    .attr("x", 7)
    .attr("dy", ".35em")
    .attr("font-size", "12px")
    .text(function (d) {
      return d.values.businessName;
    });

  //Adding dots on the line graph for each point

  svg
    .selectAll(".dot")
    .data(formattedLineData)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.year);
    })
    .attr("cy", function (d) {
      return y(d.wRating);
    })
    .attr("r", 5)
    .attr("fill", function (d) {
      if (!(d.businessID == myBizID)) return otherBizDot;
      else return myBizDot;
    })
    .on("mouseover", function (d) {
      tooltip.style("opacity", 1);
      d3.select(this)
        .style("stroke", "black")
        .transition()
        .duration(250)
        .attr("r", 8);
    })
    .on("mousemove", function (d) {
      tooltip
        .html(
          "Weighted Rating: " +
          d.wRating.toFixed(2) +
          "<br> Year: " +
          d.year +
          "<br>Click for details:" +
          d.businessName
        )
        .style("left", d3.event.pageX + 16 + "px")
        .style("top", d3.event.pageY + 16 + "px");
    })
    .on("mouseleave", function (d) {
      tooltip.style("opacity", 0);
      d3.select(this)
        .style("stroke", "none")
        .transition()
        .duration(150)
        .attr("r", 5);
    })
    .on("click", function (d, i) {
      loadSentiment(d.businessID);
      positiveCloud(d.businessID);
      negativeCloud(d.businessID);
      bubble(d.businessID, d.year);
    });

  svg
    .append("rect")
    .attr("x", -50)
    .attr("y", -90)
    .attr("height", height + margin.top + margin.bottom - 10)
    .attr("width", width + margin.left + margin.right - 20)
    .style("stroke", "#FF1654")
    .style("fill", "none")
    .style("stroke-width", "0.5px");

  //})
  loadSentiment(myBizID);

}

function loadSentiment(gnvbizID) {
  if (!gnvbizID) {
    gnvbizID = myBizID; //*** Change the hard coded value to the variable 'bisID' defined earlier
  }

  //	finalists(yeardr);
  d3.selectAll(".sentiment").remove();

  var margin = {
      top: 100,
      right: 100,
      bottom: 50,
      left: 70
    },
    width = 1600 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select("#senti-graph")
    .append("svg")
    .attr("class", "sentiment")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  //Replace with d3.json(URL?Param1=value1, function(data){ ***
  //d3.csv("SampleSentiment.csv",function(data) {
      // Tooltip function
  var tooltip1 = d3
  .select("#senti-graph")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "black")
  .style("width", "200px")
  .style("height", "50px")
  .style("position", "absolute")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "white");
  var data = [];

  for (var i = 2005; i <= 2018; i++) {
    $.ajax({
      async: false,
      type: "GET",
      global: false,
      url: "http://runge.la.asu.edu:4000/sentiment/" + gnvbizID + "/" + i,
      success: function (e) {
        data.push(e);
      }
    });
  }

  for (e of data) {
    e["businessID"] = e.business_id;
    e["businessName"] = e.business_name;
    e["score"] = e.sentiment_score;
  }

  var bizName = getBusinessName(data, gnvbizID);

  //Add title to graph
  // svg
  //   .append("text")
  //   .attr("x", 70)
  //   .attr("y", -60)
  //   .attr("text-anchor", "left")
  //   .style("font-size", "30px")
  //   .style("font-weight", "bold")
  //   .text("Sentiment Across Years")
  //   .style("fill", function (d) {
  //     return "#2874A6";
  //   });

  // Add subtitle to graph
  svg
    .append("text")
    .attr("x", 30)
    .attr("y", -35)
    .attr("text-anchor", "left")
    .style("font-size", "20px")
    .style("fill", "grey")
    .style("max-width", 400)
    .style("font-weight", "bold")
    .text("Change in User sentiment across the years")
    .style("fill", function (d) {
      return "#2874A6";
    });

  // Adding a border
  svg
    .append("rect")
    .attr("x", -50)
    .attr("y", -90)
    .attr("height", height + margin.top + margin.bottom - 10)
    .attr("width", width + margin.left + margin.right - 20)
    .style("stroke", "#FF1654")
    .style("fill", "none")
    .style("stroke-width", "0.5px");

  // Add X axis

  var averagedSentimentData = calculateAverageSentiment(data, gnvbizID);
  var senti_domain = d3.extent(averagedSentimentData, function (d) {
    return d.value;
  });
  // console.log(senti_domain);
  var x = d3
    .scaleLinear()
    .domain([2005, 2018]) //Change this to include all te years ***
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(7));

  //X-axis label
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 35)
    .text("Year")
    .style("font-weight", "Bold")
    .style("font-size", "12px")
    .style("fill", function (d) {
      return "#2874A6";
    });

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([senti_domain[0], senti_domain[1] + 1])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y).ticks(5));

  // Y-axis label:
  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", -40)
    .attr("y", -10)
    .text("Average Sentiment")
    .style("font-size", "12px")
    .style("font-weight", "Bold")
    .attr("text-anchor", "start")
    .style("fill", function (d) {
      return "#2874A6";
    });

  //Y-Axis grid lines
  function make_y_gridlines() {
    return d3.axisLeft(y).ticks(2);
  }

  svg
    .append("g")
    .attr("class", "grid")
    .attr("stroke", "#700")
    .attr("stroke-dasharray", "2,2")
    .call(
      make_y_gridlines()
      .tickSize(-width * 1)
      .tickFormat("")
    );

  // Add the line
  var line = svg
    .selectAll(".line")
    .data(averagedSentimentData)
    .enter();

  line
    .append("path")
    .datum(averagedSentimentData)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
      .line()
      .x(function (d) {
        return x(d.year);
      })
      .y(function (d) {
        return y(d.value);
      })
    );

  svg
    .append("path")
    .datum(averagedSentimentData)
    .attr("fill", "#69b3a2")
    .attr("fill-opacity", 0.3)
    .attr("stroke", "none")
    .attr(
      "d",
      d3
      .area()
      .x(function (d) {
        return x(d.year);
      })
      .y0(height)
      .y1(function (d) {
        return y(d.value);
      })
    );

  line
    .append("text")
    .datum(function (d) {
      return d[d.length - 1];
    })
    .attr("transform", function (d) {
      return "translate(" + x(2018) + "," + y(0) + ")";
    })
    .attr("x", 10)
    .attr("dy", ".35em")
    .attr("font-size", "12px")
    .text(bizName);

  svg
    .selectAll(".SentimentDot")
    .data(averagedSentimentData)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.year);
    })
    .attr("cy", function (d) {
      return y(d.value);
    })
    .attr("r", 5)
    .attr("fill", function (d) {
      if (d.value < 0) return "#0098cd";
      else return "#dd661f";
    })
    .on("mouseover", function (d) {
      tooltip1.style("opacity", 1);
      d3.select(this)
        .style("stroke", "black")
        .transition()
        .duration(250)
        .attr("r", 8);
    })
    .on("mousemove", function (d) {
      tooltip1
        .html("Sentiment score: " + d.value.toFixed(2))
        .style("left", d3.event.pageX + 16 + "px")
        .style("top", d3.event.pageY + 16 + "px");
    })
    .on("mouseleave", function (d) {
      tooltip1.style("opacity", 0);
      d3.select(this)
        .style("stroke", "none")
        .transition()
        .duration(250)
        .attr("r", 5);
    });
}

function bubble(myBizID, year) {
  generateWordBubble(myBizID, year)
}

function negativeCloud(myBizID) {
  setTimeout(() => generateWordCloudNegatives(myBizID), 300)
}

function positiveCloud(myBizID) {
  var n = $(document).height();
  $('html, body').animate({ scrollTop: n * 2 }, 50);
  setTimeout(() => generateWordCloudPositives(myBizID), 500)
}