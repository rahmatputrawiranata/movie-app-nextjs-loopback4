'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import MovieCard from "./ui/movie-card";
import { fetchWrapper } from "./lib/fetch";
import Link from "next/link";
import ContentWrapper from "./ui/content-wrapper";
import Header from "./layout/header";


export default function Home() {

  const getMovies = async() => {

    const resp: Movie[] = await fetchWrapper({
      path: "/popular-movie/list",
      method: "GET"
    })

    if(resp) {
      if(resp.length === 0) {
        setIsMoviesEmpty(true)
      }else {
        setIsMoviesEmpty(false)
      }
      setMovies(resp)
    }
    
  }

  const [isMoviesEmpty, setIsMoviesEmpty] = useState(false);

  const [movies, setMovies] = useState<Movie[]>([]);

  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies();
  }, [])

  const getFavorites = async () => {
    const resp = await fetchWrapper({
      path: "/favorite-movie/list",
      method: "GET"
    })

    if(resp) {
      setFavorites(resp)
    }
  }

  useEffect(() => {
    getFavorites();
  }, [movies])

  const searchMovies = useCallback(async (keyword: string) => {
    const resp: Movie[] = await fetchWrapper({
      path: `/movie/search`,
      method: "GET",
      query: {
        keyword
      }
    })

    if(resp) {
      if(resp.length === 0) {
        setIsMoviesEmpty(true)
      }else {
        setIsMoviesEmpty(false)
      }
      setMovies(resp)
    }
  }, []);

  const handleSetMovieDataIntoFavorite = () => {
    setMovies(favorites)
  }

  const keywordRef = useRef('');
  const timerRef = useRef<null | NodeJS.Timeout>(null); // Update the type of timerRef.current
  const handleInputChange = (e: { currentTarget: { value: string; }; }) => {
    keywordRef.current = e.currentTarget.value;
  
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  
    timerRef.current = setTimeout(() => {
      if(keywordRef.current && keywordRef.current.trim() !== '') {
        searchMovies(keywordRef.current)
      }else {
        getMovies()
      }
    }, 2000);
  };
  

  return (
    <main className="flex min-h-screen flex-col">
      <Header className="justify-between">
        <input onChange={handleInputChange} className="w-3/4 h-10 p-2 text-black rounded-3xl" type="text" placeholder="Search movies" />
        <div className="flex flex-row">
        <button onClick={handleSetMovieDataIntoFavorite} className="text-white px-2">Favorites</button>
        <Link className="text-white px-2" href="/about-us">About Us</Link>
        </div>
      </Header>
      <ContentWrapper>
        <div className="rounded-t-lg md:px-20 mt-10 bg-black">
          {
            isMoviesEmpty ? (
              <div className="w-screen h-screen flex items-center justify-center">
                <h1 className="text-2xl">No movies found</h1>
              </div>
              
            ) : movies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                  movies.map((movie) => {
                    return (
                    <Link key={movie.id} href={`/detail/${movie.id}`}>
                      <MovieCard key={movie.id} movie={
                        {
                          ...movie,
                          is_favorite: favorites.some((fav) => fav.id === movie.id)
                        }
                      
                      } />
                      </Link>
                    )
                  })
                }
              </div>
            ) : (
              <div className="w-screen h-screen flex items-center justify-center">
                {/* create loading animation */}
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
              </div>
            )
          }
        </div>
      </ContentWrapper>
      
    </main>
  );
}
