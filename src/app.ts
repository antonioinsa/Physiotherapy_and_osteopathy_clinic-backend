import express from "express"
import cors from "cors"
import { routerUsers } from "./routes/userRoutes"


const app = express()

app.use(express.json())
app.use(cors())

app.use('/', routerUsers)
//app.use('/appointments', routerAppointments)
//app.use('/exercises', routerExercises)


export default app
