<script>
	import P5 from 'p5-svelte';
	import Ml5 from '$lib/components/Ml5.svelte';

	let video;
	let detector;
	let detections = [];
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

			for (let i = 0; i < detections.length; i += 1) {
				const object = detections[i];
				p5.stroke(0, 255, 0);
				p5.strokeWeight(4);
				p5.noFill();
				p5.rect(object.x, object.y, object.width, object.height);
				p5.noStroke();
				p5.fill(255);
				p5.textSize(24);
				p5.text(object.label, object.x + 10, object.y + 24);
			}
		};
	};

	const mlSketch = (domElement, ml5, modelReady) => {
		// Models available are 'cocossd', 'yolo'
		detector = ml5.objectDetector('cocossd', modelReady);
	};

	function gotDetections(error, results) {
		if (error) {
			console.error(error);
		}
		detections = results;
		detector.detect(video, gotDetections);
	}

	function modelReady() {
		detector.detect(video, gotDetections);
	}
</script>

<h1>Object Detector Example ported from ML5</h1>
<p>
	This example modifies the code found here: <a
		href="https://learn.ml5js.org/#/reference/object-detector">ML5 Object Detector</a
	>
</p>

{#if sketch}
	<P5 {sketch} />
	<Ml5 {mlSketch} domElement={video} mlReady={modelReady} />
{/if}
