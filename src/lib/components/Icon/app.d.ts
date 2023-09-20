import type { PageDataIcon } from './loadIcon';

declare global {
	namespace App {
		interface PageData extends PageDataIcon {}
	}
}
