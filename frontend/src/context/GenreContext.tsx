'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useUser from '@/hooks/user/useUser';
import { Genre } from '@/types/Genre';
import { getGenres } from '@/services/genre/getGenres';

interface GenreContextProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  genres: Genre[];
  setGenres: Dispatch<SetStateAction<Genre[]>>;
  saveGenreToState: (gender: Genre) => void;
  removeGenreFromState: (id: string) => void;
  updateGenreState: (id: string, data: Genre) => void;
}

export const GenreContext = createContext<GenreContextProps | undefined>(
  undefined
);

const GenreProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useUser();

  const [loading, setLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<Genre[]>([]);

  // Function to update a gender's state
  const updateGenreState = useMemo(
    () => (id: string, data: Genre) => {
      const updatedGenres = genres.map((gender) => {
        if (gender.id === id) {
          return data;
        }
        return gender;
      });
      setGenres(updatedGenres);
    },
    [genres]
  );

  // Function to save a new gender to the state
  const saveGenreToState = (gender: Genre) => {
    setGenres((prevState) => [gender, ...prevState]);
  };

  // Function to remove a gender from the state by id
  const removeGenreFromState = (id: string) => {
    setGenres((prevState) => prevState.filter((gender) => gender.id !== id));
  };

  // Fetch genders from backend and set loading to false after
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchGenres = async () => {
      try {
        const fetchedGenres = await getGenres();
        setGenres(fetchedGenres);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, [token]);

  const value = useMemo(
    () => ({
      loading,
      setLoading,
      genres,
      setGenres,
      saveGenreToState,
      removeGenreFromState,
      updateGenreState,
    }),
    [loading, genres, updateGenreState]
  );

  return (
    <GenreContext.Provider value={value}>{children}</GenreContext.Provider>
  );
};

export default GenreProvider;
