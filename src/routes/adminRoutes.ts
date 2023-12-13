import { Router } from "express";
import { authUser } from "../middlewares/authUser";
import { authAdmin } from "../middlewares/authAdmin";
import {
    updateWorkerById,
    getAppointmentsByAdmin
} from "../controllers/adminController";


const routerAdmin = Router()

routerAdmin.put('/profile', authUser, authAdmin, updateWorkerById)
routerAdmin.get('/appointments', authUser, authAdmin, getAppointmentsByAdmin)
//routerAdmin.put('/add-exercises', addExercicesToAppointment)

export { routerAdmin }