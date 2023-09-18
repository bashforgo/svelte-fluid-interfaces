<script>
	import Link from './Link.svelte';
</script>

<h1>&nbsp; Fluid Interfaces</h1>

<ul>
	<li>
		<Link href="1CalculatorButton" iconName="calculator-outline" --color="#a76dec">
			Calculator button
		</Link>
	</li>
	<li>
		<Link href="2SpringAnimations" iconName="options-outline" --color="#64ccf7">
			Spring animations
		</Link>
	</li>
	<li>
		<Link href="3FlashlightButton" iconName="flashlight-outline" --color="#ffafcc">
			Flashlight button
		</Link>
	</li>
	<li>
		<Link href="4Rubberbanding" iconName="scan-outline" --color="#ff5b50">Rubberbanding</Link>
	</li>
	<li>
		<Link href="5AccelerationPausing" iconName="pause-outline" --color="#51ffea">
			Acceleration pausing
		</Link>
	</li>
	<li>
		<Link href="6RewardingMomentum" iconName="speedometer-outline" --color="#61a8ff">
			Rewarding momentum
		</Link>
	</li>
	<li>
		<Link href="7FaceTimePiP" iconName="id-card-outline" --color="#f2f23a">FaceTime PiP</Link>
	</li>
	<li>
		<Link href="8Rotation" iconName="refresh-outline" --color="#ff28a5">Rotation</Link>
	</li>
</ul>

<style>
	h1 {
		background: linear-gradient(40deg, #ea98da 20%, #5b6cf9);
		background-clip: text;
		color: transparent;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		padding: 0;
		gap: 1px;
		margin: 0;
	}
</style>
