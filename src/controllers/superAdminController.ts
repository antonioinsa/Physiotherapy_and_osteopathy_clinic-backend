import { Request, Response } from 'express';
import { User } from '../models/User';
import {
    validateEmail,
    validatePhone
} from '../validations/validations';
import { Appointment } from '../models/Appointment';

const deleteUserBySuperAdmin = async (req: Request, res: Response) => {
    try {
        if (req.token.role !== 'superAdmin') {

            return res.status(401).json
                ({
                    success: false,
                    message: 'You cannot delete an user'
                })

        }
        const { id } = req.params

        await User.delete
            (
                id
            )

        return res.status(200).json
            ({
                success: true,
                message: 'User deleted'
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

const updateWorkerBySuperAdmin = async (req: Request, res: Response) => {
    try {
        const {
            phone,
            email,
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

        const id = req.body.id

        if (req.token.role !== 'superAdmin') {
            return res.status(401).json
                ({
                    success: false,
                    message: 'You cannot update a worker'
                })
        }

        const adminUser = await User.findOne
            ({
                where: { id, role: 'admin' }
            })


        if (!adminUser) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'Worker not found'
                })
        }

        await User.update
            (
                {
                    id
                },
                {
                    phone,
                    email,
                    street,
                    door,
                    zipCode,
                    town,
                    country
                }
            )
        const updateWorker = await User.findOne
            ({
                select: [
                    'name',
                    'lastName',
                    'phone',
                    'email',
                    'street',
                    'door',
                    'zipCode',
                    'town',
                    'country'
                ],

                where: { id, role: 'admin' }
            })

        return res.status(200).json({
            success: true,
            message: 'Worker updated',
            data: updateWorker
        })

    } catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: 'Worker cannot be updated',
                error: error
            })
    }
}

const changeRoleBySuperAdmin = async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const role = req.body.role

        await User.update
            (
                {
                    id: id
                },
                {
                    role: role
                }
            )

        const updateToWorker = await User.findOne
            ({
                select: [
                    'name',
                    'lastName',
                    'role'
                ],

                where: { id: id }
            })

        return res.status(200).json
            (
                {
                    success: true,
                    message: "Role change successfully",
                    data: updateToWorker
                }
            )

    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Role has not been updated",
                    error: error
                }
            )
    }
}

const getAllAppointments = async (req: Request, res: Response) => {
    try {

        const allAppointment = await Appointment.find
            ({
                where: { is_active: true },
                select:
                    [
                        'id',
                        'date',
                        'hour',
                        'service',
                        'price',
                        'user_id',
                        'is_active',
                        'worker',
                        'created_at',
                        'updated_at'
                    ],
                relations: ['userAppointment']
            })

        const CustomView = allAppointment.map((appointment) => ({

            apointment_number: appointment.id,
            name: appointment.userAppointment.name,
            last_name: appointment.userAppointment.lastName,
            email:appointment.userAppointment.email,
            phone: appointment.userAppointment.phone,
            date: appointment.date,
            hour: appointment.hour,
            service: appointment.service,
            name_worker: appointment.userAppointment.name,
            lastName_worker: appointment.userAppointment.lastName,
            price: appointment.price,

        }))

        return res.status(200).json
            ({
                success: true,
                message: 'All appointments',
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

const getAllInvoices = async (req: Request, res: Response) => {
    try {

        const allinvoices = await Appointment.find
            ({
                where: { is_active: false },
                select:
                    [
                        'date',
                        'service',
                        'price',
                        'user_id',
                    ],
                relations: ['userAppointment']
            })

        const CustomView = allinvoices.map((appointment) => ({

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

const physiotherapyAppointments = async (req: Request, res: Response) => {
    try {
        const physio = await Appointment.find
            ({
                where: { service: 'physiotherapy', is_active: true },
                select:
                    [
                        'date',
                        'hour',
                        'price',
                        'user_id',
                    ],
                relations: ['userAppointment']
            })

        const CustomView = physio.map((appointment) => ({

            date: appointment.date,
            name: appointment.userAppointment.name,
            last_name: appointment.userAppointment.lastName,
            email: appointment.userAppointment.email,
            phone: appointment.userAppointment.phone,
            
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

const osteopathyAppointments = async (req: Request, res: Response) => {
    try {
        const physio = await Appointment.find
            ({
                where: { service: 'osteopathy', is_active: true },
                select:
                    [
                        'date',
                        'hour',
                        'price',
                        'user_id',
                    ],
                relations: ['userAppointment']
            })

        const CustomView = physio.map((appointment) => ({

            date: appointment.date,
            name: appointment.userAppointment.name,
            last_name: appointment.userAppointment.lastName,
            email: appointment.userAppointment.email,
            phone: appointment.userAppointment.phone,
            
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
    deleteUserBySuperAdmin,
    updateWorkerBySuperAdmin,
    changeRoleBySuperAdmin,
    getAllAppointments,
    getAllInvoices,
    physiotherapyAppointments,
    osteopathyAppointments
}


