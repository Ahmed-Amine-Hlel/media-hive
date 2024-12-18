import {useContext} from "react";
import {ActorContext} from "@/context/ActorContext";


const useActor = () => {

    const context = useContext(ActorContext);

    if (!context) {
        throw new Error("useActor must be used within a ActorProvider");
    }

    return context;

}

export default useActor