"use strict";

/* Get or create the application global variable */
var App = App || {};

/* IIFE to initialize the main entry of the application*/
(function() {

    // setup the pointer to the scope 'this' variable
    var self = this;
    // window.onwheel = function(){ return false; }

    /* Entry point of the application */
    App.start = function()
    {
        // create a new scene
        App.scene = new Scene({container:"scene"});

        // initialize the particle system
        var particleSystem = new ParticleSystem();
        particleSystem.initialize('073.csv');
        var planeSlice = new PlaneSlice();
        planeSlice.initialize();
        var planeObject = planeSlice.getPlaneSlice();

        var sliceView = new SliceView();
        sliceView.initialize(planeObject)
        sliceView.renderMappedPoints();

        //add the particle system to the scene
        App.scene.addObject( particleSystem.getParticleSystems());
        App.scene.addObject( planeObject);

        // render the scene
        App.scene.render();
        //add slide tooling
        var slideDegree = .1;
        document.getElementById("scene").addEventListener('wheel',function(e){
    			e.preventDefault();
          var geo;
    			if(e.deltaY < 0){
    				geo = planeSlice.slider(slideDegree);
            // console.log(geo.vertices);
            sliceView.renderMappedPoints(slideDegree);
    			}
    			else{
    				geo = planeSlice.slider(-slideDegree);
            // console.log(geo.vertices);
            sliceView.renderMappedPoints(-slideDegree);

    			}
    		});
    };
  }) ();







/*

Here is what you need to do:

Show the data (see the dummy createParticleSystem function in the support code) as a point cloud; get rid of the cylinder outline once you have the data

  The points2 value in the data corresponds to the height of the cylinder. Reading in the data you may be inclined to use 0 1 2 -> x y z, but then your z would correspond to the height of the cylinder. Simply mapping points2 and velocity2 to y and points1 and velocity1 to z should restore the dimensions to the standard.

Colormap the point cloud by concentration

Create a second view using D3 and show a vertical 2D slice of the data in it (keep the z value fixed, and that should give you an XY slice)

Allow the user to rotate the cylinder containing the flow

Add a 2D cut-plane filter to the 3D flow (draw a vertical XY rectangle in the 3D view, and let the user move the rectangle through the flow along the Z axis)

Link the 3D view and the 2D view through the rectangle filter (i.e., show in the 2D view only the 3D points inside the rectangle); hint: use the rectangle’s Z current position to select only those cloud points with matching Z

Implement a naive brushing and linking operation (gray out all the 3D points outside the rectangle cut-plane)

*/
