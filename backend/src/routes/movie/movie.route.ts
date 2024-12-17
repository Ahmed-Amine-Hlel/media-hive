import express from "express";
import {protectUserRoutes} from "../../middlewares/user.middleware";
import {saveMovieHandler} from "../../controllers/movie/save.controller";
import {getMoviesHandler} from "../../controllers/movie/get.controller";
import {getMovieByIdHandler} from "../../controllers/movie/getOne.controller";
import {movieValidationRules} from "../../utils/validation/movie/validationRules.validation";
import {updateMovieHandler} from "../../controllers/movie/update.controller";
import {deleteMovieHandler} from "../../controllers/movie/delete.controller";
import {validateRequest} from "../../utils/validation/movie/validate.validation";
import {addActorToMovieHandler} from "../../controllers/movie/addActorToMovie.controller";
import {
    addRemoveActorToMovieValidationRules
} from "../../utils/validation/movie/addRemoveActorToMovieValidationRules.validation";
import {removeActorFromMovieHandler} from "../../controllers/movie/removeActorFromMovie.controller";
import {addMovieToWatchedListHandler} from "../../controllers/movie/addMovieToWatchedList.controller";
import {validateAddMovieToWatchedList} from "../../utils/validation/movie/addMovieToWatchedListValidation.validation";
import {removeMovieFromWatchedListHandler} from "../../controllers/movie/removeMovieFromWatchedList.controller";


const router = express.Router();

router.get("/", protectUserRoutes, getMoviesHandler);
router.get("/:id", protectUserRoutes, getMovieByIdHandler);
router.post("/", protectUserRoutes, movieValidationRules, validateRequest, saveMovieHandler);
router.put("/:id", protectUserRoutes, movieValidationRules, validateRequest, updateMovieHandler);
router.delete("/:id", protectUserRoutes, deleteMovieHandler);
router.put("/:id/add-actor", protectUserRoutes, addRemoveActorToMovieValidationRules, validateRequest, addActorToMovieHandler);
router.delete("/:id/remove-actor", protectUserRoutes, addRemoveActorToMovieValidationRules, validateRequest, removeActorFromMovieHandler);
router.post("/:id/add-to-watched-list", protectUserRoutes, validateAddMovieToWatchedList, validateRequest, addMovieToWatchedListHandler);
router.delete("/:id/remove-from-watched-list", protectUserRoutes, removeMovieFromWatchedListHandler);

export default router;