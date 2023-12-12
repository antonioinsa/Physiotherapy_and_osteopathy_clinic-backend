import { Router } from "express";
import { authUser } from "../middlewares/authUser";
import { 
    newAppointment,
    updateAppointment,
    deleteAppointment 
} from "../controllers/appointmentController";

const routerAppointment = Router()

routerAppointment.post('/newAppointment', authUser, newAppointment)
routerAppointment.put('/updateAppointment', authUser, updateAppointment)
routerAppointment.delete('/deleteAppointment/:id', authUser, deleteAppointment)


export { routerAppointment }