import { loadIcon } from '$lib/components/Icon/loadIcon';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		...loadIcon('flashlight')
	};
};
