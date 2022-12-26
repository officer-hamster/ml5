<script>
	import P5 from 'p5-svelte';
	import Ml5 from '$lib/components/Ml5.svelte';

	let video;
	let poseNet;
	let poses = [];
	let width = 640;
	let height = 480;

	let sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(width, height);
			video = p5.createCapture(p5.VIDEO);
			video.size(width, height);

			// Hide the video element, and just show the canvas
			video.hide();
		};

		p5.draw = () => {
			p5.image(video, 0, 0, width, height);

			// We can call both functions to draw all keypoints and the skeletons
			drawKeypoints(p5);
			drawSkeleton(p5);
		};
	};

	const mlSketch = (domElement, ml5, modelReady) => {
		poseNet = ml5.poseNet(video, modelReady);
		// This sets up an event that fills the global variable "poses"
		// with an array every time new poses are detected
		poseNet.on('pose', function (results) {
			poses = results;
		});
	};

	// A function to draw ellipses over the detected keypoints
	// A function to draw ellipses over the detected keypoints
	function drawKeypoints(p5) {
		// Loop through all the poses detected
		for (let i = 0; i < poses.length; i += 1) {
			// For each pose detected, loop through all the keypoints
			const pose = poses[i].pose;
			for (let j = 0; j < pose.keypoints.length; j += 1) {
				// A keypoint is an object describing a body part (like rightArm or leftShoulder)
				const keypoint = pose.keypoints[j];
				// Only draw an ellipse is the pose probability is bigger than 0.2
				if (keypoint.score > 0.2) {
					p5.fill(255, 0, 0);
					p5.noStroke();
					p5.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
				}
			}
		}
	}

	// A function to draw the skeletons
	function drawSkeleton(p5) {
		// Loop through all the skeletons detected
		for (let i = 0; i < poses.length; i += 1) {
			const skeleton = poses[i].skeleton;
			// For every skeleton, loop through all body connections
			for (let j = 0; j < skeleton.length; j += 1) {
				const partA = skeleton[j][0];
				const partB = skeleton[j][1];
				p5.stroke(255, 0, 0);
				p5.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
			}
		}
	}
</script>

<h1>Posenet Example ported from ML5</h1>
<p>
	This example modifies the code found here: <a href="https://learn.ml5js.org/#/reference/posenet"
		>ML5 Posenet</a
	>
</p>

{#if sketch}
	<P5 {sketch} />
	<Ml5 {mlSketch} domElement={video} />
{/if}
