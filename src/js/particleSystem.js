"use strict";

/* Get or create the application global variable */


var App = App || {};

var slidePoints = {};


var ParticleSystem = function() {
    var particleData = [];

    // setup the pointer to the scope 'this' variable
    var self = this;

    // data container
    var color = d3.scaleLinear().domain([0, 30]).range(["#5b0601", "#f21307"]);


    // scene graph group for the particle system
    var sceneObject = new THREE.Group();

    // bounds of the data
    var bounds = {};

    // creates the particle system
    self.createParticleSystem = function() {
      var particles = new THREE.Geometry(),
          pMaterial = new THREE.PointsMaterial({
            vertexColors: THREE.VertexColors,
            size: .05,
            map: new THREE.TextureLoader().load('circle.png'),
            transparent: true,
            blending: THREE.NormalBlending,
            depthWrite: false,
          });

      var pointColor;
      var hexColor;

      for (var i = 1; i < particleData.length; i++) {


        hexColor = color(+particleData[i]['concentration'])
        pointColor = new THREE.Color(color(+particleData[i]['concentration']));
        // console.log(hexColor);

        var particle = new THREE.Vector3(particleData[i]['X'],(particleData[i]['Y']-5),(particleData[i]['Z']));
        particles.vertices.push(particle);
        particles.colors.push(pointColor);
        if(slidePoints[(particle.z).toFixed(1)] == null){
          slidePoints[(particle.z).toFixed(1)] = [];
        }
        else{
          slidePoints[(particle.z).toFixed(1)].push([particle.x, particle.y, hexColor]);
        }


      }

      var particleSys = new THREE.ParticleSystem(
        particles,
        pMaterial);

      sceneObject.add(particleSys);
    };

    // data loading function
    self.loadData = function(file){

        // read the csv file
        d3.csv(file)
        // iterate over the rows of the csv file
            .row(function(d) {
                // get the min bounds
                bounds.minX = Math.min(bounds.minX || Infinity, d.Points0);
                bounds.minY = Math.min(bounds.minY || Infinity, d.Points1);
                bounds.minZ = Math.min(bounds.minZ || Infinity, d.Points2);

                // get the max bounds
                bounds.maxX = Math.max(bounds.maxX || -Infinity, d.Points0);
                bounds.maxY = Math.max(bounds.maxY || -Infinity, d.Points1);
                bounds.maxZ = Math.max(bounds.maxY || -Infinity, d.Points2);

                // add the element to the data collection
                particleData.push({
                    // concentration density
                    concentration: Number(d.concentration),
                    // Position
                    X: Number(d.Points0),
                    Y: Number(d.Points2),
                    Z: Number(d.Points1),
                });
            })
            // when done loading
            .get(function() {
                // draw the containment cylinder
                // TODO: Remove after the data has been rendered

                // create the particle system
                self.createParticleSystem();

            });
    };



    // publicly available functions
    var publiclyAvailable = {

        // load the data and setup the system
        initialize: function(file){
            self.loadData(file);
        },

        // accessor for the particle system
        getParticleSystems : function() {
            return sceneObject;
        }
    };
    return publiclyAvailable;
};
