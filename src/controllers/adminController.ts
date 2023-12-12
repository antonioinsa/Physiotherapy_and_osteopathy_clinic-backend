import { Request, Response } from 'express'
import { User } from '../models/User'
import bcrypt from 'bcrypt'
import {
    validateEmail,
    validatePassword,
    validatePhone,
} from '../validations/validations'


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

export { updateWorkerById }