import init, { NoiseGenerator } from "../public/wasm/wasm_crate.js";

let generator: NoiseGenerator | null = null;

export async function initNoise(seed: number = 42): Promise<void> {
	await init();
	generator = new NoiseGenerator(seed);
}

export function renderNoise(
	canvas: HTMLCanvasElement,
	scale: number = 100,
	offsetX: number = 0,
	offsetY: number = 0,
	z: number = 0,
) {
	if (!generator) throw new Error("Call initNoise() first!");

	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas context not defined!");

	const { width, height } = canvas;

	const noise = generator.generate_map(
		width,
		height,
		scale,
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
