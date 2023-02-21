import express from "express";
import authRoutes from "./app/auth/auth.routes.js";
import 'colors'
import * as dotenv from 'dotenv'
import morgan from "morgan";
import {prisma} from "./app/prisma.js";
import {errorHandler, notFound} from "./app/middleware/error.middleware.js";
import userRoutes from "./app/user/user.routes.js";
import exerciseRoutes from "./app/exersice/exercise.routes.js";
import * as path from "path";
import workoutRoutes from "./app/workout/workout.routes.js";
import cors from "cors";



dotenv.config()

const app = express()

const main = async() =>{
    app.use(cors())
    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'))
    }
    app.use(express.json())
    const __dirname = path.resolve()
    app.use('/uploads',express.static(path.join(__dirname,'/uploads/')),cors())
    app.use('/api/auth',authRoutes,cors())
    app.use('/api/users', userRoutes,cors())
    app.use('/api/exercises', exerciseRoutes,cors())
    app.use('/api/workouts',workoutRoutes,cors())
    app.use(notFound,cors())
    app.use(errorHandler,cors())
    const PORT = process.env.PORT || 5000
    app.listen(
        PORT,
        console.log(
            `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
                .bold
        )
    )
}
main().then(async  () => {
    await prisma.$disconnect()
}).catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})