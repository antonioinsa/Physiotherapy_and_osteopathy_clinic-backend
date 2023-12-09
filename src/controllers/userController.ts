import { Request, Response } from 'express'
import { User } from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/
        const dniRegex = /^[0-9]{8}[A-Za-z]$/
        const spanishPhoneRegex = /^(?:\+34|0034|34)?[6-9]\d{8}$/

        if (!spanishPhoneRegex.test(phone)) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'Phone is not valid'
                })
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'Email format is not valid'
                })
        }

        if (await User.findOneBy({ email })) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'Email is already registered'
                })
        }

        if (password.length < 6 || password.length > 12) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'Password must be between 6 and 12 characters'
                })
        }

        if (!dniRegex.test(documentId)) {
            return res.status(400).json
                ({
                    success: false,
                    message: 'Document ID is not valid'
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
                sucess: true,
                message: 'User created',
                token: newUser
            })

    } catch (error) {
        return res.status(500).json
            ({
                sucess: false,
                message: 'Something went wrong',
                error: error
            })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/

        if (!emailRegex.test(email)) {
            return res.status(400).json
                ({
                    sucess: false,
                    message: 'Email format is not valid'
                })
        }

        const user = await User.findOneBy
            ({
                email
            })

        if (!user) {
            return res.status(401).json
                ({
                    sucess: false,
                    message: 'User or password is not valid'
                })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json
                ({
                    sucess: false,
                    message: 'User or password is not valid'
                })
        }

        const token = jwt.sign
            (
                {
                    userId: user.id,
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
                sucess: true,
                message: 'User logged',
                token
            })

    } catch (error) {
        return res.status(500).json
            ({
                sucess: false,
                message: 'User or password is not valid',
                error: error
            })
    }
}


export { register, login }