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


export { register }