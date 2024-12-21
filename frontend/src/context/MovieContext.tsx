"use client";

import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState} from "react";
import {Movie} from "@/types/Movie";
import {getMovies} from "@/services/movie/getMovies";
import {Actor} from "@/types/Actor";
import useUser from "@/hooks/user/useUser";
import {Genre} from "@/types/Genre";


interface MovieContextProps {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    movies: Movie[];
    setMovies: Dispatch<SetStateAction<Movie[]>>;
    saveMovieToState: (movie: Movie) => void;
    removeMovieFromState: (id: string) => void;
    updateMoviesState: (id: string, data: Movie) => void;
    updateMovieActors: (movieId: string, actors: Actor[]) => void;
    removeActorFromMovie: (movieId: string, actorId: string) => void;
    updateMovieGenres: (movieId: string, genres: Genre[]) => void;
    removeGenreFromMovie: (movieId: string, genreId: string) => void;
}


export const MovieContext = createContext<MovieContextProps | undefined>(undefined);


const MovieProvider = ({children}: { children: ReactNode }) => {

    const {token} = useUser();

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

    const updateMovieActors = useMemo(() => (movieId: string, actors: Actor[]) => {
        const updatedMovies = movies.map(movie => {
            if (movie.id === movieId) {
                return {
                    ...movie,
                    actors
                }
            }
            return movie;
        });

        setMovies(updatedMovies);
    }, [movies])

    const removeActorFromMovie = useMemo(() => (movieId: string, actorId: string) => {
        const updatedMovies = movies.map(movie => {
            if (movie.id === movieId) {
                return {
                    ...movie,
                    actors: movie.actors.filter(actor => actor.id !== actorId)
                }
            }
            return movie;
        });

        setMovies(updatedMovies);
    }, [movies]);

    const updateMovieGenres = useMemo(() => (movieId: string, genres: Genre[]) => {
        const updatedMovies = movies.map(movie => {
            if (movie.id === movieId) {
                return {
                    ...movie,
                    genres
                }
            }
            return movie;
        });

        setMovies(updatedMovies);
    }, [movies])


    const removeGenreFromMovie = useMemo(() => (movieId: string, genreId: string) => {
        const updatedMovies = movies.map(movie => {
            if (movie.id === movieId) {
                return {
                    ...movie,
                    genres: movie.genres.filter(genre => genre.id !== genreId)
                }
            }
            return movie;
        });

        setMovies(updatedMovies);
    }, [movies]);


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
        updateMoviesState,
        updateMovieActors,
        removeActorFromMovie,
        updateMovieGenres,
        removeGenreFromMovie
    }), [loading, movies, updateMoviesState, updateMovieActors, removeActorFromMovie, updateMovieGenres, removeGenreFromMovie]);

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}


export default MovieProvider;