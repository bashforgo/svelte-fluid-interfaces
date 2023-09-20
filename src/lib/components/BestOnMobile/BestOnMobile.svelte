<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let isVisible = false;

	const show = () => {
		isVisible = true;
		setTimeout(() => {
			isVisible = false;
		}, 3000);
	};

	onMount(() => {
		const { matches } = window.matchMedia('(hover: none) and (max-width: 800px)');
		if (!matches) show();
	});
</script>

{#if isVisible}
	<footer transition:fly={{ y: 100 }}>📱 This page is best viewed on a mobile device.</footer>
{/if}

<style>
	footer {
		position: fixed;
		bottom: 16px;
		left: 50%;
		transform: translateX(-50%);
		background: #222;
		padding: 16px;
		border-radius: 16px;
	}
</style>
