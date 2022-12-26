# ML5-svelte

This project implements an _easy_ way to use ml5js as a component in svelte. The examples use ml5 and p5 together. Variables can be bound to svelte variables, so there are lots of possibilities to interact with UI element and machine learning models. For example using input via webcam or microphone, or using text input to generate new text from external machine learning APIs.

Many thanks to the contributors of the P5 and ML5 community for developing these great tools! You can find the projects here:

- [Ml5](https://ml5js.org/)
- [P5](https://p5js.org/)

## Usage

### Install:

```ps
pnpm i ml5-svelte
```

Add the component to your code.

Now add `p5-svelte` to your project (ex. `src/App.svelte`):

```svelte
<script>
	import P5 from 'p5-svelte';
	import Ml5 from 'ml5-svelte';

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
			video.hide();
		};
		p5.draw = () => {
			p5.image(video, 0, 0, width, height);
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
```

## Additional: How to use the huggingface example?

This is an additional example for usage of APIs from huggingface ml service. This has **nothing** to do with the ml5 usage and is only for the context in which this svelte component library was created: A lecture at the [Univer­sity of Applied Sciences](www.hfg-gmuend.de) [@hfg-gmuend](https://github.com/hfg-gmuend)

Create an account on [huggingface](https://huggingface.co/). Then go into your account settings and set up an API key for your account. Duplicate the `.env.example` file and rename it to `.env` . Paste the API key behind the `VITE_HUGGINGFACE_API_TOKEN` variable in the `.env` file.
