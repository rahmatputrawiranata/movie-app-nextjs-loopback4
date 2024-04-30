interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    popularity: number;
    overview: string;
    is_favorite?: boolean;
}