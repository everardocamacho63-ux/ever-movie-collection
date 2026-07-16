import type { Movie } from "@/types/movie";
import { MovieCard } from "@/components/MovieCard";

type MovieGridProps = {
movies: Movie[];
onSelect: (movie: Movie) => void;
};

export function MovieGrid({
movies,
onSelect,
}: MovieGridProps) {
if (movies.length === 0) {
return (
<section className="empty-state">
<h2>No encontramos películas</h2>

<p>
Cambia los filtros o registra más títulos
en tu colección.
</p>
</section>
);
}

return (
<section className="movie-grid">
{movies.map((movie) => (
<MovieCard
key={movie.id}
movie={movie}
onSelect={onSelect}
/>
))}
</section>
);
}