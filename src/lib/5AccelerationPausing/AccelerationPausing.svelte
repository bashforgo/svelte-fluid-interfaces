<script lang="ts">
	import { rubberband } from '$lib/utilities/rubberband';
	import { DragGesture } from '@use-gesture/vanilla';
	import { mean } from 'rambdax';
	import type { Action } from 'svelte/action';
	import { spring } from 'svelte/motion';

	const yVelocities: number[] = [];

	let isPaused = false;
	const translatePx = spring({ x: 0, y: 0 });

	const dragGestureAction: Action = (element) => {
		const dragGesture = new DragGesture(
			element,
			({ first, velocity: [_vx, vy], last, movement: [mx, my] }) => {
				if (first) yVelocities.splice(0, yVelocities.length);
				yVelocities.push(vy);
				if (yVelocities.length > 10) yVelocities.shift();

				const firstHalfVelocities = mean(yVelocities.slice(0, yVelocities.length / 2));
				const secondHalfVelocities = mean(yVelocities.slice(yVelocities.length / 2));
				const ratio = secondHalfVelocities / firstHalfVelocities;

				if (ratio < 0.1 && vy > 0.1) isPaused = true;

				if (last) {
					$translatePx = { x: 0, y: 0 };
					isPaused = false;
					return;
				}

				$translatePx = { x: rubberband(mx, 0.6), y: my > 0 ? rubberband(my) : my };
			}
		);

		return {
			destroy: () => {
				dragGesture.destroy();
			}
		};
	};
</script>

<div class="bounds" class:isPaused>
	<div
		class="box"
		use:dragGestureAction
		style:transform="translate({$translatePx.x}px, {$translatePx.y}px)"
	/>
</div>

<style>
	.bounds {
		width: 100%;
		height: 100%;
		padding-bottom: 80px;
		display: flex;
		justify-content: center;
		align-items: end;
		position: relative;
	}

	.bounds.isPaused::after {
		content: 'Paused';
		position: absolute;
		align-self: flex-start;
		padding-top: 80px;
		text-transform: uppercase;
		font-weight: bold;
	}

	.box {
		width: 160px;
		height: 160px;
		background: linear-gradient(#64ff8f, #51ffea);
		border-radius: 20%;
		touch-action: none;
	}
</style>
