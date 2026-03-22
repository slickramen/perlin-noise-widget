import init, { NoiseGenerator } from "../public/wasm/wasm_crate.js";

let generator: NoiseGenerator | null = null;
let generatorType: number = 0;

export async function initNoise(seed: number = 42): Promise<void> {
	await init();
	generator = new NoiseGenerator(seed);
}

export function updateNoiseType(type: number) {
	if (!generator) throw new Error("Call initNoise() first!");

	generator.set_type(type);
	generatorType = type;
}

export function renderNoise(
	canvas: HTMLCanvasElement,
	scale: number = 50,
	offsetX: number = 0,
	offsetY: number = 0,
	z: number = 0,
) {
	if (!generator) throw new Error("Call initNoise() first!");

	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas context not defined!");

	const { width, height } = canvas;

	let multScale = scale;

	// multiply scale a bit to zoom in
	if (generatorType === 3) {
		// 3 = RidgedMulti
		multScale *= 5;
	}

	const noise = generator.generate_map(
		width,
		height,
		multScale,
		offsetX,
		offsetY,
		z,
	);

	const imageData = ctx.createImageData(width, height);
	for (let i = 0; i < noise.length; i++) {
		const v = Math.floor(noise[i] * 255.0);
		const p = i * 4;
		imageData.data[p] = v;
		imageData.data[p + 1] = v;
		imageData.data[p + 2] = v;
		imageData.data[p + 3] = 255.0;
	}

	ctx.putImageData(imageData, 0, 0);
}
