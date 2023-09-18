<script lang="ts">
	import { browser } from '$app/environment';
	import { rubberband } from '$lib/utilities/rubberband';
	import { DragGesture } from '@use-gesture/vanilla';
	import type { Action } from 'svelte/action';
	import { spring, type SpringOpts } from 'svelte/motion';

	const DEFAULT_SPRING_OPTIONS: SpringOpts = { stiffness: 0.15, damping: 0.8 };
	const BOUNCY_SPRING_OPTIONS: SpringOpts = { stiffness: 0.3, damping: 1 };
	const TRANSLATE_PX_CLOSED = { x: 0, y: 0 };
	const TRANSLATE_PX_OPEN = { x: 0, y: browser ? -(window.innerHeight - 160) : 0 }; // TODO handle resize
	const translatePx = spring({ x: 0, y: 0 });

	let isOpen = false;

	const toggle = async (bouncy = false) => {
		isOpen = !isOpen;
		Object.assign(translatePx, bouncy ? BOUNCY_SPRING_OPTIONS : DEFAULT_SPRING_OPTIONS);
		await resetTranslatePx();
	};

	const resetTranslatePx = async () => {
		await translatePx.set(isOpen ? TRANSLATE_PX_OPEN : TRANSLATE_PX_CLOSED, { soft: true });
	};

	const dragGestureAction: Action = (element) => {
		const dragGesture = new DragGesture(
			element,
			({ tap, movement: [_mx, my], last, elapsedTime }) => {
				if (tap) {
					toggle();
					return;
				}

				const yDirection = Math.sign(my);
				const desiredYDirection = isOpen ? 1 : -1;
				const yOffset = isOpen ? TRANSLATE_PX_OPEN.y : 0;

				$translatePx = {
					x: 0,
					y: yOffset + (yDirection === desiredYDirection ? my : rubberband(my, 0.3))
				};

				if (last) {
					const velocity = Math.abs(my) / elapsedTime;
					if (velocity > 1 && yDirection === desiredYDirection && Math.abs(my) > 100) {
						toggle(true);
					} else {
						resetTranslatePx();
					}
				}
			}
		);

		return {
			destroy: () => {
				dragGesture.destroy();
			}
		};
	};
</script>

<div class="bounds">
	<button
		type="button"
		class="sheet"
		use:dragGestureAction
		style:transform="translate({$translatePx.x}px, {$translatePx.y}px)"
	/>
</div>

<style>
	.bounds {
		width: 100%;
		height: 100%;
		padding: 0 8px;
		overflow: hidden;
	}

	.sheet {
		touch-action: none;
		width: 100%;
		height: 200%;
		margin-top: calc(100vh - 80px);
		background: linear-gradient(#61a8ff, #243bd1);
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
		position: relative;
		border: none;
	}

	.sheet::after {
		content: '';
		position: absolute;
		top: 10px;
		left: calc(50% - 25px);
		width: 50px;
		height: 5px;
		border-radius: 99px;
		background-color: rgba(255, 255, 255, 0.5);
	}
</style>
