<script lang="ts" context="module">
	import type { Kebab } from '$lib/types/Kebab';
	import squareSvg from 'ionicons/dist/svg/square-sharp.svg?raw';

	const icons = import.meta.glob('/node_modules/ionicons/dist/svg/*.svg', {
		as: 'raw',
		import: 'default'
	});
</script>

<script lang="ts">
	export let name: Kebab<keyof typeof import('ionicons/icons')>;

	$: importSvg = icons[`/node_modules/ionicons/dist/svg/${name}.svg`];
</script>

<div class="icon">
	{#await importSvg?.() ?? Promise.reject() then svg}
		{@html svg}
	{:catch}
		{@html squareSvg}
	{/await}
</div>

<style>
	.icon {
		fill: currentColor;
		stroke: currentColor;
	}
</style>
