export const rubberband = (movement: number, factor = 0.7) => {
	return Math.sign(movement) * Math.abs(movement) ** factor;
};
