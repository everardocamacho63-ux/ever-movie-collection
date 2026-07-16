import Image from "next/image";
import type { Movie } from "@/types/movie";

type MovieCardProps = {
movie: Movie;
onSelect: (movie: Movie) => void;
};

export function MovieCard({
movie,
onSelect,
}: MovieCardProps) {
return (
<article className="movie-card">
<button
type="button"
className="movie-card-button"
onClick={() => onSelect(movie)}
aria-label={`Abrir información de ${movie.title}`}
>
<div className="cover-container">
<Image
src={movie.cover}
alt={`Portada de ${movie.title}`}
fill
sizes="(max-width: 600px) 45vw, (max-width: 1100px) 25vw, 200px"
className="cover-image"
/>

{movie.favorite && (
<span className="favorite-badge">
Favorita
</span>
)}
</div>

<div className="movie-card-information">
<h2>{movie.title}</h2>

<p>
{movie.year} · {movie.director}
</p>

<span
className={`format-badge format-${movie.format
.toLowerCase()
.replaceAll(" ", "-")}`}
>
{movie.format}
</span>
</div>
</button>
</article>
);
}