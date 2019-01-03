"use strict";

var App = App || {};


var PlaneSlice = function(){

  var self = this;
  var plane
  var geometry
  var material


  self.createPlane = function (){

  geometry = new THREE.PlaneGeometry( 10, 10, 32 );
  material = new THREE.MeshBasicMaterial( {color: 0x3f3332, opacity: 0.6, transparent: true, side: THREE.DoubleSide} );
  plane = new THREE.Mesh( geometry, material );
  };

  self.slide = function(val){
    geometry.translate(0,0,val);
    return(geometry)
  };
  // publicly available functions
  var publiclyAvailable = {

      // load the data and setup the system
      initialize: function(){
          self.createPlane();
      },

      getPlaneSlice : function() {
          return plane;
      },

      slider : function(val){
        return self.slide(val);
      }
  };

  return publiclyAvailable;

};
