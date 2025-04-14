'use client'

import { useEffect, useMemo, useState } from 'react';
import { viewSessions, getInfoMovie } from "@/app/plugins/communicationManager";
import MovieComp from '@/components/MovieComp';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sesions, setSesions] = useState([]);
  const [centerIndex, setCenterIndex] = useState(2);
  const [topMovies, setTopMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await viewSessions();
        setSesions(response);

        if (response.data) {
          const aux = [];
          const peliculasPromise = response.data.map(async (sesion) => {
            return await getInfoMovie(sesion.imdb);
          });
          const peliculas = await Promise.all(peliculasPromise);
          setMovies(peliculas);
          for (let index = 0; index < 4; index++) {
            aux.push(peliculas[index]);
          }
          setTopMovies(aux);
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const handleNavigation = (direction) => {
    if (direction === 'left') {
      setCenterIndex((prevIndex) =>
        prevIndex === 0 ? movies.length - 1 : prevIndex - 1
      );
    } else {
      setCenterIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const getVisibleMovies = useMemo(() => {
    const visibleMovies = [];
    const totalMovies = movies.length;

    for (let offset = -4; offset <= 4; offset++) {
      let index = centerIndex + offset;

      if (index < 0) {
        index = totalMovies + index;
      }

      if (index >= totalMovies) {
        index = index - totalMovies;
      }

      visibleMovies.push({
        movie: movies[index],
        position: offset
      });
    }

    return visibleMovies;
  }, [movies, centerIndex]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p>Carregant...</p>
      </div>
    );
  }

  return (
    <>
      <div className='w-full bg-black'>
        <div className="relative overflow-hidden">
          {movies.length > 0 &&
            (<div
              className="absolute bg-black inset-0 z-0 bg-cover bg-center transition-all duration-300"
              style={{
                backgroundImage: `url(${movies[centerIndex].Poster})`,
                filter: 'blur(50px)',
              }}
            >

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
            </div>
            )
          }
          <div className="relative z-10 md:my-20 my-5">
            <div className="w-full flex justify-center">
              <div className="w-full text-center md:text-left mt-3 mb-2 max-w-7xl items-center">
                <h1 className="text-3xl font-bold text-white">Pròximes funcions</h1>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <button
                onClick={() => handleNavigation('left')}
                className="transition hover:scale-110 absolute left-[25px] top-1/2 -translate-y-1/2 z-30 bg-red-600 hover:bg-red-700 p-2 rounded-full cursor-pointer"
              >
                <svg width="3em" height="3em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#FFFFFF" />
                </svg>
              </button>
              <button
                onClick={() => handleNavigation('right')}
                className="transition hover:scale-110 absolute right-[25px] top-1/2 -translate-y-1/2 z-30 bg-red-600 hover:bg-red-700 p-2 rounded-full cursor-pointer"
              >
                <svg width="3em" height="3em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#FFFFFF" />
                </svg>
              </button>

              <div className="flex justify-center items-center gap-4 transition-all duration-500 w-full overflow-hidden my-[18em]">
                {getVisibleMovies.length > 0 && movies.length > 0 && getVisibleMovies.map(({ movie, position }) => {
                  const isCenter = position === 0;

                  return (
                    <div
                      key={movie.imdbID}
                      className={`
                        transition-all duration-200 ease-in-out absolute
                        ${isCenter ? 'min-w-[320px] z-20' : 'min-w-[240px] opacity-80'}
                      `}
                      style={{
                        transform: `${isCenter ? 'scale(1.0)' : 'scale(0.9)'} translateX(calc(${position * 340}px ${position < 0 ? '- 26px' : position > 0 ? '+ 26px' : ''}))`,
                      }}
                    >
                      <div className="relative group">
                        <img
                          src={movie.Poster}
                          alt={movie.Title}
                          className={`
                            w-full object-cover rounded-lg shadow-lg transition-all duration-100
                            ${isCenter ? 'h-[500px]' : 'h-[400px] filter brightness-75'}
                          `}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg" />

                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h2 className={`text-white font-bold mb-2 transition-all duration-300 ${isCenter ? 'text-2xl' : 'text-xl'}`}>
                            {movie.Title}
                          </h2>
                          <div className="flex items-center space-x-2 mb-3 text-sm text-gray-300">
                            <span>{movie.Runtime}</span>
                            <span>•</span>
                            <span className="bg-red-600 px-2 py-1 rounded-md">{movie.Rated}</span>
                          </div>
                          <button className={`
                             w-full bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 cursor-pointer hover:scale-103
                            ${isCenter ? 'py-3 text-lg' : 'py-2 text-base'}
                            `}
                            onClick={() => router.push(`/movie/${movie.imdbID}`)}>
                            Comprar entrades
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 pb-20">
          <p className='text-center text-white mb-7 text-4xl'>Més populars</p>
          <div className="grid grid-cols-2 md:flex md:justify-center gap-6">
            {topMovies.length > 0 ? (
              topMovies.map((movie, index) => (
                <MovieComp key={index} movie={movie} />
              ))
            ) : (
              <h1>No s'han trobat resultats</h1>
            )}
          </div>
        </div>
      </div >

    </>
  );
}
