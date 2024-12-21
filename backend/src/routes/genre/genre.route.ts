import express from "express";
import {protectUserRoutes} from "../../middlewares/user.middleware";
import {saveGenreHandler} from "../../controllers/genre/save.controller";
import {getGenresHandler} from "../../controllers/genre/get.controller";
import {updateGenreHandler} from "../../controllers/genre/update.controller";
import {deleteGenreHandler} from "../../controllers/genre/delete.controller";
import {genreValidationRules} from "../../utils/validation/genre/validationRules.validation";
import {validateRequest} from "../../utils/validation/genre/validate.validation";

const router = express.Router();

router.get("/", protectUserRoutes, getGenresHandler);
router.post("/", protectUserRoutes, genreValidationRules, validateRequest, saveGenreHandler);
router.put("/:id", protectUserRoutes, genreValidationRules, validateRequest, updateGenreHandler);
router.delete("/:id", protectUserRoutes, deleteGenreHandler);

export default router;
