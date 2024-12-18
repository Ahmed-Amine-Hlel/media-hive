"use client";

import React from 'react';
import useActor from "@/hooks/actor/useActor";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {calculateAge} from "@/utils/calculateAge";
import Image from "next/image";
import UpdateActorModal from "@/components/dashboard/actor/UpdateActorModal";
import DeleteActorAlert from "@/components/dashboard/actor/DeleteActorAlert";

const ActorsList = () => {

    const {loading, actors} = useActor();

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
                    <TableHead>Full name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    actors.map((actor) => (
                        <TableRow key={actor.id}>
                            <TableCell>{actor.fullName}</TableCell>
                            <TableCell>{calculateAge(actor.dateOfBirth)}</TableCell>
                            <TableCell>
                                <Image
                                    src={actor.image}
                                    alt={actor.image}
                                    className="h-12 w-12 rounded-full object-cover object-center"
                                    width={160}
                                    height={160}
                                />
                            </TableCell>
                            <TableCell className="w-32">
                                <div className="flex gap-4">
                                    <UpdateActorModal
                                        actor={actor}
                                    />
                                    <DeleteActorAlert
                                        id={actor.id}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default ActorsList;