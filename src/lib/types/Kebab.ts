export type Kebab<
	Str extends string,
	Accumulator extends string = ''
> = Str extends `${infer First}${infer Rest}`
	? Kebab<Rest, `${Accumulator}${First extends Lowercase<First> ? '' : '-'}${Lowercase<First>}`>
	: Accumulator;
