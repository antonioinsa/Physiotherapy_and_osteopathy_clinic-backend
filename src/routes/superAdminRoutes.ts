import { Router } from "express";
import { authAdmin } from "../middlewares/authAdmin";
import { authSuperAdmin } from "../middlewares/authSuperAdmin";
import { authUser } from "../middlewares/authUser";
import { deleteUserBySuperAdmin } from "../controllers/superAdminController";

const routerSuperAdmin = Router()


//routerSuperAdmin.delete('/delete/:id', authUser,authAdmin, authSuperAdmin, deleteUserBySuperAdmin)




export { routerSuperAdmin }