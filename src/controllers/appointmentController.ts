import { Request, Response } from 'express'
import { Appointment } from '../models/Appointment'
import { validateAppointmentHour, validateDate, validateService } from '../validations/validations'
import { User } from '../models/User'
import dayjs from 'dayjs'
import { parse } from 'path'



const newAppointment = async (req: Request, res: Response) => {
    try {
        const { date, hour, service } = req.body

        const user = await User.findOne
            ({
                where: { id: req.token.id }
            })

        if (!user) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'User not found'
                })
        }

        if (req.token.role !== "user") {
            return res.status(403).json({
                success: false,
                message: 'You cannot create an appointment'
            })
        }

        if (validateAppointmentHour(hour)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateAppointmentHour(hour)
                })
        }

        if (validateService(service)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateService(service)
                })
        }

        if (validateDate(date)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateDate(date)
                })
        }

        const dateBody = dayjs(date, 'DD-MM-YYYY')
        const dbDate = dateBody.format('YYYY-MM-DD')

        const newAppointment = await Appointment.create
            ({
                date: dbDate,
                hour,
                service,
                user_id: req.token.id
            }).save()

        return res.status(200).json
            ({
                success: true,
                message: 'Appointment created successfully',
                data: newAppointment
            })

    } catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: 'Appointment cant be created',
                error: error
            })
    }
}

const updateAppointment = async (req: Request, res: Response) => {
    try {
        const { id, date, hour } = req.body

        if (validateAppointmentHour(hour)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateAppointmentHour(hour)
                })
        }

        if (validateDate(date)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateDate(date)
                })
        }

        const appointmentExist = await Appointment.findOneBy
            ({
                id
            })

        if (!appointmentExist) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'Appointment not found'
                })
        }

        if (req.token.role !== "user") {
            return res.status(400).json({
                success: false,
                message: 'You cannot update an appointment'
            })
        }

        const dateBody = dayjs(date, 'DD-MM-YYYY')
        const dbDate = dateBody.format('YYYY-MM-DD')

        await Appointment.update
            (
                {
                    id: id
                },
                {
                    date: dbDate,
                    hour
                }
            )
        const updateAppointment = await Appointment.findOne
            ({
                where: { id: parseInt(id), user_id: req.token.id }
            })

        return res.status(200).json
            ({
                success: true,
                message: 'Updated appointment successfully',
                data: updateAppointment
            })



    } catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: 'Appointment cannot be updated',
                error: error
            })
    }

}



export { newAppointment, updateAppointment }