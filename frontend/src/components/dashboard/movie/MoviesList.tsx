'use client';

import React from 'react';
import useMovie from '@/hooks/movie/useMovie';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import ActorsListModal from '@/components/dashboard/actor/ActorsListModal';
import DeleteMovieAlert from '@/components/dashboard/movie/DeleteMovieAlert';
import UpdateMovieModal from '@/components/dashboard/movie/UpdateMovieModal';
import GenreListModal from '@/components/dashboard/genre/GenreListModal';

const MoviesList = () => {
  const { loading, movies } = useMovie();

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">Loading...</div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead className="w-60">Description</TableHead>
          <TableHead className="w-52">Cover Image</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Actors</TableHead>
          <TableHead>Genres</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies.map((movie) => (
          <TableRow key={movie.id}>
            <TableCell>{movie.title}</TableCell>
            <TableCell>{movie.description}</TableCell>
            <TableCell>
              <Image
                src={movie.coverImage}
                alt={movie.coverImage}
                className="h-40 w-36 object-cover object-center border border-gray-200"
                width={160}
                height={160}
              />
            </TableCell>
            <TableCell>{movie.duration} H</TableCell>
            <TableCell>{movie.language}</TableCell>
            <TableCell>
              <ActorsListModal movieId={movie.id} actors={movie.actors} />
            </TableCell>
            <TableCell>
              <GenreListModal movieId={movie.id} genres={movie.genres} />
            </TableCell>
            <TableCell>{movie.rating}</TableCell>
            <TableCell className="w-32">
              <div className="flex gap-4">
                <UpdateMovieModal movie={movie} />
                <DeleteMovieAlert id={movie.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MoviesList;
