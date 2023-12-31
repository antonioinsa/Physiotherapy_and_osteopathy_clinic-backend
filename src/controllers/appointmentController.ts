import { Request, Response } from 'express'
import { Appointment } from '../models/Appointment'
import { User } from '../models/User'
import {
    validateHour,
    validateDate,
    validateService,
    validateAppointment
} from '../validations/validations'

const newAppointment = async (req: Request, res: Response) => {
    try {
        const { date, hour, service, worker } = req.body

        const user = await User.findOne({
            where: { id: req.token.id }
        })

        if (!user) {
            return res.status(400).json({
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

        if (validateHour(hour)) {
            return res.status(400).json({
                success: false,
                message: validateHour(hour)
            })
        }

        if (validateService(service)) {
            return res.status(400).json({
                success: false,
                message: validateService(service)
            })
        }

        if (validateDate(date)) {
            return res.status(400).json({
                success: false,
                message: validateDate(date)
            })
        }

        const originalDate = date
        const [day, month, year] = originalDate.split('-')
        const formattedDate = `${year}-${month}-${day}`

        const existingAppointment = await Appointment.findOne({
            where: {
                date: formattedDate,
                hour,
                service,
            },
        })

        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: 'Appointment already exists',
            })
        }

        const newAppointment = await Appointment.create({
            date: formattedDate,
            hour,
            service,
            user_id: req.token.id,
            worker
        }).save()

        return res.status(201).json({
            success: true,
            message: 'Appointment created successfully',
            data: newAppointment
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Appointment can\'t be created',
            error: error,
        })
    }
}

const updateAppointment = async (req: Request, res: Response) => {
    try {
        const { id, date, hour } = req.body

        if (validateHour(hour)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateHour(hour)
                })
        }

        if (validateDate(date)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateDate(date)
                })
        }

        if (validateAppointment(date, hour)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateAppointment(date, hour)
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

        const originalDate = date
        const [day, month, year] = originalDate.split('-')
        const formattedDate = `${year}-${month}-${day}`

        await Appointment.update
            (
                {
                    id: id
                },
                {
                    date: formattedDate,
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

const deleteAppointment = async (req: Request, res: Response) => {
    try {
        if (req.token.role !== 'user') {
            return res.status(401).json
                ({
                    success: false,
                    message: 'You cannot delete an appointment'
                })
        }

        const appointmentId = req.params.id
        const appointment = await Appointment.findOneBy
            ({
                id: parseInt(appointmentId),
                user_id: req.token.id
            })

        if (!appointment) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'Appointment not found'
                })
        }

        await Appointment.delete
            (
                { id: parseInt(appointmentId) }
            )

        return res.status(200).json
            ({
                success: true,
                message: 'Appointmnet deleted'
            })

    } catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: 'Appointment cannot be deleted',
                error: error
            })
    }
}


export { 
    newAppointment, 
    updateAppointment, 
    deleteAppointment
}