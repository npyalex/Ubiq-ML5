// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let leftPizzaX;
let leftPizzaY;
let rightPizzaX;
let rightPizzaY;
let pizzaDiameter;

function setup() {
  createCanvas(640, 480);
//  let crust = color(255, 204, 0);
  // let cheese = color(255, 255, 153);
  // let pepperoni = color(102, 0, 0);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);
  ellipseMode(CENTER);
 //background(255);
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  //drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  //console.log(poses);
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      //console.log(keypoint);
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {


        if(keypoint.part=="leftWrist")
        {
        leftPizzaX = keypoint.position.x;
        leftPizzaY = keypoint.position.y;
        }
        if(keypoint.part=="rightWrist")
        {
        rightPizzaX = keypoint.position.x;
        rightPizzaY = keypoint.position.y;
        }
        noStroke();

        pizzaDiameter = dist(leftPizzaX,leftPizzaY,rightPizzaX,rightPizzaY);
        pizza((leftPizzaX+rightPizzaX)/2,(leftPizzaY+rightPizzaY)/2,pizzaDiameter);
      }
    }
  }
}

function pizza(x,y,diameter){
  fill(255,204,0);
  ellipse(x,y,diameter);
  fill(255,255,153);
  ellipse(x,y,diameter*0.8);
  fill(102,0,0);
  ellipse(x,y,diameter*0.2);
}
