type NavigationProps = {
view: "collection" | "closet";
total: number;
onViewChange: (
view: "collection" | "closet",
) => void;
onRandom: () => void;
};

export function Navigation({
view,
total,
onViewChange,
onRandom,
}: NavigationProps) {
return (
<header className="site-header">
<div className="brand">
<span className="brand-mark">EC</span>

<div>
<strong>The Ever Collection</strong>
<small>{total} títulos</small>
</div>
</div>

<nav className="view-navigation">
<button
type="button"
className={
view === "collection" ? "active" : ""
}
onClick={() =>
onViewChange("collection")
}
>
Colección
</button>

<button
type="button"
className={
view === "closet" ? "active" : ""
}
onClick={() => onViewChange("closet")}
>
Estante 3D
</button>

<button
type="button"
onClick={onRandom}
>
Película al azar
</button>
</nav>
</header>
);
}