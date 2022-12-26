<script>
	import P5 from 'p5-svelte';
	import Ml5 from '$lib/components/Ml5.svelte';
	let classifier;
	let video;
	let results = [];

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
		};
	};

	/**
	 * Load the image classification model or a custom one:
	 * https://learn.ml5js.org/#/reference/image-classifier?id=parameters
	 * @param domElement
	 * @param ml5
	 * @param modelReady
	 */
	const mlSketch = (domElement, ml5, modelReady) => {
		// Here you could load another image classification model
		// OR you could load your custom model from teachable machine
		classifier = ml5.imageClassifier(
			'/custom-model-hand-thumb-peace/model.json',
			video,
			modelReady
		);
	};

	const mlReady = () => {
		classifyVideo();
	};
	const classifyVideo = () => {
		classifier.classify(gotResult);
	};

	const gotResult = (err, res) => {
		if (err) {
			console.error(err);
		} else if (res) {
			results = res;
			// console.log(results);
			classifyVideo();
		}
	};
</script>

<h1>Image Classifier Example ported from ML5</h1>
<p>
	This example modifies the code found here: <a
		href="https://learn.ml5js.org/#/reference/image-classifier">ML5 Image Classifier</a
	>
</p>

{#if sketch}
	<P5 {sketch} />
	<Ml5 {mlSketch} domElement={video} {mlReady} />
	{#each results as result}
		<p>{result.label}: confidence: {result.confidence}</p>
	{/each}
{/if}
