use wasm_bindgen::prelude::*;
use noise::{NoiseFn, Perlin};

#[wasm_bindgen]
pub struct NoiseGenerator {
    perlin: Perlin,
}

#[wasm_bindgen]
impl NoiseGenerator {
    #[wasm_bindgen(constructor)]
    pub fn new(seed: u32) -> Self {
        Self {
            perlin: Perlin::new(seed)
        }
    }

    pub fn get(&self, x: f64, y: f64, z: f64) -> f64 {
        self.perlin.get([x, y, z])
    }

    pub fn generate_map(
        &self,
        width: u32,
        height: u32,
        scale: f64,
        offset_x: f64,
        offset_y: f64,
        z: f64
    ) -> Vec<f32> {
        let mut map = Vec::with_capacity((width * height) as usize);

        for y in 0..height {
            for x in 0..width {
                let nx = (x as f64 + offset_x) / scale;
                let ny = (y as f64 + offset_y) / scale;

                let v = self.perlin.get([nx, ny, z]);

                map.push(((v + 1.0) / 2.0) as f32);
            }
        }

        map
    }
}