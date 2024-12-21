import React from 'react';
import GenresList from '@/components/dashboard/genre/GenresList';
import AddGenreModal from '@/components/dashboard/genre/AddGenreModal';

const Genres = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <p>Genres list</p>
        <AddGenreModal />
      </div>
      <GenresList />
    </div>
  );
};

export default Genres;
