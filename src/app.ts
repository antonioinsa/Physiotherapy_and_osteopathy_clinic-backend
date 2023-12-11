import express from "express"
import cors from "cors"
import { routerUsers } from "./routes/userRoutes"
//import { routerAdmin } from "./routes/adminRoutes"
import { routerSuperAdmin } from "./routes/superAdminRoutes"


const app = express()

app.use(express.json())
app.use(cors())

app.use('/', routerUsers, routerSuperAdmin)
//app.use('/worker', routerAdmin)



export default app
