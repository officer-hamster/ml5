<script>
	async function query(data) {
		const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
			headers: { Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_TOKEN}` },
			method: 'POST',
			body: JSON.stringify(data)
		});
		const result = await response.json();
		return result;
	}

	let input = 'Hey how is your day?';
	let output = [];
	output = query({ inputs: input }).then((response) => {
		const output = response.map((x) => {
			return x.generated_text.replace(input, '');
		});
		return output;
	});

	const handleClick = () => {
		output = query({ inputs: input }).then((response) => {
			output = response.map((x) => {
				return x.generated_text.replace(input, '');
			});
			return output;
		});
	};
</script>

<h1>Huggingface API Example Code</h1>
<p>
	This example uses the GPT-2 Inference API. More about it here: <a
		href="https://huggingface.co/gpt2">Huggingface GPT-2</a
	>
</p>
<div class="input">
	<p>
		Query: <input bind:value={input} />
	</p>
	<button on:click={handleClick}>Send API Request</button>
</div>
<p>
	ML created output:
	{#await output}
		<!-- output is pending -->
		API still loading.
	{:then output}
		<!-- output was fulfilled -->

		{input}
		{#each output as el}
			{el}
		{/each}
	{:catch error}
		<!-- output was rejected -->
		{'Something went wrong :('}
	{/await}
</p>

<style>
	.input {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	button {
		width: fit-content;
		height: fit-content;
	}
</style>
