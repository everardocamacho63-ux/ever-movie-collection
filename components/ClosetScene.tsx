"use client";

import {
Environment,
OrbitControls,
RoundedBox,
Text,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import type { Movie } from "@/types/movie";

type ClosetSceneProps = {
movies: Movie[];
onSelect: (movie: Movie) => void;
};

type MovieCaseProps = {
movie: Movie;
index: number;
onSelect: (movie: Movie) => void;
};

function getFormatColor(format: Movie["format"]) {
switch (format) {
case "VHS":
return "#262626";
case "DVD":
return "#161616";
case "Blu-ray":
return "#1857a4";
case "4K UHD":
return "#101010";
default:
return "#222222";
}
}

function MovieCase({
movie,
index,
onSelect,
}: MovieCaseProps) {
const [hovered, setHovered] = useState(false);

const moviesPerRow = 12;
const row = Math.floor(index / moviesPerRow);
const column = index % moviesPerRow;

const x = -3.85 + column * 0.7;
const y = 2.55 - row * 1.65;
const z = 0;

return (
<group
position={[x, y, z]}
onClick={(event) => {
event.stopPropagation();
onSelect(movie);
}}
onPointerEnter={(event) => {
event.stopPropagation();
setHovered(true);
document.body.style.cursor = "pointer";
}}
onPointerLeave={() => {
setHovered(false);
document.body.style.cursor = "default";
}}
>
<RoundedBox
args={[0.55, 1.35, 0.12]}
radius={0.035}
smoothness={4}
scale={hovered ? 1.08 : 1}
>
<meshStandardMaterial
color={getFormatColor(movie.format)}
roughness={0.55}
metalness={0.05}
/>
</RoundedBox>

<Text
position={[0, 0, 0.071]}
fontSize={0.075}
maxWidth={0.46}
textAlign="center"
anchorX="center"
anchorY="middle"
color="#f4f1e8"
>
{movie.title}
</Text>

<Text
position={[0, -0.52, 0.072]}
fontSize={0.055}
anchorX="center"
anchorY="middle"
color="#bdb8ab"
>
{movie.year}
</Text>
</group>
);
}

function Shelf({
y,
}: {
y: number;
}) {
return (
<group position={[0, y, -0.08]}>
<mesh>
<boxGeometry args={[9.3, 0.12, 0.65]} />
<meshStandardMaterial
color="#3c2416"
roughness={0.8}
/>
</mesh>
</group>
);
}

function Room({
movies,
onSelect,
}: ClosetSceneProps) {
const rowCount = Math.max(
1,
Math.ceil(movies.length / 12),
);

return (
<>
<ambientLight intensity={1.1} />

<directionalLight
position={[4, 7, 5]}
intensity={2.2}
castShadow
/>

<pointLight
position={[-4, 2, 4]}
intensity={18}
distance={12}
/>

<mesh position={[0, 0.2, -0.45]}>
<boxGeometry args={[10, 7, 0.3]} />
<meshStandardMaterial
color="#171512"
roughness={0.9}
/>
</mesh>

<mesh position={[0, -2.6, 1]}>
<boxGeometry args={[12, 0.2, 6]} />
<meshStandardMaterial
color="#30251d"
roughness={0.95}
/>
</mesh>

{Array.from({
length: rowCount,
}).map((_, index) => (
<Shelf
key={index}
y={1.82 - index * 1.65}
/>
))}

{movies.map((movie, index) => (
<MovieCase
key={movie.id}
movie={movie}
index={index}
onSelect={onSelect}
/>
))}

<Environment preset="warehouse" />

<OrbitControls
enablePan={false}
minDistance={5}
maxDistance={11}
minPolarAngle={Math.PI / 3.2}
maxPolarAngle={Math.PI / 1.65}
target={[0, 0.4, 0]}
/>
</>
);
}

export function ClosetScene({
movies,
onSelect,
}: ClosetSceneProps) {
if (movies.length === 0) {
return (
<section className="empty-state">
<h2>El estante está vacío</h2>
<p>No hay títulos con estos filtros.</p>
</section>
);
}

return (
<section className="closet-wrapper">
<div className="closet-instructions">
Arrastra para mover la cámara. Usa la rueda
para acercarte. Selecciona una película para
abrir su ficha.
</div>

<Canvas
shadows
camera={{
position: [0, 0.5, 8],
fov: 48,
}}
dpr={[1, 1.7]}
>
<Suspense fallback={null}>
<Room
movies={movies}
onSelect={onSelect}
/>
</Suspense>
</Canvas>
</section>
);
}