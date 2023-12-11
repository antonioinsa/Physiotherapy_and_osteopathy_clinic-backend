import { Router } from "express";
import { authUser } from "../middlewares/authUser";
import { authSuperAdmin } from "../middlewares/authSuperAdmin";
import {
    changeRoleBySuperAdmin,
    deleteUserBySuperAdmin,
    updateWorkerBySuperAdmin
} from "../controllers/superAdminController";

const routerSuperAdmin = Router()


routerSuperAdmin.delete('/delete/:id', authUser, authSuperAdmin, deleteUserBySuperAdmin)
routerSuperAdmin.put('/updateWorker', authUser, authSuperAdmin, updateWorkerBySuperAdmin)
routerSuperAdmin.put('/changeRole', authUser, authSuperAdmin, changeRoleBySuperAdmin)



export { routerSuperAdmin }