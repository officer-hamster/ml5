<script>
	import { onMount } from 'svelte';

	export let domElement = null;
	export let mlSketch = null;
	export let mlReady = null;

	const modelReady = () => {
		console.log('Model ready!');
	};

	onMount(async () => {
		const library = await import('ml5');
		const ml5 = library.default;
		if (mlReady === (undefined || null)) {
			mlReady = modelReady;
		}

		console.log('ml5 version:', ml5.version);
		if (mlSketch !== (undefined || null)) {
			mlSketch(domElement, ml5, mlReady);
		}
	});
</script>
