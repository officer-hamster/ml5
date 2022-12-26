<script>
	import { getStores, navigating, page, updated } from '$app/stores';
	const pages = [
		'/',
		'/facemesh',
		'/handpose',
		'/imageclassifier',
		'/objectdetector',
		'/posenet',
		'/teachable-machine',
		'/withoutp5',
		'/huggingface'
	];

	console.log();

	const capitalize = (word) => {
		if (word.length === 0) {
			return '';
		} else {
			return word[0].toUpperCase() + word.slice(1);
		}
	};

	const navigation = pages.map((page) => {
		const name = capitalize(page.replace(/\//gm, ''));

		return { name: name, link: page };
	});

	$: isActive = (link) => {
		return $page.url.pathname === link ? true : false;
	};
</script>

<nav>
	<ul>
		{#each navigation as element}
			<li>
				{#if element.link === '/'}
					<a class:active={isActive(element.link)} href={element.link}>🤖</a>
				{:else}
					<a class:active={isActive(element.link)} href={element.link}>{element.name}</a>
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<main>
	<slot><!-- optional fallback --></slot>
</main>

<style type="postcss">
	nav ul {
		display: flex;
		gap: 16px;
		list-style: none;
		padding: 0;
		flex-wrap: wrap;
		align-items: center;
	}

	a {
		text-decoration: none;
		color: black;
	}

	.active {
		border-bottom: 1px solid black;
	}
	:global(body) {
		max-width: 80%;
		margin-left: auto;
		margin-right: auto;
		font-family: sans-serif;
	}

	@media (max-width: 560px) {
		:global(body) {
			max-width: 100%;
			padding: 0 20px;
		}
	}
</style>
