import React from 'react';
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Actor} from "@/types/Actor";

interface ActorsListModalProps {
    actors: Actor[];
}

const ActorsListModal = ({actors}: ActorsListModalProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex items-center gap-2 bg-gradient-to-b from-gray-800 to-gray-900"
                >
                    List of actors
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[26rem] pt-14" aria-describedby={undefined}>
                {
                    actors && actors.map((actor) => (
                        <div key={actor.id}
                             className="flex items-center gap-2 px-2 py-1 bg-gray-100 border border-gray-200 rounded">
                            {actor.fullName}
                        </div>
                    ))
                }
            </DialogContent>
        </Dialog>
    );
};

export default ActorsListModal;