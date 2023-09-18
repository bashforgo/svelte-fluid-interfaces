<script lang="ts">
	import { getDistance } from '$lib/utilities/getDistance';
	import { getDistanceToStop } from '$lib/utilities/getDistanceToStop';
	import { DragGesture } from '@use-gesture/vanilla';
	import { map, piped, sortBy } from 'rambdax';
	import type { Action } from 'svelte/action';
	import { spring } from 'svelte/motion';

	const translatePx = spring({ x: 0, y: 0 });

	let pip: HTMLElement;
	let topLeft: HTMLElement;
	let topRight: HTMLElement;
	let bottomRight: HTMLElement;
	let bottomLeft: HTMLElement;
	$: endpoints = [topLeft, topRight, bottomRight, bottomLeft];

	const dragGestureAction: Action = (element) => {
		const dragGesture = new DragGesture(
			element,
			({ offset: [ox, oy], movement: [mx, my], last, elapsedTime }) => {
				translatePx.set({ x: ox, y: oy });

				if (last) {
					const vx = mx / elapsedTime;
					const vy = my / elapsedTime;

					const { x, y } = pip.getBoundingClientRect();
					const projectedX = x + getDistanceToStop(vx);
					const projectedY = y + getDistanceToStop(vy);

					const endpointsByDistance = piped(
						endpoints,
						map((endpoint) => {
							const rect = endpoint.getBoundingClientRect();
							return {
								rect,
								endpoint,
								distance: getDistance(rect.x, rect.y, projectedX, projectedY)
							};
						}),
						sortBy((e) => e.distance)
					);
					const [closestEndpoint] = endpointsByDistance;

					translatePx.set(
						{
							x: closestEndpoint.rect.x - pip.offsetLeft,
							y: closestEndpoint.rect.y - pip.offsetTop
						},
						{ soft: true }
					);
				}
			},
			{ from: () => [$translatePx.x, $translatePx.y] }
		);

		return {
			destroy: () => {
				dragGesture.destroy();
			}
		};
	};
</script>

<div class="bounds">
	<div bind:this={topLeft} class="endpoint top left" />
	<div bind:this={topRight} class="endpoint top right" />
	<div bind:this={bottomRight} class="endpoint bottom right" />
	<div bind:this={bottomLeft} class="endpoint bottom left" />

	<button
		bind:this={pip}
		type="button"
		class="pip"
		use:dragGestureAction
		style:transform="translate({$translatePx.x}px, {$translatePx.y}px)"
	/>
</div>

<style>
	.bounds {
		--spacing: 16px;

		width: 100%;
		height: 100%;
		padding: var(--spacing);
		position: relative;
		overflow: hidden;
	}

	.pip {
		touch-action: none;
		background: linear-gradient(#f2f23a, #f7a51c);
		border: none;
	}

	.pip,
	.endpoint {
		width: 20vw;
		aspect-ratio: 9 / 16;
		border-radius: 16px;
	}

	.endpoint {
		position: absolute;
		border: 1px solid #4c4c4c;
	}

	.endpoint.top {
		top: var(--spacing);
	}

	.endpoint.right {
		right: var(--spacing);
	}

	.endpoint.bottom {
		bottom: var(--spacing);
	}

	.endpoint.left {
		left: var(--spacing);
	}
</style>
