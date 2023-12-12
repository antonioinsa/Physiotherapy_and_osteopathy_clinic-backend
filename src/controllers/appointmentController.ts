import { Request, Response } from 'express'
import { Appointment } from '../models/Appointment'
import { User } from '../models/User'
import dayjs from 'dayjs'
import { validateAppointmentHour, validateDate, validateService } from '../validations/validations'

const newAppointment = async (req: Request, res: Response) => {
    try {
        const { date, hour, service } = req.body

        const newAppointment = await Appointment.create
            ({
                date,
                hour,
                service,
                user_id: req.token.id
            })
        newAppointment.save()
        return res.status(200).json
            ({
                success: true,
                message: "Appointment created successfully",
                data: newAppointment
            })

    } catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: "Appointment cant be created",
                error: error
            })
    }
}



export { newAppointment }