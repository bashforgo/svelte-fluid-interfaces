<script lang="ts">
	const DEFAULT_COLOR = '#333333';
	const HIGHLIGHT_COLOR = '#737373';

	let button: HTMLButtonElement;
	let animation: Animation;

	const handleStart = () => {
		animation?.cancel();
		button.style.background = HIGHLIGHT_COLOR;
	};

	const handleEnd = () => {
		animation = button.animate([{ background: DEFAULT_COLOR }], {
			duration: 500,
			easing: 'ease-out',
			fill: 'forwards'
		});

		animation.addEventListener(
			'finish',
			() => {
				animation.commitStyles();
				animation.cancel();
			},
			{ once: true }
		);
	};
</script>

<button
	bind:this={button}
	class="button"
	type="button"
	on:mousedown={() => handleStart()}
	on:touchstart={() => handleStart()}
	on:mouseup={() => handleEnd()}
	on:touchend={() => handleEnd()}
	on:touchcancel={() => handleEnd()}
>
	9
</button>

<style>
	.button {
		padding: 0;
		border-radius: 999px;
		width: 75px;
		height: 75px;
		font-size: 36px;
		border: none;
		color: white;
		background: #333333;
	}
</style>
