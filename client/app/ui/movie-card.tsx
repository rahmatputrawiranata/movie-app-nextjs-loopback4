import Image from "next/image";

export default function MovieCard({
    movie
}: {
    movie: {
        id: number;
        title: string;
        poster_path: string;
        release_date: string;
        popularity: number;
        overview: string;
        is_favorite?: boolean;
    }
}) {
    return (
        <div className="overflow-hidden rounded-xl relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card">
            
            {/* favorite label */}
            {
                movie.is_favorite && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-md">Favorite</span>
                    </div>
                )
            }

            <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
            <div className="relative group z-10 px-10 pt-10 space-y-6 movie_info" data-lity="">
                <div className="poster__info align-self-end w-full">
                    <div className="h-32"></div>
                    <div className="space-y-6 detail_info">
                        <div className="flex flex-col space-y-2 inner">
                            
                            <h3 className="text-2xl font-bold text-white" data-unsp-sanitized="clean">{movie.title}</h3>
                        </div>
                        <div className="flex flex-row justify-between datos">
                            <div className="flex flex-col datos_col">
                                <div className="popularity">{movie.popularity}</div>
                                <div className="text-sm text-gray-400">Popularity:</div>
                            </div>
                            <div className="flex flex-col datos_col">
                                <div className="release">{movie.release_date}</div>
                                <div className="text-sm text-gray-400">Release date:</div>
                            </div>
                        </div>
                        <div className="flex flex-col overview">
                            <div className="flex flex-col"></div>
                            <div className="text-xs text-gray-400 mb-2">Overview:</div>
                            <p className="text-xs text-gray-100 mb-6">
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <Image
            className="absolute inset-0 transform w-full -translate-y-4"
            src={movie.poster_path}
            alt="Movie poster"
            width={500}
            height={300}
            />
        </div>
    )
}