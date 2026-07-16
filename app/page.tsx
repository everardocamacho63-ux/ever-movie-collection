import { CollectionApp } from "@/components/CollectionApp";
import { supabase } from "@/lib/supabase";
import type { Movie } from "@/types/movie";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
const { data, error } = await supabase
.from("movies")
.select("*")
.order("title", { ascending: true });

if (error) {
console.error("Error al cargar películas:", error);

return (
<main style={{ padding: "40px" }}>
<h1>No se pudo cargar la colección</h1>
<p>{error.message}</p>
</main>
);
}

const movies = (data ?? []) as Movie[];

return <CollectionApp initialMovies={movies} />;
}