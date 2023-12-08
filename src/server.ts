import { AppDataSource } from "./db";
import app from "./app";


const PORT = process.env.PORT || 3000

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is running ${PORT}`);

        })
    })
    .catch(error => {
        console.log(error)
    })
