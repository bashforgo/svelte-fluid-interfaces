<script lang="ts">
	import Icon from '$lib/components/Icon/Icon.svelte';
	import { spring } from 'svelte/motion';

	const ON_BACKGROUND_COLOR = '#F2F2F2';
	const OFF_BACKGROUND_COLOR = '#333333';
	const ON_COLOR = '#000000';
	const OFF_COLOR = '#FFFFFF';

	let isOn = false;

	const scale = spring(1, { precision: 0.01 });

	let button: HTMLElement;

	const handleStart = () => {
		Object.assign(scale, { stiffness: 0.075, damping: 0.6 });
		scale.set(1.5).then(() => {
			isOn = !isOn;
			handleEnd();
		});
	};

	const handleEnd = () => {
		Object.assign(scale, { stiffness: 0.1, damping: 0.2 });
		scale.set(1);
	};
</script>

<button
	bind:this={button}
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
