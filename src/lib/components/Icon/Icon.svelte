<script lang="ts">
	import { page } from '$app/stores';
	import type { IconName } from './IconName';
	import { importIconSvg } from './importIconSvg';
	import { getPageDataIconKey } from './loadIcon';

	export let name: IconName;

	const getSvg = () => {
		const loaded = $page.data[getPageDataIconKey(name)];
		return loaded ? loaded : importIconSvg(name)();
	};
</script>

<div class="icon">
	{#await getSvg()}
		<svg viewBox="0 0 1 1" />
	{:then svg}
		{@html svg}
	{:catch}
		<svg viewBox="0 0 1 1" />
	{/await}
</div>

<style>
	.icon {
		fill: currentColor;
		stroke: currentColor;
		line-height: 0;
	}
</style>
