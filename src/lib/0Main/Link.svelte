<script lang="ts">
	import Icon from '$lib/components/Icon/Icon.svelte';
	import type { ComponentProps } from 'svelte';

	export let iconName: ComponentProps<Icon>['name'];
	export let href: string;
</script>

<a class="link" {href}>
	<Icon name={iconName} />
	<slot />
</a>

<style>
	.link {
		display: inline-grid;
		grid-template-columns: 1.5em 1fr max-content;
		padding: 2ch;
		width: 100%;
		text-decoration: none;
		font-size: large;
		color: inherit;
		background-color: #222;
		gap: 2ch;
		align-items: center;
		transition: color 0.1s ease-in-out;
	}

	.link::after {
		content: '⟩';
	}

	.link:is(:focus, :hover, :active) {
		color: var(--color, inherit);
		outline: none;
	}
</style>
