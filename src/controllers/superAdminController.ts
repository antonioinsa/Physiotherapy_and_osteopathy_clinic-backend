import { Request, Response } from 'express';
import { User } from '../models/User';
import {
    validateEmail,
    validateLastName,
    validateName,
    validatePhone
} from '../validations/validations';

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

        // if (validateName(name)) {
        //     return res.status(400).json
        //         ({
        //             success: false,
        //             message: validateName(name)
        //         })
        // }

        // if (validateLastName(lastName)) {
        //     return res.status(400).json
        //         ({
        //             success: false,
        //             message: validateLastName(lastName)
        //         })
        // }

        // if (validatePhone(phone)) {
        //     return res.status(400).json
        //         ({
        //             success: false,
        //             message: validatePhone(phone)
        //         })
        // }

        // if (validateEmail(email)) {
        //     return res.status(400).json
        //         ({
        //             success: false,
        //             message: validateEmail(email)
        //         })
        // }

        const { id } = req.body

        // if (req.token.role !== 'superAdmin') {

            const adminUser = await User.findOne
                ({
                    where: { id, role: 'admin' }
                })
console.log(adminUser);

            // if (!adminUser) {
            //     return res.status(400).json
            //         ({
            //             success: false,
            //             message: 'Worker not found'
            //         })
            // }

            await User.update
                (
                    {
                        id
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
            const updateWorker = await User.findOne
                (
                    id
                )

            return res.status(200).json({
                success: true,
                message: 'Worker updated',
                data: updateWorker
            })

        // }
        // return res.status(401).json
        //     ({
        //         success: false,
        //         message: 'You cannot update a worker'
        //     })

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

        const updateToWorker = await User.findOne({
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


export { deleteUserBySuperAdmin, updateWorkerBySuperAdmin, changeRoleBySuperAdmin };


