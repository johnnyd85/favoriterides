var margin = {top: 10, right: 10, bottom: 30, left: 50},
width = 600 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;
var barPadding = 60;

var xRange = d3.scale.linear().range([margin.left, width - margin.right]);
var yRange = d3.scale.linear().range([height - margin.top, margin.bottom]);
var xAxis = d3.svg.axis().scale(xRange).tickSize(16).tickSubdivide(true);
var yAxis = d3.svg.axis().scale(yRange).tickSize(10).orient("right").tickSubdivide(true);

function init(){

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," +  margin.top + ")");
  
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Miles");

function update () {

d3.csv(""+document.getElementById("drop-down").value+".csv", type, function(error, data) {
  var x = d3.scale.ordinal()
    .domain(data.map(function(d) { return d.name; }))
    .rangeBands([0, width]);

  var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.miles; })])
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  svg.selectAll("rect")
   .data(data)
   .enter()
   .append("rect")
   .attr("class", "bar")
   .attr("x", function(d, i) {
      return i * x.rangeBand() + barPadding/2; })
   .attr("y", function(d) {return y(d.miles);})
   .attr("width", x.rangeBand() - 50)
   .attr("height", function(d) {return height - y(d.miles);});
  
  var t = svg.transition().duration(1500).ease("exp-in-out");
    t.select(".x.axis").call(xAxis);
    t.select(".y.axis").call(yAxis);
    t.selectAll("rect")
      .attr("y", function(d) {return y(d.miles);})
      .attr("width", x.rangeBand() - 50)
      .attr("height", function(d) {return height - y(d.miles);});
  
  var e = svg.transition().duration(1500).ease("exp-in-out");
    t.select(".x.axis").call(xAxis);
    t.select(".y.axis").call(yAxis);
    t.selectAll("rect")
      .attr("y", function(d) {return y(d.miles);})
      .attr("width", x.rangeBand() - 50)
      .attr("height", function(d) {return height - y(d.miles);});

});

function type(d) {
  d.miles = +d.miles;
  return d;
}

}

document.getElementById("drop-down").addEventListener ("change", update, false);

}

init();
