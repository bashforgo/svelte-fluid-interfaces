<script lang="ts">
	import { getDistanceToStop } from '$lib/utilities/getDistanceToStop';
	import { PinchGesture, WheelGesture, type Handler } from '@use-gesture/vanilla';
	import type { Action } from 'svelte/action';
	import { spring } from 'svelte/motion';

	let offsetDeg = 0;
	const rotateDeg = spring(0);

	const snap = (deg: number) => {
		rotateDeg.set(deg, { soft: true });
		offsetDeg = deg;
	};

	const gesturesAction: Action = (element) => {
		const handleGesture: (
			mapToDeg: (e: Parameters<Handler<'wheel' | 'pinch'>>[0]) => number
		) => Handler<'wheel' | 'pinch'> = (mapToDeg) => (event) => {
			const { last, elapsedTime } = event;

			const deg = mapToDeg(event);
			rotateDeg.set(offsetDeg + deg);

			if (last) {
				const velocity = deg / elapsedTime;
				const projectedDeg = deg + getDistanceToStop(velocity);

				const nearestRightDeg = Math.round(projectedDeg / 90) * 90;
				snap(offsetDeg + nearestRightDeg);
			}
		};

		const pinchGesture = new PinchGesture(
			element,
			handleGesture(({ movement: [_d, a] }) => a),
			{ pinchOnWheel: false }
		);

		const wheelGesture = new WheelGesture(
			element,
			handleGesture(({ movement: [_mx, my] }) => my / 50)
		);

		return {
			destroy: () => {
				pinchGesture.destroy();
				wheelGesture.destroy();
			}
		};
	};
</script>

<button type="button" class="box" use:gesturesAction style:transform="rotate({$rotateDeg}deg)" />

<style>
	.box {
		touch-action: none;
		background: linear-gradient(#ff28a5, #7934cf);
		border: none;
		width: 50vmin;
		height: 50vmin;
		border-radius: 20%;
	}
</style>
