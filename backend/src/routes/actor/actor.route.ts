import express from "express";
import {protectUserRoutes} from "../../middlewares/user.middleware";
import {actorValidationRules} from "../../utils/validation/actor/validationRules.validation";
import {saveActorHandler} from "../../controllers/actor/save.controller";
import {getActorsHandler} from "../../controllers/actor/get.controller";
import {validateRequest} from "../../utils/validation/actor/validate.validation";
import {updateActorHandler} from "../../controllers/actor/update.controller";
import {deleteActorHandler} from "../../controllers/actor/delete.controller";
import {getActorByIdHandler} from "../../controllers/actor/getOne.controller";


const router = express.Router();

router.get('/', protectUserRoutes, getActorsHandler);
router.get('/:id', protectUserRoutes, getActorByIdHandler);
router.post("/", protectUserRoutes, actorValidationRules, validateRequest, saveActorHandler);
router.put("/:id", protectUserRoutes, actorValidationRules, validateRequest, updateActorHandler);
router.delete("/:id", protectUserRoutes, deleteActorHandler);

export default router;