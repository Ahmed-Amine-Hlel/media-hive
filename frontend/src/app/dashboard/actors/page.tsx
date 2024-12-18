import React from 'react';
import ActorsList from "@/components/dashboard/actor/ActorsList";
import AddActorModal from "@/components/dashboard/actor/AddActorModal";

const Actors = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <p>
                    Actors list
                </p>

                <AddActorModal/>
            </div>

            <ActorsList/>
        </div>
    );
};

export default Actors;