import type { IconName } from './IconName';
import { importIconSvg } from './importIconSvg';

export type PageDataIconKey<TIconName extends IconName> = `_icon$${TIconName}`;
export const getPageDataIconKey = <TIconName extends IconName>(
	name: TIconName
): PageDataIconKey<TIconName> => `_icon$${name}`;

export type PageDataIcon = {
	[k in PageDataIconKey<IconName>]?: string;
};

export type LoadIcon<TIconName extends IconName> = Record<
	PageDataIconKey<TIconName>,
	Promise<string>
>;
export const loadIcon = <TIconName extends IconName>(name: TIconName): LoadIcon<TIconName> =>
	({ [getPageDataIconKey(name)]: importIconSvg(name)() } as LoadIcon<TIconName>);
