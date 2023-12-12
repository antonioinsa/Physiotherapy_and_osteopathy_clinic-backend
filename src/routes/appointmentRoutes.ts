import { Router } from "express";
import { authUser } from "../middlewares/authUser";
import { newAppointment } from "../controllers/appointmentController";



const routerAppointment = Router()

routerAppointment.post('/newAppointment', authUser, newAppointment)
//routerAppointment.delete('/, )
//routerAppointment.put('/', )
//routerAppointment.put('/', )



export { routerAppointment }