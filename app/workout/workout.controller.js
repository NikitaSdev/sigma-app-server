import asyncHandler from "express-async-handler";
import {prisma} from "../prisma.js";
import {calculateMinutes} from "./calculate-minutes.js";

export const CreateNewWorkout = asyncHandler(async (req,res) => {
    const {name,exerciseIds} = req.body
    const workout = await prisma.workout.create({
        data:{
            name,
            exercises:{
                connect: exerciseIds.map(id => ({id:+id}))
            }
        }
    })
    res.json(workout)
})

export const GetWorkout = asyncHandler(async(req,res) => {
    const workout = await prisma.workout.findUnique({
        where:{id: +req.params.id},
        include:{
            exercises:true
        }
    })
    if(!workout){
        res.status(404)
        throw new Error('Workout not found')
    }
    const minutes = calculateMinutes(workout.exercises.length)

    res.json({...workout,minutes})
})

export const GetWorkouts = asyncHandler(async(req,res) => {
    const workout = await prisma.workout.findMany({
        orderBy:{
            createdAt:'desc'
        },
        include:{
            exercises:true
        }
    })
    res.json(workout)
})
export const UpdateWorkout = asyncHandler(async (req,res) => {
    const {name,exerciseIds} = req.body
    try{
        const workout = await prisma.workout.update({
            where:{
                id:+req.params.id
            },
            data:{
                name,
                exercises:{
                    set:exerciseIds.map(id => ({id:+id}))
                }
            }
        })
        res.json(workout)
    }catch (e){
        console.log(e)
        res.status(404)
        throw new Error('Workout not found')
    }
})

export const DeleteWorkout = asyncHandler(async(req,res) => {

    try{
        const workout = await prisma.workout.delete({
            where:{
                id:+req.params.id
            }
        })
        res.json({workout,message:'Workout deleted'})
    }catch (e) {
        res.status(404)
        throw new Error('Workout not found')
    }
})