import { Request, Response } from 'express'
import { User } from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
    validateEmail,
    validatePassword,
    validateDni,
    validatePhone,
    validateName,
    validateLastName
} from '../validations/validations'
import { Appointment } from '../models/Appointment'
import { AppointmentExercise } from '../models/AppointmentExercise'

const register = async (req: Request, res: Response) => {
    try {
        const {
            name,
            lastName,
            phone,
            password,
            documentId,
            street,
            door,
            zipCode,
            town,
            country,
            email
        } = req.body

        if (validateName(name)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateName(name)
                })
        }

        if (validateLastName(lastName)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateLastName(lastName)
                })
        }

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

        if (await User.findOneBy
            ({
                email
            })
        ) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'Email is already registered'
                })
        }

        if (await User.findOneBy
            ({
                documentId
            })
        ) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'Document is already registered'
                })
        }

        if (validatePassword(password)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validatePassword(password)
                })
        }

        if (validateDni(documentId)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateDni(documentId)
                })
        }

        const encryptedPassword = bcrypt.hashSync(password, 5)
        const newUser = await User.create({
            name,
            lastName,
            phone,
            email,
            password: encryptedPassword,
            documentId,
            street,
            door,
            zipCode,
            town,
            country
        }).save()

        return res.status(200).json
            ({
                success: true,
                message: 'User created',
                token: newUser
            })

    } catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: 'Something went wrong',
                error: error
            })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (validateEmail(email)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateEmail(email)
                })
        }

        const user = await User.findOneBy
            ({
                email
            })

        if (!user) {
            return res.status(401).json
                ({
                    success: false,
                    message: 'User or password is not valid'
                })
        }
                                               
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json
                ({
                    success: false,
                    message: 'User or password is not valid'
                })
        }

        const token = jwt.sign
            (
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                'palabraSecreta',
                {
                    expiresIn: '4h'
                }

            )
        return res.status(200).json
            ({
                success: true,
                message: 'User logged',
                token: token
            })

    } catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: 'Cant be logged',
                error: error
            })
    }
}

const account = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne
            ({
                where: { id: req.token.id }
            })

        if (!user) {
            return res.status(401).json
                ({
                    success: false,
                    message: 'Session expired'
                })
        }

        return res.status(200).json
            ({
                success: true,
                message: 'User retrieved',
                data: user
            })

    } catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: 'User profile cannot be retrieved',
                error: error
            })
    }
}

const updateUserById = async (req: Request, res: Response) => {
    try {
        const {
            name,
            lastName,
            phone,
            email,
            street,
            door,
            zipCode,
            town,
            country
        } = req.body

        if (validateName(name)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateName(name)
                })
        }

        if (validateLastName(lastName)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validateLastName(lastName)
                })
        }

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

        const userExist = await User.findOne
            ({
                where: { id: req.token.id }
            })

        if (!userExist) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'User not found'
                })
        }

        if (req.token.role !== 'admin') {

            await User.update
                (
                    {
                        id: req.token.id
                    },
                    {
                        name,
                        lastName,
                        phone,
                        email,
                        street,
                        door,
                        zipCode,
                        town,
                        country
                    }
                )
            const updateUser = await User.findOneBy
                ({
                    id: req.token.id
                })

            return res.status(200).json({
                success: true,
                message: 'Updated user',
                data: updateUser
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

const updateUserPasswordById = async (req: Request, res: Response) => {
    try {
        const {
            password
        } = req.body

        if (validatePassword(password)) {
            return res.status(400).json
                ({
                    success: false,
                    message: validatePassword(password)
                })
        }

        const userExist = await User.findOne
            ({
                where: { id: req.token.id }
            })

        if (!userExist) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'User not found'
                })
        }
            const encrytedPassword = await bcrypt.hash(password, 5)

            await User.update
                (
                    {
                        id: req.token.id
                    },
                    {
                        password: encrytedPassword
                    }
                )
            const updateUserPassword = await User.findOneBy
                ({
                    id: req.token.id
                })

            return res.status(200).json({
                success: true,
                message: 'Updated password',
                data: updateUserPassword
            })

    } catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: 'Password cannot be updated',
                error: error
            })
    }
}

const deleteUserById = async (req: Request, res: Response) => {
    try {
        if (req.token.role === 'user') {

            await User.delete
                (
                    { id: req.token.id }
                )

            return res.status(200).json
                ({
                    success: true,
                    message: 'User deleted'
                })
        }
        return res.status(401).json
            ({
                success: false,
                message: 'You cannot delete an user'
            })
    } catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: 'User cannot be deleted',
                error: error
            })
    }
}

const getAppointmentByUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.token

        const user = await User.findOne
            ({
                where: { id: id }
            })

        if (!user) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'User not found'
                })
        }
        
        const userAppointment = await Appointment.find
            ({
                where: { user_id: id },
                select:
                    [
                        'date',
                        'hour',
                        'service',
                        'price'
                    ],
                //relations: ['appointments']
            })
            console.log('paso3');
        const exercises = await AppointmentExercise.find
            ({
                where: { appointment_id: id },
                select: ['exercise_id']
            })

        const userCustomexercise = exercises.map((exercises) => ({
            exercise_id: exercises.exercise_id
        }))

        const userCustomAppointment = userAppointment.map((appointment) => ({

            date: appointment.date,
            hour: appointment.hour,
            service: appointment.service,
            price: appointment.price,
            exercises: userCustomexercise
        }))

        return res.status(200).json
            ({
                success: true,
                message: 'User appointments',
                data: userCustomAppointment
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

const getInvoicesByUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.token

        const user = await User.findOne
            ({
                where: { id: id }
            })

        if (!user) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'User not found'
                })
        }
        const invoices = await Appointment.find
            ({
                where: { user_id: id, is_active: false },
                select:
                    [
                        'date',
                        'service',
                        'price',
                        'user_id',
                    ],
                relations: ['userAppointment']
            })

        const CustomView = invoices.map((appointment) => ({

            date: appointment.date,
            service: appointment.service,
            price: appointment.price,
            name: appointment.userAppointment.name,
            last_name: appointment.userAppointment.lastName,
            email: appointment.userAppointment.email,
            phone: appointment.userAppointment.phone,
            street: appointment.userAppointment.street,
            door: appointment.userAppointment.door,
            zipCode: appointment.userAppointment.zipCode,
            town: appointment.userAppointment.town,
            country: appointment.userAppointment.country
        }))

        return res.status(200).json
            ({
                success: true,
                message: 'All invoices',
                data: CustomView
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


export {
    register,
    login,
    account,
    updateUserById,
    updateUserPasswordById,
    deleteUserById,
    getAppointmentByUser,
    getInvoicesByUser
}