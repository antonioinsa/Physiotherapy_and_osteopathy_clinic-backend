import { Router } from "express";
import { register, login, account, updateUserById } from "../controllers/userController";
import { authUser } from "../middlewares/authUser";


const routerUsers = Router()

routerUsers.post('/register', register)
routerUsers.post('/login', login)
routerUsers.get('/account', authUser, account)
routerUsers.put('/update', authUser, updateUserById)

export { routerUsers }