import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Genre } from '@/types/Genre';
import { AxiosError } from 'axios';
import { addGenreToMovie } from '@/services/movie/addGenreToMovie';
import useMovie from '@/hooks/movie/useMovie';
import { FaTrash } from 'react-icons/fa6';
import { useToast } from '@/hooks/use-toast';
import { removeGenreFromMovie } from '@/services/movie/removeGenreFromMovie';
import SelectGenre from '@/components/dashboard/movie/SelectGenre';

interface GenreListModalProps {
  movieId: string;
  genres: Genre[];
}

const GenreListModal = ({ genres, movieId }: GenreListModalProps) => {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genreToRemove, setGenreToRemove] = useState<string | null>(null);

  const [removeGenreLoading, setRemoveGenreLoading] = useState(false);

  const { updateMovieGenres, removeGenreFromMovie: _removeGenreFromMovie } =
    useMovie();

  const handleGenre = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await addGenreToMovie(movieId, { genreId: value });

      updateMovieGenres(movieId, response.movie.genres);
      setValue('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  const handleRemoveGenre = async (genreId: string) => {
    try {
      setRemoveGenreLoading(true);
      setGenreToRemove(genreId);
      await removeGenreFromMovie(movieId, { genreId });

      _removeGenreFromMovie(movieId, genreId);

      setRemoveGenreLoading(false);
    } catch (error) {
      setGenreToRemove(null);
      setRemoveGenreLoading(false);
      if (error instanceof AxiosError) {
        toast({
          title: 'Something went wrong',
          description: error.response?.data.message || 'Please try again later',
        });
      } else {
        toast({
          title: 'Something went wrong',
          description: 'Please try again later',
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-gradient-to-b from-gray-800 to-gray-900">
          List of genres
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[30rem] flex flex-col pt-10 min-h-48 max-h-[95%]"
        aria-describedby={undefined}
      >
        <DialogTitle>List of genres</DialogTitle>
        <div className="flex flex-col gap-1">
          <SelectGenre
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
            genres={genres}
          />
          <Button onClick={handleGenre} disabled={loading || !value}>
            {loading ? 'Loading...' : 'Add Genre'}
          </Button>
          {error ? <div className="text-sm text-red-500">{error}</div> : null}
        </div>
        <div className="flex flex-col gap-2">
          {genres &&
            genres.map((genre) => (
              <div
                key={genre.id}
                className="h-max flex items-center justify-between gap-2 px-2 py-2 bg-gray-100 border border-gray-200 rounded"
              >
                {genre.name}
                <Button
                  className="bg-red-500 rounded hover:bg-red-600"
                  onClick={() => handleRemoveGenre(genre.id)}
                  disabled={removeGenreLoading && genreToRemove === genre.id}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GenreListModal;
