import { Router } from "express";
import {  } from "../controllers/adminController";
import { authUser } from "../middlewares/authUser";
import { authAdmin } from "../middlewares/authAdmin";
import { updateWorkerById } from "../controllers/adminController";


const routerAdmin = Router()

routerAdmin.put('/profile', authUser, authAdmin, updateWorkerById)
//routerAdmin.get('/view-appointment', authUser, authAdmin, allTheirAppointments)
//routerAdmin.put('/add-exercises', addExercicesToAppointment)

export { routerAdmin }