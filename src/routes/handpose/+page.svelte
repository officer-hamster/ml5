<script>
	import P5 from 'p5-svelte';
	import Ml5 from '$lib/components/Ml5.svelte';

	let video;
	let handpose;
	let hands = [];
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
		};
	};

	const mlSketch = (domElement, ml5, modelReady) => {
		handpose = ml5.handpose(video, modelReady);

		// This sets up an event that fills the global variable "predictions"
		// with an array every time new hand poses are detected
		handpose.on('hand', (results) => {
			hands = results;
			if (hands.length > 0) {
				console.log(hands);
			}
		});
	};

	// A function to draw ellipses over the detected keypoints
	function drawKeypoints(p5) {
		for (let i = 0; i < hands.length; i += 1) {
			const hand = hands[i];
			for (let j = 0; j < hand.landmarks.length; j += 1) {
				const keypoint = hand.landmarks[j];
				p5.fill(0, 255, 0);
				p5.noStroke();
				p5.ellipse(keypoint[0], keypoint[1], 10, 10);
			}
		}
	}
</script>

<h1>Handpose Example ported from ML5</h1>
<p>
	This example modifies the code found here: <a href="https://learn.ml5js.org/#/reference/handpose"
		>ML5 Handpose</a
	>
</p>

{#if sketch}
	<P5 {sketch} />
	<Ml5 {mlSketch} domElement={video} />
{/if}
