<script>
	import P5 from 'p5-svelte';
	import Ml5 from '$lib/components/Ml5.svelte';

	let facemesh;
	let video;
	let predictions = [];
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
		facemesh = ml5.facemesh(video, modelReady);

		// This sets up an event that fills the global variable "predictions"
		// with an array every time new predictions are made
		facemesh.on('face', (results) => {
			predictions = results;
		});
	};

	// A function to draw ellipses over the detected keypoints
	function drawKeypoints(p5) {
		for (let i = 0; i < predictions.length; i += 1) {
			const keypoints = predictions[i].scaledMesh;

			// Draw facial keypoints.
			for (let j = 0; j < keypoints.length; j += 1) {
				const [x, y] = keypoints[j];

				p5.fill(0, 255, 0);
				p5.ellipse(x, y, 5, 5);
			}
		}
	}
</script>

<h1>Facemesh Example ported from ML5</h1>
<p>
	This example modifies the code found here: <a href="https://learn.ml5js.org/#/reference/facemesh"
		>ML5 Facemesh</a
	>
</p>

{#if sketch}
	<P5 {sketch} />
	<Ml5 {mlSketch} domElement={video} />
{/if}
