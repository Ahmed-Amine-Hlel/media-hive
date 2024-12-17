import express from "express";
import {signupValidationRules, validateSignupRequest} from "../../utils/validation/user/signup.validation";
import {signupHandler} from "../../controllers/user/signup.controller";
import {signinValidationRules, validateSigninRequest} from "../../utils/validation/user/signin.validation";
import {signinHandler} from "../../controllers/user/signin.controller";
import {protectUserRoutes} from "../../middlewares/user.middleware";
import {loggedUserDataHandler} from "../../controllers/user/me.controller";


const router = express.Router();

router.post("/signup", signupValidationRules, validateSignupRequest, signupHandler)
router.post("/signin", signinValidationRules, validateSigninRequest, signinHandler)
router.get("/me", protectUserRoutes, loggedUserDataHandler)


export default router;
