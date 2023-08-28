import express from "express";
import { registerController, 
        loginController, 
        testController, 
        updateProfileController,
        getUsersController,
        singleUserController,
       } from "../controller/userController.js"
import { requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

//test routes
router.get('/test', requireSignIn, testController);

//protected User route auth
router.get('/user', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//get all user
router.get("/get-user", getUsersController);

//single user
router.get("/single-user/:slug", singleUserController);

export default router;