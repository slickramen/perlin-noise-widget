# noise widget

A noise generator widget.

## How to install

To install the required dependencies for the noise widget, ensure you are in the repository root, then run

```
npm install
```

This will install the required dependencies.

## How to build and run

To run the noise widget, from the repository root, run

```
npm run dev
```

This will compile the Rust code as well as build the Vite app and run it locally. It can be accessed at http://localhost:5173/

If you just want to compile the Rust code, from the repository root, run

```
npm run build:wasm
```

If you want to build both the Vite app and compile the Rust code, from the repository root, run

```
npm run build
```

## Functionality

The noise widget utilises the `noise` crate in Rust to generate various different types of noise. These include:

- Perlin: Classic noise used a lot in computer graphics
- Simplex: A comparible noise function to Perlin, but with fewer artifacts and lower computational overhead.
- Worley: An extension of Voronoi noise, generating a cellular pattern.
- RidgedMulti: More natural noise pattern for mountainous terrain
