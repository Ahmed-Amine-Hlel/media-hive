"use client";

import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState} from "react";
import {Actor} from "@/types/Actor";
import {getActors} from "@/services/actor/getActors";
import useUser from "@/hooks/user/useUser";


interface ActorContextProps {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    actors: Actor[];
    setActors: Dispatch<SetStateAction<Actor[]>>;
    updateActorsState: (id: string, data: Actor) => void;
    saveActorToState: (actor: Actor) => void;
    removeActorFromState: (id: string) => void;
}


export const ActorContext = createContext<ActorContextProps | undefined>(undefined);


const ActorProvider = ({children}: { children: ReactNode }) => {

    const {token} = useUser();
    const [loading, setLoading] = useState<boolean>(true);
    const [actors, setActors] = useState<Actor[]>([]);


    const updateActorsState = useMemo(() => (id: string, data: Actor) => {
        const updatedActors = actors.map(actor => {
            if (actor.id === id) {
                return data;
            }
            return actor;
        });
        setActors(updatedActors);
    }, [actors]);

    const saveActorToState = useMemo(() => (actor: Actor) => {
        setActors([...actors, actor]);
    }, [actors]);


    const removeActorFromState = useMemo(() => (id: string) => {
        const updatedActors = actors.filter(actor => actor.id !== id);
        setActors(updatedActors);
    }, [actors]);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchActors = async () => {
            try {
                const actors = await getActors();
                setActors(actors);
                setLoading(false);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setLoading(false);
            }
        }

        fetchActors();
    }, [token]);

    const value = useMemo(() => ({
        loading,
        setLoading,
        actors,
        setActors,
        updateActorsState,
        saveActorToState,
        removeActorFromState
    }), [loading, actors, updateActorsState, saveActorToState, removeActorFromState]);

    return (
        <ActorContext.Provider value={value}>
            {children}
        </ActorContext.Provider>
    );
}

export default ActorProvider;