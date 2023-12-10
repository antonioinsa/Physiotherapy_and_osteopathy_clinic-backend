import { Router } from "express";
import { register, login, account } from "../controllers/userController";


const routerUsers = Router()

routerUsers.post('/register', register)
routerUsers.post('/login', login)
routerUsers.get('/account', account)

export { routerUsers }