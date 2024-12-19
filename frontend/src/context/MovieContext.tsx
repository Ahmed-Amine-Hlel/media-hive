"use client";

import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState} from "react";
import {Movie} from "@/types/Movie";
import {getCookie} from "cookies-next";
import {getMovies} from "@/services/movie/getMovies";


interface MovieContextProps {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    movies: Movie[];
    setMovies: Dispatch<SetStateAction<Movie[]>>;
    saveMovieToState: (movie: Movie) => void;
    removeMovieFromState: (id: string) => void;
    updateMoviesState: (id: string, data: Movie) => void;
}


export const MovieContext = createContext<MovieContextProps | undefined>(undefined);


const MovieProvider = ({children}: { children: ReactNode }) => {

    const token = getCookie('token');
    const [loading, setLoading] = useState<boolean>(true);
    const [movies, setMovies] = useState<Movie[]>([]);


    const updateMoviesState = useMemo(() => (id: string, data: Movie) => {
        const updatedMovies = movies.map(movie => {
            if (movie.id === id) {
                return data;
            }
            return movie;
        });
        setMovies(updatedMovies);
    }, [movies]);

    const saveMovieToState = (movie: Movie) => {
        setMovies(prevState => [movie, ...prevState]);
    };

    const removeMovieFromState = (id: string) => {
        setMovies(prevState => prevState.filter(movie => movie.id !== id));
    }

    useEffect(() => {

        if (!token) {
            setLoading(false);
            return;
        }

        const fetchMovies = async () => {
            try {
                const movies = await getMovies();
                setMovies(movies);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        fetchMovies();

    }, [token]);

    const value = useMemo(() => ({
        loading,
        setLoading,
        movies,
        setMovies,
        saveMovieToState,
        removeMovieFromState,
        updateMoviesState
    }), [loading, movies, updateMoviesState]);

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}


export default MovieProvider;