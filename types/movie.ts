export type MovieFormat =
| "VHS"
| "DVD"
| "Blu-ray"
| "4K UHD";

export type Movie = {
id: string;
title: string;
original_title?: string | null;
year: number;
director: string;
format: MovieFormat;
genres: string[];
country?: string | null;
duration?: number | null;
watched: boolean;
favorite: boolean;
edition?: string | null;
cover_url?: string | null;
back_cover_url?: string | null;
description?: string | null;
notes?: string | null;
shelf: number;
position: number;
created_at?: string;
};