'use client'
import Header from "@/app/layout/header"
import { fetchWrapper } from "@/app/lib/fetch"
import ContentWrapper from "@/app/ui/content-wrapper"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function DetailPage({ params }: { params: { slug: number } }) {

  if(!params.slug) return 404

  const [movie, setMovie] = useState<Movie | null>(null)

  const [favorite, setFavorite] = useState<Movie | null>(null)
  const getMovieDetail = async () => {
    const response = await fetchWrapper({
      path: `/movie/${params.slug}`,
      method: "GET"
    })
    if(response) {
      setMovie(response)
    }
  }

  const getFavorites = async () => {
    const response: Movie[] = await fetchWrapper({
      path: "/favorite-movie/list",
      method: "GET"
    })
    if(response) {
      setFavorite(response.find((fav) => fav.id == params.slug) || null)
    }
  }

  useEffect(() => {
    getMovieDetail()
    getFavorites()
  }, [])
  

  const handleAddFavorite = async () => {
    if(!movie) return;
    const response = await fetchWrapper({
      path: `/movie/add-favorite`,
      method: "POST",
      body: {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        popularity: movie.popularity,
        overview: movie.overview
      }
    })
    if(response) {
      setFavorite(movie)
    }
  }

  const handleRemoveFavorite = async () => {
    if(!favorite) return;
    const response = await fetchWrapper({
      path: `/movie/remove-favorite`,
      method: "POST",
      body: {
        id: favorite.id
      }
    })
    if(response) {
      setFavorite(null)
    }
  }

  if(!movie) return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* create loading animation */}
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  )

  return (
    <div>
      <Header className="justify-end">
        <Link href={"/"} className="text-2xl text-white">X</Link>
      </Header>
      <ContentWrapper>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-3/4">
          <div className="w-full flex">
            <Image src={movie.poster_path} alt={movie.title} width={300} height={450} />
          </div>
          <div className="w-full flex flex-col col-span-2 justify-between">
            <div>
              <h1 className="text-2xl font-bold">{movie.title}</h1>
              <div className="mt-5">
                <p className="text-lg">Release : {movie.release_date}</p>
                <p className="text-lg">Popularity : {movie.popularity}</p>
                <p className="text-lg">{movie.overview}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link className="bg-blue-500 w-full text-white p-2 rounded-md mt-4 end-0 text-center" href="/">Back</Link>
              {
                favorite?.id ? (
                  <button onClick={handleRemoveFavorite} className="bg-red-500 w-full text-white p-2 rounded-md mt-4 end-0 text-center">Remove from favorite</button>
                ) : (
                  <button onClick={handleAddFavorite} className="bg-blue-500 w-full text-white p-2 rounded-md mt-4 end-0 text-center">Add to favorite</button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
    </div>
  )
}