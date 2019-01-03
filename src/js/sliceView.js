"use strict";

var App = App || {};


var SliceView = function(){
  var self = this;
  var po;
  var slice;
  // var g;
  var x;
  var zLocation = 0;



  self.createSliceWindow = function(planeObject){
    po = planeObject;
    var width = 300;
    var height = 300;
    d3.select("#slice").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("style", "background:#3f3332;");

  };
  //points are
  self.projectPoints = function(change){

    if(change == null){
      zLocation = zLocation + 0;
    }

    else{
      zLocation+=change;
    }

    var g = d3.select('svg').append('g');

    if(change == null){
      g.append('text')
        .text("scroll on the visual to see intersecting points")
        .attr("font-family", "Arial")
        .attr("font-size", "15px")
        .attr("fill", "red")
        .attr('x', 5)
        .attr('y', 50)
        ;
    }
    else{
      var centerX = 150;
      var centerY = 150;
      d3.selectAll('g').remove();
      d3.select('text').remove();
      g = d3.select('svg').append('g');
      g.selectAll('circle')
        .data(slidePoints[zLocation.toFixed(1)])
          .enter()
            .append('circle')
              .attr('cx',
              function(d){
                // console.log(d[0]);
                var retX = (-(d[0])*30 +centerX);
                return retX;})
              .attr('cy',
              function(d){
                var retY = (-(d[1])*30 +centerY);
                return retY;})
              .attr('r', 2)
              .style('fill', function(d){
                    return d[2];});
    }

  }


  self.mapPoints = function(){
    return
  };

  var publiclyAvailable = {

      // load the data and setup the system
      initialize: function(planeObject){
          self.createSliceWindow(planeObject);
      },
      renderMappedPoints: function(slideDegree){
        self.projectPoints(slideDegree);
      }
  };

  return publiclyAvailable;

};
