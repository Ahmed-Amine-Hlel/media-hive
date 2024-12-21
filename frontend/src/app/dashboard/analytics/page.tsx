'use client';

import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import useMovie from '@/hooks/movie/useMovie';
import useGenre from '@/hooks/genre/useGenre';
import useActor from '@/hooks/actor/useActor';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Analytics = () => {
  const { movies } = useMovie();
  const { genres } = useGenre();
  const { actors } = useActor();

  const genreNames = genres.map((g) => g.name);
  const moviesPerGenre = genres.map(
    (g) =>
      movies.filter((m) => m.genres.some((genre) => genre.id === g.id)).length
  );

  const languageSet = new Set(movies.map((m) => m.language));
  const languages = Array.from(languageSet);
  const moviesPerLanguage = languages.map(
    (lang) => movies.filter((m) => m.language === lang).length
  );

  const currentYear = new Date().getFullYear();
  const ageGroups = {
    '0-20': 0,
    '21-40': 0,
    '41-60': 0,
    '61+': 0,
  };

  actors.forEach((actor) => {
    const birthYear = new Date(actor.dateOfBirth).getFullYear();
    const age = currentYear - birthYear;
    if (age <= 20) ageGroups['0-20'] += 1;
    else if (age <= 40) ageGroups['21-40'] += 1;
    else if (age <= 60) ageGroups['41-60'] += 1;
    else ageGroups['61+'] += 1;
  });

  const moviesSortedByDate = [...movies].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const labels = moviesSortedByDate.map((m) =>
    new Date(m.createdAt).toLocaleDateString()
  );
  const ratings = moviesSortedByDate.map((m) => m.rating);

  const dataGenre = {
    labels: genreNames,
    datasets: [
      {
        label: 'Movies per Genre',
        data: moviesPerGenre,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const dataLanguage = {
    labels: languages,
    datasets: [
      {
        label: 'Movies per Language',
        data: moviesPerLanguage,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const dataAgeGroups = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: 'Actors by Age Group',
        data: Object.values(ageGroups),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  const dataRatings = {
    labels: labels,
    datasets: [
      {
        label: 'Movie Ratings Over Time',
        data: ratings,
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Movies per Genre
          </h2>
          <div className="h-64">
            <Bar
              data={dataGenre}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { precision: 0 },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Actors by Age Group
          </h2>
          <div className="h-64">
            <Pie
              data={dataAgeGroups}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: { position: 'right' },
                  title: { display: false },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Movies per Language
          </h2>
          <div className="h-64">
            <Bar
              data={dataLanguage}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { precision: 0 },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Movie Ratings Over Time
          </h2>
          <div className="h-64">
            <Line
              data={dataRatings}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    suggestedMax: 5,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
