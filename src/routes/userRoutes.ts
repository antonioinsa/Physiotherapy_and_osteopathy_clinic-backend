import { Router } from "express";
import { register, login, account } from "../controllers/userController";
import { authUser } from "../middlewares/authUser";


const routerUsers = Router()

routerUsers.post('/register', register)
routerUsers.post('/login', login)
routerUsers.get('/account', authUser, account)

export { routerUsers }