import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenDecoded } from "../types/app";

const authUser = (req: Request, res: Response, next: NextFunction) => {

  try {
    if (!req.headers.authorization) {
      return res.status(401).json
        (
          {
            success: true,
            message: 'Auth_required'
          }
        )
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json
        (
          {
            success: true,
            message: 'Auth_required'
          }
        )
    }

    const tokenDecoded = jwt.verify(token, 'palabraSecreta') as TokenDecoded

    req.token = tokenDecoded

    next()
  } catch (error) {
    return res.status(500).json
      (
        {
          error: 'Not auth'
        }
      )
  }
}


export { authUser }