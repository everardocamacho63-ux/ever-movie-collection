import { CollectionApp } from "@/components/CollectionApp";
import { movies } from "@/data/movies";

export default function HomePage() {
return <CollectionApp initialMovies={movies} />;
}
