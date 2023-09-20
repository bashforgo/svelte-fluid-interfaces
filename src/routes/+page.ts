import { loadIcon } from '$lib/components/Icon/loadIcon';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		...loadIcon('calculator-outline'),
		...loadIcon('options-outline'),
		...loadIcon('flashlight-outline'),
		...loadIcon('scan-outline'),
		...loadIcon('pause-outline'),
		...loadIcon('speedometer-outline'),
		...loadIcon('id-card-outline'),
		...loadIcon('refresh-outline')
	};
};
