import type { IconName } from './IconName';

export const importIconSvg = (name: IconName): (() => Promise<string>) =>
	icons[`/node_modules/ionicons/dist/svg/${name}.svg`];

const icons = import.meta.glob('/node_modules/ionicons/dist/svg/*.svg', {
	as: 'raw',
	import: 'default'
});
