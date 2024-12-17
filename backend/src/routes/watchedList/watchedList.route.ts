import express from "express";
import {getWatchedMoviesListHandler} from "../../controllers/watchedList/get.controller";
import {protectUserRoutes} from "../../middlewares/user.middleware";


const router = express.Router();

router.get("/", protectUserRoutes, getWatchedMoviesListHandler)

export default router;