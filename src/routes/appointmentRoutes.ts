import { Router } from "express";
import { authUser } from "../middlewares/authUser";
import { 
    newAppointment,
    updateAppointment,
    deleteAppointment, 
    getAppointmentByUser

} from "../controllers/appointmentController";
import { authAdmin } from "../middlewares/authAdmin";

const routerAppointment = Router()

routerAppointment.post('/newAppointment', authUser, newAppointment)
routerAppointment.put('/updateAppointment', authUser, updateAppointment)
routerAppointment.delete('/deleteAppointment/:id', authUser, deleteAppointment)
routerAppointment.get('/getAppointments', authUser, getAppointmentByUser)
routerAppointment.get('/myAppointments', authUser, authAdmin)


export { routerAppointment }