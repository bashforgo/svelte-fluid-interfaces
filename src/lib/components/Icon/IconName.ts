import type { Kebab } from '$lib/types/Kebab';

export type IconName = Kebab<keyof typeof import('ionicons/icons')>;
