import { Request, Response } from 'express'
import { User } from '../models/User'
import bcrypt from 'bcrypt'
import {
    validateEmail,
    validatePassword,
    validatePhone,
} from '../validations/validations'
import { Appointment } from '../models/Appointment'
import { Exercise } from '../models/Exercise'
//import { AppointmentExercise } from '../models/AppointmentExercise'


const updateWorkerById = async (req: Request, res: Response) => {
    try {
        const {
            phone,
            email,
            password,
            street,
            door,
            zipCode,
            town,
            country
        } = req.body

        if (validatePhone(phone)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validatePhone(phone)
                })
        }

        if (validateEmail(email)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateEmail(email)
                })
        }

        if (validatePassword(password)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validatePassword(password)
                })
        }

        const workerExist = await User.findOne
            ({
                where: { id: req.token.id }
            })

        if (!workerExist) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'User not found'
                })
        }

        if (req.token.role !== 'user') {
            const encrytedPassword = await bcrypt.hash(password, 5)

            await User.update
                (
                    {
                        id: req.token.id
                    },
                    {
                        phone,
                        email,
                        password: encrytedPassword,
                        street,
                        door,
                        zipCode,
                        town,
                        country
                    }
                )
            const updateWorker = await User.findOneBy
                ({
                    id: req.token.id
                })

            return res.status(200).json({
                success: true,
                message: 'Updated user',
                data: updateWorker
            })
        }
        return res.status(400).json
            ({
                success: false,
                message: 'You cannot update an user'
            })

    } catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: 'User cannot be updated',
                error: error
            })
    }
}

const getAppointmentsByAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.token

        const admin = await User.findOne
            ({
                where: { id: id }
            })

        if (!admin) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'User not found'
                })
        }
        const appointments = await Appointment.find
            ({
                where: { worker: id, is_active: true },
                select:
                    [
                        'date',
                        'hour',
                        'service',
                        'user_id',
                    ],
                relations: ['userAppointment', 'appointmentExercise']
            })

        const customAppointment = appointments.map((appointment) => ({

            date: appointment.date,
            hour: appointment.hour,
            name: appointment.userAppointment.name,
            last_name: appointment.userAppointment.lastName,
            email: appointment.userAppointment.email,
            phone: appointment.userAppointment.phone,
            exercises: appointment.appointmentExercise
        }))

        return res.status(200).json
            ({
                success: true,
                message: 'All appointments available',
                data: customAppointment
            })

    } catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: 'Cannot retrieve appointments',
                error: error
            })
    }
}

const getExercises = async (req: Request, res: Response) => {
    try {
        const { id, role } = req.token

        await User.findOne
            ({
                where: { id: id }
            })

        if (role !== 'admin' && role !== 'superAdmin') {
            return res.status(400).json
                ({
                    success: false,
                    message: 'Access denied'
                })
        }

        const exercises = await Exercise.find
            ({
                select: ['id', 'activity', 'type', 'description']
            })

        return res.status(200).json
            ({
                success: true,
                message: 'All exercises available',
                data: exercises
            })

    } catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: 'Cannot retrieve exercises',
                error: error
            })
    }
}

// const addExercisesToAppointment = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.token;
//         const { appointmentId, exerciseId } = req.body;

//         const admin = await User.findOne({
//             where: { id: id }
//         });

//         if (!admin) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }

//         const appointmentToUpdate = await Appointment.findOne({
//             where: { id: parseInt(appointmentId), worker: id },
//             relations: ['userAppointment'] // Assuming you have a relation to the user in the Appointment model
//         });

//         if (!appointmentToUpdate) {
//             return res.status(404).json({
//                 success: false,
//                 message: `Appointment ID ${appointmentId} not found or not authorized`
//             });
//         }

//         const exercise = await Exercise.findOne({
//             where: { id: exerciseId }
//         });

//         if (!exercise) {
//             return res.status(404).json({
//                 success: false,
//                 message: `Exercise ID ${exerciseId} not found`
//             });
//         }

//         await AppointmentExercise.create({
//             appointment_id: appointmentToUpdate,
//             exercise_id: exercise
//         }).save();

//         const updatedAppointment = await Appointment.findOne({
//             where: { id: parseInt(appointmentId), worker: id },
//             relations: ['appointmentExercise', 'appointmentExercise.exercise']
//         });

//         const customAppointment = {
//             date: updatedAppointment?.date,
//             hour: updatedAppointment?.hour,
//             name: updatedAppointment?.userAppointment?.name,
//             last_name: updatedAppointment?.userAppointment?.lastName,
//             email: updatedAppointment?.userAppointment?.email,
//             phone: updatedAppointment?.userAppointment?.phone,
//             exercises: updatedAppointment?.appointmentExercise?.map(
//                 (ae) => ({
//                     activity: ae?.exercise_id?.activity,
//                     description: ae?.exercise_id?.description
//                 })
//             )
//         };

//         return res.status(200).json({
//             success: true,
//             message: 'Exercises added to appointment',
//             data: customAppointment
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'Cannot add exercises to appointment',
//             error: error
//         });
//     }
// };


export { updateWorkerById, getAppointmentsByAdmin, getExercises }