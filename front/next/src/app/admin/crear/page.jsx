'use client'
import { sessionCreate, getInfoMovie, viewSessions } from "@/app/plugins/communicationManager";
import { useEffect, useState } from "react";

export default function Page() {
  const [imdb, setImdb] = useState('');
  const [movie, setMovie] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [vipCheck, setVipCheck] = useState(false);
  const [sesions, setSesions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await verSesiones();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setMovieName(movie.Title || '');
  }, [movie]);

  useEffect(() => {
    (async () => {
      if (imdb !== '') {
        console.log("IMDB: ", imdb);
        const response = await getInfoMovie(imdb);
        console.log(response);
        if (response.Response === 'True') {
          setMovie(response);
        } else {
          console.log("No existe ninguna pelicula con ese IMDB");
        }
      }
    })();
  }, [imdb])

  async function crearSesion(formData) {
    const imdbID = formData.get("imdb");
    const time = formData.get("time");
    const date = formData.get("date");
    const sesionData = {
      "imdb": imdbID,
      "title": movieName,
      "time": time,
      "date": date,
      "vip": vipCheck
    }
    console.log("sesionData: ", sesionData);
    try {
      const response = await sessionCreate(sesionData);
      console.log(response);
      setMovieName('');
      verSesiones();
    } catch (error) {
      console.error("Error try-catch: ", error);
    }
  }

  async function verSesiones() {
    try {
      const response = await viewSessions();
      console.log("Response: ", response);
      setSesions(response);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <>
      <div className="w-full grid md:grid-cols-2 gap-5 my-5">
        <div className="bg-white rounded-lg shadow-md p-3 h-[70vh] md:ml-5">
          <form action={crearSesion} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              IMDB
            </label>
            <input type="text" name="imdb" className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required onChange={(e) => setImdb(e.target.value)} />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Títol de la pel·lícula
            </label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required readOnly defaultValue={movieName} />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seleccioni un horari
            </label>
            <select name="time" id="horario" className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required >
              <option value=""></option>
              <option value="16:00">16:00</option>
              <option value="18:00">18:00</option>
              <option value="20:00">20:00</option>
            </select>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de la funció
            </label>
            <input type="date" name="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required id="date" />
            <input
              type="checkbox"
              name="vipCheck"
              id="vipcheck"
              onChange={(e) => setVipCheck(e.target.checked)}
            />{" "}
            Fila VIP
            <input type="submit" value="Crear sesión" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors" />
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-md p-3 h-[70vh] md:mr-5 overflow-y-scroll">
          {!loading ?
            (
              <ul>
                {sesions.data.length > 0 ? (
                  sesions.data.map((sesion, index) => (
                    <div
                      key={sesion.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-lg mb-2">{sesion.title}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span>{sesion.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>{sesion.time}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>No s'han trobat resultats</h1>
                )}
              </ul>
            ) : (
              <h1>Carregant resultats</h1>
            )
          }
        </div>
      </div>
    </>
  );
}
