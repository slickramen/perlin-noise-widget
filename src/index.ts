import { initNoise, renderNoise } from "./noise";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = 800;
canvas.height = 600;

const scaleSlider = document.getElementById("scale") as HTMLInputElement;
const offsetXSlider = document.getElementById("offsetX") as HTMLInputElement;
const offsetYSlider = document.getElementById("offsetY") as HTMLInputElement;
const zSlider = document.getElementById("z") as HTMLInputElement;
const seedInput = document.getElementById("seed") as HTMLInputElement;
const randomiseButton = document.getElementById(
	"randomise",
) as HTMLButtonElement;
const resetButton = document.getElementById("reset") as HTMLButtonElement;

const scaleVal = document.getElementById("scale-val")!;
const offsetXVal = document.getElementById("offsetX-val")!;
const offsetYVal = document.getElementById("offsetY-val")!;
const zVal = document.getElementById("z-val")!;

function getParams() {
	return {
		scale: parseFloat(scaleSlider.value),
		offsetXSpd: parseFloat(offsetXSlider.value),
		offsetYSpd: parseFloat(offsetYSlider.value),
		zIndex: parseFloat(zSlider.value) / 100,
	};
}

scaleSlider.addEventListener("input", () => {
	scaleVal.textContent = scaleSlider.value;
});
offsetXSlider.addEventListener("input", () => {
	offsetXVal.textContent = offsetXSlider.value;
});
offsetYSlider.addEventListener("input", () => {
	offsetYVal.textContent = offsetYSlider.value;
});
zSlider.addEventListener("input", () => {
	zVal.textContent = (parseFloat(zSlider.value) / 100).toFixed(2);
});
seedInput.addEventListener("input", async () => {
	await initNoise(parseInt(seedInput.value));
});

resetButton.addEventListener("click", async () => {
	offsetX = 0;
	offsetY = 0;
	z = 0;

	scaleSlider.value = "100";
	offsetXSlider.value = "0";
	offsetYSlider.value = "0";
	zSlider.value = "0";

	scaleVal.textContent = "100";
	offsetXVal.textContent = "0";
	offsetYVal.textContent = "0";
	zVal.textContent = "0";
});

randomiseButton.addEventListener("click", async () => {
	seedInput.value = String(Math.floor(Math.random() * 99999));

	await initNoise(parseInt(seedInput.value));
});

await initNoise(parseInt(seedInput.value));

let offsetX = 0;
let offsetY = 0;

let z = 0;
const animate = () => {
	const { scale, offsetXSpd, offsetYSpd, zIndex } = getParams();

	renderNoise(canvas, scale, offsetX, offsetY, z);

	// Animation
	offsetX += offsetXSpd;
	offsetY += offsetYSpd;
	z = zIndex;
	requestAnimationFrame(animate);
};

animate();
