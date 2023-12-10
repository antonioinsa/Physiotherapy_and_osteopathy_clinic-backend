import { Request, Response } from 'express'
import { User } from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
    validateEmail,
    validatePassword,
    validateDni,
    validatePhone
} from '../validations/validations'

const register = async (req: Request, res: Response) => {
    try {
        const { name,
            lastName,
            phone,
            password,
            documentId,
            street,
            door,
            zipCode,
            town,
            country,
            email } = req.body

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

        if (await User.findOneBy({ email })) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'Email is already registered'
                })
        }

        if (await User.findOneBy({ documentId })) {
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
        const user = await User.findOneBy
            ({
                id: req.token.id
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

export { register, login, account }