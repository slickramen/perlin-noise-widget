use wasm_bindgen::prelude::*;
use noise::{NoiseFn, Perlin, RidgedMulti, Simplex, Worley};
use noise::core::worley::ReturnType;

#[wasm_bindgen]
pub struct NoiseGenerator {
    perlin: Perlin,
    simplex: Simplex,
    worley: Worley,
    ridged: RidgedMulti<Perlin>,
    selected: u32,
}

#[wasm_bindgen]
impl NoiseGenerator {
    #[wasm_bindgen(constructor)]
    pub fn new(seed: u32) -> Self {
        Self {
            perlin: Perlin::new(seed),
            simplex: Simplex::new(seed),
            worley: Worley::new(seed).set_return_type(ReturnType::Distance),
            ridged: RidgedMulti::new(seed),
            selected: 0,
        }
    }

    pub fn set_type(&mut self, noise_type: u32) {
        self.selected = noise_type;
    }

    pub fn get(&self, x: f64, y: f64, z: f64) -> f64 {
        match self.selected {
            1 => self.simplex.get([x, y, z]),
            2 => self.worley.get([x, y, z]),
            3 => self.ridged.get([x, y, z]),
            _ => self.perlin.get([x, y, z]),
        }
    }

    pub fn generate_map(
        &self,
        width: u32,
        height: u32,
        scale: f64,
        offset_x: f64,
        offset_y: f64,
        z: f64,
    ) -> Vec<f32> {
        let mut map = Vec::with_capacity((width * height) as usize);

        for y in 0..height {
            for x in 0..width {
                let nx = (x as f64 + offset_x) / scale;
                let ny = (y as f64 + offset_y) / scale;
                let v = self.get(nx, ny, z);
                
                let normalised = ((v + 1.0) / 2.0).clamp(0.0, 1.0);
                
                map.push(normalised as f32);
            }
        }

        map
    }
}