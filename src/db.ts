import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users1702052633207 } from "./migrations/1702052633207-users"
import { Appointments1702052671982 } from "./migrations/1702052671982-appointments"
import { Exercises1702052685809 } from "./migrations/1702052685809-exercises"
import { Appointmentsexercises1702052736388 } from "./migrations/1702052736388-appointmentexercise"
import { Orders1702052827295 } from "./migrations/1702052827295-orders"
import { Orderproduct1702052840296 } from "./migrations/1702052840296-orderproduct"
import { Products1702052852868 } from "./migrations/1702052852868-products"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "fandoclinic",
    entities: [],
    migrations: [Users1702052633207, 
        Appointments1702052671982, 
        Exercises1702052685809, 
        Appointmentsexercises1702052736388, 
        Orders1702052827295,
        Orderproduct1702052840296, 
        Products1702052852868],
    synchronize: false,
    logging: false,
})