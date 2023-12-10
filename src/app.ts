import express from "express"
import cors from "cors"
import { routerUsers } from "./routes/userRoutes"
//import { routerAdmin } from "./routes/adminRoutes"


const app = express()

app.use(express.json())
app.use(cors())

app.use('/', routerUsers)
//app.use('/worker', routerAdmin)
//app.use('/sa', routerExercises)


export default app
