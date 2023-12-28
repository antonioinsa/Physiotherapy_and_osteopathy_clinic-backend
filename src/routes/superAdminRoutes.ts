import { Router } from "express";
import { authUser } from "../middlewares/authUser";
import { authSuperAdmin } from "../middlewares/authSuperAdmin";
import {
    changeRoleBySuperAdmin,
    deleteUserBySuperAdmin,
    updateWorkerBySuperAdmin,
    getAllAppointments,
    getAllInvoices,
    physiotherapyAppointments,
    osteopathyAppointments,
    getAllWorkers,
    getAllUsers
} from "../controllers/superAdminController";

const routerSuperAdmin = Router()


routerSuperAdmin.delete('/delete/:id', authUser, authSuperAdmin, deleteUserBySuperAdmin)
routerSuperAdmin.put('/updateWorker', authUser, authSuperAdmin, updateWorkerBySuperAdmin)
routerSuperAdmin.put('/changeRole', authUser, authSuperAdmin, changeRoleBySuperAdmin)
routerSuperAdmin.get('/allAppointments', authUser, authSuperAdmin, getAllAppointments)
routerSuperAdmin.get('/invoices', authUser, authSuperAdmin, getAllInvoices)
routerSuperAdmin.get('/physiotherapy', authUser, authSuperAdmin, physiotherapyAppointments)
routerSuperAdmin.get('/osteopathy', authUser, authSuperAdmin, osteopathyAppointments)
routerSuperAdmin.get('/allWorkers', authUser, authSuperAdmin, getAllWorkers)
routerSuperAdmin.get('/allUsers', authUser, authSuperAdmin, getAllUsers)


export { routerSuperAdmin }