import {useContext} from "react";
import {GenreContext} from "@/context/GenreContext";


const useGenre = () => {

    const context = useContext(GenreContext);

    if (context === undefined) {
        throw new Error('useGenre must be used within a GenreProvider');
    }

    return context;

}

export default useGenre;