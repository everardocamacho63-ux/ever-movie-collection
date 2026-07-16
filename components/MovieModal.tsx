"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Movie } from "@/types/movie";

type MovieModalProps = {
movie: Movie;
onClose: () => void;
};

export function MovieModal({
movie,
onClose,
}: MovieModalProps) {
useEffect(() => {
function handleEscape(event: KeyboardEvent) {
if (event.key === "Escape") {
onClose();
}
}

window.addEventListener("keydown", handleEscape);

return () => {
window.removeEventListener(
"keydown",
handleEscape,
);
};
}, [onClose]);

return (
<div
className="modal-backdrop"
role="presentation"
onMouseDown={(event) => {
if (event.target === event.currentTarget) {
onClose();
}
}}
>
<section
className="movie-modal"
role="dialog"
aria-modal="true"
aria-labelledby="movie-modal-title"
>
<button
type="button"
className="modal-close"
onClick={onClose}
aria-label="Cerrar"
>
×
</button>

<div className="modal-cover">
<Image
src={movie.cover}
alt={`Portada de ${movie.title}`}
fill
sizes="300px"
className="cover-image"
/>
</div>

<div className="modal-information">
<span className="modal-format">
{movie.format}
</span>

<h2 id="movie-modal-title">
{movie.title}
</h2>

{movie.originalTitle &&
movie.originalTitle !== movie.title && (
<p className="original-title">
{movie.originalTitle}
</p>
)}

<p className="movie-metadata">
{movie.year} · {movie.duration} min ·{" "}
{movie.country}
</p>

<p className="director">
Dirigida por {movie.director}
</p>

<p className="movie-description">
{movie.description}
</p>

<div className="genre-list">
{movie.genre.map((genre) => (
<span key={genre}>{genre}</span>
))}
</div>

<dl className="movie-details">
<div>
<dt>Estado</dt>
<dd>
{movie.watched
? "Vista"
: "Pendiente"}
</dd>
</div>

<div>
<dt>Ubicación</dt>
<dd>
Estante {movie.shelf}, posición{" "}
{movie.position}
</dd>
</div>

{movie.edition && (
<div>
<dt>Edición</dt>
<dd>{movie.edition}</dd>
</div>
)}
</dl>

{movie.notes && (
<div className="notes">
<h3>Notas</h3>
<p>{movie.notes}</p>
</div>
)}
</div>
</section>
</div>
);
}