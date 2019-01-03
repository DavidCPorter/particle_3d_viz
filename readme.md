cs 594 @ UIC:  Visual Data Science

Fall 2018


Homework #3: Flow Visualization with Three.js


Out:  Thursday, Sep 27th 2018

Due: Thursday, Oct 11th 11:59pm


1. Overview


By the end of this individual project, you:

will have learned/practiced three.js skills, and learned how to display a 3D model on the web
will have learned how to load and display a 3D point cloud on the web
will have embedded the 3D point cloud within a nice 2D visualization
will have practiced the concepts of linked views, brushing and linking, view manipulation and filtering


Collaboration is not allowed on this project. However, you are encouraged to post questions and answer any questions related to web programming using the Piazza account for the course. Remember to tag the post as “Hw 3”. If you get stuck at any point either in a tutorial or in your solution, by all means post---you have nothing to lose. Correct and helpful answers to questions posted by classmates will get the poster extra credit. Remember that you can always post anonymously, if you so wish.


Tutorial: Three.js is extremely well documented, and there are many examples available under the threejs.org website: http://threejs.org/docs/. If you are not familiar with three.js, start by completing the Creating a Scene tutorial on the same threejs.org website. The three.js terminology abuses slightly the term “mesh” (all geometries are meshes to them).


Next, read through the Matrix Transformations manual page (underneath the first tutorial), to get a sense of how to use geometric transformations; we won’t need quaternions for this assignment. Experiment with scaling and translating the cube you created in the first tutorial example (for your sanity, you might want to use first Line to draw the coordinate system axes; a line segment from 0,0,0 to 1,0,0 for the X axis etc). Also experiment with swapping the order in which you specify transformations. What happens if you first translate, then rotate the cube? What if you rotate first, then translate?


Now that you have a mastery of geometric transformations, check out the manual entries under Geometries (in particular, the BoxGeometry and the CylinderGeometry). Add a cylinder to your scene.


Now, on to the actual assignment.



2. Instructions


For this assignment, we will be working with a computational fluid flow simulation dataset from the San Diego Supercomputing Center. You can learn more about the science behind the simulation here: http://www.uni-kl.de/sciviscontest/


We are providing you with a data set, and example Three.js code for loading up the dataset, and for displaying a point cloud here:


Point cloud example and Starter code (run 14) :

https://drive.google.com/open?id=0B1Ph5VaYmigvWmd4Q0k2eWs1ZVU


And here is the actual data to read in:

https://drive.google.com/open?id=0BzbW07Sw4ubuOWdqVndUcmRHTDA



Here is what you need to do:

Show the data (see the dummy createParticleSystem function in the support code) as a point cloud; get rid of the cylinder outline once you have the data

The points2 value in the data corresponds to the height of the cylinder. Reading in the data you may be inclined to use 0 1 2 -> x y z, but then your z would correspond to the height of the cylinder. Simply mapping points2 and velocity2 to y and points1 and velocity1 to z should restore the dimensions to the standard.



Colormap the point cloud by concentration

Create a second view using D3 and show a vertical 2D slice of the data in it (keep the z value fixed, and that should give you an XY slice)

Allow the user to rotate the cylinder containing the flow

Add a 2D cut-plane filter to the 3D flow (draw a vertical XY rectangle in the 3D view, and let the user move the rectangle through the flow along the Z axis)

Link the 3D view and the 2D view through the rectangle filter (i.e., show in the 2D view only the 3D points inside the rectangle); hint: use the rectangle’s Z current position to select only those cloud points with matching Z

Implement a naive brushing and linking operation (gray out all the 3D points outside the rectangle cut-plane)


Please submit a snapshot of and a link to your solution on the Piazza forum for the class.
