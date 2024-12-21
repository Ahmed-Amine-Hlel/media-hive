"use client";

import React from 'react';
import useGenre from "@/hooks/genre/useGenre";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import UpdateGenreModal from "@/components/dashboard/genre/UpdateGenreModal";
import DeleteGenreAlert from "@/components/dashboard/genre/DeleteGenreAleret";

const GenresList = () => {

    const {loading, genres} = useGenre();


    if (loading) {
        return (
            <div className="h-full flex justify-center items-center">
                Loading...
            </div>
        )
    }


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>
                        Description
                    </TableHead>
                    <TableHead>
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    genres.map((genre) => (
                        <TableRow key={genre.id}>
                            <TableCell>{genre.name}</TableCell>
                            <TableCell>{genre.description}</TableCell>
                            <TableCell className="w-32">
                                <div className="flex gap-4">
                                    <UpdateGenreModal genre={genre}/>
                                    <DeleteGenreAlert id={genre.id}/>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default GenresList;