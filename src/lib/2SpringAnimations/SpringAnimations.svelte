<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	let box: HTMLElement;

	const translateX = spring(0);

	const abortController = new AbortController();

	const runAnimation = async () => {
		if (abortController.signal.aborted) return;

		const { width: boxWidth } = box.getBoundingClientRect();
		const { width: boundsWidth } = box.parentElement?.getBoundingClientRect()!;

		await translateX.set(0, { hard: true });
		await translateX.set(boundsWidth - boxWidth);
		await runAnimation();
	};

	onMount(() => {
		runAnimation();
	});

	onDestroy(() => {
		abortController.abort();
	});
</script>

<div class="bounds">
	<div class="box" style:transform="translateX({$translateX}px)" bind:this={box} />
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
