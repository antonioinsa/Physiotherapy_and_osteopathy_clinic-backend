import { Router } from "express";
import { register, login } from "../controllers/userController";


const routerUsers = Router()

routerUsers.post('/register', register)
routerUsers.post('/login', login)

export { routerUsers }