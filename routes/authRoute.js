import express from "express";
import {registerController,loginController,testController, forgetpasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController,} from '../controllers/authController.js';
import { isAdmin,requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController } from "../controllers/categoryController.js";
//router dbject
const router = express.Router()

//routing
//Register || Method Post
router.post('/register',registerController)


//Login || post
router.post('/login',loginController)

//forget password || post
router.post('/forget-Password',forgetpasswordController)


//test routes
router.get("/test", requireSignIn, isAdmin, testController)

//category || post
router.post('/create-category',createCategoryController)



//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

  
//protected admin route auth
router.get("/admin-auth", requireSignIn,isAdmin,(req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;