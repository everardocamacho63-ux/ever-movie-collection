"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type { Movie, MovieFormat } from "@/types/movie";
import { MovieGrid } from "@/components/MovieGrid";
import { MovieModal } from "@/components/MovieModal";
import { Navigation } from "@/components/Navigation";

const ClosetScene = dynamic(
() =>
import("@/components/ClosetScene").then(
(module) => module.ClosetScene,
),
{
ssr: false,
loading: () => (
<div className="scene-loading">
Construyendo el estante virtual...
</div>
),
},
);

type ViewMode = "collection" | "closet";

type CollectionAppProps = {
initialMovies: Movie[];
};

export function CollectionApp({
initialMovies,
}: CollectionAppProps) {
const [view, setView] = useState<ViewMode>("collection");
const [selectedMovie, setSelectedMovie] =
useState<Movie | null>(null);

const [search, setSearch] = useState("");
const [format, setFormat] =
useState<MovieFormat | "Todos">("Todos");
const [favoritesOnly, setFavoritesOnly] =
useState(false);
const [sort, setSort] = useState<
"title" | "year-desc" | "year-asc"
>("title");

const filteredMovies = useMemo(() => {
const normalizedSearch = search
.trim()
.toLowerCase();

const result = initialMovies.filter((movie) => {
const matchesSearch =
movie.title.toLowerCase().includes(normalizedSearch) ||
movie.director
.toLowerCase()
.includes(normalizedSearch) ||
movie.genres.some((genre) =>
genre.toLowerCase().includes(normalizedSearch),
);

const matchesFormat =
format === "Todos" || movie.format === format;

const matchesFavorite =
!favoritesOnly || movie.favorite;

return (
matchesSearch &&
matchesFormat &&
matchesFavorite
);
});

return [...result].sort((a, b) => {
if (sort === "year-desc") {
return b.year - a.year;
}

if (sort === "year-asc") {
return a.year - b.year;
}

return a.title.localeCompare(b.title, "es");
});
}, [
initialMovies,
search,
format,
favoritesOnly,
sort,
]);

function selectRandomMovie() {
if (filteredMovies.length === 0) {
return;
}

const randomIndex = Math.floor(
Math.random() * filteredMovies.length,
);

setSelectedMovie(filteredMovies[randomIndex]);
}

return (
<main className="collection-shell">
<Navigation
view={view}
onViewChange={setView}
total={initialMovies.length}
onRandom={selectRandomMovie}
/>

<section className="hero">
<p className="eyebrow">Archivo personal</p>

<h1>The Ever Collection</h1>

<p className="hero-description">
Una colección personal de películas en VHS,
DVD, Blu-ray y 4K UHD.
</p>
</section>

<section className="toolbar">
<label className="search-field">
<span>Buscar</span>

<input
type="search"
value={search}
onChange={(event) =>
setSearch(event.target.value)
}
placeholder="Título, director o género"
/>
</label>

<label>
<span>Formato</span>

<select
value={format}
onChange={(event) =>
setFormat(
event.target.value as
| MovieFormat
| "Todos",
)
}
>
<option value="Todos">Todos</option>
<option value="VHS">VHS</option>
<option value="DVD">DVD</option>
<option value="Blu-ray">Blu-ray</option>
<option value="4K UHD">4K UHD</option>
</select>
</label>

<label>
<span>Ordenar</span>

<select
value={sort}
onChange={(event) =>
setSort(
event.target.value as
| "title"
| "year-desc"
| "year-asc",
)
}
>
<option value="title">Título A–Z</option>
<option value="year-desc">
Año más reciente
</option>
<option value="year-asc">
Año más antiguo
</option>
</select>
</label>

<label className="checkbox-field">
<input
type="checkbox"
checked={favoritesOnly}
onChange={(event) =>
setFavoritesOnly(event.target.checked)
}
/>

<span>Solo favoritas</span>
</label>
</section>

<section className="results-heading">
<p>
{filteredMovies.length}{" "}
{filteredMovies.length === 1
? "película"
: "películas"}
</p>
</section>

{view === "collection" ? (
<MovieGrid
movies={filteredMovies}
onSelect={setSelectedMovie}
/>
) : (
<ClosetScene
movies={filteredMovies}
onSelect={setSelectedMovie}
/>
)}

{selectedMovie && (
<MovieModal
movie={selectedMovie}
onClose={() => setSelectedMovie(null)}
/>
)}
</main>
);
}
