import express from "express"
import cors from "cors"
import { routerUsers } from "./routes/userRoutes"
import { routerAdmin } from "./routes/adminRoutes"
import { routerSuperAdmin } from "./routes/superAdminRoutes"
import { routerAppointment } from "./routes/appointmentRoutes"


const app = express()

app.use(express.json())
app.use(cors())

app.use('/',
    routerUsers,
    routerSuperAdmin,
    routerAppointment,
    routerAdmin
)
//app.use('/worker', routerAdmin)



export default app
