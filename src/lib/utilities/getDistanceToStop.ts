export const getDistanceToStop = (velocity: number, decelerationRate = 0.995) =>
	(velocity * decelerationRate) / (1 - decelerationRate);
