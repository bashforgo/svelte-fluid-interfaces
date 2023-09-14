<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	let boundsClientWidth = 0;
	let boxClientWidth = 0;

	const translateX = spring(0);

	const runAnimation = async () => {
		await translateX.set(0, { hard: true });
		await translateX.set(boundsClientWidth - boxClientWidth);
		await runAnimation();
	};

	onMount(() => {
		runAnimation();
	});
</script>

<div class="bounds" bind:clientWidth={boundsClientWidth}>
	<div
		class="box"
		style:transform="translateX({$translateX}px)"
		bind:clientWidth={boxClientWidth}
	/>
</div>

<div class="controls">
	<div class="controlRow">
		<div class="controlHeader">
			<span>Damping</span>
			<span>{translateX.damping}</span>
		</div>
		<input
			type="range"
			bind:value={translateX.damping}
			min="0.01"
			max="1"
			step="0.01"
			on:change={() => runAnimation()}
		/>
	</div>

	<div class="controlRow">
		<div class="controlHeader">
			<span>Stiffness</span>
			<span>{translateX.stiffness}</span>
		</div>
		<input
			type="range"
			bind:value={translateX.stiffness}
			min="0.01"
			max="1"
			step="0.01"
			on:change={() => runAnimation()}
		/>
	</div>
</div>

<style>
	.bounds {
		width: 80vw;
	}

	.box {
		background: linear-gradient(#64ccf7, #359eec);
		border-radius: 20%;
		width: 80px;
		height: 80px;
	}

	.controls {
		display: flex;
		flex-flow: column;
		gap: 4rem;
	}

	.controlRow {
		display: flex;
		flex-flow: column;
		width: 80vw;
		gap: 1rem;
	}

	.controlHeader {
		display: flex;
		justify-content: space-between;
		text-transform: uppercase;
	}
</style>
