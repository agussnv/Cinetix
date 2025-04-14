'use client'
import { useEffect, useState, useRef } from "react";
import { sessionCreate, searchMovie } from '../../plugins/communicationManager'
import MovieComp from '../../../components/MovieComp';

export default function Page() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [movies, setMovies] = useState([]);
    const [currentMovies, setCurrentMovies] = useState([]);
    const isFirstRender = useRef(true);
    const moviesPerPage = 8;

    const startIndex = (currentPage - 1) * moviesPerPage;

    async function buscarMovie() {
        const response = await searchMovie(searchTerm);
        console.log(response)
        setMovies(response);
        if (movies.Search && movies.Search.length > 0) {
            console.log("Setea las pelis")
            setCurrentMovies(movies.Search.slice(startIndex, startIndex + moviesPerPage));
        } else {
            console.log("No setea las pelis");
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log("PAGINA: ", currentPage)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    function handleKeyDown(event) {
        if (event.key === 'Enter') buscarMovie();
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setSearchTerm(params.get('title') || '');
        }
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            if (searchTerm !== '') console.log("Busqueda: ", searchTerm);
            (async () => {
                console.log("entra en el async de useEffect");
                const response = await searchMovie(searchTerm);
                if (response && response.Response === 'True') {
                    console.log("API: ", response);
                    setMovies(response);
                } else {
                    console.log("Error response: ", response);
                }
                isFirstRender.current = false;
            })();
        }
    }, [searchTerm]);

    useEffect(() => {
        if (movies.Search && movies.Search.length > 0) {
            console.log("Setea las pelis en useEffect")
            setCurrentMovies(movies.Search.slice(startIndex, startIndex + moviesPerPage));
            setTotalPages(Math.ceil(movies.Search.length / moviesPerPage));
        } else {
            console.log("No setea las pelis en useEffect");
        }
    }, [movies,currentPage])

    return <>
        <div className="min-h-screen bg-gray-100">
            

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {movies.totalResults ? movies.totalResults : 0} resultats trobats
                    </h2>
                </div>

                {/* Movies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {currentMovies.map(movie => (
                        <MovieComp key={movie.imdbID} movie={movie} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-4 py-2 rounded-lg ${currentPage === page
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                    } shadow transition-colors`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </>
}