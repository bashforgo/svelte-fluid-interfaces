<script lang="ts">
	import { rubberband } from '$lib/utilities/rubberband';
	import { DragGesture } from '@use-gesture/vanilla';
	import type { Action } from 'svelte/action';
	import { spring } from 'svelte/motion';

	const translatePx = spring({ x: 0, y: 0 });

	const dragGestureAction: Action = (element) => {
		const dragGesture = new DragGesture(element, ({ last, movement: [mx, my] }) => {
			$translatePx = last ? { x: 0, y: 0 } : { x: rubberband(mx, 0.4), y: rubberband(my, 0.8) };
		});

		return {
			destroy: () => {
				dragGesture.destroy();
			}
		};
	};
</script>

<div
	class="box"
	use:dragGestureAction
	style:transform="translate({$translatePx.x}px, {$translatePx.y}px)"
/>

<style>
	.box {
		width: 160px;
		height: 160px;
		background: linear-gradient(#ff5b50, #ffc950);
		border-radius: 20%;
		touch-action: none;
	}
</style>
