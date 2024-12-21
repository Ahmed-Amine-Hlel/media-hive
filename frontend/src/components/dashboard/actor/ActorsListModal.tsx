import React, {useState} from 'react';
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Actor} from "@/types/Actor";
import SelectActor from "@/components/dashboard/movie/SelectActor";
import {AxiosError} from "axios";
import {addActorToMovie} from "@/services/movie/addActorToMovie";
import useMovie from "@/hooks/movie/useMovie";
import {FaTrash} from "react-icons/fa6";
import {removeActorFromMovie} from "@/services/movie/removeActorFromMovie";
import {useToast} from "@/hooks/use-toast";

interface ActorsListModalProps {
    movieId: string;
    actors: Actor[];
}

const ActorsListModal = ({actors, movieId}: ActorsListModalProps) => {

    const {toast} = useToast()

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [actorToRemove, setActorToRemove] = useState<string | null>(null);

    const [removeActorLoading, setRemoveActorLoading] = useState(false);


    const {updateMovieActors, removeActorFromMovie: _removeActorFromMovie} = useMovie();


    const handleActor = async () => {
        try {
            setError(null);
            setLoading(true);

            const response = await addActorToMovie(movieId, {
                actorId: value
            })

            updateMovieActors(movieId, response.movie.actors);
            setValue("");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error instanceof AxiosError) {
                setError(error.response?.data.message);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    }

    const handleRemoveActor = async (actorId: string) => {
        try {
            setRemoveActorLoading(true);
            setActorToRemove(actorId);
            await removeActorFromMovie(movieId, {
                actorId
            });

            _removeActorFromMovie(movieId, actorId);

            setRemoveActorLoading(false);
        } catch (error) {
            setActorToRemove(null);
            setRemoveActorLoading(false);
            if (error instanceof AxiosError) {
                toast({
                    title: "Something went wrong",
                    description: error.response?.data.message || "Please try again later",
                })
            } else {
                toast({
                    title: "Something went wrong",
                    description: "Please try again later",
                })
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex items-center gap-2 bg-gradient-to-b from-gray-800 to-gray-900"
                >
                    List of actors
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[30rem] flex flex-col pt-10 min-h-48 max-h-[95%]"
                           aria-describedby={undefined}>
                <DialogTitle>
                    List of actors
                </DialogTitle>
                <div className="flex flex-col gap-1">
                    <SelectActor
                        open={open}
                        setOpen={setOpen}
                        value={value}
                        setValue={setValue}
                        actors={actors}
                    />
                    <Button
                        onClick={handleActor}
                        disabled={loading || !value}
                    >
                        {
                            loading ? "Loading..." : "Add Actor"
                        }
                    </Button>
                    {
                        error ? <div className="text-sm text-red-500">
                            {error}
                        </div> : null
                    }
                </div>
                <div className="flex flex-col gap-2">
                    {
                        actors && actors.map((actor) => (
                            <div key={actor.id}
                                 className="h-max flex items-center justify-between gap-2 px-2 py-2 bg-gray-100 border border-gray-200 rounded">
                                {actor.fullName}

                                <Button
                                    className="bg-red-500 rounded hover:bg-red-600"
                                    onClick={() => handleRemoveActor(actor.id)}
                                    disabled={removeActorLoading && actorToRemove === actor.id}
                                >
                                    <FaTrash/>
                                </Button>
                            </div>
                        ))
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ActorsListModal;