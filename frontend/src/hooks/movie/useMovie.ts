import {useContext} from "react";
import {MovieContext} from "@/context/MovieContext";


const useMovie = () => {

    const context = useContext(MovieContext);


    if (context === undefined) {
        throw new Error('useMovie must be used within a MovieProvider');
    }

    return context;
}
export default useMovie;