import { Router } from "express";
import { register, login, account, updateUserById, deleteUserById } from "../controllers/userController";
import { authUser } from "../middlewares/authUser";


const routerUsers = Router()

routerUsers.post('/register', register)
routerUsers.post('/login', login)
routerUsers.get('/account', authUser, account)
routerUsers.put('/update', authUser, updateUserById)
routerUsers.delete('/delete', authUser, deleteUserById)

export { routerUsers }