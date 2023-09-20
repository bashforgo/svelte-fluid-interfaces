declare module '*.md' {
	import type { ComponentType, SvelteComponent } from 'svelte';

	const Component: ComponentType<SvelteComponent>;
	export default Component;
}
