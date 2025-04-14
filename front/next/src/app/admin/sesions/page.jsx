'use client'

import { sessionCreate, getInfoMovie, viewSessions } from "@/app/plugins/communicationManager";
import { useEffect, useState } from "react";
import SessionComp from "@/components/SessionComp";
import { PopUpProvider, usePopUp } from "@/context/TogglePopUps";

export default function Page() {
  const [sesions, setSesions] = useState([]);
  const [movies, setMovies] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedSession, setSelectedSession, setEditedSession, setIsEditing } = usePopUp();

  useEffect(() => {
    (async () => {
      try {
        const response = await verSesiones();
        setSesions(response);

        // console.log("Response: ", response);
        const arrayDates = [];
        const arrayMovies = [];

        for (const sesion of response.data) {
          const info = await getInfoMovie(sesion.imdb);
          const movie = {
            sesionID: sesion.id,
            imdb: info.imdbID,
            title: info.Title,
            year: info.Year,
            runtime: info.Runtime,
            Poster: info.Poster,
            date: sesion.date,
            time: sesion.time,
          };

          // console.log("Movie: ", movie);

          arrayMovies.push(movie);

          const date = sesion.date;
          if (!arrayDates.includes(date)) {
            arrayDates.push(date);
          }
        }

        arrayMovies.sort((a, b) => {
          const timeA = new Date(`1970-01-01T${a.time}:00`);
          const timeB = new Date(`1970-01-01T${b.time}:00`);
          return timeA - timeB;
        });

        arrayDates.sort((a, b) => new Date(a) - new Date(b));

        setDates(arrayDates);
        setMovies(arrayMovies);

        // console.log("ArrayMovies: ", arrayMovies);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedSession]);

  async function verSesiones() {
    try {
      const response = await viewSessions();
      return response;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Carregant...</p>
      </div>
    );
  }

  const handleOpenPopup = (movie) => {
    setSelectedSession(movie);
    setEditedSession(movie);
    setIsEditing(false);
  };

  return (
    <>
      {selectedSession &&
        <SessionComp />
      }
      <div>
        <h1 className="text-3xl font-bold text-center">Sessions</h1>
        <div>
          {dates.map((date, index) => (
            <div key={index}>
              <p className="font-bold flex justify-center md:block">{date}</p>
              <div className="flex gap-5 border-t border-gray-300 py-6 overflow-x-auto mb-4">
                {movies.sort((a, b) => a.time - b.time).map((movie, index) => {
                  if (movie.date === date) {
                    return (
                      <div key={index} onClick={() => { handleOpenPopup(movie) }}>
                        <div className="bg-white shadow-lg rounded-lg w-[180px] relative cursor-pointer">
                          <img
                            src={movie.Poster}
                            alt={movie.title}
                            className="w-full h-64 object-cover object-center"
                          />
                          <div className="absolute bottom-0 right-0 bg-white py-2 px-3 border-l border-t border-gray-300 rounded-tl-md">
                            <p>{movie.time}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
