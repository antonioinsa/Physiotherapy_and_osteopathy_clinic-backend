import { Router } from "express";
import { authUser } from "../middlewares/authUser";
import { authAdmin } from "../middlewares/authAdmin";
import {
    updateWorkerById,
    getAppointmentsByAdmin,
    getExercises
} from "../controllers/adminController";


const routerAdmin = Router()

routerAdmin.put('/profile', authUser, authAdmin, updateWorkerById)
routerAdmin.get('/appointments', authUser, authAdmin, getAppointmentsByAdmin)
routerAdmin.get('/exercises', authUser, getExercises)
//routerAdmin.post('/add-exercises',authUser, authAdmin, addExercisesToAppointment)

export { routerAdmin }