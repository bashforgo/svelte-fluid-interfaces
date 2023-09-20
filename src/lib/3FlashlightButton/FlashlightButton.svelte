<script lang="ts">
	import Icon from '$lib/components/Icon/Icon.svelte';
	import { spring } from 'svelte/motion';

	const ON_BACKGROUND_COLOR = '#f2f2f2';
	const OFF_BACKGROUND_COLOR = '#333333';
	
	const ON_COLOR = '#000000';
	const OFF_COLOR = '#ffffff';

	let isOn = false;

	const scale = spring(1, { precision: 0.01 });

	const grow = async () => {
		Object.assign(scale, { stiffness: 0.075, damping: 0.6 });
		await scale.set(1.5);
	};

	const shrink = async () => {
		Object.assign(scale, { stiffness: 0.1, damping: 0.2 });
		await scale.set(1);
	};

	const handleStart = () => {
		grow().then(() => {
			isOn = !isOn;
			shrink();
		});
	};

	const handleEnd = () => {
		shrink();
	};
</script>

<button
	class="button"
	style:background-color={isOn ? ON_BACKGROUND_COLOR : OFF_BACKGROUND_COLOR}
	style:color={isOn ? ON_COLOR : OFF_COLOR}
	style:transform="scale({$scale})"
	on:mousedown|preventDefault={() => handleStart()}
	on:touchstart|preventDefault={() => handleStart()}
	on:mouseup|preventDefault={() => handleEnd()}
	on:touchend|preventDefault={() => handleEnd()}
	on:touchcancel|preventDefault={() => handleEnd()}
>
	<Icon name="flashlight" />
</button>

<style>
	.button {
		width: 75px;
		height: 75px;
		border-radius: 999px;
		border: none;
	}

	.button :global(> *) {
		transform: rotate(-45deg) scale(0.666);
	}
</style>
