import React from 'react';
import MoviesList from '@/components/dashboard/movie/MoviesList';
import AddMovieModal from '@/components/dashboard/movie/AddMovieModal';

const Movies = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <p>Movies list</p>
        <AddMovieModal />
      </div>
      <MoviesList />
    </div>
  );
};

export default Movies;
