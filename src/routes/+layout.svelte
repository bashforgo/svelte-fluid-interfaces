<script lang="ts">
	import BestOnMobile from '$lib/components/BestOnMobile/BestOnMobile.svelte';
	import '$lib/global.css';
</script>

<svelte:head>
	<title>Fluid Interfaces</title>
</svelte:head>

<slot />

<BestOnMobile />
