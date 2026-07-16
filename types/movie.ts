export type MovieFormat = "VHS" | "DVD" | "Blu-ray" | "4K UHD";

export type Movie = {
id: string;
title: string;
originalTitle?: string;
year: number;
director: string;
format: MovieFormat;
genre: string[];
country: string;
duration: number;
watched: boolean;
favorite: boolean;
edition?: string;
cover: string;
backCover?: string;
description: string;
notes?: string;
shelf: number;
position: number;
};