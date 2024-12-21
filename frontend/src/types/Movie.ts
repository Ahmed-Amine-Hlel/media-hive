import { Actor } from '@/types/Actor';
import { Genre } from '@/types/Genre';

export interface Movie {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  duration: string;
  language: string;
  rating: number;
  actors: Actor[];
  genres: Genre[];
  createdAt: Date;
  updatedAt: Date;
}
